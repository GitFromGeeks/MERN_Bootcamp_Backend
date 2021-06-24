const Product=require("../models/product")
const formidable=require("formidable")
const _ =require("lodash")
//file system fs
const fs=require("fs")
const category = require("../models/category")

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id).populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not Found"
            })
        }
        req.product=product
        next()
    })
}

exports.createProduct=(req,res)=>{
    let form=new formidable.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"Problem with Image"
            })
        }
        // destructure the fileds
        const {name,description,price,category,stock}=fields

        if(
            !name ||
            !description ||
            !price  ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error:"Please include all fields"
            })
        }
        let product=new Product(fields)

        //Handle file here
        if(file.photo){
            if(file.photo.size>3000000){
                return res.status(400).json({
                    error:"File size too big !"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path)
            product.photo.contentType=file.photo.type
        }

        //save to the db
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"Saving T-shirt in DB failed"
                })
            }
            res.json(product)
        })
    })
}