export interface MediaRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  bitsPerSecond?: number;
}

export interface BlobEvent extends Event {
  readonly data: Blob;
  readonly timecode?: number;
}

export interface MediaRecorderErrorEvent extends Event {
  readonly error: DOMException;
}

export declare class MediaRecorderClient extends EventTarget {
  constructor(stream: MediaStream, options?: MediaRecorderOptions);
  readonly mimeType: string;
  readonly state: 'inactive' | 'recording' | 'paused';
  readonly stream: MediaStream;
  readonly videoBitsPerSecond: number;
  readonly audioBitsPerSecond: number;
  start(timeslice?: number): void;
  stop(): void;
  pause(): void;
  resume(): void;
  requestData(): void;
  ondataavailable: (event: BlobEvent) => void;
  onerror: (event: MediaRecorderErrorEvent) => void;
  onstart: (event: Event) => void;
  onstop: (event: Event) => void;
  onpause: (event: Event) => void;
  onresume: (event: Event) => void;
}
