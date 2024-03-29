<script lang="ts">
	import icon_320 from '$lib/assets/icon_320.svg';
	import Loader from '$lib/general-components/loader.svelte';
	import { getStaticState } from '$lib';
	import { enhance } from '$app/forms';

	const childStaticState = getStaticState();
</script>

<form
	method="post"
	action="?/registerAction"
	enctype="multipart/form-data"
	use:enhance
	class="bg-main min-h-screen px-[35px] flex flex-col justify-center items-center"
>
	<div class="w-[100%]">
		<div class="flex justify-center items-center">
			<img src={icon_320} alt="icon-320" />
		</div>

		<div class="mt-[20px] flex flex-col gap-[20px]">
			<input
				name="firstName"
				type="text"
				placeholder="First Name"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>

			<input
				name="lastName"
				type="text"
				placeholder="Last Name"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>

			<input
				name="email"
				type="email"
				placeholder="Email Address"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>

			<input
				name="password"
				type="password"
				placeholder="Password"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>

			<input
				name="confirmPassword"
				type="password"
				placeholder="Confirm Password"
				class="text-[14px] py-[10px] outline-none bg-main border-b-[1px] text-white w-full"
			/>
		</div>

		<div class="mt-[40px]">
			<button
				type="submit"
				class="bg-submain w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center"
			>
				Sign Up
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
