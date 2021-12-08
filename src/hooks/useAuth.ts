import { useWeb3React } from "@web3-react/core";
import { useCallback, useState } from "react";
import { ConnectorNames } from "../constants/connectorNames";
import { ConnectorsByName } from "../constants/connectors";

interface IAuth {
	login(connectorId: ConnectorNames): void
	logout(): void
	isConnecting: boolean
	setIsConnecting(isConnecting: boolean): void
}

export default function useAuth(): IAuth {
  const web3React = useWeb3React();
  const { activate, deactivate } = web3React;

  // State
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Method
  const login = useCallback((connectorId: ConnectorNames) => {
    setIsConnecting(true);

    localStorage.setItem("preferredConnectorId", connectorId);

    activate(ConnectorsByName[connectorId], async (error: Error) => {
      console.log(error);
      setIsConnecting(false);
    })
      .finally(() => {
        setIsConnecting(false);
      });
  }, []);

  const logout = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return {
    login,
    logout,
    isConnecting,
    setIsConnecting
  };
}
