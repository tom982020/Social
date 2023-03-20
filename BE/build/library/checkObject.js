"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};
const checkElementAlready = (arr, name, id) => {
    const check = arr.find((element) => {
        if (element.name === id) {
            return true;
        }
        return false;
    });
    return check;
};
exports.default = { isEmpty, checkElementAlready };
