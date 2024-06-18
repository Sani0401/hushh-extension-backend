import express from 'express';
import getCategory from '../Services/GetCategory.js';
import functions from './functions.js';

const router = express.Router();

// Route using the getCategory function

// API's for Gemini Processing
router.post('/getCategory', functions.getCategory);
// router.post('/categorizeSearches', categorizeSearches)

//API's for Supabase Processing.
router.post('/insertWebsiteData',functions.insertProductData);
router.post('/insertIntoCollection', functions.createNewCollection)

export { router as user };
