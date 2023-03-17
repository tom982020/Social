"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};
exports.default = isEmpty;
