import mongoose, { Schema, type Document, Types } from 'mongoose'

export interface ITopic extends Document {
    name: string
    categoryId: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const TopicSchema = new Schema<ITopic>(
    {
        name: { type: String, required: true, trim: true },
        categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    },
    { timestamps: true }
)

TopicSchema.index({ name: 1, categoryId: 1 }, { unique: true })

export const Topic = mongoose.model<ITopic>('Topic', TopicSchema)
