const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete
                        } = require('../controllers/usuarios');
const router = Router();


        //la raíz tiene acceso denegado
        router.get('/', usuariosGet );
        router.post('/', usuariosPost );
        router.put('/:id', usuariosPut );
        router.patch('/', usuariosPatch );
        router.delete('/', usuariosDelete );


module.exports = router;