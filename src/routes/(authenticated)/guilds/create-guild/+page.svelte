<script lang="ts">
	import { getAuthState } from '$lib';
	import CreateGuildForm from '$lib/auth-components/guilds/create-guild/create-guild-form.svelte';

	let authState = getAuthState();

	$authState.activeItem = '/guilds';
</script>

<div class="p-[22px]">
	<h3 class="text-[16px] text-main font-semibold">Create Guild</h3>
	<p class="text-[14px] text-main mt-[15px]">Start collaborating to your co-peers through guild.</p>

	<div class="mt-[19px]">
		<CreateGuildForm />
	</div>
</div>
