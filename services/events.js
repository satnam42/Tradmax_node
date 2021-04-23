
"use strict";
const build = async (model, context) => {
    const { title, description, userId, start, end } = model;
    const log = context.logger.start(`services:event:build${model}`);
    const event = await new db.event({
        title: title,
        description: description,
        start: start,
        end: end,
        user: userId,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return event;
};
const set = (model, event, context) => {
    const log = context.logger.start("services:events:set");
    if (model.title !== "string" && model.title !== undefined && model.title !== '') {
        event.title = model.title;
    }
    if (model.description !== "string" && model.description !== undefined && model.description !== '') {
        event.description = model.description;
    }
    if (model.start !== "string" && model.start !== undefined && model.start !== '') {
        event.start = model.start;
    }
    if (model.end !== "string" && model.end !== undefined && model.end !== '') {
        event.end = model.end;
    }
    event.updatedOn = new Date();
    log.end();
    event.save();
    return event;
};


const create = async (model, context) => {
    const log = context.logger.start("services:events:create");
    const event = build(model, context);
    log.end();
    return event;
};

const eventsByUserId = async (id, context) => {
    const log = context.logger.start(`services:events:eventsByUserId`);
    if (!id) throw new Error('userId is required')
    const events = await db.event.find({ user: id }).populate('user', 'firstName');
    log.end();
    return events;
};

const allEvents = async (context) => {
    const log = context.logger.start(`services:events:allEvents`);
    const events = await db.event.find().populate('user', 'firstName');
    log.end();
    return events;
};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:events:update`);
    if (!id) throw new Error("event id is required");
    let event = await db.event.findById(id).populate('user', 'firstName');;
    if (!event) throw new Error("event not found");
    event = await set(model, event, context);
    log.end();
    return event
};

const removeEventsById = async (id, context) => {
    const log = context.logger.start(`services:events:removeEventsById`);
    if (!id) throw new Error("event id is required");
    let isDeleted = await db.event.deleteOne({ _id: id })
    if (!isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return
};

exports.create = create;
exports.eventsByUserId = eventsByUserId;
exports.update = update;
exports.allEvents = allEvents;
exports.removeEventsById = removeEventsById;