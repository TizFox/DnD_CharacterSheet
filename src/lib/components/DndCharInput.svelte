<script lang="ts">
	import { FileUser } from "@lucide/svelte";

	import { FILE_EXTENTION } from "$lib/fileHandler";

	let {
		handle = $bindable(null),
		wClass = "w-full",
		onInput,
		placeholder,
	} = $props();

	$effect(() => {
		handle = {
			clear: () => {
				if (!fileInput) {
					return;
				}
				fileInput.value = "";
				fileName = null;
				onInput(null);
			},
		};
	});

	let fileInput = $state<HTMLInputElement | null>(null);
	let fileName = $state<string | null>(null);
</script>

<!------------------------------------------>

<div class="{wClass} h-full relative group rounded-lg">
	<button
		type="button"
		onclick={() => fileInput?.click()}
		class="
		w-full h-full px-11 py-3 bg-d1 rounded-lg
		border-2 border-dark transition-std
		hover:border-cta
		base-text text-left truncate
		{fileName ? 'text-dark' : 'text-dark/25'}"
	>
		<FileUser
			class="h-1/2 absolute top-1/4 left-3 transition-std
		text-dark group-hover:text-cta"
		/>
		{fileName ?? placeholder}
	</button>
	<input
		bind:this={fileInput}
		oninput={() => {
			if (fileInput?.files && fileInput.files.length > 0) {
				fileName = fileInput.files[0].name;
				onInput(fileInput.files[0]);
			}
		}}
		class="hidden"
		type="file"
		accept={FILE_EXTENTION}
		multiple={false}
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
</style>
