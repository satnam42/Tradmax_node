const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;

const set = async (model, product, context) => {

    const log = context.logger.start("services:products:set");

    if (model.name !== "string" && model.name !== undefined) {
        product.name = model.name;
    }

    // if (model.subCategory !== "string" && model.subCategory !== undefined) {
    //     let isSubCategoryExists = await db.category.findById(model.subCategory)
    //     if (isSubCategoryExists) {
    //         product.subCategory = { id: isSubCategoryExists.id, name: isSubCategoryExists.name }
    //     } else {
    //         throw new Error("subcategory not found");
    //     }
    // }

    if (model.variation !== "string" && model.variation !== undefined) {
        product.variation = model.variation;
    }

    if (model.description !== "string" && model.description !== undefined) {
        product.description = model.description;
    }
    
    if (model.content !== "string" && model.content !== undefined) {
        product.content = model.content;
    }
    
    if (model.units !== "string" && model.units !== undefined) {
        product.units = model.units;
    }

    if (model.price !== "string" && model.price !== undefined) {
        product.price = model.price;
    }

    if (model.status !== "string" && model.status !== undefined) {
        product.status = model.status;
    }

    log.end();
    await product.save();
    return product;
};

const build = async (model, context) => {
    const { name, description, units, content, price, subCategory, variation, status } = model;
    const log = context.logger.start(`services:products:build${model}`);
    let productModel = {
        name: name,
        units: units,
        description: description,
        price: price,
        content: content,
        subCategory: subCategory,
        status: status,
        variation: variation,
        createdOn: new Date(),
        updatedOn: new Date()
    }
    const products = await new db.product(productModel).save();
    log.end();
    return products;
};

const create = async (model, context) => {
    const log = context.logger.start("services:products:create");
    let isSubCategoryExists = {}
    if (model.subCategory !== "string" && model.subCategory !== undefined) {
        isSubCategoryExists = await db.categories.findById(model.subCategory)
    }
    if (isSubCategoryExists) {
        model.subCategory = { id: isSubCategoryExists.id, name: isSubCategoryExists.name }
    } else {
        throw new Error("subcategory not found");
    }
    const products = build(model, context);
    log.end();
    return products;
};


// const getById = async (id, context) => {
//     const log = context.logger.start(`services:products:getById:${id}`);
//     const products = await db.products.findById(id);
//     log.end();
//     return products;
// };

const productsBySubCategories = async (query, context) => {
    const log = context.logger.start(`services:products:productsBySubCategories`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let pageSort = Number(query.pageSort) || 1;
    let priceSort = Number(query.priceSort) || 1;
    const products = await db.product.find({ "subCategory.id": query.subCategoryId }).skip(skipCount).limit(pageSize).sort({ _id: pageSort , price: priceSort } );

    const product = [];
    for (let element of products) {
        let pId = element._id.toString();
        let likesLs = await db.favorite.find({ user: { $eq: query.userId } ,product: { $eq: pId } });
        let likes = await db.favorite.find({ product: { $eq: pId } });
        element.likeCount = likes.length;
        likesLs.forEach(like => {
            /*converting object id to string here*/
            let prodId = like.product.toString();
            if (prodId === pId) {
                element.isLiked = true;
            }
        });
        product.push(element);
    }
    log.end();
    return products;
};

const getAllProducts = async (query, context) => {
    const log = context.logger.start(`services:products:getAllProducts`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    const products = await db.product.find().skip(skipCount).limit(pageSize);
    const product = [];
    for (let element of products) {
        let pId = element._id.toString();
        let likesLs = await db.favorite.find({ user: { $eq: query.userId } ,product: { $eq: pId } });
        let likes = await db.favorite.find({ product: { $eq: pId } });
        element.likeCount = likes.length;
        likesLs.forEach(like => {
            /*converting object id to string here*/
            let prodId = like.product.toString();
            if (prodId === pId) {
                element.isLiked = true;
            }
        });
        product.push(element);
    }
    log.end();
    return products;
};

const similarProducts = async (query, context) => {
    const log = context.logger.start(`services:products:similarProducts`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    const products = await db.product.find({ "subCategory.id": query.subCategoryId }).skip(skipCount).limit(pageSize);
    log.end();
    return products;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:products:update`);
    if (!id) {
        throw new Error(" product id is required");
    }
    let product = await db.product.findById(id);
    if (!product) {
        throw new Error("invalid products");
    }
    const products = await set(model, product, context);
    log.end();
    return products

};

const deleteProduct = async (id, context) => {
    const log = context.logger.start(`services:products:deleteProduct`);

    let isProductExists = await db.product.findById(id);
    await db.product.remove({ '_id': ObjectId(id) });
    log.end();
    return isProductExists
};

const uploadProductFiles = async(id, files, model, context) => {
    const log = context.logger.start(`services:products:uploadProductFiles`);
    let product = await db.product.findById(id);
    if (!files) {
        throw new Error("image not found");
    }
    if (!product) {
        throw new Error("product not found!!");
    }
    if(!product.productFiles){
        const uploadfile = []
        for(let file of files){
            const avatar = imageUrl + 'assets/images/' + file.filename
            let fileType = file.mimetype.split('/')[0]
            uploadfile.push({ url : avatar, type: fileType})
        }
        product.productFiles = uploadfile
        await product.save();
        log.end();
        return product
    }else{
        for(let file of files){
            const avatar = imageUrl + 'assets/images/' + file.filename
            let fileType = file.mimetype.split('/')[0]
            product.productFiles =  product.productFiles.concat({ url : avatar, type: fileType})
        }
        await product.save();
        log.end();
        return product
    }

};

const filterProducts = async(model, context) => {
    const log = context.logger.start(`services:products:filterProducts`);
    let minPrice = model.minPrice
    let maxPrice = model.maxPrice;
    const query = {}
    if (model.name) {
        query.name = model.name
    }
    if (model.minPrice || model.maxPrice) {
            query.price = { $gte :  Number(minPrice), $lte : Number(maxPrice) }
    }
    // if (model.subCategory) {
    //     query.subCategory.name = model.subCategory
    // }
    const products = db.product.find(query);
    
    
    
    // find(
    //     {
    //         "$or": [
    //             { "name" : { "$regex": model.name, "$options":"i"} },
    //             { "subCategory.name" :   { "$regex": model.subCategory, "$options":"i"} }, 
    //             // { "variation.items.price" :           { "$regex": input_data, "$options":"i"} }, 
    //             // { "writers" :        { "$regex": input_data, "$options":"i"} }, 
    //             // { "genres.name" :    { "$regex": input_data, "$options":"i"} }, 
    //             // { "directors" :      { "$regex": input_data, "$options":"i"} }
    //         ]
    //     },
    // );
    log.end();
    return products;
    // { variation: { $elemMatch: { "items.price": { $gte :  Number(minPrice), $lte : Number(maxPrice)} } } }
    // variation.items.price : { $gte :  Number(minPrice), $lte : Number(maxPrice)},
    // "subCategory.name" : { $eq: model.subCategory },
    // status: { $eq: 'active' }
};

const search = async(query, context) => {
    if(query.searchType == 'product'){
        let user = context.user;
        let allproduct = await db.product.find({
            $or: [{
                "name": query.search
            },{
                "description": query.search
            },{
                "price": query.search
            },{
                "subCategory.name": query.search
            }],
        });
        const log = context.logger.start(`services:products:search`);
        log.end();
        const product = [];
        for (let element of allproduct) {
            let pId = element._id.toString();
            let likesLs = await db.favorite.find({ user: { $eq: ObjectId(user.id) } ,product: { $eq: pId } });
            let likes = await db.favorite.find({ product: { $eq: pId } });
            element.likeCount = likes.length;
            likesLs.forEach(like => {
                /*converting object id to string here*/
                let prodId = like.product.toString();
                if (prodId === pId) {
                    element.isLiked = true;
                }
            });
            product.push(element);
        }
        return allproduct;
    }
    else if(query.searchType == 'category'){
        let allproduct = await db.category.find({
            $or: [{
                "name": query.search
            }],
        });
        const log = context.logger.start(`services:products:search`);
        log.end();
        return allproduct;
    }
};

exports.create = create;
exports.uploadProductFiles = uploadProductFiles;
exports.getAllProducts = getAllProducts;
exports.filterProducts = filterProducts;
exports.productsBySubCategories = productsBySubCategories;
exports.similarProducts = similarProducts;
exports.deleteProduct = deleteProduct;
exports.update = update;
exports.search = search;