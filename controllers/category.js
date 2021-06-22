const Category=require("../models/category")


exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found"
            })
        }
        res.category=cate
        next()
    })
}

exports.createCategory=(req,res)=>{
    const category= new Category(req.body)
    category.save((error,category)=>{
        if(error){
            return res.status(400).json({
                error:"Not able to save category"
            })
        }
        res.json({category})
    })
}

exports.getCategory=(req,res)=>{
    return res.json(req.category)
}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,items)=>{
        if(err){
            return res.status(400).json({
                error:"No Category founds"
            })
        }
        res.json(items)
    })
}

// exports.updateCategory=(req,res)=>{
//     const category=req.category
//     category.name=req.body.name
//     Category.save((err,updatedCategory)=>{
//         if(err){
//             return res.status(400).json({
//                 error:"Failed to update category"
//             })
//         }
//         res.json(updatedCategory)
//     })
// }

exports.updateCategory=(req,res)=>{
    try {
        const category=req.category
        if(!category){
            return res.send("No Category found")
        }
        Category.name=req.body.name
        category.save((err,updatedCategory)=>{
            if(err){
                return res.status(400).json({
                    error:"Failed to update category"
                })
            }
            res.json(updatedCategory)
        })
    } catch (err) {
        console.log(err);
    }
}


exports.removeCategory=(req,res)=>{
    const category=req.category
    Category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete category"
            })
        }
        res.json({
            message:"Successfully deleted category"
        })
    })
}