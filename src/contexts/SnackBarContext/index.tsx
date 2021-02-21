import React, {useState, useCallback, ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

interface SnackBarContextTypes {
  showSnackbar: (message: string, error?: boolean) => void;
  hideSnackbar: () => void;
  snakbarMessage: string;
  snakbarType: boolean;
}
export const SnackBarContext = React.createContext<SnackBarContextTypes>({});
const SnackBarProvider = ({children}: Props) => {
  const [snakbarMessage, setSnakbarMessage] = useState<string>('');
  const [snakbarType, setsnakbarType] = useState<boolean>(false);

  const showSnackbar = useCallback(
    (message: string, error?: boolean) => {
      setSnakbarMessage(message);
      error && setsnakbarType(true);
    },
    [setSnakbarMessage],
  );
  const hideSnackbar = useCallback(() => {
    setSnakbarMessage('');
    setsnakbarType(false);
  }, [setSnakbarMessage]);

  return (
    <SnackBarContext.Provider
      value={{
        showSnackbar,
        hideSnackbar,
        snakbarMessage,
        snakbarType,
      }}>
      {children}
    </SnackBarContext.Provider>
  );
};

export {SnackBarProvider};
