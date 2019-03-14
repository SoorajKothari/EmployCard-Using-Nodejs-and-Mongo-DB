const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : 'This field is reuqired'
    },
    email : {
        type : String
    },
    mobile : {
        type : String
    },
    city : {
        type : String
    }
});
employeeSchema.path('email').validate((val) => {
     emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val); 
 }, 'Invalid e-mail');
mongoose.model('Employee',employeeSchema);