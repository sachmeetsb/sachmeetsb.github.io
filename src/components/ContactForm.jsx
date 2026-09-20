import React, {useEffect, useRef, useState} from "react";
import {createVoiceSession, supportsVoiceInput, voiceAnswer} from "../lib/voiceInput";
import {bookingHandoff, intakeFields} from "../lib/calendly";
import {products} from "../data/portfolio";
import EmailContact from './EmailContact';

const fieldClassName = "w-full rounded-xl border border-white/30 bg-white/[0.08] px-5 py-3.5 text-[16px] text-white placeholder:text-white/60 focus:border-saffron-core";
const actionClassName = "min-h-11 rounded-pill border border-white/40 px-4 py-2 text-[14px] text-white hover:border-saffron-core";
export default function Contact() {
  const [values,setValues] = useState(() => {
    const project=products.find(p=>p.slug===new URLSearchParams(window.location.search).get("project"));
    return Object.fromEntries(intakeFields.map(f=>[f.name,f.name==="outcome" && project ? `I'd like to discuss a project related to ${project.name}.` : ""]));
  });
  const [voiceState,setVoiceState] = useState({field:"",status:""});
  const [draft,setDraft] = useState(null);
  const [handoff,setHandoff] = useState(null);
  const [error,setError] = useState("");
  const voice = useRef(null);
  const reviewRef = useRef(null);
  const draftRef = useRef(null);
  useEffect(() => {
    voice.current=createVoiceSession({
      Recognition:window.SpeechRecognition || window.webkitSpeechRecognition,
      onState:setVoiceState,
      onTranscript:(field,text)=>{
        const current=draftRef.current;
        if(current?.field!==field) return;
        const limit=intakeFields.find(f=>f.name===field)?.multiline?1000:250;
        setValues(values=>({...values,[field]:voiceAnswer(current.previous,text,limit)}));
        setHandoff(null);
      }
    });
    const hide=()=>{if(document.hidden) voice.current?.stop();};
    document.addEventListener("visibilitychange",hide);
    return ()=>{document.removeEventListener("visibilitychange",hide);voice.current?.stop(false);};
  },[]);
  const update=(name,value)=>{
    if(draftRef.current?.field===name) voice.current?.stop();
    setValues(v=>({...v,[name]:value}));
    setHandoff(null); setError("");
  };
  const keepVoice=()=>{
    voice.current?.stop();
    const field=draftRef.current?.field;
    draftRef.current=null; setDraft(null);
    if(field) document.getElementById(`intake-${field}`)?.focus();
  };
  const startVoice=(field)=>{
    if(voiceState.field===field){voice.current?.stop();return;}
    voice.current?.stop(false);
    const next={field,previous:values[field]};
    draftRef.current=next; setDraft(next); setError("");setHandoff(null);
    voice.current?.start(field);
  };
  const discard=()=>{
    voice.current?.stop();
    const current=draftRef.current;
    if(current) setValues(v=>({...v,[current.field]:current.previous}));
    draftRef.current=null;setDraft(null);setError("");setHandoff(null);
    document.getElementById(`intake-${current?.field}`)?.focus();
  };
  const submit=event=>{
    event.preventDefault();
    keepVoice();
    try {setHandoff(bookingHandoff(values));setError("");requestAnimationFrame(()=>reviewRef.current?.focus());}
    catch(e){setError(e.message);}
  };
  const renderField=field=>{
    const id=`intake-${field.name}`;
    const canSpeak=supportsVoiceInput(field);
    const recording=voiceState.field===field.name;
    const reviewing=draft?.field===field.name && !recording;
    const props={id,name:field.name,required:field.required,value:values[field.name],onChange:e=>update(field.name,e.target.value),className:fieldClassName,autoComplete:field.autoComplete,maxLength:field.multiline?1000:250};
    return <div key={field.name} className={field.multiline?"sm:col-span-2":""}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <label htmlFor={id} className="text-[14px] text-white/85 font-medium">{field.label}{!field.required && <span className="text-white/65"> (optional)</span>}</label>
        {canSpeak && <div className="flex shrink-0 gap-2">
          {reviewing ? <>
            <button type="button" onClick={discard} aria-label={`Discard voice answer for ${field.label}`} className={actionClassName}>Discard</button>
            <button type="button" onClick={keepVoice} aria-label={`Keep voice answer for ${field.label}`} className={`${actionClassName} border-saffron-core bg-saffron-core/15`}>Keep</button>
          </> : <button type="button" onClick={()=>startVoice(field.name)} aria-label={`${recording?"Stop voice input":"Speak answer"} for ${field.label}`} aria-pressed={recording} className={actionClassName}>{recording?"Stop":"Speak"}</button>}
        </div>}
      </div>
      {field.options ? <select {...props}><option value="">Choose an option</option>{field.options.map(option=><option key={option}>{option}</option>)}</select> : field.multiline ? <textarea {...props} rows={3} /> : <input {...props} type={field.type||"text"} />}
      {draft?.field===field.name && <p role="status" className="mt-2 text-white/75 text-[13px]">{recording ? voiceState.status : `${voiceState.status} Your answer is kept automatically; edit it here or discard to restore the previous answer.`}</p>}
    </div>;
  };
  return <section id="contact" className="py-24 md:py-32">
    <div className="mx-auto max-w-container px-5 sm:px-8 lg:px-16">
      <div className="mb-14 flex flex-col gap-5 md:flex-row md:items-center md:gap-12">
        <h2 className="inline-block self-start whitespace-nowrap rounded-pill bg-saffron px-6 py-2 font-display text-[22px] font-bold text-white">Book a Call</h2>
        <p className="max-w-2xl text-[18px] leading-relaxed text-white/70">Share the context so I can prepare. Then choose a time and confirm the meeting in Calendly.</p>
      </div>
      <div className="grid grid-cols-1 gap-12 rounded-card p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16 md:p-14" style={{background:"#2D1B69",backgroundImage:"radial-gradient(ellipse 60% 80% at 90% 50%, rgba(74,47,154,0.6) 0%, transparent 70%)"}}>
        <form onSubmit={submit} aria-label="Project discussion intake" className="min-w-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{intakeFields.slice(0,4).map(renderField)}</div>
          <details className="mt-7">
            <summary className="cursor-pointer min-h-11 py-2 text-white font-display font-semibold">Add preparation details (optional)</summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">{intakeFields.slice(4).map(renderField)}</div>
          </details>
          <p className="text-[14px] text-white/75 mt-6">Voice is optional. Your browser may process audio through its speech provider; offline transcription is not guaranteed. Spoken answers appear in their fields and are kept automatically. You can edit them or discard the latest recording.</p>
          {error && <p role="alert" className="mt-5 text-saffron-core">{error}</p>}
          <button type="submit" className="mt-7 rounded-pill bg-saffron px-7 py-4 font-display text-[17px] font-semibold text-white hover:bg-saffron-light">Review booking details</button>
          <p className="mt-4 text-[14px] text-white/75">Nothing is booked or sent to Sachmeet at this step. Your answers are passed to Calendly only when you open the booking link. Please avoid confidential information.</p>
        </form>
        <aside className="min-w-0">
          <h3 className="mb-6 font-display text-[32px] font-bold text-white leading-tight">A prepared conversation.</h3>
          <p className="mb-6 text-[17px] leading-relaxed text-white/75">We’ll discuss your problem, the people it affects and what a useful next step looks like. Budget, timing and other preparation details are optional.</p>
          {handoff && <div ref={reviewRef} tabIndex={-1} role="region" aria-label="Review booking details" className="rounded-2xl border border-white/25 p-5 mb-7">
            <h4 className="font-bold text-white mb-3">Ready for Calendly</h4>
            <p className="text-white/85 break-words">{values.from_name} · {values.from_email}</p>
            <details className="mt-4"><summary className="min-h-11 cursor-pointer text-white">Review the full brief</summary><p className="whitespace-pre-wrap break-words text-white/80 text-[14px]">{handoff.brief}</p></details>
            <a href={handoff.url} className="inline-flex mt-5 rounded-pill bg-white text-void font-display font-semibold px-5 py-3">Choose a time in Calendly →</a>
            <p className="text-[14px] text-white/75 mt-4">Continues to Calendly in this tab with your name, email and full brief. A call is booked only after you select a time and Calendly confirms it. Editing any answer here clears this link.</p>
          </div>}
          <p className="text-white/70 text-[15px] mb-7">Calendly handles current availability, time zones, invitations and rescheduling.</p>
          <EmailContact className="text-saffron-core font-display font-semibold break-words" />
          <a href="/privacy/" className="block mt-5 text-white/75 underline text-[14px]">Privacy and booking information</a>
        </aside>
      </div>
    </div>
  </section>;
}
