<script lang="ts">
	import projectsBackIcon from '$lib/assets/projects_back_icon_320.svg';
	import projectAttachIcon from '$lib/assets/project_attach_icon_320.svg';
	import projectShareScreenIcon from '$lib/assets/project_sharescreen_icon_320.svg';
	import projectSettingsIcon from '$lib/assets/projects_settings_icon_320.svg';
	import { getAuthState } from '$lib';

	const authState = getAuthState();
</script>

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

			<div class="">
				<button>
					<img src={projectShareScreenIcon} alt="project-sharescreen-icon" />
				</button>
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
