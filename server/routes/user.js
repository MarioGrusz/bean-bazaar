/**
 * @method POST
 * @access public
 * @endpoint /api/v1/user
**/


import express from 'express';
import { createUserController } from '../controllers/user.controller.js';
const router = express.Router();


router.route("/").post(createUserController);

export default router;
