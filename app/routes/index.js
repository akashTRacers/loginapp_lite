const initUsers = require("./users");
const openHome= require("./openHome.js");
const initRoutes = (app) => {
    console.log("inside index.js");
    app.use('/', openHome());
    //app.use('/users', initUsers()); 

}
module.exports = initRoutes;
