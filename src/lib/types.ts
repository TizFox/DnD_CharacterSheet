export type Alignments = {
	morality: "good" | "neutral" | "evil";
	order: "lawful" | "neutral" | "chaotic";
};

type BaseAbility = {
	value: number;
	proficiency: boolean; // => +proficiencyBonus
};
type Ability<T extends string = never> = [T] extends [never]
	? BaseAbility
	: BaseAbility & { skills: Record<T, Skill> };

type StrengthSkills = "athletics";
type DexteritySkills = "acrobatics" | "sleightOfHand" | "stealth";
type ConstitutionSkills = "";
type IntelligenceSkills =
	| "arcana"
	| "history"
	| "investigation"
	| "nature"
	| "religion";
type WisdomSkills =
	| "animalHandling"
	| "insight"
	| "medicine"
	| "perception"
	| "survival";
type CharismaSkills =
	| "deception"
	| "intimidation"
	| "performance"
	| "persuasion";
type Skill = {
	proficiency: boolean; // => +proficiencyBonus
	expertise: boolean; // => +proficiencyBonus (again)
};

export type Weapon = {};
export type Spell = {};

export type Character = {
	metadata: {
		player: string;
		name: string;
		background: string;
		alignment: Alignments;

		personalityTraits: string;
		ideals: string;
		bonds: string;
		flaws: string;
	};

	class: string;
	race: string;
	speed: number; // in meters
	initiative: number;
	level: number;
	proficiencyBonus: number;
	ca: number;

	stats: {
		strength: Ability<StrengthSkills>;
		dexterity: Ability<DexteritySkills>;
		constitution: Ability;
		intelligence: Ability<IntelligenceSkills>;
		wisdom: Ability<WisdomSkills>;
		charisma: Ability<CharismaSkills>;
		passiveWisdom: number; // 10 + modWis + (wisdom.skills.perception ? proficiencyBonus : 0)
	};

	features: {
		proficiencies: string;
		languages: string;
		raceTraits: string;
		classTraits: string;
	};

	equipment: {
		coins: {
			cp: number;
			sp: number;
			ep: number;
			gp: number;
			pp: number;
		};
		body: string;
	};

	spells: {};
};
