<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';

	const updatePasswordActionNews: SubmitFunction = () => {
		return async ({ result, update }) => {
			const { status } = result;

			switch (status) {
				case 200:
					break;

				case 400:
					break;

				case 401:
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

<form class="flex flex-col gap-[10px]">
	<label>
		<span class="text-main text-[14px] transition-all">New Password</span>
		<input
			type="password"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>

	<label>
		<span class="text-main text-[14px] transition-all">Confirm New Password</span>
		<input
			type="password"
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>
	<button
		class="py-[11px] font-semibold text-[14px] flex items-center justify-center bg-main rounded-[10px] text-white"
		>Update Password
	</button>
</form>
