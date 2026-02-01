let audioContext: AudioContext | null = null;
let isUnlocked = false;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

// Unlock audio on first user interaction (required for mobile Safari)
export function unlockAudio(): void {
  if (isUnlocked) return;

  const ctx = getAudioContext();

  // Create and play a silent buffer to unlock
  const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start(0);

  if (ctx.state === "suspended") {
    ctx.resume();
  }

  isUnlocked = true;
}

/**
 * Paper slip sound - soft whoosh with friction character
 * Used when paper exits (slides down)
 */
export function playPaperSlip(): void {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const t = ctx.currentTime;
  const duration = 0.05;

  // Create noise buffer
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Fill with noise - quicker decay for snappier feel
  for (let i = 0; i < data.length; i++) {
    const decay = Math.exp(-i / (bufferSize * 0.2));
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Higher bandpass for lighter, airier character
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3800;
  filter.Q.value = 2;

  // Gain envelope
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.45, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(t);
  source.onended = () => {
    source.disconnect();
    filter.disconnect();
    gain.disconnect();
  };
}

/**
 * Mechanical click sound - crisp typewriter-inspired click
 * Used when paper enters (slides up and lands)
 */
export function playPaperClick(): void {
  const ctx = getAudioContext();
  if (ctx.state === "suspended") {
    ctx.resume();
  }

  const t = ctx.currentTime;
  const duration = 0.012;

  // Create short noise burst
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Sharp attack with fast decay
  for (let i = 0; i < data.length; i++) {
    const decay = Math.exp(-i / 50);
    data[i] = (Math.random() * 2 - 1) * decay;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Bandpass for crisp mechanical character
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 4500;
  filter.Q.value = 3;

  // Gain envelope
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.6, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start(t);
  source.onended = () => {
    source.disconnect();
    filter.disconnect();
    gain.disconnect();
  };
}
