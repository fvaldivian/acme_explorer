import {Schema, model} from 'mongoose'
import Actor from "../types/actor";
import validator from 'validator';
import bcrypt from 'bcrypt';

const actorSchema = new Schema<Actor>({
    name: {
        type: String,
        require: 'Kindly enter the actor name',
    },
    surname: {
        type: String,
        require: 'Kindly enter the actor surname',
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
        validate: {
            validator: (email: string) => validator.isEmail(email),
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        require: false,
        validate: {
            validator: (phone: string) => validator.isMobilePhone(phone),
            message: '{VALUE} is not a valid email'
        }
    },
    address: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: 'Kindly enter the actor role(s)',
        enum: ['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSOR']
    },
    activated: {
        type: Boolean,
        required: false
    }
});

actorSchema.pre('save', function (callback) {
    const actor = this;
    bcrypt.genSalt(5, (err, salt) => {
        if (err) return callback(err)

        bcrypt.hash(actor.password, salt, (err1, hash) => {
            if (err1) return callback(err1)
            actor.password = hash
            callback()
        })
    })
})


actorSchema.methods.verifyPassword = function (password: string, cb: any) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

export const ActorModel = model<Actor>('Actor', actorSchema)
