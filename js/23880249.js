const API='https://web1-api.vercel.app/api';

async function loadData(request, templateID, targetID) 
{
	const response = await fetch(`${API}/${request}`);
	const data = await response.json();

	var source = document.getElementById(templateID).innerHTML;
	var template = Handlebars.compile(source);

	document.getElementById(targetID).innerHTML = template({ data: data });
}

function setActiveImagePath(img, imgPath, isActive=true) {
	if (isActive) {
		img.src = imgPath.replace('.', '-active.');
	} else {
		img.src = imgPath;
	}
	img.nextElementSibling.classList.toggle('web1-text-blue');
}