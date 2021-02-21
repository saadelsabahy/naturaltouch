import React, {useEffect, useState, useCallback, ReactNode} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {onlineManager} from 'react-query';

interface ContextTypes {
  isOnline: boolean;
}
export const NetworkContext = React.createContext<ContextTypes>({});

interface Props {
  children: ReactNode;
}
const NetworkProvider = ({children}: Props) => {
  const [isOnline, setisOnline] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return NetInfo.addEventListener(({isConnected}) => {
        setOnline(isConnected ? isConnected : undefined);
      });
    });
    NetInfo.addEventListener(handleConnectivityChange);
    return () => {};
  }, [isOnline]);
  const handleConnectivityChange = useCallback(
    ({isConnected}) => {
      setisOnline(isConnected);
    },
    [isOnline],
  );
  return (
    <NetworkContext.Provider value={{isOnline}}>
      {children}
    </NetworkContext.Provider>
  );
};

export {NetworkProvider};
