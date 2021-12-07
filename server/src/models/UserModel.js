const sql = require("./database.js");

// constructor
const User = function(user) {
    this.user_name = user.user_name;
    this.user_email = user.user_email;
    this.user_password = user.user_password;
    this.user_profile = user.user_profile;
    this.user_update = user.user_update;
}

User.create = (newUser, result) => {
    console.log(`newUser: ${JSON.stringify(newUser)}`);
    console.log(`result: ${JSON.stringify(result)}`);
    sql.query(`INSERT INTO user set ?`, newUser, (error, res) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(err, null);
            return;
        }

        console.log("Created user: ", {user_id: res.insertId, ...newUser});
        return result(null, {user_id: res.insertId, ...newUser});
    })
};

User.getAll = result => {
    console.log(`result: ${JSON.stringify(result)}`);
    sql.query(`SELECT * FROM user`, (error, res) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(null, err);
            return;
        }
        console.log("getAll: ", res);
        result(null, res);
    })
}

User.findById = (userid, result) => {
    console.log(`userid: ${JSON.stringify(userid)}`);
    sql.query(`SELECT * FROM user WHERE user_id = '${userid}'`, (error, res) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(null, err);
            return;
        }

        console.log("findById: ", res);
        result(null, res);
    })
}

User.remove = (userid, result) => {
    sql.query(`DELETE FROM user where user_id = ${userid}`, (error,result) => {
        if (error){
            console.log("error: ", error);
            result(null, error);
            return;
        }

        if (result.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted User with user id: ", userid);
        result(null, result);
    })
}

module.exports = User;