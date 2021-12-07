const sql = require("./database.js");

// constructor
const Account = function(account) {
    this.user_id = account.user_id;
    this.account_name = account.account_name;
    this.wallet_id = account.wallet_id;
    this.wallet_balance = account.wallet_balance;
}

Account.getAll = result => {
    console.log(`result: ${JSON.stringify(result)}`);
    const query = `SELECT * FROM account`;
    sql.query(query, (error, res) => {
        console.log(`[AccountModel:getALL] Query: ${query}`);
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(error, null);
            return;
        }
        console.log("getAll: ", res);
        result(null, res);
    })
}

Account.findByAid = (accountId, result) => {
    console.log(`accountid: ${JSON.stringify(accountId)}`);
    const query = `SELECT * FROM account where account_id = ${accountId}`;
    sql.query(query, (error, res) => {
        console.log(`[AccountModel:findByAid] Query: ${query}`);
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("findByAid: ", res);
        result(null, res);
    })
}

Account.findByUid = (userId, result) => {
    console.log(`userid: ${JSON.stringify(userId)}`);
    const query = `SELECT * FROM account WHERE user_id = '${userId}'`;
    sql.query(query, (error, res) => {
        console.log(`[AccountModel:findByUid] Query: ${query}`);
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("findByUid: ", res);
        result(null, res);
    })
}

Account.create = (newAccount, result) => {
    console.log(`newAccount: ${JSON.stringify(newAccount)}`);
    console.log(`result: ${JSON.stringify(result)}`);
    sql.query(`INSERT INTO account set ?`, newAccount, (error, res) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if(error){
            console.log("error: ", error);
            result(error, null);
            return;
        }

        console.log("Created account: ", {account_id: res.insertId, ...newAccount});
        return result(null, {account_id: res.insertId, ...newAccount});
    })
};


Account.removeAccountByUid = (userid, result) => {
    console.log(`userId: ${JSON.stringify(userid)}`);
    console.log(`result: ${JSON.stringify(result)}`);
    sql.query(`DELETE FROM account where user_id = ${userid}`, (error,res) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`res: ${JSON.stringify(res)}`);
        if (error){
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted account with user id: ", userid);
        result(null, res);
    })
}

Account.removeAccountByAid = (accountid, result) => {
    console.log(`accountid: ${JSON.stringify(accountid)}`);
    console.log(`result: ${JSON.stringify(result)}`);
    sql.query(`DELETE FROM account where account_id = ${accountid}`, (error,records) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`records: ${JSON.stringify(records)}`);
        if (error){
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (records.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Deleted account with account id: ", accountid);
        result(null, records);
    })
}

Account.update = (updateInfo, result) => {
    console.log(`updateInfo: ${JSON.stringify(updateInfo)}`);
    console.log(`result: ${JSON.stringify(result)}`);

    sql.query(`UPDATE account SET wallet_balance = ${updateInfo.wallet_balance} WHERE account_id = ${updateInfo.account_id}`, (error,records) => {
        console.log(`error: ${JSON.stringify(error)}`);
        console.log(`records: ${JSON.stringify(records)}`);
        if (error){
            console.log("error: ", error);
            result(error, null);
            return;
        }

        if (records.affectedRows == 0) {
            // not found account with the id
            result({ kind: "not_found" }, null);
            return;
          }

          console.log("Update account: ", { ...updateInfo });
          result(null, { ...updateInfo });
    })
}

module.exports = Account;