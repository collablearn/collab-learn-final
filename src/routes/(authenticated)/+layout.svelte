<script lang="ts">
	import Nav from '$lib/auth-components/nav.svelte';
	import { getActiveItem, setActiveItem } from '$lib';
	import ProjectJoinedContent from '$lib/auth-components/projects/join-project/project-joined-content.svelte';

	setActiveItem('/dashboard');
</script>

<div class=" bg-submain">
	{#if true}
		<ProjectJoinedContent />
	{:else}
		<div class="sticky top-0 z-20">
			<Nav />
		</div>

		<div class="min-h-screen px-[22px] py-[50px]">
			<slot />
		</div>
	{/if}
</div>
