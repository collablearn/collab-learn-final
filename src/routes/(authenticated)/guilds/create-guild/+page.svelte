<script lang="ts">
	import { getActiveItem } from '$lib';
	import CreateGuildForm from '$lib/auth-components/guilds/create-guild/create-guild-form.svelte';

	let activeItem = getActiveItem();

	$activeItem = '/guilds';
</script>

<div class="">
	<h3 class="text-[16px] text-main font-semibold">Create Guild</h3>
	<p class="text-[14px] text-main mt-[15px]">
		Start collaborating to your co-peers thhrough guild.
	</p>

	<div class="mt-[19px]">
		<CreateGuildForm />
	</div>
</div>
