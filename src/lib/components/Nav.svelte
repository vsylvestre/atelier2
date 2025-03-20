<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import ArrowRight from './ArrowRight.svelte';

	const LAST_PAGE = 8;

	$: currentPage = Number($page.data.slug ?? '0');
	$: prevPage = currentPage <= 0 ? null : currentPage - 1;
	$: nextPage = currentPage >= LAST_PAGE ? null : currentPage + 1;
	$: nav = [
		{ side: 'left', page: prevPage },
		{ side: 'right', page: nextPage }
	] as const;
</script>

{#snippet arrow(direction: 'left' | 'right')}
	<div class="w-32" class:rotate-180={direction === 'left'}>
		<ArrowRight />
		<span class="sr-only">{direction === 'left' ? 'Précédent' : 'Suivant'}</span>
	</div>
{/snippet}

{#each nav as { side, page }}
	<div
		class="fixed top-0 z-40 h-full w-64 *:grid *:size-full *:place-items-center bp:w-100"
		class:right-0={side === 'right'}
		class:left-0={side === 'left'}
	>
		{#if Number.isInteger(page)}
			<a href={page === 0 ? base || '/' : `${base}/${page}`}>
				{@render arrow(side)}
			</a>
		{:else}
			<div class="opacity-30">
				{@render arrow(side)}
			</div>
		{/if}
	</div>
{/each}
