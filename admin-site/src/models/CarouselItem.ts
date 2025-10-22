import mongoose, { Schema, models, model } from 'mongoose';

const CarouselItemSchema = new Schema({
  url: { type: String, required: true },
  title: { type: String },
}, { timestamps: true });

export const CarouselItem = models.CarouselItem || model('CarouselItem', CarouselItemSchema);
