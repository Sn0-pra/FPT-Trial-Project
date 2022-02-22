import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import {User} from '/lib/api/api.js';
import {Driver} from '/lib/api/api.js';
import {Taxi} from '/lib/api/api.js';

import './mainPage.html';
import './mainPageTemplate.html';

Template.mainPage.onRendered(
    function(){
        Bert.alert("Welcome to FPT", "info", "fixed-bottom");
        Session.set("driverTabVisible", "show");
        Session.set("taxiTabVisible", "hide");
});

 Template.mainPage.helpers({

    driver(){
       if(Session.get("locationfilter")){
        return Driver.find({location: new RegExp(Session.get("locationfilter"),'i')});
       }
       else{
        return Driver.find({});
       }
    },
    taxi(){
        if(Session.get("locationfilter")){
            return Taxi.find({location:  new RegExp(Session.get("locationfilter"),'i')});
           }
           else{
            return Taxi.find({});
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

    driverTabVisibleFn:function(){
        if(Session.get("driverTabVisible") == "show"){
            $("#driver-nav-tab").addClass('selected');
            $("#taxi-nav-tab").removeClass('selected');
            console.log("driver show");
            return true;
        }
        else{
            console.log("driver hide");
            return false;
        }
    },
    taxiTabVisibleFn:function(){
        if(Session.get("taxiTabVisible") == "hide"){
            console.log("taxi hide");
            return false;
        }
        else{
            console.log("taxi show");
            $("#taxi-nav-tab").addClass('selected');
            $("#driver-nav-tab").removeClass('selected');
            return true;
        }
    },
    

});

Template.mainPage.events({

    'click #driver-nav-tab':function(event){
        console.log("driver nav tab clicked");
        Session.set("driverTabVisible", "show");
        Session.set("taxiTabVisible", "hide");
    },
    
    'click #taxi-nav-tab':function(event){
        console.log("taxi nav tab clicked");
        Session.set("driverTabVisible", "hide");
        Session.set("taxiTabVisible", "show");
    },

    'click #searchLocationButton2':function(event,template){

        console.log("search location clicked");

        var searchIp = template.$('#searchIp').val();
        console.log(searchIp);

        Session.set("locationfilter",searchIp);
    },
    'click #close':function(){
        
        console.log("Remove filter");
        Session.set("locationfilter", );
    
    }
    
});

Template.driverCardTemplate.events({

    'click .driver_star_rating': function(event){
        var oldRating = Driver.findOne({_id: this._id}).rating;
        console.log( "old rating:" + oldRating);

        var rating = $(event.currentTarget).data("userrating");
        console.log("user rating:" + rating);

        var newRating = (oldRating + rating)/2 ;
        var newRating2 = newRating.toFixed(0);
        console.log("new rating:" + newRating2);
        
        Driver.update({_id: this._id}, {$set: { rating: Number(newRating2)  }});

}

});
Template.taxiCardTemplate.events({

    'click .taxi_star_rating': function(event){

        var oldRating = Taxi.findOne({_id: this._id}).rating;
        console.log( "old rating:" + oldRating);

        var rating = $(event.currentTarget).data("userrating");
        console.log("user rating:" + rating);

        var newRating = (oldRating + rating)/2 ;
        var newRating2 = newRating.toFixed(0);
        console.log("new rating:" + newRating2);
        
        Taxi.update({_id: this._id}, {$set: { rating: Number(newRating2)  }});

}

});