import { Schema, model } from 'mongoose';
import { TOulet, TTable } from './outlet.interface';

const tebleScheam = new Schema<TTable>({
  qrCode: {
    type: String,
    required: true,
  },
  tableId: {
    type: String,
    required: true,
  },
});

const outletSchema = new Schema<TOulet>({
  name: {
    type: String,
    required: true,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  storeId: {
    type: String,
    required: true,
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'StoreAdmin',
    required: true,
  },
  tables: {
    type: [tebleScheam],
    default: [],
  },
});

const Outlet = model<TOulet>('Outlet', outletSchema);

export default Outlet;
