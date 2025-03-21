<script lang="ts">
	import { toCanvas } from 'qrcode';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { isBelowBreakpoint } from '$lib/stores/isBelowBreakpoint';
	import ArrowRight from './ArrowRight.svelte';

	export let block: {
		filename: string;
		url: string | null;
		left: number;
		top: number;
		width: number;
		height: number;
	};

	const {
		states: { open },
		elements: { portalled, trigger, content, close }
	} = createDialog();

	let description: string | null = null;

	const getMetaDescription = async (url: string) => {
		const response = await fetch(`https://api.dub.co/metatags?url=${url}`);
		const { description: metaDescription } = await response.json();
		description = metaDescription ?? null;
	};

	const loadQR = (node: HTMLCanvasElement) => {
		if (!block.url) {
			return;
		}
		toCanvas(node, block.url, { width: $isBelowBreakpoint ? 100 : 200 });
	};

	$: {
		if (!description && block.url) {
			getMetaDescription(block.url);
		}
	}
</script>

<button
	class="absolute border-2 border-red hover:bg-white/50 bp:border-none"
	style:left="{block.left}%"
	style:top="{block.top}%"
	style:width="{block.width}%"
	style:height="{block.height}%"
	use:melt={$trigger}
>
	<span class="sr-only">{block.filename}</span>
</button>
{#if $open}
	<div class="fixed inset-0 z-40 bg-white bp:p-20" use:melt={$portalled}>
		<div class="flex size-full flex-col gap-20" use:melt={$content}>
			<div class="flex p-20 pb-0 bp:p-0">
				<button class="flex items-center gap-12" use:melt={$close}>
					<div class="w-16 rotate-180">
						<ArrowRight />
					</div>
					Retour
				</button>
			</div>
			<div
				class="grid flex-1 grid-cols-2 gap-20 overflow-x-hidden overflow-y-scroll pb-20 bp:overflow-hidden bp:pb-0"
			>
				<div class="size-full overflow-hidden">
					<img
						src="{base}/images/{page.data.slug}/{block.filename}.webp"
						class="size-full object-contain"
						alt={block.filename}
					/>
				</div>
				<div class="flex flex-col gap-16 bp:gap-24">
					<div class="_meta">
						<h2>Fichier</h2>
						<p>{block.filename}</p>
					</div>
					<div class="_meta">
						<h2>URL</h2>
						<p>
							{#if !block.url}
								<span class="text-red"
									>La photo est trop floue ou trop grande pour en extraire le code QR.</span
								>
							{:else}
								<a href={block.url} class="underline" target="_blank">
									{block.url}
								</a>
							{/if}
						</p>
					</div>
					{#if description}
						<div class="_meta">
							<h2>Méta-description</h2>
							<p class="line-clamp-6 bp:line-clamp-none">{description}</p>
						</div>
					{/if}
					{#if block.url}
						<div class="_meta">
							<h2>Code QR</h2>
							<canvas use:loadQR></canvas>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	h2 {
		@apply text-10 font-semibold uppercase -tracking-[0.01em] opacity-80;
	}

	p {
		@apply leading-140;
	}

	._meta {
		@apply flex flex-col gap-4;
	}
</style>
