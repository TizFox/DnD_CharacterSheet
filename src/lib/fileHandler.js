export const FILE_EXTENTION = ".dndchar";

function check(dndChar) {
	// Check if a json character has all the variables
}

export function load(file, onLoad) {
	const reader = new FileReader();

	reader.onload = (e) => {
		onLoad(JSON.parse(e.target.result));
	};
	reader.readAsText(file);
}

export function save(data, filename) {
	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename + FILE_EXTENTION;
	a.click();
	URL.revokeObjectURL(url);
}
