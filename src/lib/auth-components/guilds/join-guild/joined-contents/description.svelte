<script lang="ts">
	import DescriptionCard from './description-card.svelte';
	import createIcon from '$lib/assets/create_guild_icon_320.svg';
	import ChatCard from './chat-card.svelte';
	import AddNote from './add-note.svelte';
	import { getAuthState, getUserState } from '$lib';
	import { flip } from 'svelte/animate';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { sendGuildChatSchema } from '$lib/schema';
	import type { ZodError } from 'zod';
	import { fade } from 'svelte/transition';
	import { toast } from 'svelte-sonner';

	export let supabase: SupabaseClient<any, 'public', any>;

	const authState = getAuthState();
	const userState = getUserState();

	//get all guild chats
	const getChats = async () => {
		const { data, error } = await supabase
			.from('guild_chats_tb')
			.select('*')
			.match({ guild_id: $authState.guilds.guildObj?.id });

		if (error) return toast.error('Getting Chats', { description: error.message });

		$authState.guilds.guildChats = data;
	};

	//websocket connection
	const channels = supabase
		.channel('custom-all-channel')
		.on(
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'guild_chats_tb' },
			async (payload) => {
				await getChats();
			}
		)
		.subscribe();

	const selections = ["Guild's Wall", 'Chat Feed'];
	let activeItem = "Guild's Wall";

	let chatValue = '';
	let sendChatLoader = false;
	let sendChatError: { sendChatValue: string[] } | null = null;

	const sendChatHandler = async () => {
		sendChatLoader = true;
		try {
			const result = sendGuildChatSchema.parse({ sendChatValue: chatValue });

			const { error: insertChatError } = await supabase.from('guild_chats_tb').insert([
				{
					user_id: $userState?.user_id,
					guild_id: $authState.guilds.guildObj?.id,
					user_fullname: $userState?.user_fullname,
					user_photo_link: $userState?.user_photo_link,
					guild_chat: result.sendChatValue
				}
			]);

			if (insertChatError)
				return toast.error('Sending Chat', { description: insertChatError.message });
			else {
				sendChatLoader = false;
				chatValue = '';
				return toast.success('Sending Chat', { description: 'Chat Sended.' });
			}
		} catch (error) {
			const zodError = error as ZodError;
			const { fieldErrors } = zodError.flatten();
			sendChatError = fieldErrors as { sendChatValue: string[] };
			sendChatLoader = false;
		}
	};

	getChats();
</script>

{#if activeItem === "Guild's Wall"}
	<AddNote />
{/if}

<div class="mt-[40px]">
	<div class="flex items-center gap-[10px]">
		{#each selections as selection}
			<button
				on:click={() => (activeItem = selection)}
				class="text-main text-[14px] transition-all {activeItem === selection
					? 'font-bold underline'
					: ''}"
				>{selection}
			</button>
		{/each}
	</div>

	{#if activeItem === "Guild's Wall"}
		<div class="mt-[20px] flex flex-col gap-[15px]">
			{#each $authState.guilds.guildNotes ?? [] as guildNoteObj (guildNoteObj.id)}
				<div class="" animate:flip={{ duration: 500 }}>
					<DescriptionCard {guildNoteObj} />
				</div>
			{/each}
		</div>
	{:else}
		<div class="mt-[20px] flex flex-col gap-[15px] h-[40dvh] overflow-auto">
			{#each $authState.guilds.guildChats ?? [] as chatObj}
				<ChatCard {chatObj} />
			{/each}
		</div>

		<div class="flex items-center gap-[10px] mt-[10px]">
			<textarea
				disabled={sendChatLoader}
				bind:value={chatValue}
				placeholder="Say something..."
				class="{sendChatLoader ? 'cursor-not-allowed' : ''}
				outline-none border-[1px] border-main bg-submain rounded-[10px] text-main text-[14px] p-[10px] w-full"
			/>

			<button
				disabled={sendChatLoader}
				class="{sendChatLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
				 text-submain h-[40px] rounded-[10px] w-[100px] px-[10px] transition-all"
				on:click={sendChatHandler}
			>
				{#if sendChatLoader}
					Sending...
				{:else}
					Send
				{/if}
			</button>
		</div>
		{#each sendChatError?.sendChatValue ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	{/if}
</div>

<style>
	::placeholder {
		color: #800000;
		opacity: 1; /* Firefox */
	}

	::-ms-input-placeholder {
		/* Edge 12 -18 */
		color: #800000;
	}
</style>
