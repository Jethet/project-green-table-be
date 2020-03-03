const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const tableSchema = new Schema({
    date: {type: Date, required: true},
    location: {address: String, city: String},
    userId: {type: Schema.Types.ObjectId, ref: User},
    detailsTable: {type: Object},
    guests: [
        {
            userId: {type: Schema.Types.ObjectId, ref: 'User'},
            isComing: {type: Boolean, default: true}
        }
    ],
    foodAndDrinks: [
        {
            dishType: {type: String, enum: ['hotDish', 'coldDish', 'snack', 'desert', 'nonAlcoholDrink', 'alcoholDrink']},
            isVegetarian: Boolean,
            isVegan: Boolean,
            isGlutenFree: Boolean,
            userId: {type: ObjectId, ref: 'User'}
        }
    ]
});

const Table = mongoose.model('Table', tableSchema);


module.exports = Table;