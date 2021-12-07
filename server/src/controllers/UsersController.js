const User = require("../models/UserModel.js");

// Retrieve all users from the database
module.exports.findAll = (request, response) => {
    User.getAll((error, data) => {
        if (error) {
            response.status(500).send({ message: error.message || `Some error occured when retrieving all users.`});
        }else{
            response.status(200).send(data);
        }
    })
};

module.exports.findByUserId = (request, response) => {
    if (request.query.user_id.length === 0 || isNaN(request.query.user_id)) {
        console.log(`findByUserId: Invalid User Id received ${request.query.user_id}`);
        response.status(400).send("Invalid user_id received.");
    }

    User.findById(request.query.user_id, (error, data) =>{
        if (error){
            response.status(500).send({message: error.message || `Some error occured when retrieving user id: ${request.query.user_id}`});
        } else{
            response.status(200).send(data);
        }
    })
}

module.exports.createUser = (request, response) => {
    // Validate request
    if (!request.body) {
        response.status(400).send({message: "Missing User information. Unable to create user"});
    }

    // Create a user
    const user = new User({
        user_name: request.body.user_name,
        user_email: request.body.user_email,
        user_password: request.body.password,
        user_profile: request.body.profile,
        user_update: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })

    // Save user in the database
    User.create(user, (error, data) => {
        if(error){
            response.status(500).send({ message: error.message || `Some error occured while creating a new User.`})
        }else{
            response.status(200).send(data);
        }
    })
}

module.exports.deleteUserByUserId = (request, response) => {

}

