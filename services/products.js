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

const uploadProductImage = async (id, file, context) => {

    const log = context.logger.start(`services:products:uploadProductImage`);
    let property = await db.product.findById(id);
    if (!files) {
        throw new Error("image not found");
    }
    if (!property) {
        throw new Error("product not found!!");
    }
    if(!property.productImages){
        const uploadfile = []
        for(let file of files){
            const avatar = imageUrl + 'assets/images/' + file.filename
            let fileType = file.mimetype.split('/')[0]
            uploadfile.push({ url : avatar, type: fileType})
        }
        property.productImages = uploadfile
        await property.save();
        log.end();
        return property
    }else{
        for(let file of files){
            const avatar = imageUrl + 'assets/images/' + file.filename
            let fileType = file.mimetype.split('/')[0]
            property.productImages =  property.productImages.concat({ url : avatar, type: fileType})
        }
        await property.save();
        log.end();
        return property
    }


};


// const getById = async (id, context) => {
//     const log = context.logger.start(`services:products:getById:${id}`);
//     const products = await db.products.findById(id);
//     log.end();
//     return products;
// };


// const productList = async (query, context) => {
//     const log = context.logger.start(`services:products:get`);
//     let pageNo = Number(query.pageNo) || 1;
//     let pageSize = Number(query.pageSize) || 10;
//     let skipCount = pageSize * (pageNo - 1);
//     let products
//     if (query.role == "customer") {
//         if (query.storeId === '' || query.storeId === "string" || query.storeId === undefined) {
//             throw new Error('Store id is required')
//         }
//         if (query.excludeCustomerGroup === 'true') {
//             products = await db.products
//                 .find({
//                     // 'category.id': { $ne: query.customerGroup },
//                     assignedVendors: { $elemMatch: { storeId: query.storeId } }
//                 })
//                 .skip(skipCount)
//                 .limit(pageSize);
//             products.count = await db.products.find({
//                 'category.id':
//                     { $ne: query.customerGroup },
//                 assignedVendors: { $elemMatch: { storeId: query.storeId } }
//             }).countDocuments();

//         } else if (query.customerGroup) {
//             let suggestedProducts = await db.order.find({
//                 userId: query.userId
//             }).sort({ _id: -1 }).limit(1)

//             products = await db.products
//                 .find({
//                     'category.id': query.customerGroup,
//                     assignedVendors: { $elemMatch: { storeId: query.storeId } }
//                 }).sort({ name: 1 })
//             // .skip(skipCount)
//             // .limit(pageSize);

//             if (suggestedProducts.length) {
//                 products.forEach((productItem, index) => {
//                     suggestedProducts[0].products.forEach(suggestedProductItem => {
//                         if (ObjectId(productItem.id).equals(suggestedProductItem.id)) {
//                             products.splice(index, 1);
//                             products.splice(0, 0, productItem);
//                         }
//                     })
//                 })
//             }
//             products.splice(pageSize, products.length);
//             products.count = await db.products.find({ 'category.id': query.customerGroup, assignedVendors: { $elemMatch: { storeId: query.storeId } } }).countDocuments();
//         } else {
//             {
//                 products = await db.products
//                     .find({ assignedVendors: { $elemMatch: { storeId: query.storeId } } })
//                     .skip(skipCount)
//                     .limit(pageSize);
//                 products.count = await db.products.find({ assignedVendors: { $elemMatch: { storeId: query.storeId } } }).countDocuments();
//             }

//         }
//     } else {
//         products = await db.products
//             .find({})
//             .skip(skipCount)
//             .limit(pageSize);
//         products.count = await db.products.find({}).countDocuments();
//     }

//     log.end();
//     return products;
// };

const productsBySubCategories = async (query, context) => {
        const log = context.logger.start(`services:productsBySubCategories:get`);
        // let subCategories = [];
        // query.subCategories = query.subCategories.split(",");
        // query.subCategories.forEach(function (opt) {
        //     subCategories.push(new RegExp(opt, "i"));
        // });
        // let pageNo = Number(query.pageNo) || 1;
        // let pageSize = Number(query.pageSize) || 10;
        // let skipCount = pageSize * (pageNo - 1);
        const products = await db.product.find({ "subCategory.id": query.subCategoryId })
            // .skip(skipCount)
            // .limit(pageSize);
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

// const deleteProduct = async (id, context) => {
//     const log = context.logger.start(`services:assignLeads:deletePotentialCustomer`);

//     let isProductExists = await db.products.findById(id);
//     await db.products.remove({ '_id': id });
//     log.end();
//     return isProductExists
// };


exports.create = create;
// exports.productList = productList;
// exports.update = update;
// exports.getById = getById;
exports.productsBySubCategories = productsBySubCategories;
// exports.search = search;
// exports.asignVendor = asignVendor;
// exports.productsByVendor = productsByVendor;
exports.uploadProductImage = uploadProductImage;
// exports.addQuantity = addQuantity;
// exports.uploadPdf = uploadPdf;
// exports.deleteProduct = deleteProduct;