/** @format */

import paginate from 'mongoose-paginate-v2';
const paginateHandler = async (
	query: any,
	model: any,
	select: any,
	populate: any
) => {
	let options = {
		query: {},
		select: '',
		sort: { createdAt: -1 },
		lean: true,
		populate: '',
		page: 1,
		limit: 10,
	};
	if (select != null) {
		options.select = select;
	}
	if (query != null) {
		options.query = query;
	}
	if (populate != null) {
		options.populate = populate;
	}
	if (query.limit) {
		options.limit = query.limit;
		delete query.limit;
	}
	if (query.page) {
		options.page = query.page;
		delete query.page;
	}

	const results = await model.paginate(options);
	return results;
};

export default paginateHandler;
