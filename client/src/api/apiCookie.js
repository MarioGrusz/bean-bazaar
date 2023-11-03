import axios from "axios";
import { BASE_URL } from "../constant/apiConstants";
import generateCsrfToken from "./helpers/generateCsrfToken";

function checkCookieExists(name) {
    return document.cookie.split(';').some(item => item.trim().startsWith(`${name}=`));
}
   

const getSessionCookie = async (idToken) => {
    try{
        const csrfToken = generateCsrfToken();
        document.cookie = `csrfToken=${csrfToken}; Secure; HttpOnly; SameSite=Strict`;
 
        const response = await axios.post(`${BASE_URL}/session/login`, { idToken, csrfToken }, { withCredentials: true })
 
        document.cookie = `session=${response.data.sessionCookie}; max-age=${response.data.expiresIn}; Secure; HttpOnly; SameSite=Strict`;   

        if (checkCookieExists('session')) {
            console.log('The session cookie exists.');
           } else {
            console.log('The session cookie does not exist.');
        }
           
        
 
    } catch (error) {
        console.error('Error while exchanging idToken for session cookie:', error);
    }
};



const logoutSession = async () => {
    try{

        const response = axios.post(`${BASE_URL}/session/logout`)
        if (response.status === 200) {
            console.log('Session successfully logout');
        } else {
            console.error('Failed to logout session');
        }

    }catch (error) {
        console.error('Error:', error);
    }
}

export {
    getSessionCookie,
    logoutSession
}



   
   

