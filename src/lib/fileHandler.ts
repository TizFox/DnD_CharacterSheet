import type { Character } from "./types";

export const FILE_EXTENTION = ".dndchar";

function checkCharacter(jsonString: string): Character {
	return JSON.parse(jsonString) as Character;
}

export function load(file: File, onLoad: (c: Character) => void) {
	const reader = new FileReader();

	reader.onload = () => {
		onLoad(checkCharacter(reader.result as string));
	};
	reader.readAsText(file);
}

export function save(data: Character) {
	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = data.metadata.fileName + FILE_EXTENTION;
	a.click();
	URL.revokeObjectURL(url);
}
