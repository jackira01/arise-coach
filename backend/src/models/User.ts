import mongoose, { Schema, type Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string
    email: string
    password: string
    plan: 'silver' | 'esmerald' | 'diamond' | 'challenger' | null
    topics: {
        name: string
        status: 'pendiente' | 'en-progreso' | 'completado' | 'no-completado'
    }[]
    createdAt: Date
    comparePassword(candidate: string): Promise<boolean>
}

const TopicSchema = new Schema({
    name: { type: String, required: true },
    status: {
        type: String,
        enum: ['pendiente', 'en-progreso', 'completado', 'no-completado'],
        default: 'pendiente',
    },
})

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true, trim: true },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, minlength: 6 },
        plan: {
            type: String,
            enum: ['silver', 'esmerald', 'diamond', 'challenger', null],
            default: null,
        },
        topics: { type: [TopicSchema], default: [] },
    },
    { timestamps: true }
)

// Hash password before save
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = async function (
    candidate: string
): Promise<boolean> {
    return bcrypt.compare(candidate, this.password as string)
}

export const User = mongoose.model<IUser>('User', UserSchema)
