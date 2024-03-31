<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import { getStaticState, samplePasswords } from '$lib';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ResultModel } from '$lib/types';
	import { passwordStrength } from 'check-password-strength';
	import { fade, scale } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import { goto, invalidateAll } from '$app/navigation';

	const childStaticState = getStaticState();

	let password = '';
	let showPasswordGuide = false;
	$: passwordCheck = passwordStrength(password).value;

	const checkPasswordEngine = () =>
		passwordCheck === 'Strong' ? (showPasswordGuide = false) : (showPasswordGuide = true);

	interface RegisterVal {
		firstName: string[];
		lastName: string[];
		email: string[];
		password: string[];
		confirmPassword: string[];
	}

	interface RegisterAction {
		msg: string;
		errors: RegisterVal;
	}

	let formActionError: RegisterVal | null = null;
	let registerLoader = false;

	const registerActionNews: SubmitFunction = () => {
		registerLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<RegisterAction>;

			switch (status) {
				case 200:
					invalidateAll();
					formActionError = null;
					passwordCheck = '';
					toast.success('Register', { description: msg });
					registerLoader = false;
					goto('/dashboard');
					break;

				case 400:
					formActionError = errors;
					registerLoader = false;
					break;

				case 401:
					formActionError = null;
					toast.error('Register', { description: msg });
					registerLoader = false;
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
	action="?/registerAction"
	enctype="multipart/form-data"
	use:enhance={registerActionNews}
	class="bg-main min-h-screen px-[35px] py-[35px] flex flex-col justify-center items-center"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[20px] flex flex-col gap-[20px]">
			<input autocomplete="off" name="passwordStrength" type="hidden" value={passwordCheck} />
			<input
				autocomplete="off"
				name="firstName"
				type="text"
				placeholder="First Name"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#each formActionError?.firstName ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}

			<input
				autocomplete="off"
				name="lastName"
				type="text"
				placeholder="Last Name"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#each formActionError?.lastName ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}

			<input
				autocomplete="off"
				name="email"
				type="email"
				placeholder="Email Address"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#each formActionError?.email ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}

			{#if showPasswordGuide}
				<div
					class="bg-submain p-[10px] rounded-[10px] flex flex-col gap-[10px] transition-all"
					transition:fade
				>
					<p class="text-main text-[14px]">
						Create a complex password with a mix of uppercase and lowercase letters, numbers, and
						symbols.
					</p>

					<div class="max-w-fit">
						<p class="text-main text-[14px]">Sample:</p>

						<p class="  text-main text-[14px] rounded-[10px]">
							{samplePasswords[Math.floor(Math.random() * 20)]}
						</p>
					</div>
				</div>
			{/if}

			<input
				autocomplete="off"
				on:keyup={checkPasswordEngine}
				bind:value={password}
				name="password"
				type="password"
				placeholder="Password"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#if password}
				<p class="text-submain text-[14px]" in:fade>{passwordCheck}</p>
			{:else}
				{#each formActionError?.password ?? [] as errMsg}
					<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
				{/each}
			{/if}

			<input
				autocomplete="off"
				name="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
			{#each formActionError?.confirmPassword ?? [] as errMsg}
				<p class="text-submain text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</div>

		<div class="mt-[40px]">
			<button
				disabled={registerLoader}
				type="submit"
				class="{registerLoader
					? 'cursor-not-allowed bg-submain/50'
					: 'bg-submain'}  w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				{#if registerLoader}
					Registering...
				{:else}
					Register
				{/if}
			</button>

			<div class="mt-[40px]">
				<p class="text-white text-[14px] text-center">Already have an account?</p>
				<div class=" flex justify-center mt-[20px]">
					<button
						type="button"
						class="text-[14px] text-submain underline"
						on:click={() => ($childStaticState.isRegistering = false)}>Log in here</button
					>
				</div>
			</div>
		</div>
	</div>
</form>
