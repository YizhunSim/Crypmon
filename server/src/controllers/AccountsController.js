const Account = require("../models/AccountModel.js");

// Retrieve all users from the database
module.exports.findAll = (request, response) => {
    Account.getAll((error, data) => {
        if (error) {
            response.status(500).send({ message: error.message || `Some error occured when retrieving all account.`});
        }else{
            response.status(200).send(data);
        }
    })
};

module.exports.findByAccountId = (request, response) => {
    if (request.query.account_id.length === 0 || isNaN(request.query.account_id)) {
        console.log(`findByAccountId: Invalid Account Id received ${request.query.account_id}`);
        response.status(400).send("Invalid account_id received.");
        return;
    }

    Account.findByAid(request.query.account_id, (error, data) =>{
        if (error){
            response.status(500).send({message: error.message || `Some error occured when retrieving account by account id: ${request.query.account_id}`});
        } else{
            response.status(200).send(data);
        }
    })
}

module.exports.findByUserId = (request, response) => {
    if (request.query.user_id.length === 0 || isNaN(request.query.user_id)) {
        console.log(`findByUserId: Invalid User Id received ${request.query.user_id}`);
        response.status(400).send("Invalid user_id received.");
        return;
    }

    Account.findByUid(request.query.user_id, (error, data) =>{
        if (error){
            response.status(500).send({message: error.message || `Some error occured when retrieving account by user id: ${request.query.user_id}`});
        } else{
            response.status(200).send(data);
        }
    })
}

module.exports.createAccount = (request, response) => {
        // Validate request
        if (!request.body) {
            response.status(400).send({message: "Missing account information. Unable to create account"});
        }

        // Create a user
        const account = new Account({
            account_id: request.body.account_id,
            user_id: request.body.user_id,
            account_name: request.body.account_name,
            wallet_id: request.body.wallet_id,
            wallet_balance: request.body.wallet_balance
        })

            // Save user in the database
    Account.create(account, (error, data) => {
        if(error){
            response.status(500).send(`Some error occured while creating a new Account.`)
        }else{
            response.status(200).send(data);
        }
    })
}


module.exports.updateAccountBalance = (request, response) => {
    let updateRequest = request.body;
    console.log(`request: ${JSON.stringify(updateRequest)}`);
    if (!request.body.account_id || !request.body.wallet_balance){
        console.log(`updateAccountBalance: Invalid account_id or wallet_balance provided`);
        response.status(400).send("Invalid account_id. Unable to perform update balance");
        return;
    }

    Account.update(updateRequest, (error, data) => {
        if (error){
            response.status(500).send({message: error.message || `Some error occured when trying to update account balance of account id: ${request.params.account_id}`});
        } else{
            response.status(200).send(data);
        }
    })
}

