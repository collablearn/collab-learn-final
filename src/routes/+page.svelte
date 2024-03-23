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
		isUpdating: false
	};
	setStaticState(staticObject);

	const staticReference = getStaticState();
</script>

{#if $staticReference.isRegistering}
	<Register />
{:else if $staticReference.isResetting}
	{#if $staticReference.isVerfying}
		<VeryfyAccount />
	{:else if $staticReference.isUpdating}
		<UpdatePassword />
	{:else}
		<ResetPassword />
	{/if}
{:else}
	<Login />
{/if}
