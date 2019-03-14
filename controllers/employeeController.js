const express = require('express')
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
res.render("employee/addorEdit",{
    viewTitle : "Insert Employee"
});
});

router.post('/',(req,res)=>{
    if(req.body._id == '')
    {
    console.log(req.body); 
    insertRecord(req,res);
    }
else
{
    updateRecord(req,res);
}
    
});

function insertRecord(req,res){
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err)
        {
            res.redirect('employee/list');
        }
        else{
            if(err.name == 'ValidationError')
            {
                handlevalidationError(err,req.body);
            res.render("employee/addorEdit",{
                viewTitle : "Insert Employee",
                employee : req.body
            });
            
            }
            else{
                console.log('Error during record inserstion : '+ err);
      
            }
        }
    });
    
}


function updateRecord(req,res)
{
    Employee.findOneAndUpdate({_id : req.body._id}, req.body, {new : true, useFindAndModify: false},(err,doc) => {
        if(!err)
        {
            res.redirect('employee/list');
        }
        else if(err.name == 'ValidationError')
            {
                handlevalidationError(err, req.body);
                res.render("employee/addorEdit", {
                    viewTitle : "Update Employee",
                    employee : req.body
                });
            }
        
        else{

        }
    });
}

router.get('/list',(req,res)=>{
    Employee.find((err,docs) => {
        if(!err)
        {
            res.render('employee/list', {
                list : docs
            });
        }
        else{
            console.log('Error in retriving employee list : '+ err);
        }
    });
});
function handlevalidationError(err,body)
{
    for(field in err.errros)
    {
        switch(err.errros[field].path)
        {
            case 'fullname':
            body['fullnameError'] = err.errros[field].message;
            break;

            case 'email':
            body['emailError'] = err.errros[field].message;
            break;

            default :
            break;
        }
    }
}
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id, (err,doc)=> {
        if(!err)
        {
            res.render("employee/addorEdit", {
                viewTitle : "Update Employee",
                employee : doc
            });
        }
    });
});
router.get('/delete/:id',(req,res) => {
    Employee.findByIdAndRemove(req.params.id, (err,doc) => {
        if(!err)
        {
            res.redirect('/employee/list');
        }
        else{
          console.log('Error in employee delete :' + err);  
        }
    });
});
module.exports = router;