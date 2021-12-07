const router = require("express").Router();
const users = require("../controllers/UsersController.js");

module.exports = app => {
    router.get("/all", users.findAll);

    router.get("/by-uid", users.findByUserId);

    router.post("/add", users.createUser);

    router.get("/deleteuser/by-uid", users.deleteUserByUserId);

    app.use('/user', router);
};