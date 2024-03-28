<script lang="ts">
	import { getAuthState } from '$lib';

	const authState = getAuthState();
</script>

<div class="pt-[145px]">
	<p>{$authState.guilds.guildObj.guildName}</p>
</div>
