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

async function createHeaderOfTable() {
	while(table.hasChildNodes()) {
		table.removeChild(table.firstChild);
	}
	const items = await getData();
	var idList = getIdList(items);
	idList.map((id) => {
		const newUser = document.createElement("span");
		newUser.innerText = `User${id}`;
		newUser.className = `userName`;
		table.appendChild(newUser);
	});
}

function createPosts(items, id) {
	while(board.hasChildNodes()) {
		board.removeChild(board.firstChild);
	}

	const posts = items.filter((item) => item["userId"] == id);
	posts.map((post) => {
		const postObj = document.createElement("div");
		const userId = document.createElement("div");
		const title = document.createElement("div");
		const body = document.createElement("div");

		postObj.className = "post";
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
	createPosts(items, target.innerText.substring(4));
}


table.addEventListener("click", handleUserClick);
createHeaderOfTable();



