<script>
	const logo = "/logo.svg";

	import { FILE_EXTENTION, loadDndChar, saveDndChar } from "$lib/fileHandler";

	let dndCharFile = $state(null);
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

<div>
	<input
		type="file"
		accept={FILE_EXTENTION}
		onchange={(e) => loadDndChar(e, (data) => (dndCharFile = data))}
	/>
	<button onclick={() => saveDndChar(dndCharFile)}>Save</button>

	<p>
		{dndCharFile}
	</p>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
