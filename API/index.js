const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader= require('image-downloader')
require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))

// Configuración de CORS
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Asegúrate de incluir 'POST'
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Asegúrate de incluir 'Cookie'
}));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión a MongoDB establecida correctamente.');
});

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });

        res.json(userDoc);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario.' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const userDoc = await User.findOne({ email });

        if (userDoc) {
            const passwordMatch = await bcrypt.compare(password, userDoc.password);
            if (passwordMatch) {
                // La contraseña coincide, por lo que el inicio de sesión es exitoso
                const token = jwt.sign({
                    email: userDoc.email,
                    id: userDoc._id
                }, process.env.JWT_SECRET); // Aquí se accede a la variable de entorno JWT_SECRET
                res.cookie('token', token);
                res.json(userDoc);
            } else {
                // La contraseña no coincide, envía un mensaje de error
                res.status(401).json({ error: 'La contraseña proporcionada es incorrecta.' });
            }
        } else {
            // El correo no está presente en la base de datos
            res.status(404).json({ error: 'El correo proporcionado no está registrado.' });
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, async (error, user) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Error al verificar el token.' });
            } else {
                try {
                    const { name, email, _id } = await User.findById(user.id);
                    res.json({ name, email, _id });
                } catch (error) {
                    console.error('Error al obtener perfil de usuario:', error);
                    res.status(500).json({ error: 'Error al obtener perfil de usuario.' });
                }
            }
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res)=>{

    res.cookie('token', '').json(true)

})

app.post('/upload-by-link' ,async(req,res)=>{
    const { link } = req.body;
    if (!link) {
        return res.status(400).json({ error: 'El enlace de la imagen es necesario.' });
    }
    const newName = 'image' + Date.now() + '.jpg';
    try {
        await imageDownloader.image({
            url: link,
            dest: __dirname + '/uploads/' + newName,
        });
        res.json(newName);
    } catch (error) {
        console.error('Error al descargar la imagen:', error);
        res.status(500).json({ error: 'Error al descargar la imagen.' });
    }
});


app.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});
