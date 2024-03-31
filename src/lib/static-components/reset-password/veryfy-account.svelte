<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState } from '$lib';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { Result } from 'postcss';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	const staticState = getStaticState();

	const cleanUpHandler = () => {
		$staticState.isVerfying = false;
		$staticState.isUpdating = false;
		$staticState.isResetting = false;
	};

	interface VerifyCodeVal {
		verifyCode: string[];
	}

	let verifyCodeLoader = false;
	let formActionError: VerifyCodeVal | null = null;

	const verifyCodeActionNews: SubmitFunction = () => {
		verifyCodeLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<{ msg: string; errors: VerifyCodeVal }>;

			switch (status) {
				case 200:
					toast.success('Verify Code', { description: msg });
					verifyCodeLoader = false;
					$staticState.isVerfying = false;
					$staticState.isUpdating = true;
					break;

				case 400:
					formActionError = errors;
					verifyCodeLoader = false;
					break;

				case 401:
					toast.error('Verify Code', { description: msg });
					verifyCodeLoader = false;
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
	action="?/verifyCodeAction"
	enctype="multipart/form-data"
	use:enhance={verifyCodeActionNews}
	class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[73px] flex flex-col gap-[20px]">
			<p class="text-[20px] font-semibold text-white">Verify Your Account</p>
			<p class="text-[14px] text-white">
				Please enter the code we have sent to your email account.
			</p>

			<div class="flex gap-[23px] justify-center">
				<input name="email" type="hidden" class="hidden" value={$staticState.email} />
				<input
					disabled={verifyCodeLoader}
					autocomplete="off"
					name="verifyCode"
					type="text"
					placeholder="Enter code"
					class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
				/>
				{#each formActionError?.verifyCode ?? [] as errMsg}
					<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
				{/each}
			</div>
		</div>

		<div class="mt-[40px]">
			<button
				type="submit"
				disabled={verifyCodeLoader}
				class="{verifyCodeLoader ? 'cursor-not-allowed bg-submain/50' : 'bg-submain'}
				active:bg-submain/50 transition-all w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				{#if verifyCodeLoader}
					Checking...
				{:else}
					Check Code
				{/if}
			</button>

			<div class="mt-[40px] flex flex-wrap justify-center gap-[5px]">
				<p class="text-[14px] text-white">Already have your account?</p>
				<button class="text-[14px] underline text-submain" on:click={cleanUpHandler}
					>Log in here</button
				>
			</div>
		</div>
	</div>
</form>
