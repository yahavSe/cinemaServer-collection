var express = require('express')
var router = express.Router()
var membersBl = require('../models/membersBL')

router.route('/').get(async (req, resp) => {
    var members = await membersBl.getALL()
    if (members.length === 0) {
        var membersList = await membersBl.usersImport()
        return resp.json(membersList)
    }
    else {
        return resp.json(members)
    }
})
router.route('/:id').get(async (req, resp) => {
    var id = req.params.id
    var member = await membersBl.getById(id)
    return resp.json(member)
})

router.route('/').post(async (req, resp) => {
    var newMember = req.body;
    var result = await membersBl.addMember(newMember)
    return resp.json(result)
})

router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var updateMember = req.body;
    var result = await membersBl.updateMember(updateMember, id);
    return resp.json(result)
})

router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    var result = await membersBl.deleteMember(id);
    return resp.json(result)
})

module.exports = router