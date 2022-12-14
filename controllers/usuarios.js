const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        
        total,                
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {



    //const { nombre, edad} = req.body;
    //const body = req.body;
    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario( { nombre, correo, password, rol } );



    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();
    res.json({                
        usuario
    });
}

const usuariosPut= async (req, res = response) => {

    //const id = req.params.id;
    const { id  } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO: Validar contra la BD.
    if ( password ) {
        //encriptar la contraseña 
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );    
    }

    console.log( id );
    console.log( resto );
    const usuario = await Usuario.findByIdAndUpdate( id, resto );

     
    res.json({ usuario });
}

const usuariosPatch= (req, res = response) => {
    res.json({                
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete= async(req, res = response) => {
    const { id } = req.params;

    //const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    //const usuarioAutenticado = req.usuario;

    res.json({                
       usuario
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}