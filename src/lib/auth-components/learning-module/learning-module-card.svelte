<script lang="ts">
	import learningModIcon from '$lib/assets/learning_mod_icon_320.svg';
	import { formatDate } from '$lib/helpers';
	import type { CreatedModuleReference, ResultModel } from '$lib/types';

	import { getAuthState } from '$lib';

	export let moduleObj: CreatedModuleReference;

	const authState = getAuthState();
</script>

<div class="w-full mt-[10px]">
	<button
		on:click={() => {
			$authState.modules.showModule = true;
			$authState.modules.moduleObj = moduleObj;
		}}
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
