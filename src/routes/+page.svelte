<script lang="ts">
	export let data;
</script>

<div class="mx-auto flex max-w-400 flex-col gap-16 py-100 bp:max-w-600 bp:py-200">
	{#each data.metadata as text}
		{#if text}
			<p>
				{text}
			</p>
		{/if}
	{/each}
</div>
