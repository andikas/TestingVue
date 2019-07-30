const Category = require('../models/category');

exports.list = function(req, res, next) {
  Category.find().exec(function(err, categorys) {
      if (err) next(err);
      res.json({categorys});
    });
};

exports.create = function(req, res, next) {
  console.log('aaa',req.body);
  var tempDefault = false;
  Category.count(function(err, count) {
    if (count == 0){
      tempDefault = true;
    }

    var category = new Category({ name: req.body.form.name, default: tempDefault });
    category.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json(category);
    });
  });
};

exports.updateAll = function(req, res, next) {
  console.log('aaa',req.body);
  Category.remove().exec();
  Category.insertMany(req.body, function(error, docs) {
      if (err) {
      return next(err);
    }
    res.json(docs);
  });
  // category.save(function(err) {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.json(category);
  // });
};
