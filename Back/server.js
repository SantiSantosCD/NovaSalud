require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
// Importar rutas
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: '¡API Backend funcionando correctamente!',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
});

// Usar rutas
app.use('/api/users', userRoutes);

// Sincronizar base de datos
sequelize.sync().then(() => {
  console.log('📊 Base de datos conectada');
});

module.exports = app;