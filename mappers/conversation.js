'use strict'

exports.toModel = (entity) => {
    const model = {
        msgFrom: entity.msgFrom,
        msgTo: entity.msgTo,
        msg: entity.msg,
        date: entity.createdOn,
    }
    return model
}

exports.toSearchModel = (entities) => {
    return entities.map((entity) => {
        return exports.toModel(entity)
    })
}
