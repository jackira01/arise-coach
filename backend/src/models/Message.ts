import mongoose, { Schema, type Document, type Types } from 'mongoose'

export interface IMessage extends Document {
    roomUserId: Types.ObjectId
    senderRole: 'user' | 'admin'
    text: string
    createdAt: Date
}

const MessageSchema = new Schema<IMessage>(
    {
        roomUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
        senderRole: { type: String, enum: ['user', 'admin'], required: true },
        text: { type: String, required: true, trim: true, maxlength: 2000 },
    },
    { timestamps: true }
)

MessageSchema.index({ roomUserId: 1, createdAt: -1 })

export const Message = mongoose.model<IMessage>('Message', MessageSchema)
