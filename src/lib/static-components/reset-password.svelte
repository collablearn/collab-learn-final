<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import { getStaticState } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';
	import { fade, fly } from 'svelte/transition';

	const staticState = getStaticState();

	const cleanUpHandler = () => {
		$staticState.isVerfying = false;
		$staticState.isUpdating = false;
		$staticState.isResetting = false;
	};

	interface ResetPasswordVal {
		email: string[];
	}

	let resetPasswordLoader = false;
	let formActionError: ResetPasswordVal | null = null;

	const resetPasswordActionNews: SubmitFunction = () => {
		resetPasswordLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors, email }
			} = result as ResultModel<{ msg: string; errors: ResetPasswordVal; email: string }>;

			switch (status) {
				case 200:
					$staticState.email = email;
					formActionError = null;
					toast.success('Password Recovery', { description: msg });
					resetPasswordLoader = false;
					$staticState.isVerfying = true;
					break;

				case 400:
					formActionError = errors;
					resetPasswordLoader = false;
					break;

				case 401:
					formActionError = null;
					toast.error('Password Recovery', { description: msg });
					resetPasswordLoader = false;
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
	action="?/resetPasswordAction"
	enctype="multipart/form-data"
	use:enhance={resetPasswordActionNews}
	class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[73px] flex flex-col gap-[20px]">
			<p class="text-[20px] font-semibold text-white">Find your Account</p>
			<p class="text-[14px] text-white">
				Enter the email address associated with your account and we’ll send you a link to reset your
				password.
			</p>

			<input
				autocomplete="off"
				name="email"
				type="email"
				placeholder="Enter your email"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#each formActionError?.email ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</div>
		<p class="text-[12px] text-slate-500 mt-[10px]">
			You may receive email notifications from us for security and login purposes.
		</p>

		<div class="mt-[40px]">
			<button
				disabled={resetPasswordLoader}
				type="submit"
				class="{resetPasswordLoader ? 'cursor-not-allowed bg-submain/50' : 'bg-submain'}
				active:bg-submain/50 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				{#if resetPasswordLoader}
					Sending...
				{:else}
					Continue
				{/if}
			</button>

			<div class="mt-[40px] flex flex-wrap justify-center gap-[5px]">
				<p class="text-[14px] text-white">Already have your account?</p>
				<button type="button" class="text-[14px] underline text-submain" on:click={cleanUpHandler}
					>Log in here</button
				>
			</div>
		</div>
	</div>
</form>
