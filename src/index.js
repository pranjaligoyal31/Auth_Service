const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

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