import { LitElement, html, css } from 'lit';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { defineCustomElement } from '@helper/defineCustomElement';
import type { YoutubeProperties } from '@interfaces/youtube.interface';

import componentStyles from './cc-youtube-api.lit';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export class CcYoutubeApi extends LitElement implements YoutubeProperties {
  static styles: CSSResultGroup = [
    componentStyles,
    css`
      :host {
        display: block;
      }
      .player {
        width: 100%;
        height: 100%;
      }
    `,
  ];

  static pendingCallbacks: Array<() => void> = [];

  @property({ type: String }) videoId: string = 'ATGv84uorF4';
  @property({ type: Boolean }) autoplay = false;
  @property({ type: Number }) size = 100;
  @property({ type: String }) measurement: 'px' | '%' = '%';
  @property({ type: Boolean }) mute = false;
  @property({ type: Boolean }) loop = false;
  @property({ type: Boolean }) controls = true;
  @property({ type: Boolean }) isBackground = false;

  private player?: any;
  private playerId = `player-${Math.random().toString(36).substr(2, 9)}`;

  firstUpdated(): void {
    this.loadYouTubeAPI();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.player && typeof this.player.destroy === 'function') {
      try {
        this.player.destroy();
      } catch (error) {
        console.warn('Error destroying player:', error);
      }
      this.player = undefined;
    }
  }

  private loadYouTubeAPI(): void {
    if (window.YT && window.YT.Player) {
      this.initPlayer();
    } else {
      const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      CcYoutubeApi.pendingCallbacks.push(() => this.initPlayer());
      if (!window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = () => {
          CcYoutubeApi.pendingCallbacks.forEach((cb) => cb());
          CcYoutubeApi.pendingCallbacks = [];
        };
      }
    }
  }

  private initPlayer(): void {
    const playerElement = this.shadowRoot?.getElementById(this.playerId);
    if (!playerElement) {
      console.error('Player element not found in Shadow DOM');
      return;
    }
    this.player = new window.YT.Player(playerElement, {
      videoId: this.videoId,
      playerVars: {
        autoplay: this.autoplay ? 1 : 0,
        mute: this.mute ? 1 : 0,
        loop: this.loop ? 1 : 0,
        playlist: this.loop ? this.videoId : undefined,
        controls: this.controls ? 1 : 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      events: {
        onReady: (event: any) => {
          if (this.mute) event.target.mute();
          if (this.autoplay) event.target.playVideo();
        },
        onStateChange: (event: any) => {
          if (this.loop && event.data === window.YT.PlayerState.ENDED) {
            event.target.seekTo(0);
            event.target.playVideo();
          }
        },
      },
    });
  }

  render(): TemplateResult {
    const viewTypeClass = this.isBackground ? 'youtube-background' : 'youtube-target';
    const height = `${this.size}${this.measurement}`;
    return html`
      <div class=${['youtube', viewTypeClass].join(' ')} style="height: ${height};">
        <div id=${this.playerId} class="player"></div>
      </div>
    `;
  }
}

defineCustomElement('cc-youtube-api', CcYoutubeApi);

declare global {
  interface HTMLElementTagNameMap {
    'cc-youtube-api': CcYoutubeApi;
  }
}
