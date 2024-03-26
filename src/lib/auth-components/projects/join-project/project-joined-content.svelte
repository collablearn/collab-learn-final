<script lang="ts">
	import projectsBackIcon from '$lib/assets/projects_back_icon_320.svg';
	import projectAttachIcon from '$lib/assets/project_attach_icon_320.svg';
	import projectShareScreenIcon from '$lib/assets/project_sharescreen_icon_320.svg';
	import projectSettingsIcon from '$lib/assets/projects_settings_icon_320.svg';
</script>

<div class="">
	<div class="bg-main p-[20px] flex items-center justify-between">
		<button>
			<img src={projectsBackIcon} alt="project-back-icon" />
		</button>

		<div class="flex items-center gap-[20px]">
			<button>
				<img src={projectAttachIcon} alt="project-attach-icon" />
			</button>

			<button>
				<img src={projectShareScreenIcon} alt="project-sharescreen-icon" />
			</button>

			<button>
				<img src={projectSettingsIcon} alt="project-settings-icon" />
			</button>
		</div>
	</div>
</div>
