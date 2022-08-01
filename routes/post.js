const router = require('express').Router()
const {createPost,deletePost,UpdatePost,GetPost,LatestPosts,SearchPost,FilterPost,UploadImage,GetAllData} = require('../controllers/post')
const multer = require('../middleware/multer')
const {PostValidator, validate} = require('../middleware/PostValidator')
// const {validateTags} = require('../middleware/tagvalidator')


router.post('/create',multer.single('thumbnail'),PostValidator,validate,createPost)
router.delete('/delete/:postId',deletePost)
router.put('/:postId',multer.single('thumbnail'),PostValidator,validate,UpdatePost)
router.get('/single/:slug',GetPost)
router.get('/posts',LatestPosts)
router.get('/search',SearchPost)
router.get('/category/:category', FilterPost)
router.get('/Blogposts',GetAllData)
router.post('/upload-Image',multer.single('image'),UploadImage)



module.exports = router