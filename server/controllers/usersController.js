const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
}

exports.createUser = async (req, res) => {
    const { email, password, displayname, username } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            email,
            password: bcrypt.hashSync(password, 10),
            displayname: displayname,
            username: "@" + username,
            isBusiness: false,
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
}

exports.updateUser = async (req, res) => {
    const { email, password, isBusiness, displayname, username, businessContact, businessAddress } = req.body;

    const userFields = {};
    if (email) userFields.email = email;
    if (password) userFields.password = bcrypt.hashSync(password, 10);
    if ('isBusiness' in req.body) userFields.isBusiness = isBusiness;
    if ('displayname' in req.body) userFields.displayname = displayname;
    if ('username' in req.body) userFields.username = "@" + username;
    if ('businessContact' in req.body) userFields.businessContact = businessContact;
    if ('businessAddress' in req.body) userFields.businessAddress = businessAddress;

    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: userFields },
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        await User.findByIdAndRemove(req.params.id);
        res.json({ msg: 'User removed' });
    } catch (err) {
        res.status(500).send('Server Error ' + err);
    }
}
