const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true }, (err) => {
    if(!err) {
        console.log('Mongo DB Connection Success')
    }
    else{
        console.log('Error in Mongo Connection : '+ err)
    }
});

require('./employee.model');
