const {check, validationResult} = require('express-validator')

const PostValidator = [
    check('title').trim().not().isEmpty().withMessage('Post title is missing'),
    check('content').trim().not().isEmpty().withMessage('Post content is missing'),
    check('category').trim().not().isEmpty().withMessage('Post category is missing'),
    check('meta').trim().not().isEmpty().withMessage('Post meta is missing'),
    check('slug').trim().not().isEmpty().withMessage('Post slug is missing'),
    // check('desc').trim().not().isEmpty().withMessage('Post description is missing is missing'),
    // check('tags').isArray().withMessage('this must be array').custom((tags)=>{
    //     for(let t of tags){
    //         if (typeof t != 'string') {
    //             throw Error('this must be array')
    //         }
    //     }
    //     return true
    // })
]

const validate = (req,res,next)=>{
   const error = validationResult(req).array();
   if (error.length) {
   return res.status(401).json({error : error[0].msg})
    
   }
    next()
}

module.exports = {PostValidator, validate}