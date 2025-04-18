const jwt = require('jsonwebtoken');
const SECRET = 'votre_cle_secrete';

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
    } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
    }
};
