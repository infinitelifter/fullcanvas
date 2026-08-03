export type Lang = "cs" | "en";

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

export interface Content {
  ctaShort: string;
  ctaPrimary: string;
  heroKicker: string;
  heroHeadA: string;
  heroHeadB: string;
  heroSub: string;
  heroSecondary: string;
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
  form: FormCopy;
}

const cs: Content = {
  ctaShort: "Domluvit 20 minut",
  ctaPrimary: "Domluvit 20 minut",
  heroKicker: "AI automatizace pro firmy",
  heroHeadA: "Vaši lidé přepisují data,",
  heroHeadB: "která už dávno máte.",
  heroSub:
    "Full Canvas staví AI automatizace na konkrétní procesy. Faktury, e-maily, nabídky, pohledávky — první výsledek v provozu do 30 dní. Žádné přednášky o transformaci.",
  heroSecondary: "Co automatizujeme ↓",
  heroMicro: "Pošlete nám 20 faktur. Do týdne uvidíte, co z nich systém vytáhne — zdarma a bez závazku.",
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
      body: "Projdeme váš provoz s lidmi, kteří v něm žijí. Dostanete plán automatizací seřazený podle návratnosti — s čísly.",
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
      meta: "měsíčně",
      body: "Dohled, vylepšování, nové automatizace, zaškolení lidí.",
    },
  ],
  approachMicro:
    "Cenu pilotu řekneme až po analýze — do té doby by to byl jen odhad. Začínáme záměrně v malém.",
  aboutLabel: "Proč Full Canvas",
  aboutHead: "Platíte za výsledek, ne za prezentace.",
  aboutBody:
    "Analýza za pevnou cenu, jasné zadání a první automatizace v provozu do 30 dní. Cenu znáte dřív, než začneme stavět — a když se vám to nezaplatí, řekneme to dřív, než utratíte korunu navíc. Žádné otevřené účty, žádné nekonečné projekty.",
  priceLabel: "Orientačně",
  prices: [
    { k: "Analýza", v: "40–80 000 Kč · pevně" },
    { k: "Pilotní AI", v: "od 120 000 Kč" },
    { k: "Weby", v: "od 80 000 Kč" },
  ],
  faqLabel: "Časté otázky",
  faqTitle: "Na co se ptají nejčastěji",
  faqs: [
    {
      q: "Jak rychle to jde?",
      a: "Do dvou pracovních dnů máte návrh a cenu. Analýza trvá 1–2 týdny, pilotní automatizace běží do 30 dní od schválení.",
    },
    {
      q: "AI si přece vymýšlí.",
      a: "Naše řešení odpovídá jen z vašich dokumentů a ke každé odpovědi přikládá zdroj — dokument a stranu. Když odpověď nezná, řekne to.",
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
  finalHeadline: "Dvacet minut. Víc nepotřebujete.",
  finalBody: "Popíšete svůj provoz. My na rovinu řekneme, co se u vás zaplatí a do kdy. Nebo rovnou pošlete 20 faktur a uvidíte výsledek dřív, než se rozhodnete.",
  email: "hello@fullcanvas.cz",
  footer: "© 2026 FULL CANVAS DIGITAL · IČO 06762336",
  form: {
    title: "Domluvit 20 minut",
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
  ctaShort: "Book 20 minutes",
  ctaPrimary: "Book 20 minutes",
  heroKicker: "AI automation for companies",
  heroHeadA: "Your people retype data",
  heroHeadB: "you already have.",
  heroSub:
    "Full Canvas builds AI automation for specific processes. Invoices, email, quotes, receivables — first result live within 30 days. No transformation lectures.",
  heroSecondary: "What we automate ↓",
  heroMicro: "Send us 20 invoices. Within a week you'll see what the system pulls out of them — free, no commitment.",
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
      body: "We walk your operations with the people who live in them. You get an automation plan ranked by return — with numbers.",
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
      meta: "monthly",
      body: "Monitoring, improvements, new automations, staff training.",
    },
  ],
  approachMicro:
    "We quote the pilot after the assessment — before that it would only be a guess. We start small on purpose.",
  aboutLabel: "Why Full Canvas",
  aboutHead: "You pay for results, not slideware.",
  aboutBody:
    "A fixed-price assessment, a clear brief, and the first automation live within 30 days. You know the price before we start building — and if it won’t pay off, we say so before you spend a crown extra. No open-ended bills, no endless projects.",
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
      a: "Our system answers only from your documents and attaches a source to every answer — the document and page. When it doesn’t know, it says so.",
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
  finalHeadline: "Twenty minutes. That’s all it takes.",
  finalBody: "Describe your operations. We’ll tell you straight what pays off and by when. Or just send 20 invoices and see the result before you decide.",
  email: "hello@fullcanvas.cz",
  footer: "© 2026 FULL CANVAS DIGITAL · REG. NO. 06762336",
  form: {
    title: "Book 20 minutes",
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
