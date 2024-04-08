<script lang="ts">
	import { getAuthState } from '$lib';
	import UploadModuleForm from '$lib/auth-components/learning-module/upload-module/upload-module-form.svelte';

	let authState = getAuthState();

	$authState.activeItem = '/learning-modules';
</script>

<div class="p-[22px]">
	<h3 class="text-[16px] text-main font-semibold">Upload Module</h3>
	<p class="text-[14px] text-main mt-[15px]">Share your knowledge with us!</p>

	<div class="mt-[19px]">
		<UploadModuleForm />
	</div>
</div>
