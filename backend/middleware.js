function checkAuth(req, res, next) {
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
}

function checkAdmin(req, res, next) {
  console.log(req.cookies.isAdmin);
  if (req.cookies.isAdmin === "true") {
    next();
  } else {
    res.status(403).send("Access denied. Admins only.");
  }
}

module.exports = { checkAdmin, checkAuth };
