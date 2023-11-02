import admin from "../config/firebaseAdmin.js";


/**
 * @desc   exchange id token for session cookie
 * @route  POST /api/v1/origins
 * @access privite
*/


const createSessionCookieController = async (req, res) => {
    try {
        const idToken = req.body.idToken.toString();
        const csrfToken = req.body.csrfToken.toString();
 
        if (csrfToken !== req.cookies.csrfToken) {
            res.status(401).send('UNAUTHORIZED REQUEST!');
            return;
        }
 
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // Set session expiration to 5 days
 
        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'Strict' };
        res.cookie('session', sessionCookie, options);
 
        res.end(JSON.stringify({ status: 'success' }));
 
    } catch (error) {
        res.status(401).send('Failed to create session cookie', error);
    }
};

const logoutController = (req, res) => {
    res.clearCookie('session');
    res.redirect('/login');
};

export { createSessionCookieController, logoutController };