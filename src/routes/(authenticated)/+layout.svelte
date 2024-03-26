<script lang="ts">
	import Nav from '$lib/auth-components/nav.svelte';
	import { getAuthState, setAuthState } from '$lib';
	import ProjectJoinedContent from '$lib/auth-components/projects/join-project/project-joined-content.svelte';

	const defaultAuthState = {
		activeItem: '/dashboard',
		joinedProject: false,
		joinedGuild: false
	};

	setAuthState(defaultAuthState);
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
