<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { getAuthState } from '$lib';
	import type { CreatedProjectReference } from '$lib/types';

	export let projectObj: CreatedProjectReference;
	export let showPrivateJoin = false;

	const authState = getAuthState();
</script>

{#if showPrivateJoin}
	<div
		class="fixed left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<div class="bg-submain py-[50px] px-[22px] w-full" in:scale out:fade>
			<h3 class="text-[16px] text-main font-semibold">
				Ask the host for the code, then enter it here
			</h3>

			<div class="mt-[20px]">
				<label>
					<span class="text-main text-[14px] transition-all">Passcode</span>
					<input
						type="password"
						class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
					/>
				</label>
			</div>

			<div class="mt-[30px] flex flex-col gap-[10px]">
				<button
					on:click={() => ($authState.projects.joinedProject = true)}
					class="bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
				>
					Join
				</button>

				<button
					on:click={() => (showPrivateJoin = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</div>
	</div>
{/if}
