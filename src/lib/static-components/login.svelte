<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import { getStaticState } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { toast } from 'svelte-sonner';
	import { fade, fly } from 'svelte/transition';
	import { goto, invalidateAll } from '$app/navigation';

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
					window.location.reload();
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

	let showPass = false;
	let password = '';
</script>

<form
	method="post"
	action="?/loginAction"
	enctype="multipart/form-data"
	use:enhance={loginActionNews}
	class=" min-h-screen px-[35px] flex flex-col justify-center items-center overflow-hidden"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[73px] flex flex-col gap-[20px]">
			<input
				in:fly={{ x: 50, duration: 450 }}
				autocomplete="off"
				name="email"
				type="email"
				placeholder="Enter your email"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#each formActionError?.email ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}

			<div class="flex items-center relative">
				{#if showPass}
					<input
						in:fly={{ x: -50, duration: 450 }}
						autocomplete="off"
						name="password"
						type="text"
						bind:value={password}
						placeholder="Enter your password"
						class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
					/>
				{:else}
					<input
						in:fly={{ x: -50, duration: 450 }}
						autocomplete="off"
						name="password"
						type="password"
						bind:value={password}
						placeholder="Enter your password"
						class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
					/>
				{/if}
				<button
					type="button"
					on:click={() => (showPass = !showPass)}
					class="absolute text-[10px] font-semibold bg-submain text-main px-[10px] right-0 {password.length
						? ''
						: 'hidden'}"
				>
					{showPass ? 'Hide' : 'Show'}
				</button>
			</div>

			{#each formActionError?.password ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</div>

		<div class="mt-[40px]">
			<button
				in:fly={{ y: 50, duration: 450 }}
				disabled={loginLoader}
				type="submit"
				class="{loginLoader
					? 'cursor-not-allowed bg-submain/50'
					: 'bg-submain'}  w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				{#if loginLoader}
					Logging in...
				{:else}
					Log in
				{/if}
			</button>

			<div class="mt-[40px] flex justify-center">
				<button
					type="button"
					class="text-[14px] text-submain underline transition-all active:scale-105"
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
