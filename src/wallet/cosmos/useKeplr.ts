import { useCallback, useEffect } from "react";
import useClientStore from "./useClientStore";
import useKeplrStore from "./useKeplrStore";

export const useKeplr = () => {
  const context = useKeplrStore();
  const clientContext = useClientStore();
  const { initClients, resetClients } = clientContext;
  const { connectWallet, disconnectWallet, isAutoConnect } = context;
  const connectKeplr = useCallback(async () => {
    await connectWallet();
    await initClients();
  }, [connectWallet, initClients]);

  const disconnectKeplr = useCallback(() => {
    disconnectWallet();
    resetClients();
  }, [disconnectWallet, resetClients]);

  useEffect(() => {
    if (isAutoConnect) {
      connectKeplr();
    }
  }, [connectKeplr, isAutoConnect]);
  return { ...context, ...clientContext, connectKeplr, disconnectKeplr };
};
