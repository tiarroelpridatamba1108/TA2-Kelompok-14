const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getProfile = (req, res, next) => {
  res.render("profile/profile-detail", {
    user: req.user,
    pageTitle: "Profile",
    path: "/profile",
  });
};

exports.getEditProfile = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  res.render("profile/profile-edit", {
    user: req.user,
    editing: editMode,
    pageTitle: "Profile",
    path: "/profile",
  });
};

exports.getUpdatePassword = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  res.render("profile/profile-password", {
    editing: editMode,
    pageTitle: "Update Password",
    path: "/profile",
  });
};

exports.postEditProfile = (req, res, next) => {
  const userId = req.user._id;
  const updatedEmail = req.body.email;
  const updatedGender = req.body.gender;
  const updatedPhoneNumber = req.body.phoneNumber;

  User.findById(userId)
    .then((user) => {
      user.email = updatedEmail;
      user.gender = updatedGender;
      user.phoneNumber = updatedPhoneNumber;

      return user
        .save()
        .then(() => {
          res.redirect("/profile");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postUpdatePassword = (req, res, next) => {
  const userId = req.user._id;
  const password = req.body.password;
  let resetUser;

  User.findById(userId)
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;

      return resetUser
        .save()
        .then(() => {
          res.redirect("/profile");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
