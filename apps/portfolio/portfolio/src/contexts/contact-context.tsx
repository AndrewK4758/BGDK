import {
  createContext,
  type Dispatch,
  type JSX,
  type ReactElement,
  type ReactNode,
  type SetStateAction,
  useMemo,
  useState,
} from 'react';

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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const GoogleUserContext = createContext<GoogleUserContextProps>(null!);

interface GoogleContextProviderProps {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}

/**
 * This component provides the Google User context to its children.
 * The context includes the user's email and name.
 *
 * @param {GoogleContextProviderProps} props - The props for the GoogleUserContextProvider component.
 * @param {ReactElement | ReactElement[] | ReactNode | ReactNode[]} props.children - The child components to which the context is provided.
 * @returns {JSX.Element} The rendered GoogleUserContextProvider component.
 */

const GoogleUserContextProvider = ({ children }: GoogleContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<GoogleUserContextInfo>(googleUserInit);
  const GoogleUserContextValues = useMemo(() => user, [user]);
  return (
    <GoogleUserContext.Provider value={{ GoogleUserContextValues, setUser }}>{children}</GoogleUserContext.Provider>
  );
};

export default GoogleUserContextProvider;
