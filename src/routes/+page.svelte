<script>
	const logo = "/logo.svg";

	import { load, save } from "$lib/fileHandler";

	import DndCharInput from "$lib/components/DndCharInput.svelte";

	let dndCharFile = $state(null);

	$effect(() => {
		if (dndCharFile) {
			console.log(dndCharFile);
			console.log(dndCharFile.name);
			console.log(dndCharFile.level);
		}
	});
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
	<title
		>{dndCharFile
			? dndCharFile.name + " - Character Sheet"
			: "Character Sheet"}</title
	>
</svelte:head>

<!------------------------------------------>

<section>
	<DndCharInput
		wClass="w-1/2"
		placeholder="Character File"
		onInput={(file) => load(file, (data) => (dndCharFile = data))}
	/>
	<button onclick={() => saveDndChar(dndCharFile)}>Save</button>
</section>

{#if dndCharFile}
	<section>
		<p>
			{JSON.stringify(dndCharFile)}
		</p>
	</section>
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
