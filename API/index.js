const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

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
                    id: userDoc._id,
                }, process.env.JWT_SECRET); // Asegúrate de tener definido JWT_SECRET en tu archivo .env
                res.cookie('token', token); // Establece la cookie con el token
                res.json({ message: 'Login exitoso' });
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

app.listen(4000, () => {
    console.log('Servidor escuchando en el puerto 4000');
});
