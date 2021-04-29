const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user.model');
const app = express();
const routes = express.Router();

routes.get('/users', auth, async (req, res)=>{
    try {
        const user = await User.find();
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});
routes.get('/user/:id', auth,  async (req, res)=>{
    let _id = req.params.id;
    try {
        const user = await User.findOne({_id:_id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});
routes.post('/user', async (req, res)=>{
    const user = new User(req.body);
    try {
        await user.preSave();
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});
routes.post('/user/login', async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        await user.generateToken();
        await user.save();
        res.status(200).send({user});
    } catch (error) {
        res.status(400).send(error);
    }
})
routes.patch('/user/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findOne({_id:req.params.id});
        await user.preSave();
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send('this is err  '+e);
    }
})
routes.delete('/user/:id', auth,  async (req, res)=>{
    let _id = req.params.id;
    try {
        await User.findOneAndDelete({_id});
        res.send('Successfully Deleted');
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = routes;