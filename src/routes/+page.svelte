<script lang="ts">
	import Login from '$lib/static-components/login.svelte';
	import Register from '$lib/static-components/register.svelte';
	import ResetPassword from '$lib/static-components/reset-password.svelte';
	import { setStaticState, getStaticState } from '$lib';
	import VeryfyAccount from '$lib/static-components/reset-password/veryfy-account.svelte';
	import UpdatePassword from '$lib/static-components/reset-password/update-password.svelte';

	const staticObject = {
		isRegistering: false,
		isResetting: false,
		isVerfying: false,
		isUpdating: false,
		email: ''
	};
	setStaticState(staticObject);

	const staticState = getStaticState();
</script>

<div class=" sm:w-[400px] mx-auto">
	{#if $staticState.isRegistering}
		<Register />
	{:else if $staticState.isResetting}
		{#if $staticState.isVerfying}
			<VeryfyAccount />
		{:else if $staticState.isUpdating}
			<UpdatePassword />
		{:else}
			<ResetPassword />
		{/if}
	{:else}
		<Login />
	{/if}
</div>
