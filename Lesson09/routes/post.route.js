const express = require('express')
const router = express.Router();

const MOCK_DATA = [
    {
        title: 'Test',
        des: 'Test'
    },
    {
        title: 'Test 1',
        des: 'Test 1'
    }
]

router.get('/all', (req, res) => {
    return res.json(MOCK_DATA)
})


router.post('/create', (req, res) => {
    return res.json('Create post')
})

module.exports = router;