import React, {useState} from 'react';

export const CONTACT_EMAIL = 'sachmeet@kartar.ai';

export default function EmailContact({className = ''}) {
  const [message, setMessage] = useState('');
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setMessage('Email address copied.');
    } catch {
      setMessage(`Select and copy ${CONTACT_EMAIL}, or open it in your mail app.`);
    }
  };
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
    <a href={`mailto:${CONTACT_EMAIL}`} className={className} aria-label={`Email ${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
    <button type="button" onClick={copy} className="min-h-11 text-sm text-white/70 hover:text-white underline underline-offset-4">Copy email</button>
    {message && <p role="status" className="w-full text-sm text-white/75">{message}</p>}
  </div>;
}
