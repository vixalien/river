import { useContext } from "preact/hooks";
import { createContext } from "preact";

const EnvContext = createContext<Record<string, string>>({});

export const EnvProvider = EnvContext.Provider;

export default EnvContext;

export function useEnv() {
  return useContext(EnvContext);
}
