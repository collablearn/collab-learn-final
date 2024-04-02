<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import Loader from '$lib/general-components/loader.svelte';
	import type { ResultModel } from '$lib/types';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	const visibilitySelection = ['Public', 'Private'];

	interface CreateGuild {
		guildName: string[];
		maxUsers: string[];
		description: string[];
		passcode: string[];
	}

	interface CreateGuildAction {
		msg: string;
		errors: CreateGuild;
	}

	let visibilityValue = 'Public';
	let formActionError: CreateGuild | null = null;
	let createGuildLoader = false;

	$: visibilityValue != 'Public' ? (formActionError = null) : (formActionError = null);

	const createGuildActionNews: SubmitFunction = () => {
		createGuildLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg, errors }
			} = result as ResultModel<CreateGuildAction>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Create Guild', { description: msg });
					formActionError = null;
					createGuildLoader = false;
					goto('/guilds');
					break;

				case 400:
					formActionError = errors;
					createGuildLoader = false;
					break;

				case 401:
					toast.error('Create Guild', { description: msg });
					formActionError = null;
					createGuildLoader = false;
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
	action="/?/createGuildAction"
	enctype="multipart/form-data"
	use:enhance={createGuildActionNews}
	class=""
>
	<div class="flex flex-col gap-[10px]">
		<label>
			<span class="text-main text-[14px] transition-all">Guild Name</span>
			<input
				name="guildName"
				type="text"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.guildName ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>

		<label>
			<span class="text-main text-[14px] transition-all">Users (Max. 50)</span>
			<input
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
				name="description"
				class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
			/>
			{#each formActionError?.description ?? [] as errMsg}
				<p class="text-main text-[14px]" in:fade>{errMsg}</p>
			{/each}
		</label>
	</div>

	<div class="mt-[35px]">
		<h3 class="text-[16px] text-main font-semibold">Guild Visibility</h3>
		<div class="flex items-center gap-[10px] mt-[10px]">
			{#each visibilitySelection as selection}
				<div class="flex items-center gap-[5px]">
					<input
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
			disabled={createGuildLoader}
			class="{createGuildLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
			w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
		>
			{#if createGuildLoader}
				Creating...
			{:else}
				Create
			{/if}
		</button>

		<a
			href="/guilds"
			class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center border-[1px] border-main"
		>
			Back
		</a>
	</div>
</form>
