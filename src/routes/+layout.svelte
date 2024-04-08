<script lang="ts">
	import '../app.css';
	import { Toaster, toast } from 'svelte-sonner';
</script>

<Toaster richColors />

<div class="bg-main">
	<slot />
</div>
