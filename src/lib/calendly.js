export const CALENDLY_URL = 'https://calendly.com/sachmeet-kartar/30min';

// a1 was verified against the live event: its single preparation textarea.
// Keep the complete brief in that field; never invent a positional mapping.
export const intakeFields = [
  {name:'from_name', label:'Name', type:'text', required:true, autoComplete:'name'},
  {name:'from_email', label:'Work email', type:'email', required:true, autoComplete:'email'},
  {name:'discussion', label:'What would you like to discuss?', required:true, options:['Build a new AI product','Improve an existing product or workflow','Agentic AI for operations','VR architecture or real estate','Kartar Hardware','Other']},
  {name:'outcome', label:'What outcome would make this conversation worthwhile?', required:true, multiline:true},
  {name:'company', label:'Company or organisation', autoComplete:'organization'},
  {name:'role', label:'Your role', autoComplete:'organization-title'},
  {name:'decision_role', label:'Your role in the decision', options:['Final decision-maker','Part of the decision team','Researching options']},
  {name:'current_state', label:'What have you already tried or built?', multiline:true},
  {name:'timeline', label:'Target timeline', options:['Exploring the problem','Ready to start this month','Starting in 1–3 months','Planning for a later quarter']},
  {name:'budget', label:'Indicative budget', options:['Exploring fit','Up to ₹5 lakh','₹5–15 lakh','₹15 lakh+']},
  {name:'from_phone', label:'Phone', type:'tel', autoComplete:'tel'},
  {name:'attendees', label:'Who else will join?'},
  {name:'links', label:'Relevant links'},
];

export function bookingHandoff(values) {
  const name = values.from_name?.trim();
  const email = values.from_email?.trim();
  if (!name || !email || !values.discussion?.trim() || !values.outcome?.trim()) throw new Error('Complete your name, email, discussion topic and desired outcome.');
  const brief = intakeFields.filter(f => !['from_name','from_email'].includes(f.name))
    .map(f => `${f.label}: ${values[f.name]?.trim() || 'Not provided'}`).join('\n\n');
  // Reject, rather than silently truncate, an oversized handoff.
  const url = new URL(CALENDLY_URL);
  url.searchParams.set('name', name);
  url.searchParams.set('email', email);
  url.searchParams.set('a1', brief);
  if (url.href.length > 12000) throw new Error('Please shorten your brief before continuing, or email the longer details to sachmeet@kartar.ai.');
  return {url:url.href, brief};
}
