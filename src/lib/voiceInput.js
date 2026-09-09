// Deliberately conservative: a transcript is a proposal, never a selection.
export function suggestVoiceOption(transcript, options) {
  const normalize = text => text.toLowerCase().replace(/₹/g, ' rupees ').replace(/[–—-]/g, ' ').replace(/[^a-z0-9+ ]/g, '').replace(/\s+/g, ' ').trim();
  const spoken = normalize(transcript);
  return options.find(option => normalize(option) === spoken) || '';
}

export function recognitionTranscript(results) {
  // Rebuild from the cumulative result list, avoiding duplicated final chunks.
  return Array.from(results, result => result[0]?.transcript || '').join(' ').trim();
}

export function createVoiceSession({ Recognition, onState, onTranscript }) {
  let current;
  const stop = (notify = true) => {
    const previous = current;
    current = undefined; // Invalidate callbacks before abort, which may fire synchronously.
    // Some engines throw when aborting a pending permission request or an
    // already-ended recognition session. Cleanup must not block form actions.
    try { previous?.abort(); } catch { /* Session is already invalidated. */ }
    if (notify) onState({ field: '', status: 'Microphone stopped. Review your transcript before using it.' });
  };
  return {
    stop,
    start(field) {
      stop(false);
      if (!Recognition) {
        onState({ field: '', status: 'Voice is unavailable in this browser. You can type every answer.' });
        return;
      }
      const session = new Recognition();
      current = session;
      session.continuous = true;
      session.interimResults = true;
      session.lang = 'en-IN';
      const owns = () => current === session;
      onState({field, status: 'Starting microphone…'});
      session.onstart = () => owns() && onState({field, status: 'Listening. Your transcript is a draft until you confirm it.'});
      session.onresult = event => owns() && onTranscript(field, recognitionTranscript(event.results));
      session.onerror = event => {
        if (!owns()) return;
        current = undefined;
        try { session.abort(); } catch { /* Error handling must still update the UI. */ }
        onState({field: '', status: event.error === 'not-allowed'
          ? 'Microphone permission was not granted. Enable it in your browser or type your answer.'
          : 'Voice input stopped. Review any captured words, or type your answer.'});
      };
      session.onend = () => {
        if (!owns()) return;
        current = undefined;
        onState({field: '', status: 'Microphone stopped. Review your transcript before using it.'});
      };
      try { session.start(); } catch {
        if (owns()) {
          current = undefined;
          onState({field: '', status: 'The microphone could not start. Try again or type your answer.'});
        }
      }
    },
  };
}
