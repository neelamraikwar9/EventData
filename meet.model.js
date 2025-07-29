const mongoose = require("mongoose");

const meetSchema = new mongoose.Schema({
    eventTitle: {
        type: String, 
    },

    eventHost: {
        type: String, 
    },

     eventDate: {
        type: String, 
    },

    eventDay: {
        type: String
    },

    eventBeginingTime: {
        type: String, 
    },

    eventEndingTime: {
        type: String,
    },

    eventMode: [{
        type: String,  
        enum: ["Offline", "Online", "Both"]
    }],

    eventAddress: {
        type: String,  
     },

    eventCity: {
        type: String
    },


    eventDetail: {
        type: String, 
    },

    eventDressCode: {
        type: String,
    },


    eventRestriction: {
        type: String, 
    },

    eventWebsite: {
        type: String
    },

     eventPrice: {
         type: String
    },

    eventImages: {
        type: String
    }
    
},

{timeStamps: true} //It adds createdAt and Updated At field to track the creation and modification times of each movie entry.
);

const Meet = mongoose.model('Meet', meetSchema)

module.exports = Meet;

