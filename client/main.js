import { Session } from 'meteor/session';

import './main.html';

import '../imports/ui/home/home.html';
import '../imports/ui/home/home.css';
import '../imports/ui/home/homeTemplate.html';
import '../imports/ui/home/home.js';

import '../imports/ui/signup/signup.html';
import '../imports/ui/signup/signup.css';
import '../imports/ui/signup/signupTemplate.html';
import '../imports/ui/signup/signup.js';

import '../imports/ui/mainPage/mainPage.html';
import '../imports/ui/mainPage/mainPage.css';
import '../imports/ui/mainPage/mainPageTemplate.html';
import '../imports/ui/mainPage/mainPage.js';

import '../imports/ui/settings/settings.html';
import '../imports/ui/settings/settings.css';
import '../imports/ui/settings/settingsTemplate.html';
import '../imports/ui/settings/settings.js';

console.log("client running");

Router.configure({
    layoutTemplate: 'main-layout'
});

Router.map(function(){

    this.route('home',{
        path:'/',
        template:'home',
    });

    this.route('signup',{
        path:'/signup',
        template:'signup'
    });
    
    this.route('mainPage',{
        path:'/mainPage',
        template:'mainPage',

        // data: function(){
        //     var _id = this.params._id;
        //     console.log(_id);
        //    Session.set("userId",_id);
        // }
        
    });

    this.route('settings',{
        path:'/settings/:_id',
        template:'settings',
        data: function(){
            var _id = this.params._id;
            console.log(_id);
           Session.set("userId",_id);
        }
    });

    this.route('editRole',{
        path:'/editRole/:_id',
        template:'editRole',
        data: function(){
            var _id = this.params._id;
            console.log(_id);
           Session.set("userId",_id);
        }
    });
    this.route('appTab',{
        path:'/appTab',
        template:'appTab'
    });
    this.route('passTab',{
        path:'/passTab/:_id',
        template:'passTab',
        data: function(){
            var _id = this.params._id;
            console.log(_id);
           Session.set("userId",_id);
        }
    });
    this.route('addTab',{
        path:'/addTab/:_id',
        template:'addTab',
        data: function(){
            var _id = this.params._id;
            console.log(_id);
           Session.set("userId",_id);
        }
    });

});