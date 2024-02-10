function checkAuth(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}

function checkAdmin(req, res, next) {
  if (req.cookies.isAdmin) {
    next();
  } else {
    res.status(403).send("Access denied. Admins only.");
  }
}

function redirectIfLoggedIn(req, res, next) {
  if (req.cookies.isLoggedIn) {
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = { checkAdmin, checkAuth, redirectIfLoggedIn };
