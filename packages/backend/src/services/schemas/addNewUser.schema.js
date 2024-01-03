const Joi = require('joi')

const addNewUserSchema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().min(6).required(),
    admin: Joi.string().required(),
    email: Joi.string().pattern(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i).message('O email precisa seguir o padrão example@example.com'),
    city: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    district: Joi.string().required()
})

module.exports = {
    addNewUserSchema
}