import { useEffect } from "react";
import useAuth from "./useAuth";
import { ConnectorNames } from "../constants/connectorNames";

export default function useEagerConnect(): void {

  const { login } = useAuth();

  useEffect(() => {
    const preferredConnectorId = localStorage.getItem("preferredConnectorId") as ConnectorNames;

    if (preferredConnectorId) {
      // login(preferredConnectorId)
      login(ConnectorNames.Injected);
    }
  }, [login]);

  return;
}
