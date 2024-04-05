<script lang="ts">
	import sampleIcon from '$lib/assets/description_icon_320_sample.svg';
	import onlineIcon from '$lib/assets/project_online_icon_320.svg';
	import offlineIcon from '$lib/assets/project_offline_icon_320.svg';

	import type { PostgrestSingleResponse, SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient<any, 'public', any>;
</script>

<div class="flex flex-col gap-[10px] mt-[45px]">
	<div class="flex justify-between items-center">
		<div class="flex items-start gap-[10px]">
			<img src={sampleIcon} alt="sample-icon" />
			<div class="flex flex-col o">
				<p class="text-main font-semibold text-[14px]">ZAYN</p>
				<p class="text-main text-[14px]">Host</p>
			</div>
		</div>

		<div class="">
			<img src={onlineIcon} alt="online-icon" />
		</div>
	</div>

	<div class="flex justify-between items-center">
		<div class="flex items-start gap-[10px]">
			<img src={sampleIcon} alt="sample-icon" />
			<div class="flex flex-col o">
				<p class="text-main font-semibold text-[14px]">Simon</p>
				<p class="text-main text-[14px]">Member</p>
			</div>
		</div>

		<div class="">
			<img src={offlineIcon} alt="online-icon" />
		</div>
	</div>

	<div class="flex justify-between items-center">
		<div class="flex items-start gap-[10px]">
			<img src={sampleIcon} alt="sample-icon" />
			<div class="flex flex-col o">
				<p class="text-main font-semibold text-[14px]">Peter</p>
				<p class="text-main text-[14px]">Member</p>
			</div>
		</div>

		<div class="">
			<img src={offlineIcon} alt="online-icon" />
		</div>
	</div>

	<div class="flex justify-between items-center">
		<div class="flex items-start gap-[10px]">
			<img src={sampleIcon} alt="sample-icon" />
			<div class="flex flex-col o">
				<p class="text-main font-semibold text-[14px]">Sebek</p>
				<p class="text-main text-[14px]">Member</p>
			</div>
		</div>

		<div class="">
			<img src={offlineIcon} alt="online-icon" />
		</div>
	</div>
</div>
