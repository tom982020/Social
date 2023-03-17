const isEmpty = (obj: any) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const checkElementAlready = (arr: [], name: any, id: any) => {
    const check = arr.find((element: any) => {
        if (element.name === id) {
            return true;
        }
        return false;
    });
    return check;
}
export default { isEmpty, checkElementAlready }