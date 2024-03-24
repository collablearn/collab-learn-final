<script lang="ts">
	import { getActiveItem } from '$lib';
	import CreateProjectForm from '$lib/auth-components/projects/create-project/create-project-form.svelte';

	let activeItem = getActiveItem();

	$activeItem = '/projects';
</script>

<div class="">
	<h3 class="text-[16px] text-main font-semibold">Create Project</h3>
	<p class="text-[14px] text-main mt-[15px]">Creatte a project to start collaboration.</p>

	<div class="mt-[19px]">
		<CreateProjectForm />
	</div>
</div>
