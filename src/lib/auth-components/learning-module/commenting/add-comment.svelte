<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
</script>

<div class="">
	<label>
		<span class="text-main text-[14px] transition-all">Add Comment</span>
		<textarea
			name="commentValue"
			placeholder="Say something..."
			class="outline-none w-full text-[14px] py-[11px] px-[20px] text-main bg-submain border-[1px] border-main rounded-[10px] transition-all"
		/>
	</label>
</div>

<button
	type="submit"
	class="transition-all active:bg-main/50 bg-main w-full rounded-[10px] text-[14px] font-semibold py-[10px] px-[2px] flex items-center justify-center text-submain"
>
	Add Comment
</button>

<style>
	::placeholder {
		color: #800000;
		opacity: 1; /* Firefox */
	}

	::-ms-textarea-placeholder {
		/* Edge 12 -18 */
		color: #800000;
	}
</style>
