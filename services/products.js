const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;

const set = async (model, products, context) => {

    const log = context.logger.start("services:products:set");
    if (model.name !== "string" && model.name !== undefined) {
        products.name = model.name;
    }
    if (model.subCategory !== "string" && model.subCategory !== undefined) {
        let isSubCategoryExists = await db.categories.findById(model.subCategory)
        if (isSubCategoryExists) {
            products.subCategory = { id: isSubCategoryExists.id, name: isSubCategoryExists.name }
        } else {
            throw new Error("subcategory not found");
        }
    }
    if (model.status !== "string" && model.status !== undefined) {
        products.status = model.status;
    }
    if (model.description !== "string" && model.description !== undefined) {
        products.description = model.description;
    }
    log.end();
    await products.save();
    return products;
};

const build = async (model, context) => {
    const { name, description, units, image, subCategory, variation, status } = model;
    const log = context.logger.start(`services:products:build${model}`);
    let productModel = {
        name: name,
        units: units,
        description: description,
        image: image,
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
    const products = await db.product.find({ "subCategory.id": query.subCategoryId }).skip(skipCount).limit(pageSize);
    // const property = [];
    // for (let element of products) {
    //     let pId = element._id.toString();
    //     let likesLs = await db.like.find({ propertyId: { $eq: pId } });
    //     element.likeCount = likesLs.length;
    //     likes.forEach(like => {
    //         /*converting object id to string here*/
    //         let propId = like.propertyId.toString();
    //         if (propId === pId) {
    //             element.isLiked = true;
    //         }
    //     });
    //     property.push(element);
    // }
    log.end();
    return products;
};

const getAllProducts = async (query, context) => {
    const log = context.logger.start(`services:products:getAllProducts`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    const products = await db.product.find().skip(skipCount).limit(pageSize);
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

// const update = async (id, model, context) => {
//     const log = context.logger.start(`services:products:update`);
//     if (!id) {
//         throw new Error(" product id is required");
//     }
//     let product = await db.products.findById(id);
//     if (!product) {
//         throw new Error("invalid products");
//     }
//     const products = await set(model, product, context);
//     log.end();
//     return products

// };

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

exports.create = create;
exports.uploadProductFiles = uploadProductFiles;
exports.getAllProducts = getAllProducts;
exports.filterProducts = filterProducts;
exports.productsBySubCategories = productsBySubCategories;
exports.similarProducts = similarProducts;
exports.deleteProduct = deleteProduct;