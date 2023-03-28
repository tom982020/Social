import paginate from 'mongoose-paginate-v2';
const paginateHandler = async (query: any, model: any, select: any, populate: any) => {
    let options = {
        query: {},
        select: '',
        sort: { createdAt: -1 },
        lean: true,
        populate: '',
        page: 1,
        limit: 10,
    }
    if (select != null) {
        options.select = select
    }
    if (query != null) {
        options.query = query
    }
    if (populate != null) {
        options.populate = populate
    }

    const results = await model.paginate(options)
    return results
}

export default paginateHandler;