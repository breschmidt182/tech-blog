const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Comment} = require('../../models/Comment');
const { post } = require('./user-routes');

router.post('/', async (req, res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.body.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    }
})

router.get('/comments', async(req, res) => {
    try{
        const dbComments = await Comment.findAll({
            include: [{
                model: Comment,
                attributes: ['title','user','date','description'],
            }]
        })
    }catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

router.get('/comment/:id', async (req, res) => {
    try{
        const dbCommentById = await Comment.findByPk(req.params.id);
        const comment = dbCommentById.get({plain: true});
        res.render('post', {post, loggedIn: req.session.loggedIn})
    }catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
})

module.exports = router;