import { Template } from 'meteor/templating';
import {User} from '/lib/api/api.js';
import {Driver} from '/lib/api/api.js';
import {Taxi} from '/lib/api/api.js';

import './home.html';
import './homeTemplate.html';

Template.home.rendered = function(){    
    console.log("Home rendered");
}

Template.searchResultModal.helpers({

    driverCount(){
        if(Session.get("locationfilter")){
         return Driver.find({location: new RegExp(Session.get("locationfilter"),'i')}).count();
        }
        else{
         return Driver.find().count();
        }
     },
     taxiCount(){
         if(Session.get("locationfilter")){
             return Taxi.find({location: new RegExp(Session.get("locationfilter"),'i')}).count();
            }
            else{
             return Taxi.find().count();
            }
     },
     driver(){
        if(Session.get("locationfilter")){
            return Driver.find({location: new RegExp(Session.get("locationfilter"),'i')});
           }
           else{
            return Driver.find();
           }
     },
     taxi(){
        if(Session.get("locationfilter")){
            return Taxi.find({location: new RegExp(Session.get("locationfilter"),'i')});
           }
           else{
            return Taxi.find();
           }
     },
 
     filtered(){
         if(Session.get("locationfilter")){
             console.log("Results for location: " + Session.get("locationfilter"));
             return true;
         }
         else{
             return false;
         }
     },
     filteredLocation(){
         if(Session.get("locationfilter")){
             return Session.get("locationfilter");
         }
     },

});

Template.homeHeadTemplate.events({

    'click #searchLocationButton':function(event,template){
        event.preventDefault();
        console.log("search location clicked");

        var searchIp = template.$('#searchIp').val();
        console.log(searchIp);

        Session.set("locationfilter",searchIp);
    }

});

Template.navTemplate.events({

    'click .getApp':function(event){
        console.log('Get App clicked');
    },

});

Template.searchResultModal.events({

    'click #getOtp':function(event,template){
        console.log('Signup clicked');
        event.preventDefault();

        var userPhone = template.$('#phone').val();
        console.log(userPhone);

        if(phoneValidate(userPhone)){

           if(User.findOne({phone: userPhone})){

                console.log("phone number already exist");

                User.update({_id: User.findOne({phone: userPhone})._id},
                    {$set:{

                        lastVisited: new Date(),
            
                    }}
                );

                $('#searchResultModal')
                    .on('hidden.bs.modal', function() {
                        Router.go('mainPage');
                    })
                    .modal('hide');

           }
            else{

                User.insert({
        
                    phone:userPhone,
                    lastVisited: new Date(),
        
                });

                Session.set("code",generateOTP());
                
                var smsOptions = {
                    to: "+91" + userPhone,
                    message: "Your otp: "+ Session.get("code")
                };
        
                Meteor.call('sendSMS',smsOptions,function(err, result){
        
                    if(err){
                        alert("error");
                        return;
                    }
                    Bert.alert("Succesfully otp sent", "success", "fixed-top");
                    console.log("Message sent. Result: ", result);
                    $("#getOtp").css('visibility', 'hidden');
                    $(".otpForm").css('visibility', 'visible');
                });

            }           
        
        }
        return false;
        
    },
    'click #verify':function(event,template){

        event.preventDefault();
        
        var otp = template.$('#otp').val();
        console.log(otp);
  
        if(otp == Session.get("code")){

            $('#searchResultModal')
                .on('hidden.bs.modal', function() {
                    Router.go('mainPage');
                })
                .modal('hide');

        }
        else{
            Bert.alert("OTP unmatched", "danger", "fixed-top");
        }
  
      }

});

var phoneValidate = function(value){
    if(/^\d{10}$/.test(value)){
      return true;
        }
      else{
            Bert.alert("Invalid Contact Number", "danger", "fixed-top");
        return false;
        }
}
function generateOTP() { 
   
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 6; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} 

