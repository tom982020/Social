/** @format */

export default async function callAPI(link: string) {
	try {
		const res = await fetch(`http://localhost:8080/${link}`);
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
