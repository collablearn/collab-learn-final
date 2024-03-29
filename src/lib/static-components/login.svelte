<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';

	const childStaticState = getStaticState();

	interface LoginVal {
		email: string[];
		password: string[];
	}

	interface LoginAction {
		msg: string;
		errors: LoginVal;
	}

	let formActionError: LoginVal | null = null;
	let loginLoader = false;

	const loginActionNews: SubmitFunction = () => {
		loginLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<LoginAction>;

			switch (status) {
				case 200:
					formActionError = null;
					toast.success('Log in', { description: msg });
					loginLoader = false;
					break;

				case 400:
					formActionError = errors;
					loginLoader = false;
					break;

				case 401:
					formActionError = null;
					toast.error('Log in', { description: msg });
					loginLoader = false;
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
	action="?/loginAction"
	enctype="multipart/form-data"
	use:enhance={loginActionNews}
	class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[73px] flex flex-col gap-[20px]">
			<input
				type="email"
				placeholder="Enter your email"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>

			<input
				type="password"
				placeholder="Enter your password"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
		</div>

		<div class="mt-[40px]">
			<button
				type="submit"
				class="bg-submain w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				<Loader name="LOG IN" />
			</button>

			<div class="mt-[40px] flex justify-center">
				<button
					type="button"
					class="text-[14px] text-submain underline"
					on:click={() => ($childStaticState.isResetting = true)}>Forgot Password?</button
				>
			</div>

			<div class="mt-[40px] flex justify-center">
				<button
					type="button"
					class="text-[14px] text-submain underline"
					on:click={() => ($childStaticState.isRegistering = true)}>Create Account</button
				>
			</div>
		</div>
	</div>
</form>
