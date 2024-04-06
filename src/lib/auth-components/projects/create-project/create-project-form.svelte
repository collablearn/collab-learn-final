<script lang="ts">
	import { enhance } from '$app/forms';
	import { getUserState } from '$lib';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	const userState = getUserState();

	interface CreateProjectVal {
		projectName: string[];
		maxUsers: string[];
		description: string[];
		passcode: string[];
	}

	interface CreateProjectAction {
		msg: string;
		errors: CreateProjectVal;
	}

	const visibilitySelection = ['Public', 'Private'];

	let visibilityValue = 'Public';
	let createProjectLoader = false;
	let formActionError: CreateProjectVal | null = null;

	$: visibilityValue != 'Public' ? (formActionError = null) : (formActionError = null);

	const createProjectActionNews: SubmitFunction = () => {
		createProjectLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<CreateProjectAction>;

			switch (status) {
				case 200:
					formActionError = null;
					toast.success('Create Project', { description: msg });
					createProjectLoader = false;
					break;

				case 400:
					formActionError = errors;
					createProjectLoader = false;
					break;

				case 401:
					formActionError = null;
					toast.error('Create Project', { description: msg });
					createProjectLoader = false;
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
	action="/APIS?/createProjectAction"
	enctype="multipart/form-data"
	use:enhance={createProjectActionNews}
>
	<input
		autocomplete="off"
		name="hostPhoto"
		type="hidden"
		class="hidden"
		value={$userState?.user_photo_link}
	/>

	<input
		autocomplete="off"
		name="hostName"
		type="hidden"
		class="hidden"
		value={$userState?.user_fullname}
	/>

	<div class="flex flex-col gap-[10px]">
		<label>
			<span class="text-main text-[14px] transition-all">Project Name</span>
			<input
				autocomplete="off"
				name="projectName"
				type="text"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.projectName ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>

		<label>
			<span class="text-main text-[14px] transition-all">Users (Max. 50)</span>
			<input
				autocomplete="off"
				name="maxUsers"
				type="number"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.maxUsers ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>

		<label>
			<span class="text-main text-[14px] transition-all">Description</span>
			<textarea
				autocomplete="off"
				name="description"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.description ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>
	</div>

	<div class="mt-[35px]">
		<h3 class="text-[16px] text-main font-semibold">Project Visibility</h3>
		<div class="flex items-center gap-[10px] mt-[10px]">
			{#each visibilitySelection as selection}
				<div class="flex items-center gap-[5px]">
					<input
						autocomplete="off"
						name="visibility"
						type="radio"
						class=""
						value={selection}
						bind:group={visibilityValue}
					/>
					<p class="text-[14px] text-main">{selection}</p>
				</div>
			{/each}
		</div>

		{#if visibilityValue === 'Private'}
			<div class="mt-[10px]" in:fade>
				<label>
					<span class="text-main text-[14px] transition-all">Passcode</span>
					<input
						autocomplete="off"
						name="passcode"
						type="password"
						class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
					/>
					{#each formActionError?.passcode ?? [] as errMsg}
						<p class="text-main text-[14px]" in:fade>{errMsg}</p>
					{/each}
				</label>
			</div>
		{/if}
	</div>

	<div class="flex flex-col gap-[10px] mt-[40px]">
		<button
			disabled={createProjectLoader}
			type="submit"
			class="{createProjectLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
			 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
		>
			{#if createProjectLoader}
				Creating...
			{:else}
				Create
			{/if}
		</button>

		<a
			href="/projects"
			class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
		>
			Back
		</a>
	</div>
</form>
