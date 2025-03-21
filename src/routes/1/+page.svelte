<script lang="ts">
	export let data;
</script>

<div
	class="mx-auto flex max-w-528 flex-col gap-8 p-64 bp:max-w-1200 bp:px-100 bp:py-200 bp:text-32"
>
	{#each data.metadata as text}
		{#if text}
			<p>
				{text}
			</p>
		{/if}
	{/each}
</div>
