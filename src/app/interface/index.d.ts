import { JwtPayload } from 'jsonwebtoken';
import { TRole } from '../modules/User/user.interface';

// Define your custom payload type
type TPayload = {
  userId: string;
  role: TRole;
  email: string;
};

// Define a new type that combines JwtPayload and TPayload
export type ExtendedJwtPayload = JwtPayload & TPayload;

declare global {
  namespace Express {
    interface Request {
      user?: ExtendedJwtPayload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      logo?: boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      banner?: boolean;
      qrCode: string;
    }
  }
}

export {};
