// on init, grab contents from cat.xml and load into text area
(async () => {
	let response = await fetch(`cat.xml`);
	let data = await response.text()
	document.getElementById('text-xaml').value = data
	// doesn't immediately fire event - call update ourselves
	updateSvg();
})()


let convertXaml = (xaml) => {
	let svg = xaml;

	return svg
}

let updateSvg = () => {
	let xaml = document.getElementById('text-xaml').value;
	let svg = convertXaml(xaml);
	document.getElementById('text-svg').value = svg;
}

document.getElementById('text-xaml').addEventListener('change', updateSvg)
document.getElementById('text-xaml').addEventListener('keyup', updateSvg)