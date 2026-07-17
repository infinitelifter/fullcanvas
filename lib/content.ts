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
}

const cs: Content = {
  ctaShort: "Domluvit 20 minut",
  ctaPrimary: "Domluvit 20 minut",
  heroKicker: "AI automatizace pro firmy",
  heroHeadA: "Vaši lidé přepisují data,",
  heroHeadB: "která už dávno máte.",
  heroSub:
    "Full Canvas staví AI automatizace s pevným rozsahem a pevnou cenou. Faktury, e-maily, nabídky, firemní znalosti — první výsledek v provozu do 30 dní. Žádné přednášky o transformaci.",
  heroSecondary: "Co automatizujeme ↓",
  heroMicro: "Na rovinu řekneme, jestli se vám AI zaplatí. Bez závazku.",
  stats: [
    { value: null, suffix: "", display: "8 min → 6 s", label: "zpracování jedné faktury" },
    { value: null, suffix: "", display: "2,5 h → 30 min", label: "ranní třídění e-mailů" },
    { value: 30, suffix: " dní", display: "30 dní", label: "od podpisu k běžící automatizaci" },
    { value: 12, suffix: " měs", display: "12 měs", label: "typická návratnost investice" },
  ],
  servicesLabel: "Co děláme",
  servicesTitle: "Dvě cesty, jeden tým",
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
  approachLabel: "Jak pracujeme",
  approachTitle: "Rychle, s pevnou cenou, bez zbytečných kol",
  steps: [
    {
      num: "01",
      badge: "Začněte tady",
      title: "Analýza",
      price: "40–80 000 Kč",
      meta: "1–2 týdny",
      body: "Projdeme váš provoz s lidmi, kteří v něm žijí. Dostanete plán automatizací seřazený podle návratnosti — s čísly.",
    },
    {
      num: "02",
      badge: "",
      title: "Pilot",
      price: "120–300 000 Kč",
      meta: "30 dní · pevně",
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
  approachMicro: "Začínáme záměrně v malém. Pokud se vám AI nezaplatí, řekneme to na rovinu.",
  aboutLabel: "Proč Full Canvas",
  aboutHead: "Platíte za výsledek, ne za prezentace.",
  aboutBody:
    "Pevný rozsah, pevná cena a první automatizace v provozu do 30 dní. Když se vám nezaplatí, řekneme to dřív, než utratíte korunu navíc. Žádné otevřené účty, žádné nekonečné projekty — jen věci, které vydělávají čas a peníze.",
  priceLabel: "Orientačně",
  prices: [
    { k: "Analýza", v: "40–80 000 Kč" },
    { k: "Pilotní AI", v: "120–300 000 Kč" },
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
  ],
  finalLabel: "Kontakt",
  finalHeadline: "Dvacet minut. Víc nepotřebujete.",
  finalBody: "Popíšete svůj provoz. My na rovinu řekneme, co se u vás zaplatí, za kolik a do kdy.",
  email: "hello@fullcanvas.digital",
  footer: "© 2026 FULL CANVAS DIGITAL · IČO 00000000",
};

const en: Content = {
  ctaShort: "Book 20 minutes",
  ctaPrimary: "Book 20 minutes",
  heroKicker: "AI automation for companies",
  heroHeadA: "Your people retype data",
  heroHeadB: "you already have.",
  heroSub:
    "Full Canvas builds AI automation with fixed scope and a fixed price. Invoices, email, quotes, company knowledge — first result live within 30 days. No transformation lectures.",
  heroSecondary: "What we automate ↓",
  heroMicro: "We’ll tell you straight whether AI pays off for you. No commitment.",
  stats: [
    { value: null, suffix: "", display: "8 min → 6 s", label: "processing one invoice" },
    { value: null, suffix: "", display: "2.5 h → 30 min", label: "morning email triage" },
    { value: 30, suffix: " days", display: "30 days", label: "from signature to a running automation" },
    { value: 12, suffix: " mo", display: "12 mo", label: "typical payback on the investment" },
  ],
  servicesLabel: "What we do",
  servicesTitle: "Two paths, one team",
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
  approachLabel: "How we work",
  approachTitle: "Fast, fixed-price, no runaround",
  steps: [
    {
      num: "01",
      badge: "Start here",
      title: "Assessment",
      price: "40–80,000 CZK",
      meta: "1–2 weeks",
      body: "We walk your operations with the people who live in them. You get an automation plan ranked by return — with numbers.",
    },
    {
      num: "02",
      badge: "",
      title: "Pilot",
      price: "120–300,000 CZK",
      meta: "30 days · fixed",
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
  approachMicro: "We start small on purpose. If AI won’t pay off for you, we’ll say so.",
  aboutLabel: "Why Full Canvas",
  aboutHead: "You pay for results, not slideware.",
  aboutBody:
    "Fixed scope, fixed price, and the first automation live within 30 days. If it won’t pay off, we say so before you spend a crown extra. No open-ended bills, no endless projects — just things that earn back time and money.",
  priceLabel: "Indicative",
  prices: [
    { k: "Assessment", v: "40–80,000 CZK" },
    { k: "AI pilot", v: "120–300,000 CZK" },
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
  ],
  finalLabel: "Contact",
  finalHeadline: "Twenty minutes. That’s all it takes.",
  finalBody: "Describe your operations. We’ll tell you straight what pays off, what it costs, and by when.",
  email: "hello@fullcanvas.digital",
  footer: "© 2026 FULL CANVAS DIGITAL · REG. NO. 00000000",
};

export const content: Record<Lang, Content> = { cs, en };
