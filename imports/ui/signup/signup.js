import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import {Driver} from '/lib/api/api.js';
import {Taxi} from '/lib/api/api.js';
import {Available} from '/lib/api/api.js';

import './signupTemplate.html';
import './signup.html';

Template.signup.onRendered( function() {

    console.log("Signup rendered");

});

Template.modalForm.onRendered(function(){
    console.log("modal Form rendered");

});

Template.modalForm.events({

    'submit #modalForm':function(event){
        console.log('Login clicked');
        event.preventDefault();

        var phone = event.target.phone.value;
        var password = event.target.password.value;

        if(phoneValidate(phone) && passValidate(password)){

            var case2 = Driver.findOne({phone: phone});
            var case3 = Taxi.findOne({phone: phone});
            
            if(case2 || case3){
                console.log(phone);
                
                if(case2){
                    
                    var result = case2;
                    console.log(result);
                
                    if(password ==  result.password){
                        console.log(password);
                    
                        event.target.phone.value ='';
                        event.target.password.value ='';
                        
                
                        $('#modalForm')
                        .on('hidden.bs.modal', function() {
                            console.log(result._id);
                            Router.go('settings', {_id: result._id});
                        
                        })
                        .modal('hide');

                        console.log("Logged in");
                    }
                    else{
                            Bert.alert("Incorrect Password", "danger", "fixed-top");
                            console.log("Incorrect Password");
                    }

                }

                if(case3){
                    
                    var result = case3;
                    console.log(result);
                
                    if(password ==  result.password){
                        console.log(password);
                    
                        event.target.phone.value ='';
                        event.target.password.value ='';
                        
                
                        $('#modalForm')
                        .on('hidden.bs.modal', function() {
                            console.log(result._id);
                            Router.go('settings', {_id: result._id});
                        
                        })
                        .modal('hide');

                        console.log("Logged in");
                    }
                    
                    else{
                            Bert.alert("Incorrect Password", "danger", "fixed-top");
                            console.log("Incorrect Password");
                    }

                }

            }
            
            else{
                Bert.alert("User not found", "danger", "fixed-top");
                console.log("User not found");
            }

        }
        return false;
    },

    'click .js-forgotpass':function(event){
        console.log('ForgotPassword clicked');
    },

});
Template.formTemplate.onRendered( function() {

    console.log("forms rendered");
    Session.set("driverFormVisible", "show");
    Session.set("taxiFormVisible", "show");

});

Template.formTemplate.helpers({

    driverFormVisibleFn:function(){
        if(Session.get("driverFormVisible") == "show"){
            console.log("driver form show");
            return true;
        }
        else{
            console.log("driver form hide");
            return false;
        }
    },
    taxiFormVisibleFn:function(){
        if(Session.get("taxiFormVisible") == "hide"){
            console.log("taxi form hide");
            return false;
        }
        else{
            console.log("taxi form show");
            return true;
        }
    },

});

Template.driverFormTemplate.events({

    'submit .driverForm':function(event){

        console.log('driver signup clicked');
        event.preventDefault();

        var name = event.target.name.value;
        var phone = event.target.phone.value;
        var location = event.target.location.value;
        var license = event.target.license.value;
        var email = event.target.email.value;
        var password1 = event.target.password1.value;
        var password2 = event.target.password2.value;
        var charges = event.target.charges.value;
    
            console.log(
                "name:"+ name+" "+
                "phone:"+phone+" "+
                "location:"+location+" "+
                "license:"+license+" "+
                "email:"+email+" "+
                "password1:"+password1+" "+
                "password2:"+password2+" "+
                "charges:"+charges);

            if( isNotEmpty(name) &&
                phoneValidate(phone) &&
                isNotEmpty(location) &&
                isNotEmpty(license) &&
                emailValidate(email) &&
                passValidate(password1) &&
                passCheck(password1,password2) &&
                isNotEmpty(charges) ){

                   if(Driver.findOne({phone: phone}) && Taxi.findOne({phone: phone})){

                        Bert.alert("Phone number already registered", "danger", "fixed-top");
                        return false;

                   }
                   else{

                        Driver.insert({
                            name,
                            phone,
                            location,
                            license,
                            email,
                            password:password1,
                            charges,
                            rating: 0,
                            createdAt: new Date(),
                
                        });
                        Available.insert({
                            _id: Driver.findOne({phone: phone})._id,
                            driverAvailable:"yes",
                            taxiAvailable:"no",
                            lastEdited: new Date()
                        });
                    
                        console.log("Driver created account");
                        Bert.alert("Successfully created new Account as a Driver", "success", "fixed-top");

                        event.target.name.value ='';
                        event.target.phone.value ='';
                        event.target.location.value ='';
                        event.target.license.value ='';
                        event.target.email.value ='';
                        event.target.password1.value ='';
                        event.target.password2.value ='';
                        event.target.charges.value ='';

                   }

                }

        return false;

    },

});

Template.taxiFormTemplate.events({

    'submit .taxiForm':function(event){
        
        console.log('taxi signup clicked');
        event.preventDefault();

        var name = event.target.name.value;
        var phone = event.target.phone.value;
        var location = event.target.location.value;
        var taxiNo = event.target.taxiNo.value;
        var taxiModel = event.target.taxiModel.value;
        var email = event.target.email.value;
        var password1 = event.target.password1.value;
        var password2 = event.target.password2.value;
        var charges = event.target.charges.value;

        console.log(
            "name:"+ name+" "+
            "phone:"+phone+" "+
            "location:"+location+" "+
            "taxiNo:"+taxiNo+" "+
            "taxiModel:"+taxiModel+" "+
            "email:"+email+" "+
            "password1:"+password1+" "+
            "password2:"+password2+" "+
            "charges:"+charges);

        if( isNotEmpty(name) &&
            phoneValidate(phone) &&
            isNotEmpty(location) &&
            isNotEmpty(taxiNo) &&
            isNotEmpty(taxiModel) &&
            emailValidate(email) &&
            passValidate(password1) &&
            passCheck(password1,password2) &&
            isNotEmpty(charges) ){
            
            if(Taxi.findOne({phone: phone}) && Driver.findOne({phone: phone})){

                Bert.alert("Phone number already registered", "danger", "fixed-top");
                return false;

            }
            else{

                Taxi.insert({
                    name,
                    phone,
                    location,
                    taxiNo,
                    taxiModel,
                    email,
                    password:password1,
                    charges,
                    rating: 0,
                    createdAt: new Date(),
        
                });
                Available.insert({
                    _id: Taxi.findOne({phone: phone})._id,
                    taxiAvailable:"yes",
                    driverAvailable:"no",
                    lastEdited: new Date()
                });
            
                event.target.name.value ='';
                event.target.phone.value ='';
                event.target.location.value ='';
                event.target.taxiNo.value ='';
                event.target.taxiModel.value ='';
                event.target.email.value ='';
                event.target.password1.value ='';
                event.target.password2.value ='';
                event.target.charges.value ='';
    
                console.log("Taxi created account");
                Bert.alert("Successfully created new Account as a Taxi owner", "success", "fixed-top");

            }


        }

        return false;
    }


});
        
Template.formHeadTemplate.events({

    'click #role-option-driver':function(event){
        console.log("driver role option tab clicked");
        Session.set("driverFormVisible", "show");
        Session.set("taxiFormVisible", "hide");

    },
    'click #role-option-taxi':function(event){
        console.log("taxi role option tab clicked");
        Session.set("driverFormVisible", "hide");
        Session.set("taxiFormVisible", "show");
        
    },
});

var isNotEmpty = function(value){
    if(value != ''){
        return true;
    }else{
        Bert.alert("Please fill in all the fields", "danger", "fixed-top");
    }
}
var emailValidate = function(value){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))
    {
      return true;
    }else{
        Bert.alert("Invalid Email", "danger", "fixed-top");
        return false;
    }
     
}
var phoneValidate = function(value){
    if(/^\d{10}$/.test(value)){
      return true;
        }
      else{
            Bert.alert("Invalid Contact Number", "danger", "fixed-top");
        return false;
        }
}
var passValidate = function(value){
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(value)){
      return true;
        }
      else{
            Bert.alert("Password must be minimum 6 characters long with at least one numeric digit, one uppercase and one lowercase letter "
            , "danger", "fixed-top");
            return false;
        }
}
var passCheck = function(password1,password2){
    if(password1 == password2){
        return true;
    }else{
        Bert.alert("Confirm password do not match password", "danger", "fixed-top");
        return false;
    }

}
