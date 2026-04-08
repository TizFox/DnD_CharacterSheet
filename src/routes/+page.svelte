<script lang="ts">
	import "$lib/theme.css";
	const logo = "/logo.svg";

	import { load, save } from "$lib/fileHandler";
	import type { Character } from "$lib/types";

	import DndCharInput from "$lib/components/DndCharInput.svelte";
	import Stats from "$lib/components/Stats.svelte";

	let dndChar = $state<Character | null>(null);
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
	<title>
		{dndChar
			? dndChar.metadata.name + " - Character Sheet"
			: "Character Sheet"}
	</title>
</svelte:head>

<!------------------------------------------>

<section>
	<DndCharInput
		wClass="w-1/2"
		placeholder="Character File"
		onInput={(file: File) =>
			load(file, (data: Character) => (dndChar = data))}
	/>
	<button
		onclick={() => {
			if (dndChar) {
				save(dndChar);
			}
		}}>Save</button
	>
</section>

{#if dndChar}
	<section>
		<p>{JSON.stringify(dndChar)}</p>
		<Stats character={dndChar} />
	</section>
{/if}

<!------------------------------------------>

<style lang="postcss">
</style>
