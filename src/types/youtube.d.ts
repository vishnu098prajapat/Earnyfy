interface YT {
  Player: {
    new (elementId: string, config: any): any;
  };
  PlayerState: {
    PLAYING: number;
    PAUSED: number;
    ENDED: number;
  };
}

interface Window {
  YT: YT;
  onYouTubeIframeAPIReady: () => void;
} 