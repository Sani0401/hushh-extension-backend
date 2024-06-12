import express from 'express';
import getCategory from '../Services/GetCategory.js';
const app = express();
const user = express.Router();


app.post('/getCategory', getCategory);

export {user};
