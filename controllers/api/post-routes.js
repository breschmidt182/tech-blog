const router = require('express').Router();
const sequelize = require('../../config/connection');
const Post = require('../../models/Post');

//create new post
router.post('/post/new', async (req, res) => {
    try{
        const dbPostData = Post.create({
            where:{
                title: req.body.title,
                post_text: req.body.post_text,
                post_id: req.body.post_id,
                user_id: req.body.user_id
            }
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbPostData)
        });
    } catch(err) {
        console.log(err)
        res.status(400).json(err);
    }
});

router.get('/post', async(req, res) => {
    try{
        const dbAllPost = await Post.findAll({
            include: [{
                model: Post,
                attributes: ['title', 'description'],
            }]
        })
    }catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
})

router.get('/post/:id', async(req, res) => {
    try{
        const dbPostById = await Post.findByPk(req.params.id);

        const post = dbPostById.get({plain: true});
        res.render('post', {post, loggedIn: req.session.loggedIn})
    }catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
})

module.exports = router;