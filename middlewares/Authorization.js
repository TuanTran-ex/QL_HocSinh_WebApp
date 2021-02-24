const path = require('path');

module.exports = (...permitRoles) => {
  return (req, res, next) => {
    const user = req.user;
    if (user && permitRoles.includes(user.role)) {
      next();
    } else {
      return res
      .status(403)
      .sendFile(path.join(__dirname, '../public', 'html', '403_page.html'));
    }
  }
}