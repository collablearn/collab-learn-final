<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState } from '$lib';

	const childStaticState = getStaticState();
</script>

<div class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center">
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
				class="bg-submain w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-main"
			>
				<Loader name="LOG IN" />
			</button>

			<div class="mt-[40px] flex justify-center">
				<button
					class="text-[14px] text-submain underline"
					on:click={() => ($childStaticState.isResetting = true)}>Forgot Password?</button
				>
			</div>

			<div class="mt-[40px] flex justify-center">
				<button
					class="text-[14px] text-submain underline"
					on:click={() => ($childStaticState.isRegistering = true)}>Create Account</button
				>
			</div>
		</div>
	</div>
</div>
