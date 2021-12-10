var express = require('express')
var router = express.Router()
var subscriptionBl = require('../models/subscriptionsBL')


router.route('/').get(async (req, resp) => {
    var subscription = await subscriptionBl.getALL()
    return resp.json(subscription)
})

router.route('/:id').get(async (req, resp) => {
    var id = req.params.id
    var subscription = await subscriptionBl.getById(id)
    return resp.json(subscription)
})

router.route('/').post(async (req, resp) => {
    var newSubscription = req.body;
    var result = await subscriptionBl.addSubscription(newSubscription)
    return resp.json(result)
})

router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var updateSubscription = req.body;
    var result = await subscriptionBl.updateSubscription(updateSubscription, id);
    return resp.json(result)
})

router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    var result = await subscriptionBl.deleteSubscription(id);
    return resp.json(result)
})

module.exports = router