<script lang="ts">
	import type { Character } from "$lib/types";
	import { ALL_ABILITIES } from "$lib/types";

	import Ability from "$lib/components/Ability.svelte";

	let {
		wClass = "w-fit",
		character,
	}: { wClass?: string; character: Character } = $props();
</script>

<!------------------------------------------>

<div class="{wClass} flex flex-col items-center gap-5">
	{#each ALL_ABILITIES as ability}
		<Ability {character} {ability} />
	{/each}
</div>

<!------------------------------------------>

<style lang="postcss">
</style>
