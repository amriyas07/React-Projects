const User = require('../controllers/user');

module.exports = function (app){
    app.use('/user',User);
}
