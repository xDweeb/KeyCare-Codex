import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateDocumentDirection } from './i18n/i18n';

type Action = 'improve' | 'professional' | 'translate' | 'calm' | 'respectful' | 'analyze';
type Language = 'darija' | 'ar' | 'fr' | 'en';

interface TransformResponse {
  result: string;
  analysis: { detected_languages: string[]; code_switched: boolean; arabizi: boolean; tone: string };
  meta: { action: Action; target_language: string | null };
}

const ACTIONS: Action[] = ['improve', 'professional', 'translate', 'calm', 'respectful', 'analyze'];
const TARGET_LANGUAGES: Language[] = ['darija', 'ar', 'fr', 'en'];
const PRODUCTION_API_URL = 'https://keycare-codex-api-ef6679e530e7.herokuapp.com';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || PRODUCTION_API_URL).replace(/\/$/, '');
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contact@keycare.email';
const ANDROID_DOWNLOAD_URL = import.meta.env.VITE_ANDROID_DOWNLOAD_URL || '';
const examples = [
  'wach n9dro ndecaliw meeting l vendredi?',
  'أنا غاضب بزاف وما عجبنيش هاد التعامل',
  "Merci, that's exactly what I needed!",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isTransformResponse(value: unknown): value is TransformResponse {
  if (!isRecord(value) || !isRecord(value.analysis) || !isRecord(value.meta)) return false;

  return typeof value.result === 'string'
    && Array.isArray(value.analysis.detected_languages)
    && value.analysis.detected_languages.every((language) => typeof language === 'string')
    && typeof value.analysis.code_switched === 'boolean'
    && typeof value.analysis.arabizi === 'boolean'
    && typeof value.analysis.tone === 'string'
    && ACTIONS.includes(value.meta.action as Action)
    && (value.meta.target_language === null || TARGET_LANGUAGES.includes(value.meta.target_language as Language));
}

function getApiErrorMessage(value: unknown) {
  if (!isRecord(value) || !isRecord(value.error) || typeof value.error.message !== 'string') return 'request_failed';
  return value.error.message;
}

async function requestTransform(text: string, action: Action, targetLanguage: Language) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/transform`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ text, action, ...(action === 'translate' ? { target_language: targetLanguage } : {}) }),
      signal: controller.signal,
    });
    const payload: unknown = await response.json().catch(() => null);
    if (!response.ok) throw new Error(`api:${getApiErrorMessage(payload)}`);
    if (!isTransformResponse(payload)) throw new Error('invalid_response');
    return payload;
  } finally {
    window.clearTimeout(timeout);
  }
}

function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const languages = [{ code: 'en', label: 'EN' }, { code: 'fr', label: 'FR' }, { code: 'ar', label: 'ع' }];
  const links = ['demo', 'mobileApp', 'features', 'privacy', 'availability', 'contact'];

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="shell nav-wrap">
        <a className="brand" href={`${import.meta.env.BASE_URL}#top`} aria-label={t('nav.home')}>
          <img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="" width="38" height="38" /><span>KeyCare</span>
        </a>
        <nav className="desktop-nav" aria-label={t('nav.primary')}>
          {links.map((link) => <a key={link} href={`${import.meta.env.BASE_URL}#${link}`}>{t(`nav.${link}`)}</a>)}
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label={t('nav.language')}>
            {languages.map((language) => (
              <button key={language.code} type="button" className={i18n.resolvedLanguage === language.code ? 'active' : ''}
                onClick={() => i18n.changeLanguage(language.code)} aria-pressed={i18n.resolvedLanguage === language.code}>
                {language.label}
              </button>
            ))}
          </div>
          <button ref={menuButton} type="button" className="menu-toggle" aria-expanded={menuOpen}
            aria-controls="mobile-navigation" aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setMenuOpen((open) => !open)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav shell" aria-label={t('nav.mobile')}>
        {links.map((link) => <a key={link} href={`${import.meta.env.BASE_URL}#${link}`} onClick={() => setMenuOpen(false)}>{t(`nav.${link}`)}</a>)}
      </nav>}
    </header>
  );
}

function Hero() {
  const { t } = useTranslation();
  return (
    <section className="hero shell" id="top">
      <div className="hero-copy">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1>{t('hero.title')} <span>{t('hero.highlight')}</span></h1>
        <p className="hero-lede">{t('hero.subtitle')}</p>
        <div className="hero-actions"><a className="button primary" href="#demo">{t('hero.tryDemo')}</a><a className="button secondary" href="#availability">{t('hero.checkAvailability')}</a></div>
        <ul className="signal-list" aria-label={t('hero.signalsLabel')}><li>{t('hero.signalLanguages')}</li><li>{t('hero.signalControl')}</li><li>{t('hero.signalPrivacy')}</li></ul>
      </div>
      <div className="hero-visual" aria-label={t('hero.previewLabel')}>
        <div className="message message-one" dir="ltr">wach n9dro ndecaliw meeting l vendredi?</div>
        <div className="ai-card">
          <div className="ai-card-top"><span className="status-dot" /> KeyCare <small>{t('hero.previewAction')}</small></div>
          <p>{t('actions.improve')} · {t('actions.professional')} · {t('actions.translate')}</p>
          <div className="analysis-row"><span>{t('actions.calm')}</span><span>{t('actions.respectful')}</span><span>{t('actions.analyze')}</span></div>
        </div>
        <div className="message message-two" dir="rtl">المعنى ديالك، بصياغة أوضح.</div>
      </div>
    </section>
  );
}

function ProductDemo() {
  const { t } = useTranslation();
  const [text, setText] = useState(examples[0]);
  const [action, setAction] = useState<Action>('professional');
  const [targetLanguage, setTargetLanguage] = useState<Language>('fr');
  const [result, setResult] = useState<TransformResponse | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => { setResult(null); setError(''); setCopied(false); }, [text, action, targetLanguage]);
  const characterCount = useMemo(() => `${text.length}/2000`, [text.length]);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!text.trim()) { setError(t('demo.emptyError')); return; }
    setStatus('loading'); setError('');
    try { setResult(await requestTransform(text.trim(), action, targetLanguage)); setStatus('idle'); }
    catch (requestError) {
      setStatus('error');
      setError(requestError instanceof DOMException && requestError.name === 'AbortError' ? t('demo.timeoutError')
        : requestError instanceof Error && requestError.message.startsWith('api:') && requestError.message !== 'api:request_failed'
          ? requestError.message.slice(4) : t('demo.serviceError'));
    }
  };
  const copyResult = async () => {
    if (!result) return;
    try { await navigator.clipboard.writeText(result.result); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
    catch { setError(t('demo.copyError')); }
  };

  return (
    <section className="section demo-section" id="demo"><div className="shell">
      <div className="section-heading split-heading"><div><p className="eyebrow">{t('demo.eyebrow')}</p><h2>{t('demo.title')}</h2></div><p>{t('demo.subtitle')}</p></div>
      <div className="demo-shell">
        <form className="composer" onSubmit={submit}>
          <div className="field-heading"><label htmlFor="message">{t('demo.messageLabel')}</label><span>{characterCount}</span></div>
          <textarea id="message" value={text} onChange={(event) => setText(event.target.value)} maxLength={2000} rows={7} dir="auto" placeholder={t('demo.placeholder')} />
          <div className="examples" aria-label={t('demo.examplesLabel')}><span>{t('demo.examplesLabel')}</span>
            {examples.map((example, index) => <button key={example} type="button" onClick={() => setText(example)}>{t(`demo.example${index + 1}`)}</button>)}
          </div>
          <fieldset><legend>{t('demo.actionLabel')}</legend><div className="action-grid">
            {ACTIONS.map((item) => <button key={item} type="button" className={action === item ? 'selected' : ''} aria-pressed={action === item} onClick={() => setAction(item)}>{t(`actions.${item}`)}</button>)}
          </div></fieldset>
          {action === 'translate' && <div className="target-field"><label htmlFor="target-language">{t('demo.targetLabel')}</label><select id="target-language" value={targetLanguage} onChange={(event) => setTargetLanguage(event.target.value as Language)}>{TARGET_LANGUAGES.map((language) => <option key={language} value={language}>{t(`languages.${language}`)}</option>)}</select></div>}
          <button className="button primary submit-button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? t('demo.loading') : action === 'analyze' ? t('demo.analyzeButton') : t('demo.transformButton')}</button>
          <p className="demo-mode"><span className="live" />{t('demo.liveMode')}</p>
        </form>
        <div className="result-panel" aria-live="polite" aria-busy={status === 'loading'}>
          {error && <div className="error-message" role="alert">{error}</div>}
          {!result && !error && <div className="empty-result"><span aria-hidden="true">Aa</span><h3>{t('demo.emptyTitle')}</h3><p>{t('demo.emptyText')}</p></div>}
          {result && <div className="result-content">
            <div className="result-heading"><div><p className="eyebrow">{action === 'analyze' ? t('demo.analysisTitle') : t('demo.suggestionTitle')}</p><h3>{t(`actions.${result.meta.action}`)}</h3></div><span className="user-control">{t('demo.notSent')}</span></div>
            <div className="suggestion" dir="auto">{result.result}</div>
            <div className="analysis-grid"><div><span>{t('demo.tone')}</span><strong>{result.analysis.tone}</strong></div><div><span>{t('demo.languages')}</span><strong>{result.analysis.detected_languages.join(', ')}</strong></div><div><span>{t('demo.codeSwitch')}</span><strong>{result.analysis.code_switched ? t('common.yes') : t('common.no')}</strong></div><div><span>{t('demo.arabizi')}</span><strong>{result.analysis.arabizi ? t('common.detected') : t('common.notDetected')}</strong></div></div>
            <div className="result-actions">{action !== 'analyze' && <button type="button" className="button primary" onClick={copyResult}>{copied ? t('demo.copied') : t('demo.copy')}</button>}<button type="button" className="button secondary" onClick={() => setResult(null)}>{t('demo.keepOriginal')}</button></div>
          </div>}
        </div>
      </div>
    </div></section>
  );
}

function FeatureSection() {
  const { t } = useTranslation();
  const features = ['multilingual', 'actions', 'control', 'privacy', 'resilient', 'shared'];
  return <section className="section" id="features"><div className="shell">
    <div className="section-heading centered"><p className="eyebrow">{t('features.eyebrow')}</p><h2>{t('features.title')}</h2><p>{t('features.subtitle')}</p></div>
    <div className="feature-grid">{features.map((feature, index) => <article key={feature} className="feature-card"><span className="feature-number">0{index + 1}</span><h3>{t(`features.items.${feature}.title`)}</h3><p>{t(`features.items.${feature}.description`)}</p></article>)}</div>
  </div></section>;
}

function MobileShowcase() {
  const { t } = useTranslation();
  const screens = [
    { key: 'welcome', file: 'screen1.png' },
    { key: 'rewrite', file: 'screen2.png' },
    { key: 'setup', file: 'screen3.png' },
    { key: 'ready', file: 'screen4.png' },
  ];

  return <section className="section mobile-showcase" id="mobileApp"><div className="shell">
    <div className="section-heading split-heading mobile-heading">
      <div><p className="eyebrow">{t('mobileShowcase.eyebrow')}</p><h2>{t('mobileShowcase.title')}</h2></div>
      <div><p>{t('mobileShowcase.subtitle')}</p><span className="preview-badge">{t('mobileShowcase.badge')}</span></div>
    </div>
    <div className="mobile-screens" aria-label={t('mobileShowcase.galleryLabel')}>
      {screens.map((screen, index) => <figure className="mobile-screen" key={screen.key}>
        <div className="phone-frame">
          <img
            src={`${import.meta.env.BASE_URL}assets/screens/${screen.file}`}
            alt={t(`mobileShowcase.items.${screen.key}.alt`)}
            loading="lazy"
            width="394"
            height="853"
          />
        </div>
        <figcaption>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{t(`mobileShowcase.items.${screen.key}.title`)}</h3>
          <p>{t(`mobileShowcase.items.${screen.key}.description`)}</p>
        </figcaption>
      </figure>)}
    </div>
    <p className="mobile-note">{t('mobileShowcase.note')}</p>
  </div></section>;
}

function PrivacySection() {
  const { t } = useTranslation();
  const items = ['request', 'storage', 'control', 'credentials'];
  return <section className="section privacy-section" id="privacy"><div className="shell privacy-layout">
    <div className="privacy-copy"><p className="eyebrow">{t('privacy.eyebrow')}</p><h2>{t('privacy.title')}</h2><p>{t('privacy.subtitle')}</p><a className="text-link" href={`${import.meta.env.BASE_URL}privacy`}>{t('privacy.readPolicy')} <span aria-hidden="true">→</span></a></div>
    <div className="privacy-list">{items.map((item) => <article key={item}><span aria-hidden="true">✓</span><div><h3>{t(`privacy.items.${item}.title`)}</h3><p>{t(`privacy.items.${item}.description`)}</p></div></article>)}</div>
  </div></section>;
}

function AvailabilitySection() {
  const { t } = useTranslation();
  return <section className="section" id="availability"><div className="shell">
    <div className="section-heading centered"><p className="eyebrow">{t('availability.eyebrow')}</p><h2>{t('availability.title')}</h2><p>{t('availability.subtitle')}</p></div>
    <div className="availability-grid">{['web', 'android', 'extension'].map((surface) => <article key={surface} className="availability-card">
      <div className="availability-top"><span>{t(`availability.${surface}.label`)}</span><strong className={`status ${surface}`}>{t(`availability.${surface}.status`)}</strong></div><h3>{t(`availability.${surface}.title`)}</h3><p>{t(`availability.${surface}.description`)}</p>
      {surface === 'web' && <a className="text-link" href="#demo">{t('availability.web.cta')} →</a>}
      {surface === 'android' && ANDROID_DOWNLOAD_URL && <a className="text-link" href={ANDROID_DOWNLOAD_URL} download>{t('availability.android.cta')} →</a>}
      {surface === 'android' && !ANDROID_DOWNLOAD_URL && <span className="muted-link">{t('availability.android.unavailable')}</span>}
      {surface === 'extension' && <span className="muted-link">{t('availability.extension.unavailable')}</span>}
    </article>)}</div>
  </div></section>;
}

function ContactSection() {
  const { t } = useTranslation();
  return <section className="section contact-section" id="contact"><div className="shell contact-card"><div><p className="eyebrow">{t('contact.eyebrow')}</p><h2>{t('contact.title')}</h2><p>{t('contact.subtitle')}</p></div><a className="button primary" href={`mailto:${CONTACT_EMAIL}`}>{t('contact.cta')}</a></div></section>;
}

function Footer() {
  const { t } = useTranslation();
  return <footer className="footer"><div className="shell footer-grid"><div><a className="brand" href={`${import.meta.env.BASE_URL}#top`}><img src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="" width="34" height="34" /><span>KeyCare</span></a><p>{t('footer.tagline')}</p></div><nav aria-label={t('footer.legal')}><a href={`${import.meta.env.BASE_URL}privacy`}>{t('footer.privacy')}</a><a href={`${import.meta.env.BASE_URL}terms`}>{t('footer.terms')}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></nav></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} KeyCare</span><span>{t('footer.beta')}</span></div></footer>;
}

function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const { t } = useTranslation();
  const sections = type === 'privacy' ? ['processing', 'storage', 'providers', 'rights', 'contact'] : ['purpose', 'control', 'availability', 'responsibility', 'contact'];
  return <div className="legal-page"><a className="skip-link" href="#main-content">{t('common.skip')}</a><Header /><main id="main-content" className="shell legal-content"><a className="text-link" href={import.meta.env.BASE_URL}>← {t('legal.back')}</a><p className="eyebrow">KeyCare</p><h1>{t(`legal.${type}.title`)}</h1><p className="legal-updated">{t('legal.updated')}</p><p className="legal-intro">{t(`legal.${type}.intro`)}</p>{sections.map((section) => <section key={section}><h2>{t(`legal.${type}.sections.${section}.title`)}</h2><p>{t(`legal.${type}.sections.${section}.content`, { email: CONTACT_EMAIL })}</p></section>)}</main><Footer /></div>;
}

function App() {
  const { i18n, t } = useTranslation();
  const normalizedPath = window.location.pathname.replace(import.meta.env.BASE_URL, '/').replace(/\/+$/, '') || '/';
  useEffect(() => updateDocumentDirection(i18n.resolvedLanguage || i18n.language), [i18n.language, i18n.resolvedLanguage]);
  useEffect(() => {
    const page = normalizedPath === '/privacy' ? 'privacyTitle' : normalizedPath === '/terms' ? 'termsTitle' : 'homeTitle';
    document.title = t(`meta.${page}`);
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', t('meta.description'));
  }, [i18n.language, normalizedPath, t]);
  if (normalizedPath === '/privacy') return <LegalPage type="privacy" />;
  if (normalizedPath === '/terms') return <LegalPage type="terms" />;
  return <div className="site"><a className="skip-link" href="#main-content">{t('common.skip')}</a><Header /><main id="main-content"><Hero /><ProductDemo /><MobileShowcase /><FeatureSection /><PrivacySection /><AvailabilitySection /><ContactSection /></main><Footer /></div>;
}

export default App;
