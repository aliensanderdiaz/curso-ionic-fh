import { Router, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';



const postRoutes = Router();
const fileSystem = new FileSystem();

// Obtener POST paginados
postRoutes.get('/', async (req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();


    res.json({
        ok: true,
        pagina,
        posts
    });


});



// Crear POST
postRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {

    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes = fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
    body.imgs = imagenes;


    Post.create( body ).then( async (postDB: any) => {

        await postDB.populate('usuario', '-password')
        // .execPopulate();

        res.json({
            ok: true,
            post: postDB
        });

    }).catch( (err: any) => {
        res.json(err)
    });

});



// Servicio para subir archivos
postRoutes.post( '/upload', [ verificaToken ], async (req: any, res: Response) => {

    console.log({
        reqFiles: req.files        
    })
    
    if ( !req.files ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ningun archivo - image'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        }); 
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id );

    res.json({
        ok: true,
        file: file.mimetype
    });

});



postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img    = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img );

    res.sendFile( pathFoto );

});

postRoutes.get('/crear-21', async (req: any, res: Response) => {
    for (let i = 0; i < 21; i++) {
        const element = {
            img: [],
            mensaje: 'Mensaje ' + i,
            coords: '-13.313123, 12.3123123',
            usuario: '63cb28511b9f028181c9cbb1'
        } 
        await Post.create( element )
        console.log({ i})
    }
    return res.json({ ok: true })
})




export default postRoutes;