<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState, samplePasswords } from '$lib';
	import { enhance } from '$app/forms';
	import { passwordStrength } from 'check-password-strength';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	let password = '';
	let showPasswordGuide = false;
	$: passwordCheck = passwordStrength(password).value;

	const checkPasswordEngine = () =>
		passwordCheck === 'Strong' ? (showPasswordGuide = false) : (showPasswordGuide = true);

	interface ChangePasswordVal {
		newPassword: string[];
		confirmNewPassword: string[];
	}

	interface UpdatePasswordAction {
		msg: string;
		errors: ChangePasswordVal;
	}

	let updatePasswordLoader = false;
	let formActionError: ChangePasswordVal | null = null;

	const updatePasswordActionNews: SubmitFunction = () => {
		updatePasswordLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<UpdatePasswordAction>;

			switch (status) {
				case 200:
					toast.success('Update Password', { description: msg });
					formActionError = null;
					updatePasswordLoader = false;
					break;

				case 400:
					formActionError = errors;
					updatePasswordLoader = false;
					break;

				case 401:
					toast.error('Update Password', { description: msg });
					formActionError = null;
					updatePasswordLoader = false;
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
	action="?/updatePasswordAction"
	enctype="multipart/form-data"
	use:enhance={updatePasswordActionNews}
	class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[73px] flex flex-col gap-[20px]">
			<p class="text-[20px] font-semibold text-white">Update Password</p>

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

			<input autocomplete="off" name="passwordStrength" type="hidden" value={passwordCheck} />
			<div class="flex flex-col gap-[20px] justify-center">
				<input
					on:keyup={checkPasswordEngine}
					name="newPassword"
					type="password"
					placeholder="New Password"
					class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
				/>
				{#if password}
					<p class="text-main text-[14px]" in:fade>{passwordCheck}</p>
				{:else}
					{#each formActionError?.newPassword ?? [] as errMsg}
						<p class="text-main text-[14px]" in:fade>{errMsg}</p>
					{/each}
				{/if}

				<input
					name="confirmNewPassword"
					type="password"
					placeholder="Confirm New Password"
					class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
				/>
				{#each formActionError?.confirmNewPassword ?? [] as errMsg}
					<p class="text-main text-[14px]" in:fade>{errMsg}</p>
				{/each}
			</div>
		</div>
		<p class="text-[12px] text-slate-500 mt-[10px]">
			You might receive email notifications from us for security and login purposes.
		</p>

		<div class="mt-[40px]">
			<button
				class="active:bg-submain/50 bg-submain w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				Update Password
			</button>
		</div>
	</div>
</form>
