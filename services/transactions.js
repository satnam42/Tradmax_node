

"use strict";

const sk = require('config').get('stripe').private
console.log('sk', sk)
const stripe = require('stripe')(sk)


const buildTransaction = async (model, context) => {
    const log = context.logger.start(`services:transactions:buildTransaction${model}`);
    const transaction = await new db.transaction({
        paymentId: model.id,
        receiptUrl: model.receipt_url,
        amount: model.amount,
        status: model.status,
        user: context.user._id,
    }).save();
    log.end();
    return transaction;
};

const create = async (model, context) => {
    const log = context.logger.start("services:transactions:create");
    const charge = await stripe.charges.create({
        amount: model.amount,
        currency: 'inr',
        source: model.source,
    });
    const transaction = buildTransaction(charge, context);
    log.end();
    return transaction;

};

const getTransactions = async (query, context) => {
    const log = context.logger.start(`services:transactions:getTransactions`);
    let transactions = await db.transaction.find()
    transactions.count = await db.transaction.find().count();
    log.end();
    return transactions;
};

const getTransactionsByUserId = async (id, context) => {
    const log = context.logger.start(`services:transactions:getTransactionByUserId`);
    if (!id) throw new Error("user Id is requried");
    let transactions = await db.transaction.findOne({ user: id });
    if (transaction) throw new Error("no transtion found");
    log.end();
    return transactions
};

exports.create = create;
exports.getTransactions = getTransactions;
exports.getTransactionsByUserId = getTransactionsByUserId;