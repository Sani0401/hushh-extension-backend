import getCategory from "../Services/GetCategory.js";
import insertProductData from '../Services/insertProductData.js'
import createNewCollection from '../Services/createNewCollection.js'
const functions = {
    getCategory: getCategory,
    insertProductData: insertProductData,
    createNewCollection:createNewCollection
}

export default functions;