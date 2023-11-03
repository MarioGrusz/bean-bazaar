/**
 * Attaches a CSRF token to the request.
 * @param {string} url The URL to check.
 * @param {string} cookie The CSRF token name.
 * @param {string} value The CSRF token value to save.
 * @return The middleware function to run.
 */
const attachCsrfToken = (url, cookie, value) => {
    return function(req, res, next) {
      if (req.url == url) {
        res.cookie(cookie, value);
      }
      next();
    }
}

export default attachCsrfToken