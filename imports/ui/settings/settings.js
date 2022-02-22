import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import {Available} from '/lib/api/api.js';
import {Driver} from '/lib/api/api.js';
import {Taxi} from '/lib/api/api.js';

import './settings.html';
import './settingsTemplate.html';

import '../signup/signup.js';

Template.settings.onRendered(
   function(){
       console.log("Settings page rendered");
       console.log(Session.get("userId"));
       Session.set("content","/editRole");
   }
);
Template.settings.helpers({

    content(){
        if(Session.get("content") == "/editRole"){
            var editRole = "/editRole/"+Session.get("userId");
            return editRole;
        }
        if(Session.get("content") == "/passTab"){
            var passTab = "/passTab/"+Session.get("userId");
            return passTab;
        } 
        if(Session.get("content") == "/addTab"){
            var addTab = "/addTab/"+Session.get("userId");
            return addTab;
        } 
    }

});

Template.settings.events({
    

});

Template.settingsSideNav.onRendered(
    function(){
        console.log("Settings side Nav rendered");
        var _id = Session.get("userId");
        console.log(_id);
    }
 );

Template.settingsSideNav.events({

    'click .role-tab':function(){
        console.log("role tab clicked");
        Session.set("content","/editRole");
    },

    'click .app-tab':function(){
        console.log("app tab clicked");
        Session.set("content","/appTab");
    },
    
    'click .pass-tab':function(){
        console.log("pass tab clicked");
        Session.set("content","/passTab");
    },

    'click .addTaxiTab':function(){
        console.log("add Taxi tab clicked");
        Session.set("content","/addTab");
    },

    'click .addDriverTab':function(){
        console.log("add Driver tab clicked");
        Session.set("content","/addTab");
    },
    
    'click .driver-avail-tab':function(){
        console.log("Driver Avail tab clicked");
    },

    'click .taxi-avail-tab':function(){
        console.log("Taxi Avail tab clicked");
    },
    
    'click .logout-tab':function(){
        console.log("logout tab clicked");
        Session.set("userId","");
        Router.go("home");
    
    },
    'click #driver-avail-on':function(){
        console.log("driver on clicked");
        $("#driver-avail-on").css("background-color","grey");
        $("#driver-avail-off").css("background-color","rgb(241, 241, 241)");
        Available.update(
            {_id: Session.get("userId")},
            {$set:{
                driverAvailable:"yes",
                lastEdited: new Date()
            }}
            );
    },
    'click #driver-avail-off':function(){
      console.log("driver off clicked");
      $("#driver-avail-on").css("background-color","rgb(241, 241, 241)");
      $("#driver-avail-off").css("background-color","grey");
      Available.update(
        {_id: Session.get("userId")},
        {$set:{
            driverAvailable:"no",
            lastEdited: new Date()
        }}
        );
    },
    'click #taxi-avail-on':function(){
        console.log("taxi on clicked");
        $("#taxi-avail-on").css("background-color","grey");
        $("#taxi-avail-off").css("background-color","rgb(241, 241, 241)");
        Available.update(
            {_id: Session.get("userId")},
                {$set:{
                    taxiAvailable:"yes",
                    lastEdited: new Date()
                }}
            );
    },
    'click #taxi-avail-off':function(){
      console.log("taxi off clicked");
      $("#taxi-avail-on").css("background-color","rgb(241, 241, 241)");
      $("#taxi-avail-off").css("background-color","grey");
      Available.update(
        {_id: Session.get("userId")},
            {$set:{
                taxiAvailable:"no",
                lastEdited: new Date()
            }}
        );
    },

});

Template.settingsSideNav.helpers({
    driver(){
        console.log(Session.get("userId"));
        if(Driver.findOne({_id: Session.get("userId")})){
            return true;
        }
        else{
            return false;
        }
    },
    taxi(){
        console.log(Session.get("userId"));
        if(Taxi.findOne({_id: Session.get("userId")})){
            return true;
        }
        else{
            return false;
        }
    },
    driverAvailability(){
        var condition = Available.findOne({_id: Session.get("userId")}).driverAvailable;
        if(condition == "yes"){
            return true;
        }
        else{
            return false;
        }
    },
    taxiAvailability(){
        var condition = Available.findOne({_id: Session.get("userId")}).taxiAvailable;
        if(condition == "yes"){
            return true;
        }
        else{
            return false;
        }
    }
    
});

Template.editRole.helpers({
    driver(){
        console.log(Session.get("userId"));
        if(Driver.findOne({_id: Session.get("userId")})){
            return true;
        }
        else{
            return false;
        }
    },
    driverDetail(){
        console.log(Driver.findOne({_id: Session.get("userId")}));
        return Driver.find({_id: Session.get("userId")});
    },
    taxi(){
        console.log(Session.get("userId"));
        if(Taxi.findOne({_id: Session.get("userId")})){
            return true;
        }
        else{
            return false;
        }
    },
    taxiDetail(){
        console.log(Taxi.findOne({_id: Session.get("userId")}));
        return Taxi.find({_id: Session.get("userId")});
    }
});

Template.editRole.events({

    "submit #driverDetailForm":function(event){
        event.preventDefault();
        console.log("Save changes clicked");

        var name = event.target.name.value;
        var phone = event.target.phone.value;
        var location = event.target.location.value;
        var license = event.target.license.value;
        var email = event.target.email.value;
        var charges = event.target.charges.value;

        console.log(
            "name:"+ name+" "+
            "phone:"+phone+" "+
            "location:"+location+" "+
            "license:"+license+" "+
            "email:"+email+" "+
            "charges:"+charges);

        if( isNotEmpty(name) &&
            phoneValidate(phone) &&
            isNotEmpty(location) &&
            isNotEmpty(license) &&
            emailValidate(email) &&
            isNotEmpty(charges) ){

                Driver.update(
                {_id: Session.get("userId")} ,  
                    {
                        $set:{
                            name:name,
                            phone:phone,
                            location:location,
                            license:license,
                            email:email,
                            charges:charges
                    }
                });
                
                console.log("Driver account updated");
                Bert.alert("Successfully updated", "success", "fixed-top");

            }
    },

    "submit #taxiDetailForm":function(event){
        event.preventDefault();
        console.log("Save changes clicked");

        var name = event.target.name.value;
        var phone = event.target.phone.value;
        var location = event.target.location.value;
        var taxiNo = event.target.taxiNo.value;
        var taxiModel = event.target.taxiModel.value;
        var email = event.target.email.value;
        var charges = event.target.charges.value;

        console.log(
            "name:"+ name+" "+
            "phone:"+phone+" "+
            "location:"+location+" "+
            "taxiNo:"+taxiNo+" "+
            "taxiModel:"+taxiModel+" "+
            "email:"+email+" "+
            "charges:"+charges);

        if( isNotEmpty(name) &&
            phoneValidate(phone) &&
            isNotEmpty(location) &&
            isNotEmpty(taxiNo) &&
            isNotEmpty(taxiModel) &&
            emailValidate(email) &&
            isNotEmpty(charges) ){

                Taxi.update(
                {_id: Session.get("userId")} ,  
                {
                   $set:{
                    name:name,
                    phone:phone,
                    location:location,
                    email:email,
                    taxiNo:taxiNo,
                    taxiModel:taxi,
                    charges:charges
                   }
                });
                
                console.log("Taxi account updated");
                Bert.alert("Successfully updated", "success", "fixed-top");

            }
    }

});

Template.passForm.events({

    'submit .oldPassForm':function(event){
        event.preventDefault();
        console.log("Check clicked");
        var _id= Session.get("userId");

        var case1 = Driver.findOne({_id: _id});
        var case2 = Taxi.findOne({_id: _id});

        var oldPassword = event.target.oldPassword.value;
        console.log(oldPassword);

        if(case1){
            if(oldPassword == case1.password){
                Bert.alert("Password Matched", "success", "fixed-top");
                $(".newPassForm").css('visibility', 'visible');
            }
            else{
                Bert.alert("Password Not Matched", "danger", "fixed-top");
            }
        }
        if(case2){
            if(oldPassword == case2.password){
                Bert.alert("Password Matched", "success", "fixed-top");
                $(".newPassForm").css('visibility', 'visible');
            }
            else{
                Bert.alert("Password Not Matched", "danger", "fixed-top");
            }
        }
        return false;
    },
    'submit .newPassForm':function(event){
        event.preventDefault();
        console.log("Check clicked");
        var _id= Session.get("userId");

        var case1 = Driver.findOne({_id: _id});
        var case2 = Taxi.findOne({_id: _id});

        var newPassword1 = event.target.newPassword1.value;
        var newPassword2 = event.target.newPassword2.value;
        console.log(newPassword1);
        console.log(newPassword2);

       if(
           passValidate(newPassword1)&&
           passCheck(newPassword1,newPassword2)){
        
        if(case1){
            Driver.update(
                {_id:_id},
                { $set:{password:newPassword1}}
            );
            Bert.alert("Succesfully changed password", "success", "fixed-top");
        }
        if(case2){
            Taxi.update(
                {_id:_id},
                { $set:{password:newPassword1}}
            );
            Bert.alert("Succesfully changed password", "success", "fixed-top");
        }
       
        }
        return false;
    }

});

Template.addTab.helpers({
    driver(){
        console.log(Session.get("userId"));
        if(Driver.findOne({_id: Session.get("userId")})){
            return true;
        }
        else{
            return false;
        }
    },
    taxi(){
        console.log(Session.get("userId"));
        if(Taxi.findOne({_id: Session.get("userId")})){
            return true;
        }
        else{
            return false;
        }
    },
});

Template.addTab.events({
    'submit #driverForm':function(event){
        event.preventDefault();
        console.log("Submit clicked");

        var location = event.target.location.value;
        var license = event.target.license.value;
        var charges = event.target.charges.value;
       
        console.log(
            "location:"+location+" "+
            "license:"+license+" "+
            "charges:"+charges);

        var _id = Session.get("userId");
        var taxi = Taxi.findOne({_id:_id});

        var name = taxi.name;
        var phone = taxi.phone;
        var email = taxi.email;
        var password = taxi.password;

        if(isNotEmpty(location) &&
        isNotEmpty(license) &&
        isNotEmpty(charges)){

            if(Driver.findOne({phone: phone})){

                Bert.alert("Phone number already registered", "danger", "fixed-top");
                return false;

           }
            else{

                Driver.insert({
                    _id:_id,
                    name:name,
                    phone:phone,
                    location:location,
                    license:license,
                    email:email,
                    password:password,
                    charges:charges,
                    rating:0,
                    createdAt:new Date(),
    
                });
                Available.update({_id:_id},
                    {$set:{
                        driverAvailable:"yes",
                        lastEdited: new Date()
                    }}    
                );
                console.log("Driver account created");
                Bert.alert("Successfully created driver account", "success", "fixed-top");

           }

        }
        return false;
        
    },

    'submit #taxiForm':function(event){
        event.preventDefault();
        console.log("Submit clicked");

        var location = event.target.location.value;
        var taxiNo = event.target.taxiNo.value;
        var taxiModel = event.target.taxiModel.value;
        var charges = event.target.charges.value;
       
        console.log(
            "location:"+location+" "+
            "taxiNo:"+taxiNo+" "+
            "taxiModel:"+taxiModel+" "+
            "charges:"+charges);

        var _id = Session.get("userId");
        var driver = Driver.findOne({_id:_id});

        var name = driver.name;
        var phone = driver.phone;
        var email = driver.email;
        var password = driver.password;

        if(isNotEmpty(location) &&
        isNotEmpty(taxiNo) &&
        isNotEmpty(taxiModel) &&
        isNotEmpty(charges)){

            if(Taxi.findOne({phone: phone})){

                Bert.alert("Phone number already registered", "danger", "fixed-top");
                return false;

           }
            else{

                Taxi.insert({
                    _id:_id,
                    name:name,
                    phone:phone,
                    location:location,
                    taxiNo:taxiNo,
                    taxiModel:taxiModel,
                    email:email,
                    password:password,
                    charges:charges,
                    rating:0,
                    createdAt:new Date(),   
    
                });
                Available.update(
                    {_id:_id},
                    {$set:{
                        taxiAvailable:"yes",
                        lastEdited: new Date()
                    }}    
                );
                console.log("Taxi account created");
                Bert.alert("Successfully created taxi account", "success", "fixed-top");

           }

        }
        return false;
        
    }

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