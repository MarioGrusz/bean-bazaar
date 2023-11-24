/**
 * @method POST
 * @access public
 * @endpoint /api/v1/contact
**/


import express from 'express';
import getEmailFromUserController from '../controllers/mail.controller.js';
const router = express.Router();


router.route("/").post(getEmailFromUserController);

export default router;
