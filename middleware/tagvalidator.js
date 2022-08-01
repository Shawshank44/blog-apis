const validateTags = (req,res,next)=>{
    const {tags} = req.body
    if (tags === req.body.tags){
        return JSON.parse(tags)
    }
    next()
}


module.exports = {validateTags}