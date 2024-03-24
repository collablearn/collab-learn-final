<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import SvelteOtp from '@k4ung/svelte-otp';
	import { getStaticState } from '$lib';

	const childStaticState = getStaticState();

	const veryfyContinueHandler = () => {
		$childStaticState.isVerfying = false;
		$childStaticState.isUpdating = true;
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
			<p class="text-[20px] font-semibold text-white">Verify Your Account</p>
			<p class="text-[14px] text-white">
				Please enter the code we have sent to your email account.
			</p>

			<div class="flex gap-[23px] justify-center">
				<SvelteOtp numberOnly inputClass="outline-none text-main" />
			</div>
		</div>

		<div class="mt-[40px]">
			<button
				on:click={veryfyContinueHandler}
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
