import getCategory from "../Services/GetCategory.js";
import insertProductData from '../Services/insertProductData.js'
import createNewCollection from '../Services/createNewCollection.js'
import insertBrowsingBehaviour from "../Services/insertBrowsingBehaviour.js";
import categorizeSearches from "../Services/categorizeSearches.js";
import sendMail from "../config/nodemailerConfig.js";
import sendOTP from "../Services/sendOTP.js";
import verifyOTP from "../Services/verifyOTP.js";
const functions = {
    getCategory: getCategory,
    insertProductData: insertProductData,
    createNewCollection:createNewCollection,
    insertBrowsingBehaviour:insertBrowsingBehaviour,
    categorizeSearches: categorizeSearches,
    sendMail,
    sendOTP,
    verifyOTP
}

export default functions;