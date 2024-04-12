<script lang="ts">
	import type { CreatedProjectReference, ResultModel } from '$lib/types';
	import { fade, scale } from 'svelte/transition';
	import { getAuthState, getUserState } from '$lib';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let projectObj: CreatedProjectReference;
	export let showPublicJoin = false;

	const authState = getAuthState();
	const userState = getUserState();

	const userAndProjectObj = {
		user_id: $userState?.user_id,
		user_photo_link: $userState?.user_photo_link,
		user_fullname: $userState?.user_fullname,
		project_id: projectObj.id,
		project_name: projectObj.project_name,
		project_host_name: projectObj.host_name,
		project_image_url: projectObj.image_url
	};

	let publicJoinLoader = false;
	const publicJoinProjAction: SubmitFunction = () => {
		publicJoinLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					invalidateAll();
					toast.success('Join Project', { description: msg });
					$authState.projects.projectObj = projectObj;
					//faker hhaha
					$authState.projects.projectObj.joined_count++;
					publicJoinLoader = false;
					$authState.projects.joinedProject = true;
					break;

				case 401:
					toast.error('Join Project', { description: msg });
					publicJoinLoader = false;
					break;

				default:
					break;
			}
			await update();
		};
	};
</script>

{#if showPublicJoin}
	<form
		method="post"
		action="/APIS?/publicJoinProjAction"
		enctype="multipart/form-data"
		use:enhance={publicJoinProjAction}
		class="absolute px-[10px] left-0 right-0 bottom-0 top-0 bg-[#00000050] z-10 flex items-center justify-center"
	>
		<input
			autocomplete="off"
			name="userAndProjectObj"
			type="hidden"
			class="hidden"
			value={JSON.stringify(userAndProjectObj)}
		/>
		<div
			class="bg-submain py-[50px] px-[22px] w-full md:w-[600px] rounded-[10px]"
			in:scale
			out:fade
		>
			<div class="flex flex-col gap-[30px]">
				<div class="">
					<h3 class="text-[16px] text-main font-semibold">Project Name</h3>
					<p class="text-[14px] text-main">{projectObj.project_name}</p>
				</div>

				<div class="">
					<h3 class="text-[16px] text-main font-semibold">Host Name:</h3>
					<p class="text-[14px] text-main">{projectObj.host_name}</p>
				</div>

				<div class="">
					<h3 class="text-[16px] text-main font-semibold">Status:</h3>
					<p class="text-[14px] text-main">In-meeting</p>
				</div>
			</div>

			<div class="mt-[30px] flex flex-col gap-[10px]">
				<button
					disabled={publicJoinLoader}
					class="{publicJoinLoader ? 'cursor-not-allowed bg-main/50' : 'bg-main'}
					transition-all active:bg-main/50 w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
				>
					{#if publicJoinLoader}
						Joining...
					{:else}
						Join
					{/if}
				</button>

				<button
					on:click={() => (showPublicJoin = false)}
					class="bg-submain text-main w-full rounded-[10px] text-[14px] font-semibold py-[8px] px-[2px] flex items-center justify-center border-[1px] border-main"
				>
					Back
				</button>
			</div>
		</div>
	</form>
{/if}
