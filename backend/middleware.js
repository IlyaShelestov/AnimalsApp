function checkAuth(req, res, next) {
  if (req.signedCookies.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}

function checkAdmin(req, res, next) {
  if (req.signedCookies.isAdmin) {
    next();
  } else {
    res.status(403).send("Access denied. Admins only.");
  }
}

function redirectIfLoggedIn(req, res, next) {
  if (req.signedCookies.isLoggedIn) {
    res.redirect("/main");
  } else {
    next();
  }
}

module.exports = { checkAdmin, checkAuth, redirectIfLoggedIn };
