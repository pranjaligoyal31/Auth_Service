const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const db = require('./models/index');
const { User, Role } = require('./models/index');

//const UserRepository = require('./repository/user-repository');
const UserService = require('./services/user-service'); 

const app = express();
app.use(express.json());

const prepareAndStartServer = () =>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async() => {
        console.log(`server started on Port: ${PORT}`);
        if(process.env.DB_SYNC) {
            db.sequelize.sync({alter: true});
        }

        const u1 = await User.findByPk(2);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);
        const response = await u1.hasRole(r1);//this will give users with admin role..this is the power of using sequelize,,we don't need to write the raw queries
        console.log(response);
        //const repo = new UserRepository();
       // const response = await repo.getById(1);
        //console.log(response);

        const service = new UserService();
        const newToken = service.createToken({email: 'pranjali@admin.com', id: 1});
        console.log("new token is", newToken);
        //const token = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5qYWxpQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE3MzgzODU3NDYsImV4cCI6MTczODM4OTM0Nn0.l_63QqpVCJc2VvtdgXtd8nxh5_dX-AIrHLq2fCxinn0';
        //const response = service.verifyToken(token);
        //console.log(response);
    });
}

prepareAndStartServer();