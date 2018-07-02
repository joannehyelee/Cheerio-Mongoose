module.exports = function(app){

    const application = require('./routes/application');
    const articles = require('./routes/articles');

    app.use('/', application);
    app.use('/articles', articles);

}