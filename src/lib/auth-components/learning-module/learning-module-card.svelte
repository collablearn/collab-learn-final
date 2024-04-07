<script lang="ts">
	import learningModIcon from '$lib/assets/learning_mod_icon_320.svg';
	import { formatDate } from '$lib/helpers';
	import type { CreatedModuleReference, ResultModel } from '$lib/types';
	import type { SupabaseClient } from '@supabase/supabase-js';
	import { getAuthState, getUserState } from '$lib';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

	export let moduleObj: CreatedModuleReference;
	export let supabase: SupabaseClient<any, 'public', any>;

	const authState = getAuthState();
	const userState = getUserState();
	let addViewLoader = false;
	const addViewsHandler = async () => {
		addViewLoader = true;
		const { error } = await supabase.rpc('update_total_views', {
			client_module_id: moduleObj.id,
			client_user_id: $userState?.user_id,
			client_user_fullname: $userState?.user_fullname,
			client_module_name: moduleObj.module_name,
			client_module_host_name: moduleObj.host_name,
			client_user_photo_link: $userState?.user_photo_link,
			client_module_image_url: moduleObj.image_url
		});

		if (error) return toast.error('Counting View', { description: error.message });
		else {
			$authState.modules.showModule = true;
			$authState.modules.moduleObj = moduleObj;
			invalidateAll();
			addViewLoader = false;
		}
	};
</script>

<div class="w-full mt-[10px]">
	<button
		disabled={addViewLoader}
		on:click={addViewsHandler}
		class="bg-subwhite px-[13px] py-[16px] w-full rounded-[10px] shadow-sm shadow-black text-left relative"
	>
		{#if addViewLoader}
			<div
				class="absolute left-0 right-0 top-0 bottom-0 bg-[#0000009a] flex flex-col items-center justify-center rounded-[10px] z-10"
			>
				<div class="flex items-center gap-[20px] text-submain">
					<div
						class="w-10 h-10 border-[5px] border-b-submain rounded-full animate-spin border-[#0000009a]"
					></div>
					<p class="font-bold">Checking...</p>
				</div>
			</div>
		{/if}
		<div class="flex items-center gap-[20px]">
			<div class="">
				<img src={learningModIcon} alt="sample-icon" />
			</div>

			<div class="flex flex-col gap-[5px] w-full">
				<p class="text-[16px] text-main font-semibold">{moduleObj.host_name}</p>
				<p class="text-[14px] text-main">Uploaded a module:</p>
				<p class="text-[14px] text-main">{formatDate(moduleObj.created_at)}</p>
			</div>
		</div>
	</button>
</div>
