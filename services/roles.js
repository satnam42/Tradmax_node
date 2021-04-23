const buildRole = async(model, context) => {
    const { type } = model;
    const log = context.logger.start(`services:roles:buildRole${model}`);
    const role = await new db.role({
        type: type,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return role;
};

const create = async(model, context) => {
    const log = context.logger.start("services:roles:create");
    const isRole = await db.role.findOne({ type: { $eq: model.type } });
    if (isRole) {
        throw new Error("role already exists");
    } else {
        const role = buildRole(model, context);
        log.end();
        return role;
    }
};

// getroles
const getRoles = async(query, context) => {
    const log = context.logger.start(`services:roles:getroles`);
    let roles = await db.role.find()
    roles.count = await db.role.find().count();
    log.end();
    return roles;
};

const deleteRole = async(id, context) => {

    const log = context.logger.start(`services:roles:deleterole`);

    if (!id) {
        throw new Error("roleId is requried");
    }

    let role

    role = await db.role.findOne({ _id: id });

    role = await db.role.deleteOne({ _id: id });

    role = null

    role = await db.role.findOne({ _id: id });

    if (role) {
        throw new Error("something went wrong");
    }

    role.message = 'role Deleted Successfully'
    log.end();
    return admin
};


exports.create = create;
exports.getRoles = getRoles;
exports.deleteRole = deleteRole;