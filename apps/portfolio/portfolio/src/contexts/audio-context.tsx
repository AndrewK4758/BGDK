import { MRC } from '@bgdk/media-recorder';
import type { Dispatch, JSX, ReactElement, ReactNode, SetStateAction } from 'react';
import { createContext, useState } from 'react';

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

/**
 * This component provides the MediaRecorderClient context to its children.
 * The context includes the MediaRecorderClient class, a media stream, and functions for managing the stream.
 *
 * @param {MediaRecorderClientContextProviderProps} props - The props for the MediaRecorderClientContextProvider component.
 * @param {ReactElement | ReactElement[] | ReactNode | ReactNode[]} props.children - The child components to which the context is provided.
 * @returns {JSX.Element} The rendered MediaRecorderClientContextProvider component.
 */

export const MediaRecorderClientContextProvider = ({
  children,
}: MediaRecorderClientContextProviderProps): JSX.Element => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  /**
   * This function creates a new media stream and sets it in the state.
   *
   * @param {Dispatch<SetStateAction<MediaStream | null>>} setStream - A function to update the media stream state.
   * @param {MediaStreamConstraints} constraints - The constraints for the media stream.
   */

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
