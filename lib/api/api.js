import { Mongo } from 'meteor/mongo';

export const User = new Mongo.Collection('user');
export const Driver = new Mongo.Collection('driver');
export const Taxi = new Mongo.Collection('taxi');
export const Available = new Mongo.Collection('available');