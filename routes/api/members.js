const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const members = [
    { id: 1, name: "Ankesh" },
    { id: 2, name: "Gabbar" }
];

//Get All Members
router.get('/', (req, res) => {
    res.json(members);
});

//Get Member by ID
router.get('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(members => members.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ message: `Nothing Found With id = ${req.params.id}` });
    }
});

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name
    }

    if (!newMember.name) {
        return res.status(400).json({ "message": "Please include name" })
    }

    members.push(newMember);
    res.json(members);
});

//update member
router.put('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;

                res.json({ message: "Updated", members })
            }
        });
    } else {
        res.status(400).json({ message: `Nothing Found With id = ${req.params.id}` });
    }

});

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some(members => members.id === parseInt(req.params.id));

    if (found) {
        res.json({
            message: "Member Deleted",
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({ message: `Nothing Found With id = ${req.params.id}` });
    }
});

module.exports = router;