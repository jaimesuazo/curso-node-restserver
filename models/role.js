const { Schema, model } = require('mongoose');

//aqui debe tener la misma estructura de la tabla o colección de mongo
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = model( 'Role', RoleSchema );