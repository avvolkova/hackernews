const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/post');
const { Vote } = require('../models/vote');
const router = express.Router();
log = console.log;

/* GET home page. */
router.get('/', function(req, res) {
    log('- - - - -  GET /')
    res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
    log('- - - - -   GET/POST')
    let posts = await Post.find();
    posts.sort(function(a, b) {
        return b.createdAt - a.createdAt;
    })
    res.render('index', { posts });
});

router.post('/posts/vote', async function(req, res) {
    log('- - - - -   /POST/VOTE')
    try {
        let post = await Post.findById(req.body.id);
        let vote = new Vote();
        await vote.save();
        post.votes.push(vote);
        await post.save();

        return res.json({ votes: post.votes.length });
    } catch (error) {
        return res.sendStatus(500) // !!
    }
});

router.delete('/posts/:id', async function(req, res, next) {
    log('- - - - -   DELETE/:ID')
    console.log(req.body);
    await Post.findByIdAndDelete(req.body.id);
    res.sendStatus(200);
    // Создайте здесь логику для удаления постов
});

router.post('/posts', async function(req, res) {
    log('- - - - -  POST /POSTS')
    let newPost = new Post({ title: req.body.title, username: 'User', commentCount: Math.floor(Math.random() * 1000) });
    await newPost.save();
    res.json({ newPost });

});

router.get('/posts/:id', async function(req, res) {
    log('- - - - -   GET/POSTS/:ID')
    let post = await Post.findById(req.params.id);

    res.render('post', { post });
});

module.exports = router;