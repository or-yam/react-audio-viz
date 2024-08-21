/**
 * Processor for audio visualizer to clear
 *  Currently not doing anything special
 * https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor
 * No typescript support yet
 */
class Processor extends AudioWorkletProcessor {
  process([input], [output]) {
    if (!input[0]) {
      output[0].set({});
      return true;
    }
    output[0].set(input[0]);
    return true;
  }
}

registerProcessor('processor', Processor);
