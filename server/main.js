import { Meteor } from 'meteor/meteor';
import '../lib/api/api.js';

Meteor.startup(() => {
  // code to run on server at startup
});

var twilioClient = new Twilio({
  from: Meteor.settings.TWILIO.FROM,
  sid: Meteor.settings.TWILIO.SID,
  token: Meteor.settings.TWILIO.TOKEN
});

Meteor.methods({
  'sendSMS': function (opts) {
    try {
      var result = twilioClient.sendSMS({
        to: opts.to,
        body: opts.message
      });
    } catch (err) {
      throw (err);      
    }
    return result;
  }
});
