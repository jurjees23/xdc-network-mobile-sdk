import * as React from 'react';
import { AppContainer } from './components/AppContainer';
import { BodyText, HeadingText, SelectableText } from './components/text';
import {
  Button,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useState } from 'react';
import {
  getAccountPhrase,
  permanentlyDeleteAccount,
} from '@xdc-network/mobile-sdk';
import { XdcCard } from './components/XdcCard';
import { LoadingModal, StandardModal } from './components/LoadingModal';
import { PrivateConfig } from './private_config';




export const AccountOverviewScreen = (props: { xdcAccount: string }) => {
  const [performingAction, setPerformingAction] = useState<string>();

  const [balance, setBalance] = useState<number>();

  const [transferBalance, setTransferBalance] = useState('');
  const [transferAddress, setTranferAddress] = useState('');

  const [mnemonic, setMnemonic] = useState<string>();






  const deleteAccount = async () => {
    await permanentlyDeleteAccount();
  };

  const revealMnemonic = async () => {
    const value = await getAccountPhrase();

    if (!value) {
      throw 'Something went wrong, no Mnemonic when there should be one';
    }

    setMnemonic(value);
  };

  return (
    <>
      <AppContainer>
        <ScrollView>
          <View style={styles.alignMiddle}>
            <HeadingText>Welcome to RLY</HeadingText>
          </View>
          <View style={styles.addressContainer}>
            <SelectableText>
              {props.xdcAccount || 'No Account Exists'}
            </SelectableText>
          </View>
          <XdcCard style={styles.balanceCard}>
            <View style={styles.balanceContainer}>
              <BodyText>Your Current Balance Is</BodyText>
              <HeadingText>{balance}</HeadingText>
            </View>
            <View style={styles.balanceContainer}>
              <Button
                title="View on XDC"
                onPress={() => {
                  Linking.openURL(
                    `https://apothem.blocksscan.io/address/${props.xdcAccount}`
                  );
                }}
              />
            </View>
          </XdcCard>
          <View
            style={Object.assign({}, styles.balanceCard, styles.alignMiddle)}
          >
            <BodyText>What Would You Like to Do?</BodyText>
          </View>




          <XdcCard style={styles.balanceCard}>
            <View style={styles.alignMiddle}>
              <BodyText>Export Your Account</BodyText>
            </View>
            <Button title="Reveal my Mnemonic" onPress={revealMnemonic} />
          </XdcCard>

          <XdcCard style={styles.balanceCard}>
            <View style={styles.alignMiddle}>
              <BodyText>Delete Your Account</BodyText>
            </View>
            <Button
              title="Delete my on device account"
              onPress={deleteAccount}
            />
          </XdcCard>
        </ScrollView>
      </AppContainer>

      <StandardModal show={!!mnemonic}>
        <View>
          <View>
            <BodyText>Copy The Phrase below to export your wallet</BodyText>
          </View>
          <View style={styles.balanceCard}>
            <SelectableText>{mnemonic}</SelectableText>
          </View>
          <View style={styles.balanceCard}>
            <Button
              title="Close"
              onPress={() => {
                setMnemonic(undefined);
              }}
            />
          </View>
        </View>
      </StandardModal>

      <LoadingModal
        title={performingAction || 'Loading'}
        show={!!performingAction}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  alignMiddle: {
    alignItems: 'center',
  },
  balanceCard: {
    marginTop: 24,
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    marginTop: 16,
  },
  input: {
    height: 40,
    padding: 10,
    marginVertical: 12,
    color: 'white',
    backgroundColor: '#3A3A3A',
    borderRadius: 8,
    borderWidth: 0,
  },
});
