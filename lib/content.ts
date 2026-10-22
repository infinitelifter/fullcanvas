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
  frameTitle: string;
  fallback: string;
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
  todo: string;
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
  heroMicro: string;
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
}

const cs: Content = {
  ctaShort: "Domluvit 15 minut",
  ctaPrimary: "Domluvit 15 minut",
  heroKicker: "AI automatizace pro firmy",
  heroHeadA: "Vaši lidé přepisují data,",
  heroHeadB: "která už dávno máte.",
  heroSub:
    "Full Canvas staví AI automatizace na konkrétní procesy. Faktury, e-maily, nabídky, pohledávky. První výsledek v provozu do 30 dní. Žádné přednášky o transformaci.",
  heroSecondary: "Co automatizujeme ↓",
  heroDemoLink: "Živá ukázka →",
  heroMicro:
    "Patnáct minut. Řeknete mi, kde se vám hromadí dotazy, objednávky nebo doklady, a já vám řeknu, co by šlo automatizovat jako první a za kolik.",
  stats: [
    { value: null, suffix: "", display: "8 min → 6 s", label: "zpracování jedné faktury" },
    { value: null, suffix: "", display: "2,5 h → 30 min", label: "ranní třídění e-mailů" },
    { value: 30, suffix: " dní", display: "30 dní", label: "od podpisu k běžící automatizaci" },
    { value: 12, suffix: " měs", display: "12 měs", label: "typická návratnost investice" },
  ],
  servicesLabel: "Co děláme",
  servicesTitle: "AI automatizace a vývoj na míru",
  tabAi: "AI automatizace",
  tabBuild: "Weby a aplikace",
  aiServices: [
    {
      num: "01",
      title: "Vytěžování dokumentů",
      body: "Faktury a objednávky přečteme a pošleme rovnou do ERP nebo Pohody. Konec přepisování.",
      note: "Pošlete nám 20 faktur. Do týdne uvidíte, co z nich systém vytáhne. Zdarma.",
    },
    {
      num: "02",
      title: "Třídění e-mailů",
      body: "Příchozí poštu roztřídíme a připravíme koncepty odpovědí. Lidé jen kontrolují a odesílají.",
    },
    {
      num: "03",
      title: "Generování nabídek",
      body: "Kalkulace a nabídka za minuty místo hodin. Rychlejší nabídka vyhrává zakázky.",
    },
    {
      num: "04",
      title: "Hlídání pohledávek",
      body: "Automatické upomínky podle stáří pohledávky. Peníze na účtu dřív, bez nepříjemných telefonátů.",
    },
    {
      num: "05",
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
  approachTitle: "Tři kroky od analýzy k provozu",
  steps: [
    {
      num: "01",
      badge: "Začněte tady",
      title: "Analýza",
      price: "40–80 000 Kč",
      meta: "1–2 týdny · pevná cena",
      body: "Projdeme váš provoz s lidmi, kteří v něm žijí. Dostanete plán automatizací seřazený podle návratnosti, s čísly.",
    },
    {
      num: "02",
      badge: "",
      title: "Pilot",
      price: "od 120 000 Kč",
      meta: "30 dní",
      body: "Jedna automatizace v ostrém provozu. Výsledek, ne prezentace.",
    },
    {
      num: "03",
      badge: "",
      title: "Provoz",
      price: "od 20 000 Kč/měs",
      meta: "průběžně",
      body: "Dohled, vylepšování a nové automatizace.",
    },
  ],
  approachMicro:
    "Součástí analýzy je výpočet, kolik vás daný proces stojí dnes. Teprve podle toho se rozhodne, co se staví jako první. Cenu pilotu řekneme až po analýze.",
  aboutLabel: "Proč Full Canvas",
  aboutHead: "Platíte za výsledek, ne za prezentace.",
  aboutBody:
    "Analýza za pevnou cenu, kterou znáte před podpisem. Jasné zadání a první automatizace v provozu do 30 dní. Když se vám to nezaplatí, řekneme to dřív, než utratíte korunu navíc. Žádné otevřené účty, žádné nekonečné projekty.",
  priceLabel: "Orientačně",
  prices: [
    { k: "Analýza", v: "40–80 000 Kč · pevně" },
    { k: "Pilotní AI", v: "od 120 000 Kč" },
    { k: "Weby", v: "od 80 000 Kč" },
  ],
  faqLabel: "FAQ",
  faqTitle: "Otázky, které slyšíme nejčastěji",
  faqs: [
    {
      q: "Jak rychle to jde?",
      a: "Do dvou pracovních dnů máte návrh a cenu. Analýza trvá 1–2 týdny, pilotní automatizace běží do 30 dní od schválení.",
    },
    {
      q: "AI si přece vymýšlí.",
      a: "Naše řešení odpovídá jen z vašich dokumentů a ke každé odpovědi přikládá zdroj: dokument a stranu. Když odpověď nezná, řekne to.",
    },
    {
      q: "Co bude s našimi daty?",
      a: "Data zůstávají vaše. Řešení běží ve vaší infrastruktuře nebo v EU cloudu.",
    },
    {
      q: "Nemáme čas na projekt.",
      a: "Analýza stojí vaše lidi dohromady asi čtyři hodiny. Zbytek práce je na nás.",
    },
    {
      q: "Jak poznáme, že to bude fungovat?",
      a: "Pošlete nám 20 svých skutečných faktur. Do týdne uvidíte, co z nich systém vytáhne, a soubor, který vaše účetní naimportuje. Zdarma, bez závazku. Když to nebude fungovat, řekneme to.",
    },
  ],
  finalLabel: "Kontakt",
  finalHeadline: "Patnáct minut. Víc nepotřebujete.",
  finalBody: "Popíšete svůj provoz. My na rovinu řekneme, co se u vás zaplatí a do kdy. Nebo rovnou pošlete 20 faktur a uvidíte výsledek dřív, než se rozhodnete.",
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
    body: "Recepce odpoví pacientovi do minuty, nabídne tři volné termíny a potvrdí ten vybraný. Napište jako pacient a sledujte, co se stane. Stejný princip stavíme na faktury, poptávky a pohledávky.",
    note: "Nic se neposílá skutečným lidem.",
    cta: "Vyzkoušet živou ukázku →",
    alt: "Aplikace Recepce: formulář pacienta vlevo, vpravo přehled kroků, které systém udělal, včetně odpovědi se třemi termíny",
    todo: "TODO(Ondrej): nahradit statický snímek 30–60s záznamem obrazovky.",
  },
  footerTagline: "AI automatizace na konkrétní procesy. První výsledek v provozu do 30 dní.",
  demo: {
    eyebrow: "RECEPCE · ŽIVÁ UKÁZKA",
    headPre: "Dotaz zodpovězený",
    headEm: "do minuty",
    headPost: ", termín domluvený bez recepce.",
    lead: "Tohle je skutečný systém, ne video. Napište jako pacient, kterýmkoli jazykem, a sledujte, co se stane. Nic se neposílá skutečným lidem.",
    frameTitle: "Recepce demo",
    fallback: "Ukázka se právě nahrává. Napište mi a ukážu vám ji naživo.",
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
    frameNote: "Ukázka běží na demo.fullcanvas.cz. Napište jako pacient, kterýmkoli jazykem.",
    faqLabel: "FAQ",
    faqTitle: "K ukázce",
    faqs: [
      {
        q: "Je ukázka napojená na skutečný kalendář?",
        a: "Ne, termíny jsou z testovacího kalendáře. U vás se napojí na systém, který už používáte. TODO(Ondrej): vyjmenovat podporované kalendáře a ambulantní systémy.",
      },
      {
        q: "Co když pacient napíše něco, čemu systém nerozumí?",
        a: "Předá to člověku se shrnutím. Nic neodhaduje, nediagnostikuje a neposílá bez vaší kontroly.",
      },
      {
        q: "Kde běží data pacientů?",
        a: "Ve vaší infrastruktuře nebo v EU cloudu. Ukázka neukládá nic, co do ní napíšete, déle než na dobu konverzace. TODO(Ondrej): potvrdit retenci v demo prostředí.",
      },
      {
        q: "Funguje to i mimo ordinace?",
        a: "Stejný princip stavíme na poptávky, faktury a pohledávky: zpráva přijde, systém ji roztřídí, připraví odpověď a člověk jen potvrdí.",
      },
    ],
    ctaLine: "Chcete to na vlastních datech?",
  },
  form: {
    title: "Domluvit 15 minut",
    subtitle:
      "Napište pár vět o svém provozu. Ozveme se do jednoho pracovního dne s termínem a prvním odhadem.",
    name: "Jméno a příjmení",
    company: "Firma",
    email: "E-mail",
    phone: "Telefon",
    phoneOptional: "nepovinné",
    message: "Co vás nejvíc zdržuje?",
    messagePlaceholder:
      "Např. „Měsíčně ručně přepisujeme asi 400 faktur do Pohody.“",
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
};

const en: Content = {
  ctaShort: "Book 15 minutes",
  ctaPrimary: "Book 15 minutes",
  heroKicker: "AI automation for companies",
  heroHeadA: "Your people retype data",
  heroHeadB: "you already have.",
  heroSub:
    "Full Canvas builds AI automation for specific processes. Invoices, email, quotes, receivables. First result live within 30 days. No transformation lectures.",
  heroSecondary: "What we automate ↓",
  heroDemoLink: "Live demo →",
  heroMicro:
    "Fifteen minutes. You tell me where enquiries, orders or documents pile up, and I'll tell you what to automate first and what it would cost.",
  stats: [
    { value: null, suffix: "", display: "8 min → 6 s", label: "processing one invoice" },
    { value: null, suffix: "", display: "2.5 h → 30 min", label: "morning email triage" },
    { value: 30, suffix: " days", display: "30 days", label: "from signature to a running automation" },
    { value: 12, suffix: " mo", display: "12 mo", label: "typical payback on the investment" },
  ],
  servicesLabel: "What we do",
  servicesTitle: "AI automation and custom software",
  tabAi: "AI automation",
  tabBuild: "Web & apps",
  aiServices: [
    {
      num: "01",
      title: "Document extraction",
      body: "We read invoices and orders and push them straight into your ERP or Pohoda. No more retyping.",
      note: "Send us 20 invoices. Within a week you'll see what the system extracts. Free.",
    },
    {
      num: "02",
      title: "Email triage",
      body: "Inbound mail gets sorted with drafted replies. People just review and send.",
    },
    {
      num: "03",
      title: "Quote generation",
      body: "Quote and calculation in minutes instead of hours. The faster quote wins the job.",
    },
    {
      num: "04",
      title: "Receivables chasing",
      body: "Automatic reminders that escalate with the age of the debt. Cash in the bank sooner, without the awkward phone call.",
    },
    {
      num: "05",
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
  approachTitle: "Three steps from assessment to operation",
  steps: [
    {
      num: "01",
      badge: "Start here",
      title: "Assessment",
      price: "40–80,000 CZK",
      meta: "1–2 weeks · fixed price",
      body: "We walk your operations with the people who live in them. You get an automation plan ranked by return, with numbers.",
    },
    {
      num: "02",
      badge: "",
      title: "Pilot",
      price: "from 120,000 CZK",
      meta: "30 days",
      body: "One automation live in production. A result, not a deck.",
    },
    {
      num: "03",
      badge: "",
      title: "Operation",
      price: "from 20,000 CZK/mo",
      meta: "ongoing",
      body: "Monitoring, improvements and new automations.",
    },
  ],
  approachMicro:
    "The assessment works out what the process costs you today. Only then do we decide what gets built first. We quote the pilot after the assessment.",
  aboutLabel: "Why Full Canvas",
  aboutHead: "You pay for results, not slideware.",
  aboutBody:
    "A fixed-price assessment, quoted before you sign. A clear brief, and the first automation live within 30 days. If it won’t pay off, we say so before you spend a crown extra. No open-ended bills, no endless projects.",
  priceLabel: "Indicative",
  prices: [
    { k: "Assessment", v: "40–80,000 CZK · fixed" },
    { k: "AI pilot", v: "from 120,000 CZK" },
    { k: "Websites", v: "from 80,000 CZK" },
  ],
  faqLabel: "FAQ",
  faqTitle: "What clients ask most",
  faqs: [
    {
      q: "How fast is it?",
      a: "Within two working days you have a proposal and a price. The assessment takes 1–2 weeks; a pilot automation runs within 30 days of approval.",
    },
    {
      q: "AI just makes things up.",
      a: "Our system answers only from your documents and attaches a source to every answer: the document and page. When it doesn’t know, it says so.",
    },
    {
      q: "What happens to our data?",
      a: "Your data stays yours. The solution runs on your infrastructure or in an EU cloud.",
    },
    {
      q: "We don’t have time for a project.",
      a: "The assessment costs your people about four hours in total. The rest of the work is ours.",
    },
    {
      q: "How do we know it will work?",
      a: "Send us 20 of your real invoices. Within a week you’ll see what the system extracts and a file your accountant can import. Free, no commitment. If it doesn’t work, we’ll say so.",
    },
  ],
  finalLabel: "Contact",
  finalHeadline: "Fifteen minutes. That’s all it takes.",
  finalBody: "Describe your operations. We’ll tell you straight what pays off and by when. Or just send 20 invoices and see the result before you decide.",
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
    body: "The reception answers a patient within a minute, offers three free slots and confirms the chosen one. Write as a patient and watch what happens. We build the same principle for invoices, inquiries and receivables.",
    note: "Nothing is sent to real people.",
    cta: "Try the live demo →",
    alt: "The Recepce app: a patient form on the left, on the right the steps the system took, including a reply with three slots",
    todo: "TODO(Ondrej): replace the static screenshot with a 30–60 s screen recording.",
  },
  footerTagline: "AI automation for specific processes. First result live within 30 days.",
  demo: {
    eyebrow: "RECEPTION · LIVE DEMO",
    headPre: "Answered",
    headEm: "within a minute",
    headPost: ", booked without a receptionist.",
    lead: "This is the real system, not a video. Write as a patient, in any language, and watch what happens. Nothing is sent to real people.",
    frameTitle: "Recepce demo",
    fallback: "The demo is loading. Write to me and I’ll show it live.",
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
    frameNote: "The demo runs at demo.fullcanvas.cz. Write as a patient, in any language.",
    faqLabel: "FAQ",
    faqTitle: "About the demo",
    faqs: [
      {
        q: "Is the demo connected to a real calendar?",
        a: "No, the slots come from a test calendar. For you it connects to the system you already use. TODO(Ondrej): list the supported calendars and practice systems.",
      },
      {
        q: "What if a patient writes something the system doesn't understand?",
        a: "It hands it to a person with a summary. It doesn't guess, doesn't diagnose and sends nothing without your review.",
      },
      {
        q: "Where does patient data run?",
        a: "On your infrastructure or in an EU cloud. The demo keeps nothing you type beyond the conversation. TODO(Ondrej): confirm retention in the demo environment.",
      },
      {
        q: "Does it work outside clinics?",
        a: "We build the same principle for inquiries, invoices and receivables: a message arrives, the system classifies it, drafts the reply and a person just confirms.",
      },
    ],
    ctaLine: "Want it on your own data?",
  },
  form: {
    title: "Book 15 minutes",
    subtitle:
      "Tell us a few sentences about your operations. We'll come back within one working day with a slot and a first estimate.",
    name: "Full name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    phoneOptional: "optional",
    message: "What slows you down most?",
    messagePlaceholder:
      "e.g. “We retype about 400 invoices into Pohoda every month.”",
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
};

export const content: Record<Lang, Content> = { cs, en };
