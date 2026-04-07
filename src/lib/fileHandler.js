export const FILE_EXTENTION = ".dndchar";

export function loadDndChar(event, onLoad) {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = (e) => {
		onLoad(JSON.parse(e.target.result));
	};
	reader.readAsText(file);
}

export function saveDndChar(data, filename) {
	const json = JSON.stringify(data, null, 2);
	const blob = new Blob([json], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename + FILE_EXTENTION;
	a.click();
	URL.revokeObjectURL(url);
}
