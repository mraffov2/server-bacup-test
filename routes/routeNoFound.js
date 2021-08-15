const {Router} = require('express');
const { response } = require('express');
const router = Router()

router.get('/*', async (req, res = response) => {
    res.status(404).json({
        ok: false,
        message: 'Route no found'
    })
})

module.exports = router