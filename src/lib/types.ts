export type Alignments = {
	morality: "good" | "neutral" | "evil";
	order: "lawful" | "neutral" | "chaotic";
};
type coins = "cp" | "sp" | "ep" | "gp" | "pp";

export type PossibleAbilities =
	| "strength"
	| "dexterity"
	| "constitution"
	| "intelligence"
	| "wisdom"
	| "charisma";
export const ALL_ABILITIES: PossibleAbilities[] = [
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
];
type Ability<T extends string> = {
	value: number;
	proficiency: boolean; // => +proficiencyBonus
	skills: Record<T, Skill>;
};

export type PossibleSkills = {
	strength: "athletics";
	dexterity: "acrobatics" | "sleight_of_hand" | "stealth";
	constitution: never;
	intelligence:
		| "arcana"
		| "history"
		| "investigation"
		| "nature"
		| "religion";
	wisdom:
		| "animal_handling"
		| "insight"
		| "medicine"
		| "perception"
		| "survival";
	charisma: "deception" | "intimidation" | "performance" | "persuasion";
};
export const ALL_SKILLS: { [ab in PossibleAbilities]: PossibleSkills[ab][] } = {
	strength: ["athletics"],
	dexterity: ["acrobatics", "sleight_of_hand", "stealth"],
	constitution: [],
	intelligence: ["arcana", "history", "investigation", "nature", "religion"],
	wisdom: [
		"animal_handling",
		"insight",
		"medicine",
		"perception",
		"survival",
	],
	charisma: ["deception", "intimidation", "performance", "persuasion"],
};
type Skill = {
	proficiency: boolean; // => +proficiencyBonus
	expertise: boolean; // => +proficiencyBonus (again)
};

export interface Character {
	metadata: {
		fileName: string;
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

	stats: { [ab in PossibleAbilities]: Ability<PossibleSkills[ab]> };

	hp: {
		current: number;
		max: number;
		temp: number;
	};

	features: {
		proficiencies: string;
		languages: string;
		raceTraits: string;
		classTraits: string;
	};

	equipment: {
		coins: { [key in coins]: number };
		inventory: string;
		weapons: Weapon[];
	};

	spells: Spell[];
}

export interface Weapon {}
export interface Spell {}
