import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  createAccount,
  getAccount,
  importExistingAccount,
} from '@xdc-network/mobile-sdk';
import { AccountOverviewScreen } from './AccountOverviewScreen';
import { GenerateAccountScreen } from './GenerateAccountScreen';
import { LoadingScreen } from './LoadingScreen';

export default function App() {
  const [accountLoaded, setAccountLoaded] = useState(false);
  const [xdcAccount, setXdcAccount] = useState<string | undefined>();

  useEffect(() => {
    const readAccount = async () => {
      try {
        const account = await getAccount();

        console.log('user account', account);

        if (account) {
          setXdcAccount(account);
        }
      } catch (error: any) {
        console.error('Error occurred while reading account', error.message);
      } finally {
        setAccountLoaded(true);
      }
    };

    if (!accountLoaded) {
      readAccount();
    }
  }, [accountLoaded]);

  const createXdcAccount = async () => {
    const rlyAct = await createAccount({ overwrite: true });
    setXdcAccount(rlyAct);
  };

  const importExistingXdcAccount = async (mnemonic: string) => {
    const rlyAct = await importExistingAccount(mnemonic);
    setXdcAccount(rlyAct);
  };

  if (!accountLoaded) {
    return <LoadingScreen />;
  }

  if (!xdcAccount) {
    return (
      <GenerateAccountScreen
        generateAccount={createXdcAccount}
        importExistingAccount={importExistingXdcAccount}
      />
    );
  }

  return <AccountOverviewScreen xdcAccount={xdcAccount} />;
}
