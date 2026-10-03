/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class AmbientSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Deep harmonic cosmic drone (Root 55Hz - A1, 110Hz, 165Hz)
      const freqs = [55, 110, 164.81, 220];
      this.oscillators = [];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Slow subtle LFO detune
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
        lfo.connect(osc.frequency);
        lfo.start();

        oscGain.gain.setValueAtTime(0.08 / (idx + 1), this.ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.masterGain);
        osc.start();
        this.oscillators.push(osc);
      });

      // Ocean wave pink/binaural noise simulation
      const bufferSize = this.ctx.sampleRate * 4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter noise for oceanic surf swell
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, this.ctx.currentTime);

      const filterLFO = this.ctx.createOscillator();
      const filterLFOGain = this.ctx.createGain();
      filterLFO.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave swell
      filterLFOGain.gain.setValueAtTime(120, this.ctx.currentTime);
      filterLFO.connect(filter.frequency);
      filterLFO.start();

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      whiteNoise.start();
      this.noiseNode = whiteNoise;

      this.isPlaying = true;
    } catch {
      // Audio context might be restricted before interaction
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.oscillators.forEach(o => {
          try { o.stop(); } catch { /* ignore */ }
        });
        if (this.noiseNode) {
          try { this.noiseNode.stop(); } catch { /* ignore */ }
        }
        if (this.ctx && this.ctx.state !== 'closed') {
          this.ctx.close();
        }
        this.isPlaying = false;
      }, 1000);
    } else {
      this.isPlaying = false;
    }
  }
}

export const ambientSynth = new AmbientSynthesizer();
