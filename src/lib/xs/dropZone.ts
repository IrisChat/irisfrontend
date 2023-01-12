export function drop(e: any) {
	e.stopPropagation();
	e.preventDefault();
	// Check if this is an URL
	var url = e.dataTransfer.getData('text/plain');
	// for img elements, url is the img src so
	// create an Image Object & draw to canvas
	if (url) {
		console.log(url);
		// for img file(s), read the file & draw to canvas
	} else {
		return handleFiles(e.dataTransfer.files);
	}
}
// read & create an image from the image file
async function handleFiles(files: FileList) {
	for (var i = 0; i < files.length; i++) {
		const file = files[i];
		const imageType = /image.*/;
		if (!file.type.match(imageType)) {
			continue;
		}

		// Read the file
		const rf: any = await readFile(file);

		return {
			type: 2,
			content: rf.toString(),
			description: file.name,
			size: file.size,
			filename: file.name,
			mimetype: file.type,
			ts: Date.now()
		};
	}
}

function readFile(file: File) {
	return new Promise((resolve, reject) => {
		var fr = new FileReader();
		fr.onload = () => {
			resolve(fr.result);
		};
		fr.onerror = reject;
		fr.readAsText(file);
	});
}
