let Item = require('../models/item');

exports.list = function(req, res){
    console.log("Item.list");
    Item.find({}, function(err, items){
        if(err){
            console.log(err);
        } else{
            console.log(items);
            res.render('items', { title: 'Items', items: items });
        }
    });
};

exports.load = function(req, res, next){
    var id = req.params.id;
    req.item = items[id];
    if (req.item) {
        next();
    } else {
        var err = new Error('cannot find item ' + id);
        err.status = 404;
        next(err);
    }
};

exports.view = function(req, res){
    res.render('items/view', {
        title: 'Viewing item ' + req.item.name,
        item: req.item
    });
};

exports.edit = function(req, res){
    res.render('items/edit', {
        title: 'Editing item ' + req.item.name,
        item: req.item
    });
};

exports.update = function(req, res){
    // Normally you would handle all kinds of
    // validation and save back to the db
    var item = req.body.item;
    req.item.name = item.name;
    req.item.email = item.email;
    res.redirect('back');
};