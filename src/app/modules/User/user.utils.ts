import { USER_ROLE } from './user.constant';
import { User } from './user.model';

// Faculty ID
export const findLastStoreAdmin = async () => {
  const lastAdmin = await User.findOne(
    {
      role: USER_ROLE.STORE_ADMIN,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateStoreAdminId = async () => {
  let currentId = (0).toString();
  const lastAdmin = await findLastStoreAdmin();

  if (lastAdmin) {
    currentId = lastAdmin.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;

  return incrementId;
};

export const findLastSuperAdmin = async () => {
  const lastSuperAdmin = await User.findOne(
    {
      role: USER_ROLE.SUPER_ADMIN,
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastSuperAdmin?.id ? lastSuperAdmin.id.substring(2) : undefined;
};

export const generateSuperAdminId = async () => {
  let currentId = (0).toString();
  const lastSuperAdmin = await findLastStoreAdmin();

  if (lastSuperAdmin) {
    currentId = lastSuperAdmin.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `SA-${incrementId}`;

  return incrementId;
};
