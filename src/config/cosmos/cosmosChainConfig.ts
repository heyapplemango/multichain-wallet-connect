export type CosmosChainIds = "cosmoshub-4" | "osmosis-1" | "juno" | "stargaze";
type CosmosChainConfig = {
  rpc: string;
  rest: string;
  chainId: CosmosChainIds;
  denom: string;
  decimal: number;
};
export const cosmosChainConfig: Record<CosmosChainIds, CosmosChainConfig> = {
  "cosmoshub-4": {
    rpc: `https://cosmos-rpc.publicnode.com`,
    rest: `https://cosmos-rest.publicnode.com`,
    chainId: `cosmoshub-4`,
    denom: `uatom`,
    decimal: 6,
  },
  "osmosis-1": {
    rpc: `https://rpc-osmosis.ecostake.com/`,
    rest: `https://rest-osmosis.ecostake.com/`,
    chainId: `osmosis-1`,
    denom: `uosmo`,
    decimal: 6,
  },
  juno: {
    rpc: `https://juno-rpc.polkachu.com`,
    rest: `https://juno-api.polkachu.com`,
    chainId: `juno`,
    denom: `ujuno`,
    decimal: 6,
  },
  stargaze: {
    rpc: `https://rpc.stargaze-apis.com`,
    rest: `https://rest.stargaze-apis.com`,
    chainId: `stargaze`,
    denom: `ustars`,
    decimal: 6,
  },
};

export const cosmosChainIds: CosmosChainIds[] = Object.keys(cosmosChainConfig) as CosmosChainIds[];
