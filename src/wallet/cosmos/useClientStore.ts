import { create } from "zustand";
import { SigningStargateClient } from "@cosmjs/stargate";
import {
  cosmosChainConfig,
  CosmosChainIds,
  cosmosChainIds,
} from "../../config/cosmos/cosmosChainConfig";
import useKeplrStore from "./useKeplrStore";

type ChainClientState = {
  client: SigningStargateClient | null;
  address: string;
};

type CosmjsClientState = {
  clients: Record<CosmosChainIds, ChainClientState>;
} & {
  initClients: () => Promise<void>;
  getClient: (chainId: CosmosChainIds) => SigningStargateClient | null;
  resetClients: () => void;
};

const initialClients = {} as Record<CosmosChainIds, ChainClientState>;
cosmosChainIds.forEach((chainId) => {
  initialClients[chainId] = { client: null, address: "" };
});

const useClientStore = create<CosmjsClientState>((set, get) => ({
  clients: initialClients,
  initClients: async () => {
    for (const chainId of cosmosChainIds) {
      try {
        const signer = await useKeplrStore.getState().getSigner(chainId);
        const client = await SigningStargateClient.connectWithSigner(
          cosmosChainConfig[chainId].rpc,
          signer
        );
        const address = (await signer.getAccounts())[0].address;
        set((state) => ({
          ...state,
          clients: {
            ...state.clients,
            [chainId]: { client, address },
          },
        }));
      } catch (e) {
        throw new Error(`Failed to init client for ${chainId}`);
      }
    }
  },
  getClient: (chainId) => {
    const { clients } = get();
    if (clients[chainId] && clients[chainId].client) {
      return clients[chainId].client;
    } else {
      return null;
    }
  },
  resetClients: () => {
    set((state) => ({
      ...state,
      clients: initialClients,
    }));
  },
}));

export default useClientStore;
