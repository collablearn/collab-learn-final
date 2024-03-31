<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState } from '$lib';
	import { enhance } from '$app/forms';
	import { passwordStrength } from 'check-password-strength';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';

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

			<div class="flex flex-col gap-[20px] justify-center">
				<input
					name="newPassword"
					type="password"
					placeholder="New Password"
					class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
				/>

				<input
					name="confirmNewPassword"
					type="password"
					placeholder="Confirm New Password"
					class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
				/>
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
