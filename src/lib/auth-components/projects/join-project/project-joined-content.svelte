<script lang="ts">
	import projectsBackIcon from '$lib/assets/projects_back_icon_320.svg';
	import projectAttachIcon from '$lib/assets/project_attach_icon_320.svg';
	import projectShareScreenIcon from '$lib/assets/project_sharescreen_icon_320.svg';
	import projectSettingsIcon from '$lib/assets/projects_settings_icon_320.svg';
	import editTool1 from '$lib/assets/project_edit1_icon_320.svg';
	import editTool2 from '$lib/assets/project_edit2_icon_320.svg';
	import editTool3 from '$lib/assets/project_edit3_icon_320.svg';
	import editTool4 from '$lib/assets/project_edit4_icon_320.svg';
	import footerIcon1 from '$lib/assets/joined_project_footer1_320.svg';
	import footerIcon2 from '$lib/assets/joined_project_footer2_320.svg';
	import footerIcon3 from '$lib/assets/joined_project_footer3_320.svg';
	import footerIcon4 from '$lib/assets/joined_project_footer4_320.svg';

	import { getAuthState } from '$lib';
	import { fade } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import type { ResultModel } from '$lib/types';

	const authState = getAuthState();

	let deleteProjLoader = false;
	const deleteProjectActionNews: SubmitFunction = () => {
		deleteProjLoader = true;
		return async ({ result, update }) => {
			const {
				status,
				data: { msg }
			} = result as ResultModel<{ msg: string }>;

			switch (status) {
				case 200:
					toast.success('Delete Project', { description: msg });
					deleteProjLoader = false;
					break;

				case 401:
					toast.error('Delete Project', { description: msg });
					deleteProjLoader = false;
					break;
			}
			await update();
		};
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="">
	<!--Header-->
	<div class="bg-main p-[20px] flex items-center justify-between">
		<div class="">
			<button on:click={() => ($authState.projects.joinedProject = false)}>
				<img src={projectsBackIcon} alt="project-back-icon" />
			</button>
		</div>

		<div class="flex items-center gap-[20px]">
			<div class="">
				<label for="file-upload">
					<img
						src={projectAttachIcon}
						alt="project-attach-icon"
						class="transition-all active:scale-105"
					/>
				</label>
				<input id="file-upload" type="file" />
			</div>

			<div class="flex flex-row-reverse">
				<button
					class="transition-all active:scale-105"
					on:click={() => ($authState.projects.showEditTools = true)}
				>
					<img src={projectShareScreenIcon} alt="shareScreenTools" />
				</button>

				<!-- Simple Overlay for edit tools-->
				{#if $authState.projects.showEditTools}
					<div
						class="fixed left-0 right-0 top-0 bottom-0"
						on:click={() => ($authState.projects.showEditTools = false)}
					></div>

					<div
						in:fade
						class="absolute mt-[50px] bg-main flex items-center p-[20px] gap-[22px] rounded-[10px] text-white text-[14px]"
					>
						<div class="w-full flex items-center">
							<button><img src={editTool1} alt="edit-1-icon" />Paint</button>
						</div>

						<div class="w-full flex items-center">
							<button><img src={editTool2} alt="edit-2-icon" />Erase</button>
						</div>

						<div class="w-full flex items-center">
							<button><img src={editTool3} alt="edit-3-icon" />Text</button>
						</div>

						<div class="w-full flex items-center">
							<button><img src={editTool4} alt="edit-4-icon" />Rectangle</button>
						</div>
					</div>
				{/if}
			</div>

			<div class="flex flex-row-reverse">
				<button on:click={() => ($authState.projects.showSettings = true)}>
					<img src={projectSettingsIcon} alt="project-settings-icon" />
				</button>
				{#if $authState.projects.showSettings}
					<div
						class="fixed left-0 right-0 top-0 bottom-0"
						on:click={() => ($authState.projects.showSettings = false)}
					></div>

					<div
						in:fade
						class="absolute mt-[50px] bg-main flex items-center p-[20px] gap-[22px] rounded-[10px] text-white text-[14px]"
					>
						<form
							method="post"
							action="/APIS?/deleteProjectAction"
							enctype="multipart/form-data"
							use:enhance={deleteProjectActionNews}
						>
							<button class="truncate bg-submain text-main p-[10px] rounded-[10px]"
								>Delete This Project</button
							>
						</form>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!--Camera Body-->
	<div class=""></div>

	<!--Footer-->
	<div class="bg-submain min-h-[30%] fixed bottom-0 w-full py-[20px]">
		<div class="bg-main flex items-center justify-center gap-[10px] py-[10px] px-[15px]">
			{#each Array(3) as userScreen}
				<div class="w-[30%] bg-subwhite rounded-[10px] p-[10px] h-[70px] relative">
					<div class="absolute bottom-0 left-0 right-0 px-[15px]">
						<p class="truncate text-[14px] text-main">Peter name</p>
					</div>
				</div>
			{/each}

			<div class="text-[14px] text-white">
				<p>+10</p>
			</div>
		</div>

		<div class="flex justify-center">
			<div class="mt-[16px] flex items-center gap-[25px]">
				<button>
					<img src={footerIcon1} alt="footer-icon-1" />
				</button>

				<button>
					<img src={footerIcon2} alt="footer-icon-2" />
				</button>
				<button>
					<img src={footerIcon3} alt="footer-icon-3" />
				</button>
				<button>
					<img src={footerIcon4} alt="footer-icon-4" />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	input[type='file'] {
		display: none;
	}
</style>
