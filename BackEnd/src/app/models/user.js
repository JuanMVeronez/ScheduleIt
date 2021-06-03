import mongoose from '../../database';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

// type userSchemaType = {
//     name: string;
//     email: string;
//     password: string;
//     createdAt: Date;
// }

const UserSchema = new Schema<userSchemaType>({
    name : {
        type: String,
        require: true,
    },
    email : {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

UserSchema.pre<userSchemaType>('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

export default User;