import {
  cosmosChainConfig,
  CosmosChainIds,
  cosmosChainIds,
} from "@/src/config/cosmos/cosmosChainConfig";
import { useKeplr } from "@/src/wallet/cosmos/useKeplr";
import { useMetamask } from "@/src/wallet/ethereum/useMetamask";
import { Coin } from "@cosmjs/stargate";
import { useState } from "react";

export default function Home() {
  const { enabled: keplrEnabled, connectKeplr, disconnectKeplr, clients } = useKeplr();
  const {
    chainId,
    account,
    connectMetamask,
    disconnectMetamask,
    enabled: metamaskEnabled,
  } = useMetamask();
  const [selectedChain, setSelectedChain] = useState<CosmosChainIds>(cosmosChainIds[0]);
  const [balance, setBalance] = useState<Coin>({ denom: ``, amount: `` });
  const handleChainSelect = (chainId: CosmosChainIds) => {
    setSelectedChain(chainId);
    clients[chainId].client
      ?.getBalance(clients[chainId].address, cosmosChainConfig[chainId].denom)
      .then((balance) => {
        setBalance(balance);
      });
  };

  return (
    <main className={`flex h-screen flex-col items-center justify-center bg-gray-800`}>
      <div className={`text-white text-3xl font-bold mb-8`}>Keplr Wallet</div>
      <div className={`flex flex-col items-center gap-6`}>
        <div className={`w-full max-w-lg rounded-lg overflow-hidden shadow-lg bg-white`}>
          <div className={`bg-gray-200 text-gray-800 text-xl font-bold py-4 px-6`}>
            Cosmos Chains
          </div>
          <div className={`flex flex-col p-4`}>
            {cosmosChainIds.map((chainId) => (
              <button
                key={chainId}
                className={`block w-full text-center py-2 rounded-lg font-semibold transition-all 
            ${selectedChain === chainId
                    ? `bg-purple-900 text-white`
                    : `bg-white text-purple-900 hover:bg-gray-200 hover:text-purple-900`
                  }`}
                onClick={() => handleChainSelect(chainId)}
              >
                {chainId}
              </button>
            ))}
            <div className={`mt-6 text-gray-700 text-sm`}>
              <p>Selected chain:</p>
              <p className={`font-bold`}>{selectedChain}</p>
              <p className={`mt-2`}>Balance:</p>
              <p className={`font-bold`}>{balance.amount} {balance.denom}</p>
              <p className={`mt-2`}>Address:</p>
              <p className={`font-bold`}>{clients[selectedChain].address}</p>
            </div>
          </div>
          <div className={`bg-gray-200 py-4 px-6 flex justify-end`}>
            {keplrEnabled ? (
              <button
                onClick={disconnectKeplr}
                className={`w-full px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out`}
              >
                Disconnect Wallet
              </button>
            ) : (
              <button
                onClick={connectKeplr}
                className={`w-full px-4 py-2 font-semibold text-white bg-purple-900 rounded-lg hover:bg-purple-800 transition-colors duration-300 ease-in-out`}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
        <div className={`w-full max-w-lg rounded-lg overflow-hidden shadow-lg bg-white`}>
          <div className={`bg-gray-200 text-gray-800 text-xl font-bold py-4 px-6`}>
            Metamask
          </div>
          <div className={`flex flex-col p-4`}>
            <p className={`text-gray-700 text-sm mb-4`}>
              Please connect your Metamask wallet to continue.
            </p>
            <div className={`flex flex-col gap-4`}>
              <div className={`text-gray-700 text-sm`}>
                <p>ChainId:</p>
                <p className={`font-bold`}>{chainId}</p>
              </div>
              <div className={`text-gray-700 text-sm`}>
                <p>Account:</p>
                <p className={`font-bold`}>{account}</p>
              </div>
              {metamaskEnabled ? (
                <button
                  onClick={disconnectMetamask}
                  className={`px-4 py-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-300 ease-in-out`}
                >
                  Disconnect Wallet
                </button>
              ) : (
                <button
                  onClick={connectMetamask}
                  className={`px4 py-2 font-semibold text-white bg-purple-900 rounded-lg hover:bg-purple-800 transition-colors duration-300 ease-in-out`}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
