import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const outletSchema = new Schema<TCategory>({
  categories: {
    type: [String],
    required: true,
  },

  storeId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const Category = model<TCategory>('Category', outletSchema);

export default Category;
