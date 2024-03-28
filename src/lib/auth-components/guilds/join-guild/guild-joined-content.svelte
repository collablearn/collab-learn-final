<script lang="ts">
	import { getAuthState } from '$lib';

	const authState = getAuthState();
</script>

<div class="">
	{$authState.guilds.guildObj.guildName}
</div>
