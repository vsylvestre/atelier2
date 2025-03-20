<script lang="ts">
	import '$lib/site.css';
	import Nav from '$lib/components/Nav.svelte';
	import ArrowRotate from '$lib/components/ArrowRotate.svelte';
</script>

<main>
	<Nav />
	<slot />
</main>
<!-- Error on mobile, if the device is in portrait mode. -->
<div class="_error fixed inset-0 z-50 hidden place-items-center bg-white/80 backdrop-blur-sm">
	<div class="mx-auto flex max-w-200 flex-col items-center gap-12 text-center">
		<p>Tournez votre appareil pour une meilleure expérience.</p>
		<div class="size-24 -rotate-90 -scale-y-[1]">
			<ArrowRotate />
		</div>
	</div>
</div>

<style lang="postcss">
	@media (orientation: portrait) {
		._error {
			@apply grid;
		}
	}

	@screen bp {
		._error {
			@apply hidden;
		}
	}
</style>
