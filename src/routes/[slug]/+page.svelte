<script lang="ts">
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';
	import Block from '$lib/components/Block.svelte';
	import Pointer from '$lib/components/Pointer.svelte';

	export let data;

	$: map = data.map;

	let intro =
		data.slug === '2' &&
		(typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('intro') !== 'false' : false);
	let aspect: string | null = null;

	const computeAspectRatio = (node: HTMLImageElement) => {
		const img = new Image();
		img.src = node.src;
		img.onload = () => {
			aspect = `${img.width} / ${img.height}`;
		};
	};

	const endIntro = () => {
		sessionStorage.setItem('intro', 'false');
		intro = false;
	};

	beforeNavigate(() => {
		aspect = null;
	});

	onMount(() => {
		if (intro) {
			setTimeout(() => {
				endIntro();
			}, 5000);
		}
	});
</script>

{#if intro}
	<button
		class="fixed inset-0 z-50 grid cursor-pointer place-items-center bg-white/80 backdrop-blur-sm"
		out:fade={{ duration: 200 }}
		on:click={endIntro}
	>
		<div class="flex items-center gap-12">
			Survolez la carte
			<div class="w-24">
				<Pointer />
			</div>
		</div>
	</button>
{/if}
<div
	class="relative flex h-screen w-screen items-center justify-center overflow-hidden px-64 bp:px-100"
>
	{#key map}
		<div class="relative max-h-full max-w-full" style:aspect-ratio={aspect}>
			<img
				src="{base}/map/{data.slug}.jpeg"
				alt={`map ${data.slug}`}
				class:opacity-0={!aspect}
				use:computeAspectRatio
			/>
			{#if aspect}
				{#each map as block}
					<Block {block} />
				{/each}
			{/if}
		</div>
	{/key}
</div>
