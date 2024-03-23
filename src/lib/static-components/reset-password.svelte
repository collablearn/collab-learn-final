<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState } from '$lib';

	const childStaticState = getStaticState();

	const continueHandler = () => {
		$childStaticState.isVerfying = true;
		$childStaticState.isUpdating = false;
	};

	const cleanUpHandler = () => {
		$childStaticState.isVerfying = false;
		$childStaticState.isUpdating = false;
		$childStaticState.isResetting = false;
	};
</script>

<div class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center">
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
				type="email"
				placeholder="Enter your email"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
		</div>
		<p class="text-[12px] text-slate-500 mt-[10px]">
			You may receive email notifications from us for security and login purposes.
		</p>

		<div class="mt-[40px]">
			<button
				on:click={continueHandler}
				class="bg-submain w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				<Loader name="CONTINUE" />
			</button>

			<div class="mt-[40px] flex flex-wrap justify-center gap-[5px]">
				<p class="text-[14px] text-white">Already have your account?</p>
				<button class="text-[14px] underline text-submain" on:click={cleanUpHandler}
					>Log in here</button
				>
			</div>
		</div>
	</div>
</div>
