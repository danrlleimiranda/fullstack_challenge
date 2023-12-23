const {userServices} = require('../services');

const getData = async (_req, res) => {
    const { data }  = res.locals.user;

    if(data.admin) {
        const users = await userServices.getAll(data.userId);
        return res.status(200).json(users)
    }

    const user = await userServices.getById(data.userId)
    return res.status(200).json(user);
};

const createNewUser = async (req, res) => {
 const { fullName, username, email, password, admin } = req.body;
 const { filename } = req.file;
 const newUser = await userServices.createNewUser({ fullName, username, email, password, admin, image: filename });

 return res.status(newUser.status).json(newUser.data)
}

module.exports = {
    getData, 
    createNewUser
}