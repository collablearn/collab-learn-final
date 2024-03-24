<script lang="ts">
	import onlineIcon from '$lib/assets/project_online_icon_320.svg';
	import offlineIcon from '$lib/assets/project_offline_icon_320.svg';
</script>

<div class="bg-subwhite px-[13px] py-[16px] rounded-[10px] relative shadow-sm shadow-black">
	<div class="grid grid-cols-3 gap-[10px]">
		<!--For project image-->
		<div class="w-[100%] h-[100px] bg-white"></div>

		<!--For project details-->
		<div class="  w-[100%] col-span-2">
			<h3 class="text-[16px] text-main font-semibold truncate">Enrollment System</h3>
			<p class="text-[14px] text-main line-clamp-3">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quo porro impedit aut
				consequuntur exercitationem rerum a esse error vitae est deserunt laboriosam illum labore
				ratione, facere in odit adipisci nam dolorum! Doloremque eligendi quae culpa expedita.
				Soluta, facere commodi!
			</p>

			<div class="absolute right-0 mr-[10px]">
				<div class="flex items-center gap-[5px]">
					<img src={onlineIcon} alt="online-icon" />
					<p class="text-[14px] text-main">Online 3</p>
				</div>
			</div>
		</div>
	</div>
</div>
