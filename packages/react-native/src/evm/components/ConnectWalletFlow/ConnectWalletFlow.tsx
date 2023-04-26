import BaseButton from "../base/BaseButton";
import Text from "../base/Text";
import { TWModal } from "../base/modal/TWModal";
import { ChooseWallet } from "./ChooseWallet/ChooseWallet";
import { ConnectingWallet } from "./ConnectingWallet/ConnectingWallet";
import {
  Wallet,
  useConnect,
  useIsConnecting,
  useThirdwebWallet,
} from "@thirdweb-dev/react-core";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SmartWallet } from "@thirdweb-dev/wallets";
import { SmartWalletFlow } from "./SmartWallet/SmartWalletFlow";
import { LocalWalletFlow } from "./LocalWalletFlow";
import { LocalWallet, localWallet } from "../../wallets/wallets/local-wallet";
import { useWallets } from "../../wallets/hooks/useWallets";

export const ConnectWalletFlow = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeWallet, setActiveWallet] = useState<Wallet | undefined>();
  const [isConnecting, setIsConnecting] = useState(false);
  const guestMode = useThirdwebWallet()?.guestMode;
  const supportedWallets = useWallets();
  const isWalletConnecting = useIsConnecting();
  const [showButtonSpinner, setShowButtonSpinner] = useState(false);

  useEffect(() => {
    setShowButtonSpinner(isWalletConnecting);
    const timeout = setTimeout(() => {
      if (isWalletConnecting) {
        setShowButtonSpinner(false);
      }
    }, 5000);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isWalletConnecting]);

  const connect = useConnect();

  const onConnectPress = () => {
    if (supportedWallets.length === 1 && !guestMode) {
      onChooseWallet(supportedWallets[0]);
    } else if (supportedWallets.length === 0 && guestMode) {
      const w = localWallet();
      setActiveWallet(w);
      connectActiveWallet(w);
    }

    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
    setActiveWallet(undefined);
  };

  const connectActiveWallet = async (wallet: Wallet) => {
    setIsConnecting(true);
    connect(wallet, {}).catch((error) => {
      console.error("Error connecting to the wallet", error);
      onBackPress();
    });
  };

  const onJoinAsGuestPress = () => {
    connectActiveWallet(localWallet());
  };

  const onChooseWallet = (wallet: Wallet) => {
    setActiveWallet(() => wallet);

    if (wallet.id !== LocalWallet.id && wallet.id !== SmartWallet.id) {
      connectActiveWallet(wallet);
    }
  };

  const onBackPress = () => {
    setActiveWallet(undefined);
    setIsConnecting(false);
  };

  function getComponentForWallet(activeWalletP: Wallet) {
    switch (activeWalletP.id) {
      case LocalWallet.id:
        return (
          <LocalWalletFlow
            onClose={onClose}
            onBackPress={onBackPress}
            onConnectPress={() => connectActiveWallet(activeWalletP)}
          />
        );
      case SmartWallet.id:
        return (
          <SmartWalletFlow
            onClose={() => {
              onClose();
            }}
            onBackPress={() => {
              setActiveWallet(undefined);
            }}
            onConnect={onBackPress}
          />
        );
    }
  }

  return (
    <>
      <TWModal isVisible={modalVisible}>
        {activeWallet ? (
          isConnecting ? (
            <ConnectingWallet
              content={
                activeWallet.id === LocalWallet.id ? (
                  <Text variant="bodySmallSecondary" mt="md">
                    Creating, encrypting and securing your device wallet.
                  </Text>
                ) : undefined
              }
              wallet={activeWallet}
              onClose={onClose}
              onBackPress={onBackPress}
            />
          ) : (
            getComponentForWallet(activeWallet)
          )
        ) : (
          <ChooseWallet
            wallets={supportedWallets}
            onChooseWallet={onChooseWallet}
            onJoinAsGuestPress={onJoinAsGuestPress}
            onClose={onClose}
          />
        )}
      </TWModal>

      <BaseButton
        backgroundColor="buttonBackgroundColor"
        onPress={onConnectPress}
        style={styles.connectWalletButton}
      >
        {/* {showButtonSpinner ? (
          <ActivityIndicator size="small" color="buttonTextColor" />
        ) : ( */}
        <Text variant="bodyLarge" color="buttonTextColor">
          {showButtonSpinner ? (
            <ActivityIndicator size="small" color="buttonTextColor" />
          ) : (
            "Connect Wallet"
          )}
        </Text>
        {/* )} */}
      </BaseButton>
    </>
  );
};

const styles = StyleSheet.create({
  connectWalletButton: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 150,
  },
});
