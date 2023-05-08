import { useCallback, useEffect } from "react";
import useClientStore from "./stores/useClientStore";
import useKeplrStore from "./stores/useKeplrStore";

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
