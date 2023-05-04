import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector, NoEthereumProviderError } from "@web3-react/injected-connector";
import { getLocalStorageValue, setLocalStorageValue } from "@/src/util/useLocalStorage";

export const useMetamask = () => {
  const isAutoConnect = getLocalStorageValue(`AUTO_CONNECT_METAMASK`);
  const injected = useMemo(
    () =>
      new InjectedConnector({
        supportedChainIds: [
          1, // Mainet
        ],
      }),
    [],
  );

  const context = useWeb3React<Web3Provider>();
  const { activate, deactivate, active } = context;
  const connectMetamask = useCallback(async () => {
    try {
      await activate(injected, error => {
        if (error instanceof NoEthereumProviderError) {
        console.error(
          `No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.`,
        );
        window.open(`https://metamask.io/download.html`);
      }
      });
      setLocalStorageValue(`AUTO_CONNECT_METAMASK`, true);
    } catch (error) {
      console.log(error);
    }
  }, [activate, injected]);

  const disconnectMetamask = () => {
    deactivate();
    setLocalStorageValue(`AUTO_CONNECT_METAMASK`, false);
  };

  useEffect(() => {
    if (isAutoConnect) {
      connectMetamask();
    }
  }, [connectMetamask, isAutoConnect]);

  return { ...context, enabled: active, connectMetamask, disconnectMetamask };
};
