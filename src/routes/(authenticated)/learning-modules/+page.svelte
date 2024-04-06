<script lang="ts">
	import GuildCard from '$lib/auth-components/guilds/guild-card.svelte';
	import { getAuthState } from '$lib';
	import LearningModuleSearch from '$lib/auth-components/learning-module/learning-module-search.svelte';
	import UploadModuleBtn from '$lib/auth-components/learning-module/upload-module-btn.svelte';
	import LearningModuleCard from '$lib/auth-components/learning-module/learning-module-card.svelte';
	import { fade } from 'svelte/transition';

	const authState = getAuthState();

	$authState.activeItem = '/learning-modules';
</script>

<div class="" in:fade>
	<div class="fixed bottom-0 right-0 m-[20px] z-10">
		<UploadModuleBtn />
	</div>

	<div class="">
		<div class="">
			<LearningModuleSearch />
		</div>

		<div class="flex flex-col gap-[20px] mt-[35px]">
			{#each $authState.modules.createdModules ?? [] as moduleObj}
				<LearningModuleCard {moduleObj} />
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
</div>
