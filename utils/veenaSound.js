// Web Audio API Synthesizer for Authentic Indian Veena & Sitar Classical Plucked Sound Effects
class VeenaSitarSynth {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Play a realistic plucked Veena / Sitar note (Frequency in Hz)
  playNote(freq = 293.66, duration = 2.5, gainVal = 0.3) {
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    // Fundamental oscillator (Triangle/Sawtooth blend for plucked string warmth)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const subOsc = this.audioCtx.createOscillator();

    // Harmonics for Veena/Sitar Chikari resonance
    osc1.type = 'triangle';
    osc2.type = 'sawtooth';
    subOsc.type = 'sine';

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic
    subOsc.frequency.setValueAtTime(freq / 2, now); // Sub-bass resonance

    // Sitar Meend / Pitch Bend simulation (slight upward glide on attack)
    osc1.frequency.exponentialRampToValueAtTime(freq * 1.01, now + 0.05);
    osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.3);

    // Resonant Filter (Sitar Jawari bridge simulation)
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + duration);
    filter.Q.setValueAtTime(4, now); // High Q for string buzzy jawari resonance

    // Envelope Gain (Fast pluck attack, exponential decay)
    const gainNode = this.audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(gainVal, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Connect nodes
    osc1.connect(filter);
    osc2.connect(filter);
    subOsc.connect(gainNode);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    // Start & Stop
    osc1.start(now);
    osc2.start(now);
    subOsc.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    subOsc.stop(now + duration);
  }

  // Play a grand Classical Veena / Sitar Swagat Raag Arpeggio (Sa, Pa, Ga, Ni, Sa')
  playSwagatMelody() {
    this.init();
    const notes = [
      { freq: 146.83, delay: 0 },    // Sa (Low)
      { freq: 220.00, delay: 0.2 },  // Pa
      { freq: 293.66, delay: 0.45 }, // Sa (Mid)
      { freq: 369.99, delay: 0.7 },  // Ga
      { freq: 440.00, delay: 0.95 }, // Pa (High)
      { freq: 554.37, delay: 1.2 },  // Ni
      { freq: 587.33, delay: 1.5 }   // Sa' (High Swagat Peak)
    ];

    notes.forEach(n => {
      setTimeout(() => {
        this.playNote(n.freq, 2.2, 0.25);
      }, n.delay * 1000);
    });
  }

  // Dedicated Sound Effect when Reporting a Civic Problem (Chikari Veena Dispatch Sound)
  playReportDispatchSound() {
    this.init();
    const notes = [
      { freq: 293.66, delay: 0 },     // Mid Sa
      { freq: 440.00, delay: 0.15 },  // Pa
      { freq: 587.33, delay: 0.3 },   // High Sa'
      { freq: 739.99, delay: 0.45 }   // High Ga' (Triumphant Dispatch Peak)
    ];

    notes.forEach(n => {
      setTimeout(() => {
        this.playNote(n.freq, 1.8, 0.3);
      }, n.delay * 1000);
    });
  }
}

export const veenaSynth = new VeenaSitarSynth();
