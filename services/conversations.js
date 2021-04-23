'use strict'

const getOldChat = async (query, context) => {
    const log = context.logger.start('services:conversations:getOldChat')

    let pageNo = Number(query.pageNo) || 1
    let pageSize = Number(query.pageSize) || 10

    let skipCount = pageSize * (pageNo - 1)

    const chat = await db.conversation.find({ room: query.room_id }).skip(skipCount).limit(pageSize)

    chat.count = await db.conversation.find({ room: query.room_id }).count()
    log.end()
    return chat
}

exports.getOldChat = getOldChat

