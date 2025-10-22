import { Schema, model, models } from 'mongoose';

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String, required: true }, // stores category name
  bestseller: { type: Boolean, default: false },
});

export const Item = models.Item || model('Item', ItemSchema);
