export type Lang = "cs" | "en";

/**
 * Price figures are hidden on the site while the same page is used to sell
 * work beyond the automation ladder, where these numbers don't apply.
 *
 * Nothing is deleted — the figures below stay current in `steps[].price`
 * and `prices`. Flip this to `true` to show them again.
 *
 * Hides: the price line under each step in the approach section, and the
 * indicative price strip under the about section.
 */
export const SHOW_PRICING = false;

export interface Stat {
  /** Count-up target; null means the value is a static string (no animation). */
  value: number | null;
  suffix: string;
  display: string;
  label: string;
}

export interface ServiceCard {
  num: string;
  title: string;
  body: string;
  /** Optional one-line offer shown under the card body. */
  note?: string;
}

export interface Step {
  num: string;
  badge: string;
  title: string;
  price: string;
  meta: string;
  body: string;
}

export interface PriceRow {
  k: string;
  v: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface FormCopy {
  title: string;
  subtitle: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  phoneOptional: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  errorFallback: string;
  close: string;
  required: string;
  invalidEmail: string;
  note: string;
}

export interface DemoColumn {
  num: string;
  title: string;
  body: string;
}

export interface DemoCopy {
  eyebrow: string;
  /** H1 split so the middle phrase can take the rose emphasis. */
  headPre: string;
  headEm: string;
  headPost: string;
  lead: string;
  /** Label of the button and screenshot link that open the demo. */
  open: string;
  columns: DemoColumn[];
  liveBadge: string;
  frameNote: string;
  faqLabel: string;
  faqTitle: string;
  faqs: FaqItem[];
  ctaLine: string;
}

export interface NavCopy {
  menuOpen: string;
  menuClose: string;
  services: string;
  how: string;
  faq: string;
  contact: string;
  footerServices: string;
  footerCompany: string;
}

export interface SliderCopy {
  prev: string;
  next: string;
  goTo: string;
  moreAi: string;
  moreBuild: string;
  labelAi: string;
  labelBuild: string;
}

export interface ProductCopy {
  label: string;
  title: string;
  body: string;
  note: string;
  cta: string;
  alt: string;
}

export interface ConsentCopy {
  label: string;
  text: string;
  accept: string;
  reject: string;
  settings: string;
}

export interface Content {
  ctaShort: string;
  ctaPrimary: string;
  heroKicker: string;
  heroHeadA: string;
  heroHeadB: string;
  heroSub: string;
  heroSecondary: string;
  heroDemoLink: string;
  trustLabel: string;
  trustPause: string;
  trustPlay: string;
  stats: Stat[];
  servicesLabel: string;
  servicesTitle: string;
  tabAi: string;
  tabBuild: string;
  aiServices: ServiceCard[];
  buildServices: ServiceCard[];
  servicesNote: string;
  approachLabel: string;
  approachTitle: string;
  steps: Step[];
  approachMicro: string;
  aboutLabel: string;
  aboutHead: string;
  aboutBody: string;
  priceLabel: string;
  prices: PriceRow[];
  faqLabel: string;
  faqTitle: string;
  faqs: FaqItem[];
  finalLabel: string;
  finalHeadline: string;
  finalBody: string;
  email: string;
  footer: string;
  navLabel: string;
  navHome: string;
  navDemo: string;
  nav: NavCopy;
  slider: SliderCopy;
  product: ProductCopy;
  footerTagline: string;
  demo: DemoCopy;
  form: FormCopy;
  consent: ConsentCopy;
}

const cs: Content = {
  ctaShort: "Nezávazná konzultace",
  ctaPrimary: "Nezávazná konzultace",
  heroKicker: "AI automatizace pro firmy",
  heroHeadA: "Odpověď do minuty.",
  heroHeadB: "Víc zakázek, méně ruční práce.",
  heroSub:
    "Kdo vám napíše v pátek večer, dostane do minuty odpověď s cenou nebo volným termínem, dřív než napíše konkurenci. A opakovaná práce v kanceláři, faktury, nabídky, přepisování mezi systémy, běží sama. Napojíme se na to, co už používáte.",
  heroSecondary: "Co automatizujeme ↓",
  heroDemoLink: "Živá ukázka →",
  trustLabel: "Důvěřují nám",
  trustPause: "Zastavit posouvání log",
  trustPlay: "Spustit posouvání log",
  stats: [
    { value: null, suffix: "", display: "< 1 min", label: "odpověď na poptávku, i v noci" },
    { value: null, suffix: "", display: "24/7", label: "večery, víkendy, svátky" },
    { value: null, suffix: "", display: "0×", label: "ruční přepisování faktur" },
    { value: 30, suffix: " dní", display: "30 dní", label: "od podpisu k ostrému provozu" },
  ],
  servicesLabel: "Co děláme",
  servicesTitle: "Víc zakázek, méně opakované práce",
  tabAi: "AI automatizace",
  tabBuild: "Weby a aplikace",
  aiServices: [
    {
      num: "01",
      title: "Odpověď na poptávku do minuty",
      body: "Každý dotaz z e-mailu, webu nebo formuláře dostane hned odpověď s cenou nebo volným termínem, vaším tónem. Vaši lidé řeší jen ty, kdo chtějí koupit.",
      note: "Pošlete 10–20 starších poptávek. Do týdne uvidíte, jak by na ně systém odpověděl. Zdarma.",
    },
    {
      num: "02",
      title: "Faktury a doklady",
      body: "Faktury a objednávky přečteme a pošleme rovnou do ERP nebo Pohody. Konec přepisování.",
      note: "Pošlete nám 20 faktur. Do týdne uvidíte, co z nich systém vytáhne. Zdarma.",
    },
    {
      num: "03",
      title: "Interní procesy",
      body: "Přepisování mezi systémy, dokumenty, smlouvy, reporty. Opakované úlohy v kanceláři běží samy, lidé jen kontrolují.",
    },
    {
      num: "04",
      title: "Nabídky a kalkulace",
      body: "Kalkulace a nabídka za minuty místo hodin. Rychlejší nabídka vyhrává zakázky.",
    },
    {
      num: "05",
      title: "Hotely, resorty a svatby",
      body: "Firemní akce, svatby, předrezervace. Host dostane hned kapacitu a termín, koordinátorka ráno jen dokončí nabídku.",
    },
    {
      num: "06",
      title: "Hlídání pohledávek",
      body: "Automatické upomínky podle stáří pohledávky. Peníze na účtu dřív, bez nepříjemných telefonátů.",
    },
    {
      num: "07",
      title: "Znalostní báze s citacemi",
      body: "Zeptáte se vlastními slovy, odpověď přijde s odkazem na dokument a stranu. Nevymýšlí si.",
    },
  ],
  buildServices: [
    {
      num: "01",
      title: "Webové stránky",
      body: "Rychlé, měřitelné a snadno spravovatelné weby na Next.js. Postavené tak, aby vydržely roky, ne jednu kampaň.",
    },
    {
      num: "02",
      title: "Webové aplikace",
      body: "Zákaznické portály a nástroje postavené na moderním stacku, na míru vašim procesům.",
    },
    {
      num: "03",
      title: "Integrace a API",
      body: "Propojíme systémy, které spolu dnes nemluví. Data tečou automaticky tam, kde je potřebujete.",
    },
    {
      num: "04",
      title: "Interní nástroje",
      body: "Od jednoho formuláře po celý systém, na míru vašim procesům.",
    },
  ],
  servicesNote:
    "Nevidíte tu svůj případ? Většina projektů začíná tím, že nám ho popíšete.",
  approachLabel: "Jak pracujeme",
  approachTitle: "Tři kroky od ukázky k provozu",
  steps: [
    {
      num: "01",
      badge: "Začněte tady",
      title: "Ukázka na vašich datech",
      price: "zdarma",
      meta: "do týdne · bez závazku",
      body: "Pošlete 10–20 starších poptávek nebo 20 faktur. Do týdne uvidíte, co by s nimi systém udělal.",
    },
    {
      num: "02",
      badge: "",
      title: "Pilot",
      price: "od 60 000 Kč",
      meta: "do 30 dní",
      body: "Jedna automatizace, jedna pobočka nebo jeden typ poptávek v ostrém provozu. Když rozšíříte, celá částka se započítá.",
    },
    {
      num: "03",
      badge: "",
      title: "Provoz",
      price: "od 4 000 Kč/měs",
      meta: "průběžně",
      body: "Dohled, ladění odpovědí a další automatizace.",
    },
  ],
  approachMicro:
    "Na začátku každou odpověď schvaluje váš člověk. Automaticky odchází jen to, co sami povolíte.",
  aboutLabel: "Proč Full Canvas",
  aboutHead: "Platíte za výsledek, ne za prezentace.",
  aboutBody:
    "Pevná cena, kterou znáte před podpisem. Polovina na začátku, polovina až po spuštění. Systém běží nad tím, co už používáte, vaši lidé se nemusí učit nic nového. Když se vám to nezaplatí, řekneme to dřív, než utratíte korunu.",
  priceLabel: "Orientačně",
  prices: [
    { k: "Ukázka", v: "zdarma" },
    { k: "Pilot", v: "od 60 000 Kč" },
    { k: "Weby", v: "od 80 000 Kč" },
  ],
  faqLabel: "FAQ",
  faqTitle: "Otázky, které slyšíme nejčastěji",
  faqs: [
    {
      q: "Jak rychle to jde?",
      a: "Ukázku na vašich datech máte do týdne. Pilot je v ostrém provozu do 30 dní od podpisu.",
    },
    {
      q: "Nemáme čas na projekt.",
      a: "Vaši lidé nám dají dohromady pár hodin: ukážou, jak dnes pracují, a pošlou podklady. Zbytek práce je na nás.",
    },
    {
      q: "Nechceme robota místo recepce.",
      a: "Ten ani nestavíme. Systém odpoví hned a připraví podklady, rozhodnutí a osobní kontakt zůstávají vašim lidem. Ti mají víc času na hosty a zákazníky, kteří chtějí koupit.",
    },
    {
      q: "AI si přece vymýšlí.",
      a: "Odpovídá jen z vašich ceníků, kalendáře a dokumentů, u interních dotazů s odkazem na zdroj. Když odpověď nezná, předá to člověku se shrnutím.",
    },
    {
      q: "Co bude s našimi daty?",
      a: "Data zůstávají vaše. Řešení běží na účtech, které vlastníte, ve vaší infrastruktuře nebo v EU cloudu. My dodáváme aplikaci a údržbu.",
    },
    {
      q: "Jak poznáme, že to bude fungovat?",
      a: "Pošlete nám 10–20 starších poptávek nebo 20 skutečných faktur. Do týdne uvidíte, co by s nimi systém udělal. Zdarma, bez závazku. Když to u vás nedává smysl, řekneme to.",
    },
  ],
  finalLabel: "Kontakt",
  finalHeadline: "Patnáct minut. Víc nepotřebujete.",
  finalBody: "Popíšete, jak k vám chodí poptávky nebo co v kanceláři děláte ručně. My na rovinu řekneme, co se u vás vyplatí a do kdy. Nebo rovnou pošlete pár poptávek či faktur a uvidíte výsledek dřív, než se rozhodnete.",
  email: "hello@fullcanvas.cz",
  footer: "© 2026 FULL CANVAS DIGITAL · IČO 06762336",
  navLabel: "Navigace",
  navHome: "Úvod",
  navDemo: "Živá ukázka",
  nav: {
    menuOpen: "Otevřít menu",
    menuClose: "Zavřít menu",
    services: "Služby",
    how: "Jak pracujeme",
    faq: "FAQ",
    contact: "Kontakt",
    footerServices: "Služby",
    footerCompany: "Firma",
  },
  slider: {
    prev: "Předchozí služba",
    next: "Další služba",
    goTo: "Přejít na službu",
    moreAi: "Více o službě →",
    moreBuild: "Popsat projekt →",
    labelAi: "AI automatizace",
    labelBuild: "Weby a aplikace",
  },
  product: {
    label: "Živá ukázka",
    title: "Tohle je skutečný systém, ne video.",
    body: "Recepce odpoví pacientovi do minuty, nabídne tři volné termíny a potvrdí ten vybraný. Napište jako pacient a sledujte, co se stane. Stejný princip stavíme pro hotely, autoservisy, kliniky i realitky, a taky na faktury a interní procesy.",
    note: "Nic se neposílá skutečným lidem.",
    cta: "Vyzkoušet živou ukázku →",
    alt: "Aplikace Recepce: formulář pacienta vlevo, vpravo přehled kroků, které systém udělal, včetně odpovědi se třemi termíny",
  },
  footerTagline: "Odpověď na každou poptávku do minuty. Faktury, nabídky a interní procesy bez ručního přepisování.",
  demo: {
    eyebrow: "RECEPCE · ŽIVÁ UKÁZKA",
    headPre: "Dotaz zodpovězený",
    headEm: "do minuty",
    headPost: ", termín domluvený bez recepce.",
    lead: "Tohle je skutečný systém, ne video. Napište jako pacient, kterýmkoli jazykem, a sledujte, co se stane. Nic se neposílá skutečným lidem.",
    open: "Otevřít živou ukázku ↗",
    columns: [
      {
        num: "01",
        title: "Co uvidíte",
        body: "Dotaz → roztřídění → odpověď se třemi volnými termíny → potvrzení jedním klikem. Zmeškaný hovor → SMS do minuty.",
      },
      {
        num: "02",
        title: "Co to nedělá",
        body: "Nezvedá telefon, nediagnostikuje, nic neposílá bez vaší kontroly.",
      },
      {
        num: "03",
        title: "Jak to dostanete",
        body: "Analýza vašeho provozu, pilot za pevnou cenu, nasazení do dvou týdnů.",
      },
    ],
    liveBadge: "Živý systém",
    frameNote: "Ukázka se otevře v novém okně na demo.fullcanvas.cz. Napište jako pacient, kterýmkoli jazykem.",
    faqLabel: "FAQ",
    faqTitle: "K ukázce",
    faqs: [
      {
        q: "Je ukázka napojená na skutečný kalendář?",
        a: "Ne, termíny jsou z testovacího kalendáře. U vás se napojí na systém, který už používáte.",
      },
      {
        q: "Co když pacient napíše něco, čemu systém nerozumí?",
        a: "Předá to člověku se shrnutím. Nic neodhaduje, nediagnostikuje a neposílá bez vaší kontroly.",
      },
      {
        q: "Kde běží data pacientů?",
        a: "Ukázka nemá žádnou databázi: co napíšete, se zpracuje a výsledek se vrátí jen na vaši obrazovku, nic se neukládá. Text dotazu projde přes API Anthropic (Claude), které vstupy nepoužívá k trénování a maže je do 30 dnů. Ostrý systém nasazujeme ve vaší infrastruktuře nebo v EU cloudu, s daty pod vaší kontrolou.",
      },
      {
        q: "Funguje to i mimo ordinace?",
        a: "Stejný princip stavíme na poptávky, faktury a pohledávky: zpráva přijde, systém ji roztřídí, připraví odpověď a člověk jen potvrdí.",
      },
    ],
    ctaLine: "Chcete to na vlastních datech?",
  },
  form: {
    title: "Nezávazná konzultace",
    subtitle:
      "Napište pár vět o svém provozu. Ozveme se do jednoho pracovního dne s termínem a prvním odhadem.",
    name: "Jméno a příjmení",
    company: "Firma",
    email: "E-mail",
    phone: "Telefon",
    phoneOptional: "nepovinné",
    message: "Co by vám nejvíc pomohlo?",
    messagePlaceholder:
      "Např. „Poptávky chodí e-mailem a odpovídáme do dvou dnů.“ nebo „Měsíčně přepisujeme 400 faktur do Pohody.“",
    submit: "Odeslat",
    sending: "Odesílám…",
    successTitle: "Odesláno.",
    successBody: "Díky. Ozveme se do jednoho pracovního dne.",
    errorTitle: "Nepodařilo se odeslat.",
    errorBody: "Zkuste to prosím znovu, nebo nám napište přímo na",
    errorFallback: "Napište nám prosím přímo na",
    close: "Zavřít",
    required: "Vyplňte prosím toto pole.",
    invalidEmail: "Zadejte prosím platný e-mail.",
    note: "Žádný newsletter, žádné předávání dat třetím stranám.",
  },
  consent: {
    label: "Souhlas s cookies",
    text: "Google Analytics a Hotjar nám ukazují, jak se web používá, a měří, která reklama přivedla poptávku. Spustíme je jen s vaším souhlasem.",
    accept: "Přijmout",
    reject: "Odmítnout",
    settings: "Nastavení cookies",
  },
};

const en: Content = {
  ctaShort: "Free consultation",
  ctaPrimary: "Free consultation",
  heroKicker: "AI automation for companies",
  heroHeadA: "Answered within a minute.",
  heroHeadB: "More business, less manual work.",
  heroSub:
    "Whoever writes to you on a Friday evening gets a reply with a price or a free slot within a minute, before they write to a competitor. And the repetitive office work, invoices, quotes, retyping between systems, runs on its own. It plugs into what you already use.",
  heroSecondary: "What we automate ↓",
  heroDemoLink: "Live demo →",
  trustLabel: "Trusted by",
  trustPause: "Pause the logo scroll",
  trustPlay: "Play the logo scroll",
  stats: [
    { value: null, suffix: "", display: "< 1 min", label: "reply to an inquiry, even at night" },
    { value: null, suffix: "", display: "24/7", label: "evenings, weekends, holidays" },
    { value: null, suffix: "", display: "0×", label: "retyping invoices by hand" },
    { value: 30, suffix: " days", display: "30 days", label: "from signature to live" },
  ],
  servicesLabel: "What we do",
  servicesTitle: "More business, less repetitive work",
  tabAi: "AI automation",
  tabBuild: "Web & apps",
  aiServices: [
    {
      num: "01",
      title: "Inquiries answered within a minute",
      body: "Every email, web or form inquiry gets an instant reply with a price or a free slot, in your tone. Your people only handle the ones ready to buy.",
      note: "Send us 10–20 past inquiries. Within a week you'll see how the system would have answered them. Free.",
    },
    {
      num: "02",
      title: "Invoices and documents",
      body: "We read invoices and orders and push them straight into your ERP or Pohoda. No more retyping.",
      note: "Send us 20 invoices. Within a week you'll see what the system extracts. Free.",
    },
    {
      num: "03",
      title: "Internal processes",
      body: "Retyping between systems, documents, contracts, reports. Repetitive office work runs on its own; people just review.",
    },
    {
      num: "04",
      title: "Quotes and calculations",
      body: "Quote and calculation in minutes instead of hours. The faster quote wins the job.",
    },
    {
      num: "05",
      title: "Hotels, resorts and weddings",
      body: "Corporate events, weddings, provisional bookings. The guest gets capacity and dates right away; the coordinator just finishes the offer in the morning.",
    },
    {
      num: "06",
      title: "Receivables chasing",
      body: "Automatic reminders that escalate with the age of the debt. Cash in the bank sooner, without the awkward phone call.",
    },
    {
      num: "07",
      title: "Knowledge base with citations",
      body: "Ask in your own words; answers cite the document and page. It doesn’t make things up.",
    },
  ],
  buildServices: [
    {
      num: "01",
      title: "Websites",
      body: "Fast, measurable, easy-to-maintain sites on Next.js. Built to last for years, not one campaign.",
    },
    {
      num: "02",
      title: "Web applications",
      body: "Customer portals and tools built on a modern stack, fitted to your process.",
    },
    {
      num: "03",
      title: "Integrations & APIs",
      body: "We connect systems that don’t talk to each other today. Data flows automatically to where you need it.",
    },
    {
      num: "04",
      title: "Internal tools",
      body: "From a single form to a whole system, fitted to your process.",
    },
  ],
  servicesNote:
    "Don't see your case here? Most projects start with you describing it to us.",
  approachLabel: "How we work",
  approachTitle: "Three steps from preview to live",
  steps: [
    {
      num: "01",
      badge: "Start here",
      title: "Preview on your own data",
      price: "free",
      meta: "within a week · no commitment",
      body: "Send us 10–20 past inquiries or 20 invoices. Within a week you'll see what the system would do with them.",
    },
    {
      num: "02",
      badge: "",
      title: "Pilot",
      price: "from 60,000 CZK",
      meta: "within 30 days",
      body: "One automation, one branch or one type of inquiry, live. If you roll it out further, the full amount is credited.",
    },
    {
      num: "03",
      badge: "",
      title: "Operation",
      price: "from 4,000 CZK/mo",
      meta: "ongoing",
      body: "Monitoring, tuning the replies, and further automations.",
    },
  ],
  approachMicro:
    "At the start, a person on your team approves every reply. Only what you allow goes out automatically.",
  aboutLabel: "Why Full Canvas",
  aboutHead: "You pay for results, not slideware.",
  aboutBody:
    "A fixed price you know before you sign. Half up front, half once it's live. It runs on top of what you already use; your people don't have to learn anything new. If it won't pay off, we say so before you spend a crown.",
  priceLabel: "Indicative",
  prices: [
    { k: "Preview", v: "free" },
    { k: "Pilot", v: "from 60,000 CZK" },
    { k: "Websites", v: "from 80,000 CZK" },
  ],
  faqLabel: "FAQ",
  faqTitle: "What clients ask most",
  faqs: [
    {
      q: "How fast is it?",
      a: "You get a preview on your own data within a week. A pilot is live within 30 days of signing.",
    },
    {
      q: "We don’t have time for a project.",
      a: "Your people give us a few hours in total: they show how they work today and send the material. The rest of the work is ours.",
    },
    {
      q: "We don't want a robot instead of a receptionist.",
      a: "We don't build one. The system replies instantly and prepares the details; decisions and the personal touch stay with your people, who get more time for guests and customers ready to buy.",
    },
    {
      q: "AI just makes things up.",
      a: "It answers only from your price lists, calendar and documents, with a source for internal questions. When it doesn't know, it hands it to a person with a summary.",
    },
    {
      q: "What happens to our data?",
      a: "Your data stays yours. It runs on accounts you own, on your infrastructure or in an EU cloud. We provide the application and maintenance.",
    },
    {
      q: "How do we know it will work?",
      a: "Send us 10–20 past inquiries or 20 real invoices. Within a week you'll see what the system would do with them. Free, no commitment. If it doesn't make sense for you, we'll say so.",
    },
  ],
  finalLabel: "Contact",
  finalHeadline: "Fifteen minutes. That’s all it takes.",
  finalBody: "Tell us how inquiries reach you, or what your office still does by hand. We'll tell you straight what pays off and by when. Or just send a few inquiries or invoices and see the result before you decide.",
  email: "hello@fullcanvas.cz",
  footer: "© 2026 FULL CANVAS DIGITAL · REG. NO. 06762336",
  navLabel: "Navigation",
  navHome: "Home",
  navDemo: "Live demo",
  nav: {
    menuOpen: "Open menu",
    menuClose: "Close menu",
    services: "Services",
    how: "How we work",
    faq: "FAQ",
    contact: "Contact",
    footerServices: "Services",
    footerCompany: "Company",
  },
  slider: {
    prev: "Previous service",
    next: "Next service",
    goTo: "Go to service",
    moreAi: "More about this service →",
    moreBuild: "Describe your project →",
    labelAi: "AI automation",
    labelBuild: "Web & apps",
  },
  product: {
    label: "Live demo",
    title: "This is the real system, not a video.",
    body: "The reception answers a patient within a minute, offers three free slots and confirms the chosen one. Write as a patient and watch what happens. We build the same thing for hotels, car services, clinics and real estate, and for invoices and internal processes.",
    note: "Nothing is sent to real people.",
    cta: "Try the live demo →",
    alt: "The Recepce app: a patient form on the left, on the right the steps the system took, including a reply with three slots",
  },
  footerTagline: "Every inquiry answered within a minute. Invoices, quotes and internal processes without retyping.",
  demo: {
    eyebrow: "RECEPTION · LIVE DEMO",
    headPre: "Answered",
    headEm: "within a minute",
    headPost: ", booked without a receptionist.",
    lead: "This is the real system, not a video. Write as a patient, in any language, and watch what happens. Nothing is sent to real people.",
    open: "Open the live demo ↗",
    columns: [
      {
        num: "01",
        title: "What you’ll see",
        body: "Inquiry → triage → reply with three free slots → one-click confirmation. Missed call → SMS within a minute.",
      },
      {
        num: "02",
        title: "What it doesn’t do",
        body: "It doesn’t answer the phone, doesn’t diagnose, sends nothing without your review.",
      },
      {
        num: "03",
        title: "How you get it",
        body: "Analysis of your intake, fixed-price pilot, live in two weeks.",
      },
    ],
    liveBadge: "Live system",
    frameNote: "The demo opens in a new tab at demo.fullcanvas.cz. Write as a patient, in any language.",
    faqLabel: "FAQ",
    faqTitle: "About the demo",
    faqs: [
      {
        q: "Is the demo connected to a real calendar?",
        a: "No, the slots come from a test calendar. For you it connects to the system you already use.",
      },
      {
        q: "What if a patient writes something the system doesn't understand?",
        a: "It hands it to a person with a summary. It doesn't guess, doesn't diagnose and sends nothing without your review.",
      },
      {
        q: "Where does patient data run?",
        a: "The demo has no database: what you type is processed and the result comes back only to your screen, nothing is stored. The text of your message goes through the Anthropic API (Claude), which does not use inputs for training and deletes them within 30 days. The production system runs on your infrastructure or in an EU cloud, with the data under your control.",
      },
      {
        q: "Does it work outside clinics?",
        a: "We build the same principle for inquiries, invoices and receivables: a message arrives, the system classifies it, drafts the reply and a person just confirms.",
      },
    ],
    ctaLine: "Want it on your own data?",
  },
  form: {
    title: "Free consultation",
    subtitle:
      "Tell us a few sentences about your operations. We'll come back within one working day with a slot and a first estimate.",
    name: "Full name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    phoneOptional: "optional",
    message: "What would help you most?",
    messagePlaceholder:
      "e.g. “Inquiries come by email and we reply within two days.” or “We retype about 400 invoices into Pohoda every month.”",
    submit: "Send",
    sending: "Sending…",
    successTitle: "Sent.",
    successBody: "Thanks. We'll be in touch within one working day.",
    errorTitle: "Couldn't send that.",
    errorBody: "Please try again, or email us directly at",
    errorFallback: "Please email us directly at",
    close: "Close",
    required: "Please fill in this field.",
    invalidEmail: "Please enter a valid email address.",
    note: "No newsletter, no sharing your data with third parties.",
  },
  consent: {
    label: "Cookie consent",
    text: "Google Analytics and Hotjar show us how the site is used and which ads brought an inquiry. They only run if you agree.",
    accept: "Accept",
    reject: "Reject",
    settings: "Cookie settings",
  },
};

export const content: Record<Lang, Content> = { cs, en };
