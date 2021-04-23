const fs = require('fs');

const path = require("path");
const buildImage = async(model, context) => {
    const { image, id, gallery, imageFor } = model;
    const log = context.logger.start(`services:images:buildImage${model}`);
    const user = await new db.image({
        image: image,
        gallery: gallery,
        id: id,
        imageFor: imageFor,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return user;
};
const uploadSingle = async(files, body, context) => {
    const log = context.logger.start(`services:image:upload`);
    let fileName = files[0].filename.replace(/ /g, '') // remove space from string
    let file = files[0]
    let query = { id: body.id }
    let image = await db.image.findOne(query)

    let model = {
        image: fileName,
        id: body.id,
        imageFor: body.imageFor
    }

    if (!image) {
        let imageObj = await buildImage(model, context)
        if (imageObj.imageFor == 'user') {
            const filter = { _id: imageObj.id };
            const update = {};
            update.image = imageObj._id
            let isUser = await db.user.findOneAndUpdate(filter, { $set: update }, { new: true })
            if (!isUser) {
                throw new Error(`Given id is not belong ${imageObj.imageFor}, please change imageFor according to respected id `)
            }
        }
    } else {
        let path = file.destination + '/' + image.image
        try {
            await fs.unlinkSync(path);
            console.log(`image successfully removed from ${path}`);
        } catch (error) {
            console.error('there was an error to remove image:', error.message);
        }
        image.image = fileName
        await image.save()
    }

    log.end();
    return 'image uploaded successfully'
};

const uploadMultiple = async(files, body, context) => {
    const log = context.logger.start(`services:images:uploadMultiple ${files}`);
    const query = { id: body.id };
    let image = await db.image.findOne(query)
    let gallery = []
    let model
    if (image) {
        for (file of files) {
            image.gallery.push({ image: file.filename.replace(/ /g, '') })
        }
        await image.save()
    } else {
        for (file of files) {
            gallery.push({ image: file.filename.replace(/ /g, '') })
        }
        model = {
            image: "",
            id: body.id,
            imageFor: body.imageFor,
            gallery: gallery
        }
        let imageObj = await buildImage(model, context)
        if (imageObj.imageFor == 'user') {
            const filter = { _id: imageObj.id };
            const update = {};
            update.image = imageObj._id
            let isUser = await db.user.findOneAndUpdate(filter, { $set: update }, { new: true })
            if (!isUser) {
                throw new Error(`image id is ${imageObj._id} please update it in ${imageObj.imageFor}`)
            }
        }
    }
    log.end();
    return 'gallery updated successfully'
};
const remove = async(model, context) => {
    const log = context.logger.start(`services:images:uploadMultiple ${model}`);
    let imagePath = path.join(__dirname, '../', 'assets/images');
    if (!model.id) {
        throw new Error(`id not found`)
    }

    if (!model.image) {
        throw new Error(`image not found`)
    }

    const query = { id: model.id };

    let image = await db.image.findOne(query)

    if (!image) {
        throw new Error(`image not found`)
    }

    image = await db.image.update(
        query, { $pull: { gallery: { image: model.image } } }, { multi: true }
    );
    // fs.unlinkSync(`${imagePath}/${model.image} `) 
    log.end();
    return 'gallery updated successfully'
};

exports.uploadSingle = uploadSingle;
exports.uploadMultiple = uploadMultiple;
exports.remove = remove;