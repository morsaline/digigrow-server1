import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import { TRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/cathAsync';
import { AppError } from '../errors/AppError';
import { ExtendedJwtPayload } from '../interface';

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.cookies?.refreshToken;
    // checking if the token is missing

    if (!token) {
      if (requiredRoles.includes('all')) {
        return next();
      } else {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_refresh_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded as ExtendedJwtPayload;

    // checking if the user is exist
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // req.user = decoded as JwtPayload;
    req.user = decoded as ExtendedJwtPayload;
    // req.user = decoded;

    next();
  });
};

export default auth;
