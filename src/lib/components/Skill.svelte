<script lang="ts" generics="Ab extends PossibleAbilities">
	import {
		getSkillExpertise,
		getSkillProficiency,
		getSkillValue,
		setSkillExpertise,
		setSkillProficiency,
	} from "$lib/characterHandler";
	import type {
		Character,
		PossibleAbilities,
		PossibleSkills,
	} from "$lib/types";

	let {
		character,
		ability,
		skill,
	}: { character: Character; ability: Ab; skill: PossibleSkills[Ab] } =
		$props();
	let skillSelector = $derived({ character, ability, skill });

	let value = $derived(getSkillValue(skillSelector));
</script>

<!------------------------------------------>

<div class="flex flex-row items-center justify-start gap-3">
	<div>
		<input
			checked={getSkillExpertise(skillSelector)}
			onchange={(e) =>
				setSkillExpertise(skillSelector, e.currentTarget.checked)}
			type="checkbox"
		/>
		<input
			checked={getSkillProficiency(skillSelector)}
			onchange={(e) =>
				setSkillProficiency(skillSelector, e.currentTarget.checked)}
			type="checkbox"
		/>
	</div>
	<h2>{value > 0 ? "+" : ""}{value}</h2>
	<p>{skill.toUpperCase().split("_").join(" ")}</p>
</div>

<!------------------------------------------>

<style lang="postcss">
</style>
