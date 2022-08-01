const Post = require('../Schema/PostSchema')
const cloudinary = require('../cloud/cloud').v2
const {isValidObjectId} = require('mongoose')

const createPost = async (req,res)=>{
   try {
        const {title,category, meta,content,slug,author,thumbnail} = req.body
        const {file} = req
        const newPost = new Post({title,category,meta,content,slug,author,thumbnail})
        if (file) {
         const {secure_url : url,public_id} =  await cloudinary.uploader.upload(file.path)
         newPost.thumbnail = {url : url , public_id}
        }
        res.json({post : newPost})
        await newPost.save()
    
   } catch (e) {
        res.json({error : "Post Not created"})
    
   }
}

const deletePost = async(req,res)=>{
     const {postId} = req.params
     if (!isValidObjectId(postId)) {
          return res.status(401).json({error : "invalid REQUEST"})
     } 

     const post = await Post.findById(postId)

     if (!post) {
          return res.status(404).json({err : "Post Not Found"})
     }

     const {public_id}= post.thumbnail
     if (public_id){
      const {result} = await cloudinary.uploader.destroy(public_id)
      if (result != "ok") {
          return res.status(404).json({err : "Post Not Found"})
      }

     }
     await Post.findByIdAndDelete(postId)
     res.json({message : "post deleted" })




}


const UpdatePost = async (req,res)=>{
     const {title,category, meta,content,slug,author} = req.body
     const {file} = req
     const {postId} = req.params
     if (!isValidObjectId(postId)) {
          return res.status(401).json({error : "invalid REQUEST"})
     } 

     const post = await Post.findById(postId)

     if (!post) {
          return res.status(404).json({err : "Post Not Found"})
     }

     const {public_id}= post.thumbnail
     if (public_id && file){
      const {result} = await cloudinary.uploader.destroy(public_id)
      if (result != "ok") {
          return res.status(404).json({err : "Post Not Found"})
      }

     }

     if (file) {
          const {secure_url : url,public_id} =  await cloudinary.uploader.upload(file.path)
          post.thumbnail = {url : url , public_id}
         }

     post.title = title
     post.meta = meta
     post.category =category
     post.content =content
     post.author = author
     post.slug = slug
     // post.thumbnail = thumbnail

     


     await post.save()
     res.json({post  : {
          id : post._id,
          title,
          meta,
          category,
          slug,
          thumbnail : post.thumbnail,
          author,
          content
     }})


}


const GetPost = async (req,res)=>{
     const {slug} = req.params;
     if (!slug){
          return res.status(401).json({error : "Invalid request"});
     }
     const post = await Post.findOne({slug : slug})
     if (!post){
          return res.status(404).json({error : "Post Not Found"})
     }
     res.json(post)


}

const LatestPosts = async (req,res)=>{
     const {pageNo = 0, limit = 10} = req.query
   const posts =   await Post.find({}).sort({createdAt : -1}).skip(parseInt(pageNo) * parseInt(limit)).limit(parseInt(limit))
   res.json(posts)

}

const SearchPost = async (req,res)=>{
     const {title} = req.query
     if (!title.trim()){
          return res.status(401).json({error : "Search Query Is Missing"})
     }
     const posts = await Post.find({title : { $regex : title, $options : "i"}})

     res.json({posts : posts.map((post)=>({
          id : post._id,
          title : post.title,
          meta : post.meta,
          category : post.category,
          slug : post.slug,
          thumbnail : post.thumbnail,
          author : post.author,

     })
     )})
}


const FilterPost = async (req,res)=>{
     const {category} = req.params;
     if (!category){
          return res.status(401).json({error : "Invalid request"});
     }
     const post = await Post.find({category : category})
     if (!post){
          return res.status(404).json({error : "Post Not Found"})
     }
     res.json(post)

}


const UploadImage = async (req,res)=>{
     const {file} = req
     if (!file) {
          return res.status(401).json({error : "image field Must Be There"})
     }
     const {secure_url : url} = await cloudinary.uploader.upload(file.path)

     res.status(201).json({Image : url})
}

const GetAllData = async (req,res)=>{
     try {
          const getdata = await Post.find()
          res.send(getdata)
     } catch (e) {
          res.send(e)
          
     }
}

module.exports = {createPost,deletePost,UpdatePost,GetPost,LatestPosts,SearchPost,FilterPost,UploadImage,GetAllData}