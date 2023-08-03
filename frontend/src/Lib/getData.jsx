const getData = async () => {
	try {
		let rawData = await fetch(`https://n36-blog.herokuapp.com/categories`);
		let data = await rawData.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

export default getData;
