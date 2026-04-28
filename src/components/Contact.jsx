import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { emailConfig, isEmailConfigured } from '../config/emailjs.js';

const initialState = {
  from_name: '',
  business_name: '',
  reply_email: '',
  website_purpose: '',
  example_links: '',
  message: '',
};

export default function Contact({ t }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState('idle');

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      if (isEmailConfigured) {
        await emailjs.send(emailConfig.serviceId, emailConfig.templateId, form, emailConfig.publicKey);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
        console.info('EmailJS placeholder mode. Connect EmailJS in src/config/emailjs.js or .env.', {
          to: emailConfig.placeholderEmail,
          form,
        });
      }
      setForm(initialState);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Contact</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.subtitle}</p>
          <div className="email-card glass-card">
            <Mail size={20} />
            <span>{emailConfig.placeholderEmail}</span>
          </div>
        </div>

        <form className="glass-card contact-form" onSubmit={submit}>
          <label>
            <span>{t.contact.name}</span>
            <input required value={form.from_name} onChange={(e) => update('from_name', e.target.value)} />
          </label>
          <label>
            <span>{t.contact.businessOptional}</span>
            <input value={form.business_name} onChange={(e) => update('business_name', e.target.value)} />
          </label>
          <label>
            <span>{t.contact.email}</span>
            <input required type="email" value={form.reply_email} onChange={(e) => update('reply_email', e.target.value)} />
          </label>
          <label>
            <span>{t.contact.purpose}</span>
            <textarea required rows="3" placeholder={t.contact.placeholderPurpose} value={form.website_purpose} onChange={(e) => update('website_purpose', e.target.value)} />
          </label>
          <label>
            <span>{t.contact.links}</span>
            <textarea rows="3" placeholder={t.contact.placeholderLinks} value={form.example_links} onChange={(e) => update('example_links', e.target.value)} />
          </label>
          <label>
            <span>{t.contact.message}</span>
            <textarea rows="4" value={form.message} onChange={(e) => update('message', e.target.value)} />
          </label>

          <button className="btn btn-primary form-submit" disabled={status === 'sending'}>
            {status === 'sending' ? t.contact.sending : t.contact.submit}
            {status === 'sending' ? null : <Send size={16} />}
          </button>

          {status === 'success' && (
            <div className="form-status success">
              <CheckCircle2 size={20} />
              <div><strong>{t.contact.success1}</strong><span>{t.contact.success2}</span></div>
            </div>
          )}
          {status === 'error' && <div className="form-status error">{t.contact.error}</div>}
        </form>
      </div>
    </section>
  );
}
