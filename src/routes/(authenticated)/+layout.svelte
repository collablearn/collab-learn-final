<script lang="ts">
	import Nav from '$lib/auth-components/nav.svelte';
</script>

<div class=" bg-submain">
	<div class="sticky top-0">
		<Nav />
	</div>

	<div class="min-h-screen px-[22px] py-[50px]">
		<slot />
	</div>
</div>
