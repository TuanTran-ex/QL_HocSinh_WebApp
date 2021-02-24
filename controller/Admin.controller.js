module.exports.index = (req, res) => {
  res.render('admin/dashboard', {
    isAdmin: true,
  });
}