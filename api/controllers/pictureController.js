var fs = require('fs');
var Rsync = require('rsync');
var config = require('../../config.json');

exports.list_all_pictures = function(req, res) {
    var jsonArr = [];
    fs. readdir(config.rsyncDst, function(err, items) {
        for (var i=0; i<items.length; i++) {
            jsonArr.push(items[i]);
    }
    if (err)
        res.send(err);
    res.json(jsonArr);
})};

exports.picture = function(req, res, name) {
    var img = fs.readFileSync(config.rsyncDst + name).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');
};
exports.cache = function(req, res, name) {
    var rsync = new Rsync()
        .shell('ssh -p 202')
        .flags('-chavzP')
        .set('--size-only')
        .source(config.rsyncUser + '@' + config.rsyncServer + ':' + config.rsyncSrc)
        .destination(config.rsyncDst);  
        var c = rsync.command();
        rsync.execute(function(error, code, cmd) {
            res.send('Success');  
        });
};
