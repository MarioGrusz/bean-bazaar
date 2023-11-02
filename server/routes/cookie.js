/**
 * @method POST
 * @access public
 * @endpoint /api/v1/session/login
**/

/**
 * @method POST
 * @access public
 * @endpoint /api/v1/session/logout
**/


import express from 'express';
import { createSessionCookieController, logoutController } from '../controllers/cookie.controller.js';
const router = express.Router();


router.route("/login").post(createSessionCookieController);
router.route("/logout").post(logoutController);

export default router;