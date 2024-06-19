import getCategory from "../Services/GetCategory.js";
import insertProductData from '../Services/insertProductData.js'
import createNewCollection from '../Services/createNewCollection.js'
import insertBrowsingBehaviour from "../Services/insertBrowsingBehaviour.js";
const functions = {
    getCategory: getCategory,
    insertProductData: insertProductData,
    createNewCollection:createNewCollection,
    insertBrowsingBehaviour:insertBrowsingBehaviour
}

export default functions;