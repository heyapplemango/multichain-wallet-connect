import { create } from "zustand";
import { OfflineSigner } from "@cosmjs/proto-signing";
import { getKeplrFromWindow } from "@keplr-wallet/stores";
import { cosmosChainIds } from "../../../config/cosmos/cosmosChainConfig";
import { getLocalStorageValue, setLocalStorageValue } from "../../../util/useLocalStorage";

type KeplrState = {
  enabled: boolean;
  isAutoConnect: boolean;
  walletName: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getSigner: (chainId: string) => Promise<OfflineSigner>;
};

const useKeplrStore = create<KeplrState>((set) => {
  const isAutoConnect = getLocalStorageValue(`AUTO_CONNECT_KEPLR`);
  return {
    enabled: false,
    isAutoConnect: isAutoConnect,
    walletName: ``,
    connectWallet: async () => {
      const keplr = await getKeplrFromWindow();
      if (!keplr) {
        throw new Error(`please install keplr extention`);
      } else {
        const walletName = (await keplr.getKey(cosmosChainIds[0])).name;
        set({ walletName });
        await keplr.enable(cosmosChainIds);
        set({ enabled: true });
        setLocalStorageValue(`AUTO_CONNECT_KEPLR`, true);
      }
    },
    disconnectWallet: () => {
      set({ enabled: false });
      set({ walletName: `` });
      setLocalStorageValue(`AUTO_CONNECT_KEPLR`, false);
    },

    getSigner: async (chainId) => {
      const keplr = await getKeplrFromWindow();
      if (!keplr) {
        throw new Error(`please install keplr extention`);
      } else {
        const offlineSigner: OfflineSigner = keplr.getOfflineSigner(chainId);
        return offlineSigner;
      }
    },
  };
});

export default useKeplrStore;
