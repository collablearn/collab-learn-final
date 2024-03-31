<script lang="ts">
	import { enhance } from '$app/forms';
	import { samplePasswords } from '$lib';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { passwordStrength } from 'check-password-strength';
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

	let changePasswordLoader = false;
	let formActionError: ChangePasswordVal | null = null;

	const updatePasswordActionNews: SubmitFunction = () => {
		changePasswordLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<UpdatePasswordAction>;

			switch (status) {
				case 200:
					toast.success('Change Password', { description: msg });
					formActionError = null;
					changePasswordLoader = false;
					break;

				case 400:
					formActionError = errors;
					changePasswordLoader = false;
					break;

				case 401:
					toast.error('Change Password', { description: msg });
					formActionError = null;
					changePasswordLoader = false;
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
	action="/?/updatePasswordAction"
	enctype="multipart/form-data"
	use:enhance={updatePasswordActionNews}
	class="flex flex-col gap-[10px]"
>
	{#if showPasswordGuide}
		<div
			class="bg-main p-[10px] rounded-[10px] flex flex-col gap-[10px] transition-all"
			transition:fade
		>
			<p class="text-submain text-[14px]">
				Create a complex password with a mix of uppercase and lowercase letters, numbers, and
				symbols.
			</p>

			<div class="max-w-fit">
				<p class="text-submain text-[14px]">Sample:</p>

				<p class="  text-submain text-[14px] rounded-[10px]">
					{samplePasswords[Math.floor(Math.random() * 20)]}
				</p>
			</div>
		</div>
	{/if}

	<input autocomplete="off" name="passwordStrength" type="hidden" value={passwordCheck} />

	<label>
		<span class="text-main text-[14px] transition-all">New Password</span>
		<input
			autocomplete="off"
			on:keyup={checkPasswordEngine}
			bind:value={password}
			name="newPassword"
			type="password"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#if password}
			<p class="text-main text-[14px]" in:fade>{passwordCheck}</p>
		{:else}
			{#each formActionError?.newPassword ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		{/if}
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Confirm New Password</span>
		<input
			autocomplete="off"
			name="confirmNewPassword"
			type="password"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
		{#each formActionError?.confirmNewPassword ?? [] as errMsg}
			<p class="text-main text-[14px]" in:fade>{errMsg}</p>
		{/each}
	</label>
	<button
		disabled={changePasswordLoader}
		class="{changePasswordLoader ? 'bg-main/50 cursor-not-allowed' : 'bg-main'}
		transition-all active:bg-main/50 py-[11px] font-semibold text-[14px] flex items-center justify-center rounded-[10px] text-white"
		>{#if changePasswordLoader}
			Updating...
		{:else}
			Update Password
		{/if}
	</button>
</form>
