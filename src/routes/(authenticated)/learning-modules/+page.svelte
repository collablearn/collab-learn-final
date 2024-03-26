<script lang="ts">
	import GuildCard from '$lib/auth-components/guilds/guild-card.svelte';
	import { getAuthState } from '$lib';
	import LearningModuleSearch from '$lib/auth-components/learning-module/learning-module-search.svelte';
	import UploadModuleBtn from '$lib/auth-components/learning-module/upload-module-btn.svelte';
	import LearnongModuleCard from '$lib/auth-components/learning-module/learnong-module-card.svelte';

	let authState = getAuthState();

	$authState.activeItem = '/learning-modules';
</script>

<div class="fixed bottom-0 right-0 m-[20px] z-10">
	<UploadModuleBtn />
</div>

<div class="">
	<div class="">
		<LearningModuleSearch />
	</div>

	<div class="flex flex-col gap-[20px] mt-[35px]">
		{#each Array(10) as sample}
			<LearnongModuleCard />
		{/each}

		<div class="">
			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				1
			</button>

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				2
			</button>

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				3
			</button>

			...

			<button
				class="text-[14px] text-main px-[5px] font-semibold rounded-[5px] active:border-[1px] border-main"
			>
				10
			</button>
		</div>
	</div>
</div>
