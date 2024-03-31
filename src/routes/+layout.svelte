<script lang="ts">
	import { setAuthState, setUserState } from '$lib';
	import '../app.css';
	import { Toaster, toast } from 'svelte-sonner';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: data.session ? setUserState(data.session?.user) : setUserState(null);

	const defaultAuthState = {
		activeItem: '/dashboard',
		projects: {
			joinedProject: false,
			showEditTools: false
		},
		guilds: {
			joinedGuild: false,
			guildObj: {
				imageUrl: '',
				hostName: '',
				maxUsers: 0,
				guildName: '',
				guildDescription: '',
				isPrivate: false,
				joinedCount: 0
			}
		}
	};

	setAuthState(defaultAuthState);
</script>

<Toaster richColors />
<slot />
