import { createContext, type Dispatch, type ReactElement, type SetStateAction, useMemo, useState } from 'react';

export type GoogleUserContextInfo = {
  email: string;
  name: string;
};

export interface GoogleUserContextProps {
  setUser: Dispatch<SetStateAction<GoogleUserContextInfo>>;
  GoogleUserContextValues: GoogleUserContextInfo;
}

const googleUserInit: GoogleUserContextInfo = {
  email: '',
  name: '',
};

export const GoogleUserContext = createContext<GoogleUserContextProps>(null!);

interface GoogleContextProviderProps {
  children: ReactElement | ReactElement[];
}

const GoogleUserContextProvider = ({ children }: GoogleContextProviderProps) => {
  const [user, setUser] = useState<GoogleUserContextInfo>(googleUserInit);
  const GoogleUserContextValues = useMemo(() => user, [user]);
  return (
    <GoogleUserContext.Provider value={{ GoogleUserContextValues, setUser }}>{children}</GoogleUserContext.Provider>
  );
};

export default GoogleUserContextProvider;
