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


// async function loadBlogs(request, currentPage = 1) {
// 	const response = await fetch(`${API}/${request}?page=${currentPage}`),
// 		blogsData = await response.json();
// 	let context = {
// 		data: blogsData.data,
// 		pageCount: blogsData.pageCount,
// 		currentPage: currentPage,
// 		request: request
// 	};
// 	var template = Handlebars.templates["blogs-template.hbs"],
// 		view;
// 	document.getElementById("blogs").innerHTML = template(context)
// }
// async function loadBlogDetails(request, goToComments = !1) {
// 	await loadData(request, "details-template", "blogs", !0), checkLogin(), goToComments && (window.location.href = "#comments")
// }
// async function addComment(e) {
// 	let auth;
// 	if (e.preventDefault(), !await getAuth()) return window.alert("Can not submit form without login!"), 0;
// 	let token = localStorage.getItem("token"),
// 		agree = document.getElementById("agree").checked;
// 	if (token && agree) {
// 		let postData = {
// 			name: document.getElementById("name").value,
// 			email: document.getElementById("email").value,
// 			comment: document.getElementById("message").value,
// 			blogId: document.getElementById("blogId").value,
// 			agree: agree
// 		};
// 		try {
// 			if (response = await fetch(`${AUTHENTICATION_API}/comment`, {
// 					method: "POST",
// 					headers: {
// 						"Content-Type": "application/json",
// 						Accept: "application/json",
// 						Authorization: "Bearer " + token
// 					},
// 					body: JSON.stringify(postData)
// 				}), 200 != response.status) {
// 				let result = await response.json();
// 				throw new Error(result.message)
// 			}
// 			loadData(`blogs/${postData.blogId}`, "details-template", "blogs")
// 		} catch (error) {
// 			let responseMessage = document.getElementById("response");
// 			responseMessage.classList.toggle("text-danger"), responseMessage.innerHTML = error
// 		}
// 	}
// }
// Handlebars.registerHelper("formatDate", (function (date) {
// 	let options = {
// 			weekday: "short",
// 			year: "numeric",
// 			month: "short",
// 			day: "numeric",
// 			timeZoneName: "short"
// 		},
// 		formatDate;
// 	return new Date(date).toLocaleString("en-US", options)
// })), async function () {
// 	checkLogin();
// 	var searchParams = new URLSearchParams(location.search),
// 		request = searchParams.get("request"),
// 		isDetails = searchParams.get("isDetails"),
// 		page = searchParams.get("page") || 1,
// 		goToComments = "#comments" == window.location.hash;
// 	request ? isDetails ? await loadBlogDetails(request, goToComments) : loadBlogs(request, page) : loadBlogs("blogs"), loadData("blogs-categories", "blogs-categories-template", "blogs-categories")
// }();