<script lang="ts">
	import groupIcon from '$lib/assets/guild_group_icon_320.svg';
	import { fade, scale } from 'svelte/transition';
	import Loader from '$lib/general-components/loader.svelte';
	import { getAuthState } from '$lib';
	import type { CreatedGuildReference } from '$lib/types';
	import { toast } from 'svelte-sonner';

	export let guildObj: CreatedGuildReference;

	export let showPrivateJoin = false;

	const authState = getAuthState();

	let password = '';

	//this is insecure way of joining will rethink soon for database calls
	const handleJoin = () => {
		if (password === guildObj.passcode) {
			toast.success('Joining Guild', { description: 'Joined Successfully' });
			$authState.guilds.guildObj = guildObj;
			$authState.guilds.joinedGuild = true;
		} else {
			toast.error('Joining Guild', {
				description: `The Passcode is incorrect unable to join ${guildObj.guild_name}`
			});
		}
	};
</script>

{#if showPrivateJoin}
	<div
		class="fixed left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<div class="bg-submain py-[50px] px-[22px] w-full relative" in:scale out:fade>
			<div class="flex flex-col gap-[10px]">
				<h3 class="text-[24px] text-main">{guildObj.guild_name}</h3>
				<p class="text-[14px] text-main">{guildObj.description}</p>
			</div>

			<div class="flex items-center gap-[5px] absolute top-0 right-0 m-[20px]">
				<img src={groupIcon} alt="group-icon" />
				<p class="text-[14px] text-main">{guildObj.joined_count}/{guildObj.max_users}</p>
			</div>

			<div class="mt-[20px]">
				<label>
					<span class="text-main text-[14px] transition-all">Passcode</span>
					<input
						bind:value={password}
						type="password"
						class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
					/>
				</label>
			</div>

			<div class="mt-[30px] flex flex-col gap-[10px]">
				<form>
					<button
						class="active:bg-main/50 bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
					>
						Join
					</button>
				</form>

				<button
					on:click={() => (showPrivateJoin = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</div>
	</div>
{/if}
