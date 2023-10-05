import { NativeModules } from 'react-native';
import type { KeyManager } from './keyManagerTypes';

const keyManager: KeyManager = NativeModules.XdcNetworkMobileSdk
  ? require('./keyManagerNativeModule')
  : require('./keyManagerExpo');

export default keyManager;
