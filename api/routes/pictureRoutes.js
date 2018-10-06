var express = require('express');
var router = express.Router();
var pictureController = require('../controllers/pictureController')
router.get('/', function(req,res) {
    res.send('picture home');
})

router.get('/list', pictureController.list_all_pictures);
router.get('/cache', pictureController.cache);

router.get('/img/:name', function(request, response, next){
    var name = request.params.name;
    pictureController.picture(request, response, name);
});

module.exports = router