import getEmailFromUser from "../services/mail.service.js";

/**
 * @desc   get new email from user.
 * @route  POST /api/v1/contact
 * @access public
 * 
*/


const getEmailFromUserController = async (req, res, next) => {
    
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message

  try {
    const newEmail = await getEmailFromUser(name, email, message)
    res.status(200).json(newEmail);
  } catch (error) {
    next(error);
  }
};

export default getEmailFromUserController