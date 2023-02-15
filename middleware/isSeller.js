module.exports = (req, res, next) => {
  // checks if the user is logged in when trying to access a specific page
  if (req.session.currentUser.role !== 'seller') {
    return res.redirect('/')
  }
  next()
}
