import express from 'express';
import getCategory from '../Services/GetCategory.js';
import functions from './functions.js';

const router = express.Router();

// Route using the getCategory function

// API's for Gemini Processing
router.post('/getCategory', functions.getCategory);
router.post('/categorizeSearches', functions.categorizeSearches)

//API's for Supabase Processing.
router.post('/insertProductData',functions.insertProductData);
router.post('/insertIntoCollection', functions.createNewCollection)
router.post('/insertBrowsingBehaviour', functions.insertBrowsingBehaviour)

router.post('/sendOTP', functions.sendOTP);
router.post('/verifyOTP', functions.verifyOTP)

export { router as user };
