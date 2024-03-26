<script lang="ts">
	import projectsBackIcon from '$lib/assets/projects_back_icon_320.svg';
	import projectAttachIcon from '$lib/assets/project_attach_icon_320.svg';
	import projectShareScreenIcon from '$lib/assets/project_sharescreen_icon_320.svg';
	import projectSettingsIcon from '$lib/assets/projects_settings_icon_320.svg';
	import editTool1 from '$lib/assets/project_edit1_icon_320.svg';
	import editTool2 from '$lib/assets/project_edit2_icon_320.svg';
	import editTool3 from '$lib/assets/project_edit3_icon_320.svg';
	import editTool4 from '$lib/assets/project_edit4_icon_320.svg';

	import { getAuthState } from '$lib';

	const authState = getAuthState();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="">
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
				<button>
					<img src={projectShareScreenIcon} alt="project-sharescreen-icon" />
				</button>

				<!-- Simple Overlay for edit tools-->

				<div
					class="fixed left-0 right-0 top-0 bottom-0 bg-black"
					on:click={() => ($authState.projects.showEditTools = false)}
				></div>

				<div
					class="absolute mt-[50px] bg-main flex items-center p-[20px] gap-[22px] rounded-[10px]"
				>
					<div class="w-full flex items-center">
						<button><img src={editTool1} alt="edit-1-icon" /></button>
					</div>

					<div class="w-full flex items-center">
						<button><img src={editTool2} alt="edit-2-icon" /></button>
					</div>

					<div class="w-full flex items-center">
						<button><img src={editTool3} alt="edit-3-icon" /></button>
					</div>

					<div class="w-full flex items-center">
						<button><img src={editTool4} alt="edit-4-icon" /></button>
					</div>
				</div>
			</div>

			<div class="">
				<button>
					<img src={projectSettingsIcon} alt="project-settings-icon" />
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	input[type='file'] {
		display: none;
	}

	.custom-file-upload {
		border: 1px solid #ccc;
		display: inline-block;
		padding: 6px 12px;
		cursor: pointer;
	}
</style>
