import { cosmosChainConfig, CosmosChainIds, cosmosChainIds } from '@/src/config/cosmos/cosmosChainConfig';
import useClientStore from '@/src/wallet/cosmos/useClientStore';
import useKeplrStore from '@/src/wallet/cosmos/useKeplrStore';
import { Coin } from '@cosmjs/stargate';
import { Inter } from 'next/font/google'
import { useCallback, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { walletName, connectWallet, disconnectWallet, enabled, isAutoConnect } = useKeplrStore();
  const { initClients, clients, resetClients } = useClientStore();

  const [selectedChain, setSelectedChain] = useState<CosmosChainIds>(cosmosChainIds[0]);
  const [balance, setBalance] = useState<Coin>({ denom: '', amount: '' });
  const handleChainSelect = (chainId: CosmosChainIds) => {
    setSelectedChain(chainId);
    clients[chainId].client?.getBalance(clients[chainId].address, cosmosChainConfig[chainId].denom).then((balance) => {
      setBalance(balance);
    });
  };

  const connectWalletHandler = useCallback(async () => {
    await connectWallet();
    await initClients();
  }, [connectWallet, initClients]);

  const disconnectWalletHandler = useCallback(() => {
    disconnectWallet();
    resetClients();
  }, [disconnectWallet, resetClients]);

  useEffect(() => {
    if (isAutoConnect) {
      connectWalletHandler();
    }
  }, [connectWalletHandler, isAutoConnect]);

  return (
    <main
      className={`h-screen flex items-center flex-col justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 ${inter.className}`}
    >
      <div className='mb-2 font-bold text-white'>
        {walletName}
      </div>
      {
        enabled ?
          <button
            onClick={disconnectWalletHandler}
            className="bg-white text-black font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Disconnect Wallet
          </button> :
          <button
            onClick={connectWalletHandler}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Connect Wallet
          </button>
      }
      <div className="p-10 border rounded-lg mt-10 bg-slate-200">
        <div className="mb-4">
          {cosmosChainIds.map((chainId) => (
            <button
              key={chainId}
              className={`mr-2 px-4 py-2 font-semibold rounded-full transition-all ${selectedChain === chainId
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-200"
                }`}
              onClick={() => handleChainSelect(chainId)}
            >
              {chainId}
            </button>
          ))}
        </div>
        <div>
          <p className="mb-2">
            Selected chain: <span className="font-bold">{selectedChain}</span>
          </p>
          <p className="mb-2">
            Balance : <span className="font-bold">{balance.amount} {balance.denom}</span>
          </p>
          <p>
            Address:
            <span className="font-bold">{clients[selectedChain].address}</span>
          </p>
        </div>
      </div>

    </main>
  )
}
