const User = require('../Models/User');
const jwt = require('jsonwebtoken');

const userController = {
    // CREATE - Registrar usuario
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const user = await User.create({ username, email, password });
            res.status(201).json({
                message: 'Usuario creado exitosamente',
                user: { id: user.id, username: user.username, email: user.email }
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // LOGIN
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            
            if (!user || !(await user.validatePassword(password))) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login exitoso',
                token,
                user: { id: user.id, username: user.username, email: user.email }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // READ - Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'username', 'email', 'createdAt']
            });
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = userController;