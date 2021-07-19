import MMKVStorage from 'react-native-mmkv-storage';
import { UserWithToken } from 'services/users';

const SESSION_KEY = 'AdoptameAppUser';

const MMKV = new MMKVStorage.Loader()
  .withInstanceID(SESSION_KEY)
  .withEncryption()
  .initialize();

export const setSession = async (user: UserWithToken | null) => {
  if (user) {
    await MMKV.setMapAsync('user', user);
  }
};

export const getSession = () => {
  const user = MMKV.getMap('user') as UserWithToken;

  return user ?? null;
};

export const clearSession = () => {
  MMKV.clearStore();
};
