import mongoose, { Schema } from 'mongoose';
import { TFood } from './food.interface';

const FoodSchema: Schema = new Schema<TFood>(
  {
    foodName: { type: String, required: true },
    storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    image: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    offer: { type: Boolean, required: true, default: false },
    offerPercentage: { type: Number, required: true, default: null },
    offerPrice: { type: Number, required: true, default: null },
    category: { type: String, required: true },
    video: { type: String },
    description: { type: String },
    nutrition: { type: String },
    menuType: {
      type: String,
      enum: ['recommended', 'quickMenu', 'default'],
      default: false,
    },
    is_recommended: { type: Boolean },
    is_quickMenu: { type: Boolean },
  },
  { timestamps: true },
);

const Food = mongoose.model<TFood>('Food', FoodSchema);

export default Food;
