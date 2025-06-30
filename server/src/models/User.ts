import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    comparePassword(plainPassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, salt);
    } catch(error) {
        next(error as Error);
    }
});

UserSchema.methods.comparePassword = async function (plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password!);
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
export { IUser };