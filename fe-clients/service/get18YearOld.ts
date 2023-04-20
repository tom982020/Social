/** @format */

export const getYear18 = () => {
	const year = new Date(Date.now()).getFullYear();
	const month = new Date(Date.now()).getMonth() + 1;
	const day = new Date(Date.now()).getDate();
	return `${year - 18}/${month}/${day + 1}`;
};

export const getYear150 = () => {
	const year = new Date(Date.now()).getFullYear();
	const month = new Date(Date.now()).getMonth() + 1;
	const day = new Date(Date.now()).getDate();
	return `${year + 150}/${month}/${day + 1}`;
};