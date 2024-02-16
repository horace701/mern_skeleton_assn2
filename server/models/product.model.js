import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    }
/*
,
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    hashed_password: {
        type: String,
        required: 'Password is required'
    },

    salt: String
*/
});

/*
ProductSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        //this.salt = this.makeSalt();
        this.hashed_password = password;
        //this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });
*/
/*    
ProductSchema.path('hashed_password').validate(function(v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters.');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);
*/

export default mongoose.model('Product', ProductSchema);
