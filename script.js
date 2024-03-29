// on init, grab contents from cat.xml and load into text area
(async () => {
	let response = await fetch(`cat.xml`);
	let data = await response.text()
	document.getElementById('text-xaml').value = data
	// doesn't immediately fire event - call update ourselves
	updateSvg();
})()


let convertPath = (p) => {
	var xamlAttrArray = [...p.attributes]; //.map((e) => ({name: [e.name], value: e.value}));

	var pathAttributeMap = {
		"data": { name: "d", value: (input) => input.replace(/^F1 /,'') },
	};

	var svgAttributes = xamlAttrArray.map(xamlAttr => {
		var map = pathAttributeMap[xamlAttr.name.toLowerCase()]
		return map ? { name: map.name, value: map.value(xamlAttr.value) } : null
	})

	var attributes = svgAttributes.filter(a => a).map(a => `${a.name}='${a.value}'`).join(' ');
	
	return `<path ${attributes} />`
}

let convertXaml = (xaml) => {
	let parser = new DOMParser();
	let xmlDoc = parser.parseFromString(xaml,"text/xml");

	let paths = [...xmlDoc.getElementsByTagName("Path")]

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