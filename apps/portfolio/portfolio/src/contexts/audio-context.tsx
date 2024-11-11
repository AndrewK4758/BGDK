import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';
import { MRC } from '@bgdk/media-recorder';

export interface MediaRecorderClientContextProps {
  MRC: typeof MRC;
  stream: MediaStream | null;
  setStream: Dispatch<SetStateAction<MediaStream | null>>;
  createStream: (
    setStream: Dispatch<SetStateAction<MediaStream | null>>,
    constraints: MediaStreamConstraints,
  ) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const MediaRecorderClientContext = createContext<MediaRecorderClientContextProps>(null!);

interface MediaRecorderClientContextProviderProps {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[];
}

export const MediaRecorderClientContextProvider = ({ children }: MediaRecorderClientContextProviderProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const createStream = async (
    setStream: Dispatch<SetStateAction<MediaStream | null>>,
    constraints: MediaStreamConstraints,
  ): Promise<void> => {
    try {
      const stream = await MRC.createStream(constraints);

      setStream(stream);
    } catch (err) {
      console.error(err);
    }
  };

  const contextValue = {
    MRC,
    createStream,
    stream,
    setStream,
  };

  return <MediaRecorderClientContext.Provider value={contextValue}>{children}</MediaRecorderClientContext.Provider>;
};
