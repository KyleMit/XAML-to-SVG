// on init, grab contents from cat.xml and load into text area
(async () => {
	let response = await fetch(`cat.xml`);
	let data = await response.text()
	document.getElementById('text-xaml').value = data
	// doesn't immediately fire event - call update ourselves
	updateSvg();
})()


let convertXaml = (xaml) => {
	let parser = new DOMParser();
	let xmlDoc = parser.parseFromString(xaml,"text/xml");

	let paths = [...xmlDoc.getElementsByTagName("Path")]

	let convertPath = (p) => {
		var obj = Object.assign(...[...p.attributes].map((e) => ({[e.name]: e.value})))
		return `<path d='${p.attributes.Data.value.replace(/^F1 /,'')}' />`
	}

	var pathsSvg = [...paths].map(convertPath)
	
	return pathsSvg.join('')

}

let updateSvg = () => {
	let xaml = document.getElementById('text-xaml').value;
	let svg = convertXaml(xaml);
	document.getElementById('text-svg').value = svg;
	document.getElementById('svg').innerHTML = svg;
}

document.getElementById('text-xaml').addEventListener('change', updateSvg)
document.getElementById('text-xaml').addEventListener('keyup', updateSvg)