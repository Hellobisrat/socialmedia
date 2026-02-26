import db from './config/db.js';
import cloudinary from "./config/cloudinary.js"
import dotenv from 'dotenv';


dotenv.config();
console.log("Cloudinary connected as:", cloudinary.config().cloud_name);


db();