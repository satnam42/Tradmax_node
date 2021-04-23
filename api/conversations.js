'use strict'
const service = require('../services/conversations')
const response = require('../exchange/response')
const chatMapper = require('../mappers/conversation')

const getOldChat = async (req, res) => {
    const log = req.context.logger.start(`api:conversations:getOldChat:${req.params.id}`)
    try {
        const oldChat = await service.getOldChat(req.query, req.context)
        log.end()
        return response.page(res, chatMapper.toSearchModel(oldChat), Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, oldChat.count)
    } catch (err) {
        log.error(err)
        log.end()
        return response.failure(res, err.message)
    }
}

exports.getOldChat = getOldChat
