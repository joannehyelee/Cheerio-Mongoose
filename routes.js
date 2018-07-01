module.exports = function(app){

    const application = require('./routes/application');

    app.use('/', application);

}