exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }

  next();
};

exports.isAuthorized = (req, res, next) => {
  if (req.user.role == "C") {
    return res.redirect("/");
  }

  next();
};
