<script lang="ts">
	import { getAuthState } from '$lib';
	import DashboardDesktop from '$lib/auth-components/dashboard/dashboard-desktop.svelte';
	import DashboardJoinedGuilds from '$lib/auth-components/dashboard/dashboard-joined-guilds.svelte';
	import DashboardRecentProjects from '$lib/auth-components/dashboard/dashboard-recent-projects.svelte';
	import desktopNavIcon from '$lib/assets/desktop_nav_icon.svg';
	import { fade } from 'svelte/transition';

	const authState = getAuthState();

	$authState.activeItem = '/dashboard';
</script>

<div class="p-[22px] flex flex-col gap-[20px]" in:fade>
	<div class="flex flex-col gap-[20px]">
		<div class="bg-main rounded-[10px] flex flex-col justify-center items-center p-[20px]">
			<p class="text-white text-[14px] md:text-[24px] lg:text-[34px] font-bold">Welcome Back To</p>
			<img src={desktopNavIcon} alt={desktopNavIcon} class="md:w-[50%]" />
		</div>

		<DashboardDesktop />
	</div>

	<div class="">
		<DashboardRecentProjects />
	</div>

	<div class="">
		<DashboardJoinedGuilds />
	</div>
</div>
