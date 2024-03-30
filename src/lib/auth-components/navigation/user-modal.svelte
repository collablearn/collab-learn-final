<script lang="ts">
	import bellIcon from '$lib/assets/bell_icon_320.svg';
	import feedBackIcon from '$lib/assets/feedback_icon_320.svg';
	import exitIcon from '$lib/assets/exit_icon_320.svg';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { getUserState } from '$lib';

	const userState = getUserState();

	let logoutLoader = false;

	const logoutActionNews: SubmitFunction = () => {
		logoutLoader = true;
		return async ({ result, update }) => {
			const { status } = result;

			switch (status) {
				case 200:
					toast.success('Log out', {
						description: `Thank you for using our system come back again! ${$userState?.user_metadata.firstname}.`
					});
					logoutLoader = false;
					goto('/');
					break;

				case 401:
					logoutLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<form
	method="post"
	action="/?/logoutAction"
	enctype="multipart/form-data"
	use:enhance={logoutActionNews}
	class="w-full bg-main rounded-[10px] p-[14px]"
>
	<div class="flex flex-col gap-[10px]">
		<button type="button" class="flex items-center text-white text-[14px] justify-between w-full">
			<img src={bellIcon} alt="bell-icon" class="" />
			<p>Notifications</p>
		</button>

		<button type="button" class="flex items-center text-white text-[14px] justify-between w-full">
			<img src={feedBackIcon} alt="feedback-icon" class="" />
			<p>Give Feedback</p>
		</button>

		<hr class="border-[1px] border-submain" />

		<button
			disabled={logoutLoader}
			type="submit"
			class="flex items-center text-white text-[14px] justify-between w-full"
		>
			<img src={exitIcon} alt="exit-icon" class="" />
			{#if logoutLoader}
				Logging out...
			{:else}
				Log out
			{/if}
		</button>
	</div>
</form>
