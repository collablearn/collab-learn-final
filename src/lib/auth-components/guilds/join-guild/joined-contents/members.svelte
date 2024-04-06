<script lang="ts">
	import sampleIcon from '$lib/assets/description_icon_320_sample.svg';
	import onlineIcon from '$lib/assets/project_online_icon_320.svg';
	import offlineIcon from '$lib/assets/project_offline_icon_320.svg';

	import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';
	import { getAuthState } from '$lib';
	import { toast } from 'svelte-sonner';
	import type { JoinedGuildReference } from '$lib/types';
	import { checkIfhavePhoto } from '$lib/helpers';

	export let supabase: SupabaseClient<any, 'public', any>;

	const authState = getAuthState();

	const { guildObj } = $authState.guilds;

	let localArray: JoinedGuildReference[] = [];

	const getJoinedUsers = async () => {
		if (guildObj) {
			const { data, error } = await supabase.rpc('get_joined_members', {
				client_guild_id: guildObj.id,
				client_host_id: guildObj.user_id
			});
			if (error) return toast.error('Getting Joined Users', { description: error.message });

			localArray = data;
		}
	};

	getJoinedUsers();
	guildObj?.host_photo ?? sampleIcon;
</script>

<div class="flex flex-col gap-[10px] mt-[45px]">
	<div class="flex justify-between items-center">
		<div class="flex items-start gap-[10px]">
			<img
				src={checkIfhavePhoto(guildObj?.host_photo, sampleIcon)}
				alt="sample-icon"
				class="w-[25px] h-[25px] rounded-full"
			/>
			<div class="flex flex-col o">
				<p class="text-main font-semibold text-[14px]">{guildObj?.host_name}</p>
				<p class="text-main text-[14px]">Host</p>
			</div>
		</div>
	</div>

	{#each localArray as joinedObj}
		<div class="flex justify-between items-center">
			<div class="flex items-start gap-[10px]">
				<img
					src={joinedObj.user_photo_link ?? sampleIcon}
					alt="sample-icon"
					class="w-[25px] h-[25px] rounded-full"
				/>
				<div class="flex flex-col o">
					<p class="text-main font-semibold text-[14px]">{joinedObj.user_fullname}</p>
					<p class="text-main text-[14px]">Member</p>
				</div>
			</div>
		</div>
	{/each}
</div>
