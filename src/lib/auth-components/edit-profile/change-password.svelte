<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';

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
					formActionError = null;
					changePasswordLoader = false;
					break;

				case 400:
					formActionError = errors;
					changePasswordLoader = false;
					break;

				case 401:
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
	<label>
		<span class="text-main text-[14px] transition-all">New Password</span>
		<input
			name="newPassword"
			type="password"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Confirm New Password</span>
		<input
			name="confirmNewPassword"
			type="password"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
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
