import { useMetamask } from "@/src/wallet/ethereum/useMetamask";

const ConnectWallet = () => {
  const { chainId, account, connectMetamask, disconnectMetamask, enabled } = useMetamask();

  return (
    <div className="flex flex-col items-center gap-3 text-white">
      <div className="mt-3 font-bold text-white">ChainId: {chainId}</div>
      <div className="mb-3 mt-3 font-bold text-white">Account: {account}</div>
      {enabled ? (
        <button
          onClick={disconnectMetamask}
          className="rounded-full bg-white px-4 py-2 font-bold text-black shadow-md transition duration-300 ease-in-out"
        >
          Disconnect Wallet
        </button>
      ) : (
        <button
          onClick={connectMetamask}
          className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 font-bold text-white shadow-md transition duration-300 ease-in-out hover:from-blue-400 hover:to-indigo-500"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
export default ConnectWallet;
