import getCategory from "../Services/GetCategory.js";
import insertProductData from '../Services/insertProductData.js'
import createNewCollection from '../Services/createNewCollection.js'
import insertBrowsingBehaviour from "../Services/insertBrowsingBehaviour.js";
import categorizeSearches from "../Services/categorizeSearches.js";
const functions = {
    getCategory: getCategory,
    insertProductData: insertProductData,
    createNewCollection:createNewCollection,
    insertBrowsingBehaviour:insertBrowsingBehaviour,
    categorizeSearches: categorizeSearches
}

export default functions;