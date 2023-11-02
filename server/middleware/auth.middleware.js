import admin from "../config/firebaseAdmin.js";



const authenticateSession = (req, res, next) => {
  const sessionCookie = req.cookies.session || '';

  admin.auth().verifySessionCookie(sessionCookie, true)
   .then((decodedClaims) => {
     req.uid = decodedClaims.uid;
     next();
   })
   .catch((error) => {
     if (error.code === 'auth/session-cookie-expired') {
       res.status(401).send('Session expired, please login again');
     } else {
       res.status(401).send('Unauthorized request, invalid session cookie');
     }
  });
};
  

export default authenticateSession;



  
   
