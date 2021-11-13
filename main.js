const table = document.getElementById("userTable");
const board = document.getElementById("board");

function getResponse() {
	const response = fetch('https://jsonplaceholder.typicode.com/posts');
	return response.then(res => res.json());
}

async function getData() {
	try {
		const json = await getResponse();
		const arr = Object.entries(json);
		var items = arr.map((item) => item[1]);
		var idList = getIdList(items);
		idList.map((id) => {
			createHeaderOfTable(id);
		});
	} catch(error) {
		console.log(error);
	}
	return items;
}

function getIdList(items) {
	const id = new Set();
	for(item of items) {
		id.add(item["userId"]);
	}
	const arr = [...id];
	return arr;
}

function createHeaderOfTable(id) {
	const newUser = document.createElement("th");
	newUser.innerText = `${id}`;
	newUser.className = `${id}`;
	table.appendChild(newUser);
}

function createPosts(items, id) {
	const posts = items.filter((item) => item["userId"] == id);
	posts.map((post) => {
		const postObj = document.createElement("div");
		const userId = document.createElement("span");
		const title = document.createElement("span");
		const body = document.createElement("span");

		userId.innerText = `User ID: ${id}`;
		title.innerText = `Title: ${post["title"]}`;
		body.innerText = `Body: ${post["body"]}`;

		postObj.appendChild(userId);
		postObj.appendChild(title);
		postObj.appendChild(body);
		board.appendChild(postObj);
	})
}

const handleUserClick = async (event) => {
	const { target } = event;
	const items = await getData();
	console.log(items);
	createPosts(items, target.className);
}


table.addEventListener("click", handleUserClick);
getData();



