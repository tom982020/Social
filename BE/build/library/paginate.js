"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const paginateHandler = (query, model, select, populate) => __awaiter(void 0, void 0, void 0, function* () {
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
    const results = yield model.paginate(options);
    return results;
});
exports.default = paginateHandler;
