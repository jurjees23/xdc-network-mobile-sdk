import { NativeModules, Platform } from 'react-native';
import type { KeyStorageConfig } from './keyManagerTypes';

const LINKING_ERROR =
  `The package 'rly-network-mobile-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const XdcNativeModule = NativeModules.XdcNetworkMobileSdk
  ? NativeModules.XdcNetworkMobileSdk
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export const getMnemonic = async (): Promise<string | null> => {
  return XdcNativeModule.getMnemonic();
};

export const generateMnemonic = async (): Promise<string> => {
  return XdcNativeModule.generateMnemonic();
};

export const saveMnemonic = async (
  mnemonic: string,
  options: KeyStorageConfig = {
    saveToCloud: true,
    rejectOnCloudSaveFailure: false,
  }
): Promise<void> => {
  const { saveToCloud, rejectOnCloudSaveFailure } = options;

  return XdcNativeModule.saveMnemonic(
    mnemonic,
    saveToCloud,
    rejectOnCloudSaveFailure
  );
};

export const deleteMnemonic = async (): Promise<void> => {
  return XdcNativeModule.deleteMnemonic();
};

export const getPrivateKeyFromMnemonic = async (
  mnemonic: string
): Promise<Uint8Array> => {
  return XdcNativeModule.getPrivateKeyFromMnemonic(mnemonic);
};
