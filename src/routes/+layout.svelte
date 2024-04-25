<script lang="ts">
	import '../app.css';
	import { Toaster, toast } from 'svelte-sonner';
	import { navigating } from '$app/stores';
</script>

<Toaster richColors />

<div class="bg-main">
	<slot />
</div>
