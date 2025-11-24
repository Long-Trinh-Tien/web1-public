const API='https://web1-api.vercel.app/api';
const AUTHENTICATION_API = "https://web1-api.vercel.app/users";

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

async function login(e) {
	e.preventDefault();
	let username = document.getElementById("username").value,
		password = document.getElementById("password").value;
	document.getElementById("errorMessage").innerHTML = "";
	try {
		let token = await getAuthenticateToken(username, password);
		if (token) {
			localStorage.setItem("token", token);
			document.getElementsByClassName("btn-close")[0].click();
			displayControls();
		}
	} catch (error) {
		document.getElementById("errorMessage").innerText = error;
		displayControls(false)
	}
}

function logout() {
	localStorage.clear();
	displayControls(false);
}
async function checkLogin() {
	const isLogin = await getAuth();
	displayControls(isLogin)
}
async function getAuth() {
	let token = localStorage.getItem("token");
	if (token) {
		let response;
		if (200 == (await fetch(`${AUTHENTICATION_API}/verify`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: "Bearer " + token
				}
			})).status) return true
	}
	return false;
}

function displayControls(isLogin = true) {
	let loginLinks = document.getElementsByClassName("linkLogin"),
		logoutLinks = document.getElementsByClassName("linkLogout"),
		loginDisplay = "none",
		logoutDisplay = "block";
	isLogin || (loginDisplay = "block", logoutDisplay = "none");
	for (let i = 0; i < loginLinks.length; i++) loginLinks[i].style.display = loginDisplay, logoutLinks[i].style.display = logoutDisplay;
	let form = document.getElementById("leave-comment");
	form && (form.style.display = logoutDisplay);
}

function search(e) {
	e.preventDefault(), loadData(`search?keyword=${keyword}`, "search-template", "contents")
}

async function getAuthenticateToken(username, password) {
	let response = await fetch(`${AUTHENTICATION_API}/authenticate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		}),
		result = await response.json();
	if (200 == response.status) return result.token;
	throw new Error(result.message)
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
async function addComment(e) {
	let auth;
	if (e.preventDefault(), !await getAuth()) return window.alert("Can not submit form without login!"), 0;
	let token = localStorage.getItem("token"),
		agree = document.getElementById("agree").checked;
	if (token && agree) {
		let postData = {
			name: document.getElementById("name").value,
			email: document.getElementById("email").value,
			comment: document.getElementById("comment").value,
			blogId: document.getElementById("blogId").value,
			agree: agree
		};
		try {
			if (response = await fetch(`${AUTHENTICATION_API}/comment`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: "Bearer " + token
					},
					body: JSON.stringify(postData)
				}), 200 != response.status) {
				let result = await response.json();
				throw new Error(result.message)
			}
			loadData(`blogs/${postData.blogId}`, "details-template", "blogs")
		} catch (error) {
			let responseMessage = document.getElementById("responseMessage");
			responseMessage.classList.toggle("text-danger"), responseMessage.innerHTML = error
		}
	}
}

(async function () {
	checkLogin();
	var searchParams = new URLSearchParams(location.search),
		keyword = searchParams.get("keyword");
	keyword && "" != keyword.trim() && loadData(`search?keyword=${keyword}`, "search-template", "contents");
})();


// Handle Back/Forward
if (!history.state) {
	history.replaceState({page: location.hash || ""}, "");
}

window.addEventListener("popstate", function (event) {
	console.log("POPSTATE", event.state);
	location.reload();
});