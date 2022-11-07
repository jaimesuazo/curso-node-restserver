const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { json } = require("express/lib/response");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../middlewares/google-verify");
const Usuario = require('../models/usuario');

//controller del login
const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        const validaPassword = bcryptjs.compareSync( password, usuario.password ); 

        if ( !validaPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.status(500).log( error );
        return res.json({
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async ( req, res = response ) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify( id_token );
        let usuario = await Usuario.findOne({ correo });
        console.log('[googleSignIn][usuario]', usuario );

        //si el usuario no existe tengo que crearlo.
        if ( !usuario ) {
            //tengo que crear usuario 
            const data = {
                nombre,
                correo,
                password : ':P',
                img,
                google: true

            };

            usuario = new Usuario( data );
            console.log('[googleSignIn][usuario.save()]', usuario );
            await usuario.save();
        }

        //Si el usuario en Bd 
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado '
            });

        }

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log('[googleSignIn]', error );
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar '
        });
    }

}


module.exports = {
    login,
    googleSignIn
}