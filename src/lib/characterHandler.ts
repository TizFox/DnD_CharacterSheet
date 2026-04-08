import type { PossibleAbilities, Character, PossibleSkills } from "$lib/types";
import type Skill from "./components/Skill.svelte";

// CHARACTER --------------------------------------------------------------------------------------
// +2 [1, 4] || +3 [5, 8] || +4 [9, 12] || +5 [13, 16] || +6 [17, 20]
export function getProficiencyBonus(character: Character): number {
	console.log(`getProficiencyBonus()`);
	return Math.floor((character.level - 1) / 4) + 2;
}

export function getPassivePerception(character: Character): number {
	console.log(`getPassivePerception()`);
	return (
		10 +
		getAbilityModifier({ character, ability: "wisdom" }) +
		(character.stats.wisdom.proficiency
			? getProficiencyBonus(character)
			: 0)
	);
}

// ABILITY ----------------------------------------------------------------------------------------
type AbilitySelector = {
	character: Character;
	ability: PossibleAbilities;
};

export function getAbilityValue({
	character,
	ability,
}: AbilitySelector): number {
	console.log(`getAbilityValue(${ability})`);
	return character.stats[ability].value;
}
export function getAbilityModifier({
	character,
	ability,
}: AbilitySelector): number {
	console.log(`getAbilityModifier(${ability})`);
	return Math.floor((character.stats[ability].value - 10) / 2);
}
export function getAbilitySaveThrow({
	character,
	ability,
}: AbilitySelector): number {
	console.log(`getAbilitySaveThrow(${ability})`);
	return (
		getAbilityModifier({ character, ability }) +
		(character.stats[ability].proficiency
			? getProficiencyBonus(character)
			: 0)
	);
}
export function getAbilityProficiency({
	character,
	ability,
}: AbilitySelector): boolean {
	console.log(`getAbilityProficiency(${ability})`);
	return character.stats[ability].proficiency;
}
export function setAbilityProficiency(
	{ character, ability }: AbilitySelector,
	value: boolean,
): void {
	console.log(`setAbilityProficiency(${ability}, ${value})`);
	character.stats[ability].proficiency = value;
}

// SKILL ------------------------------------------------------------------------------------------
type SkillSelector<Ab extends PossibleAbilities> = {
	character: Character;
	ability: Ab;
	skill: PossibleSkills[Ab];
};

export function getSkillProficiency<Ab extends PossibleAbilities>({
	character,
	ability,
	skill,
}: SkillSelector<Ab>): boolean {
	console.log(`getSkillProficiency(${ability}, ${skill})`);
	return character.stats[ability].skills[skill]?.proficiency ?? false;
}
export function setSkillProficiency<Ab extends PossibleAbilities>(
	{ character, ability, skill }: SkillSelector<Ab>,
	value: boolean,
): void {
	console.log(`setSkillProficiency(${ability}, ${skill}, ${value})`);
	character.stats[ability].skills[skill].proficiency = value;

	if (!value) {
		setSkillExpertise({ character, ability, skill }, false);
	}
}

export function getSkillExpertise<Ab extends PossibleAbilities>({
	character,
	ability,
	skill,
}: SkillSelector<Ab>): boolean {
	console.log(`getSkillExpertise(${ability}, ${skill})`);
	return character.stats[ability].skills[skill]?.expertise ?? false;
}
export function setSkillExpertise<Ab extends PossibleAbilities>(
	{ character, ability, skill }: SkillSelector<Ab>,
	value: boolean,
): void {
	console.log(`setSkillExpertise(${ability}, ${skill}, ${value})`);
	character.stats[ability].skills[skill].expertise = value;

	if (value) {
		setSkillProficiency({ character, ability, skill }, true);
	}
}

export function getSkillValue<Ab extends PossibleAbilities>({
	character,
	ability,
	skill,
}: SkillSelector<Ab>): number {
	console.log(`getSkillValue(${ability}, ${skill})`);
	return (
		getAbilityModifier({ character, ability }) +
		(getSkillProficiency({ character, ability, skill })
			? getProficiencyBonus(character)
			: 0) +
		(getSkillExpertise({ character, ability, skill })
			? getProficiencyBonus(character)
			: 0)
	);
}
