const router = require("express").Router();
const users = require("../controllers/UsersController.js");
const accounts = require("../controllers/AccountsController.js");

module.exports = app => {
    /* ---------------------User Routes ------------------------*/
    router.get("/user/all", users.findAll);

    router.get("/user/by-uid", users.findByUserId);

    router.post("/user/add", users.createUser);

    router.get("/user/deleteuser/by-uid", users.deleteUserByUserId);

      /* ---------------------Account Routes ------------------------*/
    router.get("/account/all", accounts.findAll);

    router.get("/account/by-aid", accounts.findByAccountId);

    router.get("/account/by-uid/", accounts.findByUserId);

    router.post("/account/add/", accounts.createAccount);

    router.put("/account/update-balance", accounts.updateAccountBalance);


    app.use('/', router)

};