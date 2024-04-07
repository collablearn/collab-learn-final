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

	const addViewsHandler = async () => {
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
		}
	};
</script>

<div class="w-full mt-[10px]">
	<button
		on:click={addViewsHandler}
		class="bg-subwhite px-[13px] py-[16px] w-full rounded-[10px] shadow-sm shadow-black text-left"
	>
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
