const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const tableSchema = new Schema({
    dateAndTime: {type: Date, required: true},
    location: {address: String, city: String},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    detailsTable: {type: Object},//not sure what this is for - pending
    guests: [
        {
            userId: {type: Schema.Types.ObjectId, ref: 'User'},
            isComing: {type: Boolean, default: true}
        }
    ],
    foodAndDrinks: [
        {
            dishType: {type: String, enum: ['hotDish', 'coldDish', 'snack', 'desert', 'nonAlcoholDrink', 'alcoholDrink']},
            isVegetarian: {type: Boolean, default: false},
            isVegan: {type: Boolean, default: false},
            isGlutenFree: {type: Boolean, default: false},
            isAlcohol: {type: Boolean, default: false},
            userId: {type: Schema.Types.ObjectId, ref: 'User'}
        }
    ]
});

const Table = mongoose.model('Table', tableSchema);


module.exports = Table;