<script lang="ts">
	import type { Character, PossibleAbilities } from "$lib/types";
	import { ALL_SKILLS } from "$lib/types";

	import {
		getAbilityValue,
		getAbilityModifier,
		getAbilitySaveThrow,
		getAbilityProficiency,
		setAbilityProficiency,
	} from "$lib/characterHandler";

	import Skill from "./Skill.svelte";

	let {
		character,
		ability,
	}: { character: Character; ability: PossibleAbilities } = $props();
	let abilitySelector = $derived({ character, ability });

	let value = $derived(getAbilityValue(abilitySelector));
	let modifier = $derived(getAbilityModifier(abilitySelector));
	let saveThrow = $derived(getAbilitySaveThrow(abilitySelector));
</script>

<!------------------------------------------>

<div
	class="flex flex-col items-center justify-center bg-d1 p-3 gap-5 rounded-xl"
>
	<div class="flex flex-col items-center justify-center">
		<h2 class="main-text">{ability.toUpperCase()}</h2>
		<h1 class="bg-d2 text-center w-fit p-3 rounded-lg">
			{modifier > 0 ? "+" : ""}{modifier}
		</h1>
		<input
			bind:value={character.stats[ability].value}
			class="no-spinner bg-d2 text-center px-3 rounded-lg"
			defaultValue={value}
			type="number"
		/>

		<div class="flex flex-row items-center justify-start gap-3">
			<div>
				<input
					checked={getAbilityProficiency(abilitySelector)}
					onchange={(e) =>
						setAbilityProficiency(
							abilitySelector,
							e.currentTarget.checked,
						)}
					type="checkbox"
				/>
			</div>
			<h2>{saveThrow > 0 ? "+" : ""}{saveThrow}</h2>
			<p>SAVING THROW</p>
		</div>
	</div>

	<hr />

	<div>
		{#each ALL_SKILLS[ability] as skill}
			<Skill {character} {ability} {skill} />{/each}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
</style>
