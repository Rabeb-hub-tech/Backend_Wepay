const userModel = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

const SECRET = 'votre_cle_secrete';

module.exports.inscrire = async (req, res) => {
        try {
            const {nom, prenom,nomCommercial,email,password}=req.body
    
            const newUser = new userModel({
                nom, prenom,nomCommercial,email,password
            })
    
            const useradded = await newUser.save()
    
            res.status(200).json(useradded)
        } catch (error) {
            res.status(500).json(error.message)
        }
};


module.exports.seConnecter = async (req, res) => {
    const { email, motDePasse } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Utilisateur introuvable.' });

        const match = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!match) return res.status(401).json({ message: 'Mot de passe incorrect.' });

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json(error.message);
    }
};

module.exports.afficherProfil = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-motDePasse');
        res.json(user);
    } catch (err) {
        res.status(500).json(error.message);
    }
};

module.exports.modifierProfil = async (req, res) => {
    const { nom, prenom, nomCommercial, email } = req.body;
    try {
        const user = await userModel.findByIdAndUpdate(
        req.userId,
        { nom, prenom, nomCommercial, email },
        { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.changerMotDePasse = async (req, res) => {
    const { ancienMdp, nouveauMdp } = req.body;
    try {
        const user = await userModel.findById(req.userId);
        const match = await bcrypt.compare(ancienMdp, user.motDePasse);
        if (!match) return res.status(401).json({ message: 'Ancien mot de passe incorrect.' });

        user.motDePasse = await bcrypt.hash(nouveauMdp, 10);
        await user.save();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json(error.message);
    }
}