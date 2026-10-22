import type { Locale } from "@/lib/routes";

/**
 * One entry per service page, in both languages. The template in
 * components/service-page.tsx renders every entry the same way; the comparison
 * page is the one entry with a `comparison` table and no `Service` schema.
 *
 * Writing rules (from the SEO brief): keyword in title, slug, H1 and first
 * sentence; answer first; no self-praise; no invented numbers. Every fact that
 * only Ondrej can confirm is marked TODO(Ondrej) in the copy itself, so it is
 * impossible to miss on the page while reviewing.
 */

export interface Faq {
  q: string;
  a: string;
}

export interface ServiceStep {
  num: string;
  title: string;
  body: string;
}

export interface ComparisonTable {
  columns: string[];
  /** Index into `columns` to highlight (Full Canvas). */
  highlight: number;
  rows: { label: string; cells: string[] }[];
  note: string;
}

export interface ServiceCopy {
  /** Short name for nav, footer, related links. */
  nav: string;
  /** <title>; "| Full Canvas Digital" is appended by lib/seo. */
  title: string;
  description: string;
  eyebrow: string;
  h1Pre: string;
  h1Em: string;
  lead: string;
  tldr: { k: string; v: string }[];
  ctaSecondary?: string;
  problemTitle: string;
  problem: string[];
  automateTitle: string;
  inputsTitle: string;
  inputs: string[];
  outputsTitle: string;
  outputs: string[];
  integrations: string;
  beforeAfter?: { beforeTitle: string; afterTitle: string; before: string[]; after: string[] };
  stepsTitle: string;
  steps: ServiceStep[];
  priceTitle: string;
  priceLines: string[];
  /** Case study. Leave undefined until there is a real one; the block is then not rendered. */
  example?: { title: string; body: string };
  comparison?: ComparisonTable;
  faqTitle: string;
  faqs: Faq[];
  summaryTitle: string;
  summary: string;
  /** Route keys of related pages (service keys or "demo"). */
  related: string[];
}

export interface ServiceDef {
  key: string;
  /** schema.org serviceType; omitted on the comparison page. */
  serviceType?: string;
  copy: Record<Locale, ServiceCopy>;
}

const STEPS_CS: ServiceStep[] = [
  {
    num: "01",
    title: "Analýza",
    body: "Projdeme váš provoz s lidmi, kteří v něm žijí, a spočítáme, kolik vás proces stojí dnes. Výstupem je plán s čísly a pevná cena pilotu.",
  },
  {
    num: "02",
    title: "Pilot",
    body: "Jedna automatizace v ostrém provozu do 30 dní od schválení. Výsledek, ne prezentace.",
  },
  {
    num: "03",
    title: "Provoz",
    body: "Dohled, vylepšování a další automatizace podle plánu z analýzy.",
  },
];

const STEPS_EN: ServiceStep[] = [
  {
    num: "01",
    title: "Assessment",
    body: "We walk your operation with the people who live in it and work out what the process costs you today. You get a plan with numbers and a fixed price for the pilot.",
  },
  {
    num: "02",
    title: "Pilot",
    body: "One automation live in production within 30 days of approval. A result, not a deck.",
  },
  {
    num: "03",
    title: "Operation",
    body: "Monitoring, improvements and further automations from the assessment plan.",
  },
];

const PRICE_CS = [
  "Analýza: pevná cena, kterou znáte před podpisem. 1–2 týdny.",
  "Pilot: cena po analýze, první výsledek v provozu do 30 dní od schválení.",
  "Provoz: měsíční paušál za dohled a rozvoj.",
  "TODO(Ondrej): doplnit cenová rozpětí, až bude SHOW_PRICING zapnuté.",
];

const PRICE_EN = [
  "Assessment: a fixed price you know before you sign. 1–2 weeks.",
  "Pilot: priced after the assessment, first result live within 30 days of approval.",
  "Operation: a monthly fee for monitoring and improvements.",
  "TODO(Ondrej): add price ranges once SHOW_PRICING is on.",
];

export const SERVICES: readonly ServiceDef[] = [
  /* ------------------------------------------------------------ invoices */
  {
    key: "invoices",
    serviceType: "Invoice processing automation",
    copy: {
      cs: {
        nav: "Automatizace faktur",
        title: "Automatizace faktur: z e-mailu do účetnictví bez přepisování",
        description:
          "Automatizace faktur pro firmy: přijaté faktury se přečtou, zkontrolují a objeví v účetnictví ke schválení. Pilot v provozu do 30 dní.",
        eyebrow: "AI automatizace · faktury",
        h1Pre: "Automatizace faktur:",
        h1Em: "z e-mailu do účetnictví bez přepisování.",
        lead: "Automatizace faktur znamená, že přijaté faktury se přečtou, zkontrolují proti objednávce a objeví se v účetnictví ke schválení. Lidé kontrolují výjimky, ne každý doklad.",
        tldr: [
          { k: "Pro koho", v: "Firmy, které měsíčně ručně přepisují desítky až stovky přijatých faktur." },
          { k: "Co vstupuje", v: "PDF a skeny faktur z e-mailu nebo složky, objednávky z ERP." },
          { k: "Co vychází", v: "Doklad ke schválení v účetním systému. Schvaluje člověk." },
          { k: "Za jak dlouho", v: "Analýza 1–2 týdny, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Poslat 20 faktur na zkoušku →",
        problemTitle: "Osm minut na fakturu, kterou už někdo jednou napsal",
        problem: [
          "Faktura přijde e-mailem. Někdo ji otevře, přepíše dodavatele, částky, DPH a splatnost do účetnictví, přiřadí objednávku a založí PDF. Při dvaceti fakturách denně je to půl úvazku, který nepřináší nic, co by v datech už nebylo.",
          "Chyby v přepisu se objeví až při párování plateb. Největší zdržení nejsou složité faktury, ale ty jednoduché, kterých je nejvíc.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: [
          "PDF faktury z e-mailové schránky",
          "Skeny a fotky dokladů",
          "Objednávky a dodavatelé z ERP",
          "Vaše pravidla schvalování",
        ],
        outputsTitle: "Výstupy",
        outputs: [
          "Vytěžená hlavička i položky",
          "Kontrola IČO, DPH a duplicit",
          "Spárování s objednávkou",
          "Doklad ke schválení v účetnictví",
        ],
        integrations:
          "Napojení na účetní systém, který už používáte, přes API nebo import, který účetní zná. TODO(Ondrej): vyjmenovat systémy, které reálně napojíte (Pohoda, Money, ABRA, jiné).",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: [
            "Faktura přijde e-mailem, někdo ji otevře, přepíše a založí PDF.",
            "Chyby se najdou až při párování plateb.",
            "Účetní uzávěrka čeká na poslední přepsané doklady.",
          ],
          after: [
            "Faktura se přečte sama a objeví se v účetnictví ke schválení.",
            "IČO, DPH a duplicity se zkontrolují před zaúčtováním.",
            "Lidé řeší jen výjimky, které systém označí.",
          ],
        },
        stepsTitle: "Tři kroky od první faktury k provozu",
        steps: [
          {
            num: "01",
            title: "Zkouška na vašich datech",
            body: "Pošlete 20 skutečných faktur. Do týdne uvidíte, co z nich systém vytáhne, a soubor, který vaše účetní naimportuje. Zdarma, bez závazku.",
          },
          STEPS_CS[0],
          STEPS_CS[1],
        ],
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k automatizaci faktur",
        faqs: [
          {
            q: "Kolik stojí automatizace faktur pro malou firmu?",
            a: "Začíná se analýzou za pevnou cenu, kterou znáte před podpisem. Cenu pilotu řekneme až po ní, protože záleží na tom, odkud faktury chodí a kam mají jít. TODO(Ondrej): doplnit orientační rozpětí.",
          },
          {
            q: "Jak dlouho trvá nasazení automatizace faktur?",
            a: "Analýza 1–2 týdny, pilot v ostrém provozu do 30 dní od schválení. Zkoušku na 20 fakturách uvidíte do týdne.",
          },
          {
            q: "Co když je faktura špatně naskenovaná?",
            a: "Systém ji označí a předá člověku. Nic nehádá. Nejistá pole se zobrazí ke kontrole místo toho, aby se tiše zaúčtovala.",
          },
          {
            q: "Musíme kvůli tomu měnit účetní program?",
            a: "Ne. Napojíme se na ten, který máte. Kde není API, použijeme import, který účetní zná.",
          },
          {
            q: "Kde data běží a kdo je vidí?",
            a: "Ve vaší infrastruktuře nebo v EU cloudu. Faktury neopouštějí prostředí, které schválíte. Nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Faktury, které se zaúčtují samy. Lidé jen schvalují.",
        summary:
          "Pošlete 20 faktur a uvidíte výsledek dřív, než se rozhodnete. Nebo si domluvte patnáct minut a projdeme váš provoz.",
        related: ["email", "quotes", "demo"],
      },
      en: {
        nav: "Invoice automation",
        title: "Invoice automation: from email to your books without retyping",
        description:
          "Invoice automation for companies: incoming invoices are read, checked and land in your accounting system for approval. Pilot live within 30 days.",
        eyebrow: "AI automation · invoices",
        h1Pre: "Invoice automation:",
        h1Em: "from email to your books without retyping.",
        lead: "Invoice automation means incoming invoices are read, checked against the purchase order and appear in your accounting system for approval. People review the exceptions, not every document.",
        tldr: [
          { k: "For whom", v: "Companies that retype dozens to hundreds of supplier invoices a month by hand." },
          { k: "What goes in", v: "Invoice PDFs and scans from email or a folder, purchase orders from your ERP." },
          { k: "What comes out", v: "A document ready for approval in your accounting system. A person approves." },
          { k: "How long", v: "Assessment 1–2 weeks, pilot live within 30 days." },
        ],
        ctaSecondary: "Send 20 invoices for a free test →",
        problemTitle: "Eight minutes per invoice that someone already wrote once",
        problem: [
          "An invoice arrives by email. Someone opens it, retypes the supplier, amounts, VAT and due date into the books, matches the order and files the PDF. At twenty invoices a day that is half a job which adds nothing that was not already in the data.",
          "Retyping errors only surface when payments are matched. The biggest delay is not the complex invoices but the simple ones, because there are so many of them.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Invoice PDFs from a mailbox", "Scans and photos of documents", "Orders and suppliers from your ERP", "Your approval rules"],
        outputsTitle: "Outputs",
        outputs: ["Extracted header and line items", "Company ID, VAT and duplicate checks", "Matched to the purchase order", "A document ready for approval in your books"],
        integrations:
          "Connected to the accounting system you already use, through its API or an import your accountant knows. TODO(Ondrej): list the systems you actually connect (Pohoda, Money, ABRA, others).",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: [
            "An invoice arrives by email; someone opens it, retypes it and files the PDF.",
            "Errors show up when payments are matched.",
            "Month-end waits for the last retyped documents.",
          ],
          after: [
            "The invoice reads itself and appears in the books for approval.",
            "Company ID, VAT and duplicates are checked before posting.",
            "People only handle the exceptions the system flags.",
          ],
        },
        stepsTitle: "Three steps from the first invoice to production",
        steps: [
          {
            num: "01",
            title: "A test on your data",
            body: "Send 20 real invoices. Within a week you see what the system extracts and a file your accountant can import. Free, no commitment.",
          },
          STEPS_EN[0],
          STEPS_EN[1],
        ],
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "Invoice automation FAQ",
        faqs: [
          {
            q: "How much does invoice automation cost for a small company?",
            a: "It starts with a fixed-price assessment you know before you sign. We price the pilot after it, because it depends on where invoices come from and where they need to go. TODO(Ondrej): add an indicative range.",
          },
          {
            q: "How long does it take to deploy invoice automation?",
            a: "Assessment 1–2 weeks, pilot live within 30 days of approval. The 20-invoice test comes back within a week.",
          },
          {
            q: "What if an invoice is badly scanned?",
            a: "The system flags it and hands it to a person. It does not guess. Uncertain fields are shown for review instead of being posted quietly.",
          },
          {
            q: "Do we have to change our accounting software?",
            a: "No. We connect to what you have. Where there is no API, we use an import your accountant already knows.",
          },
          {
            q: "Where does the data run and who sees it?",
            a: "On your infrastructure or in an EU cloud. Invoices never leave the environment you approve. Nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "Invoices that post themselves. People only approve.",
        summary: "Send 20 invoices and see the result before you decide. Or book fifteen minutes and we walk through your operation.",
        related: ["email", "quotes", "demo"],
      },
    },
  },

  /* --------------------------------------------------------------- email */
  {
    key: "email",
    serviceType: "Email and inquiry triage automation",
    copy: {
      cs: {
        nav: "Automatizace e-mailů a poptávek",
        title: "Automatizace e-mailů a poptávek: roztříděná pošta, hotové koncepty",
        description:
          "Automatizace e-mailů a poptávek: příchozí pošta roztříděná před osmou, koncepty odpovědí připravené, lidé jen kontrolují a odesílají.",
        eyebrow: "AI automatizace · e-maily a poptávky",
        h1Pre: "Automatizace e-mailů a poptávek:",
        h1Em: "roztříděná pošta a hotové koncepty odpovědí.",
        lead: "Automatizace e-mailů a poptávek roztřídí příchozí poštu podle toho, co v ní je, připraví koncept odpovědi a předá člověku jen to, co vyžaduje rozhodnutí. Poptávka dostane odpověď do minut, ne do odpoledne.",
        tldr: [
          { k: "Pro koho", v: "Firmy, kde jedna schránka denně sbírá poptávky, objednávky, reklamace a dotazy dohromady." },
          { k: "Co vstupuje", v: "Sdílená schránka nebo formulář na webu, ceník a pravidla, podle kterých dnes odpovídáte." },
          { k: "Co vychází", v: "Roztříděná pošta se štítky a koncepty odpovědí. Odesílá člověk." },
          { k: "Za jak dlouho", v: "Analýza 1–2 týdny, pilot v provozu do 30 dní." },
        ],
        problemTitle: "Dvě a půl hodiny ráno, než se k něčemu dostanete",
        problem: [
          "Ráno je ve schránce šedesát zpráv. Poptávky, dotazy na termín, objednávky, reklamace, newslettery. Někdo je musí otevřít, pochopit a rozhodnout, kdo se o ně postará. Teprve potom se začne odpovídat.",
          "Poptávka, která čeká na odpověď do odpoledne, už často dostala nabídku odjinud. Nejdražší e-mail je ten, na který se odpovědělo pozdě.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["Sdílená schránka (M365, Google Workspace)", "Formuláře z webu", "Ceník, FAQ a vaše dosavadní odpovědi", "Pravidla, komu co patří"],
        outputsTitle: "Výstupy",
        outputs: ["Zpráva roztříděná podle typu a naléhavosti", "Koncept odpovědi ve vašem tónu", "Předání správnému člověku se shrnutím", "Ranní přehled: co přišlo a co čeká"],
        integrations:
          "Napojení na Microsoft 365 nebo Google Workspace a na CRM nebo helpdesk, pokud ho používáte. TODO(Ondrej): potvrdit, které systémy napojíte.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: [
            "Pošta se třídí ručně, každé ráno znovu.",
            "Poptávky čekají na odpověď do odpoledne.",
            "Nikdo neví, kolik zpráv zůstalo bez odpovědi.",
          ],
          after: [
            "Pošta je roztříděná před osmou, se štítky a prioritou.",
            "Koncept odpovědi čeká na jedno kliknutí.",
            "Ranní přehled ukáže, co přišlo a co ještě čeká.",
          ],
        },
        stepsTitle: "Tři kroky od analýzy k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k automatizaci e-mailů",
        faqs: [
          {
            q: "Odesílá systém e-maily sám?",
            a: "Ne, pokud to sami nechcete. Standardně připraví koncept a člověk ho zkontroluje a odešle. Automatické odesílání zapínáme jen u jasně vymezených typů zpráv, například potvrzení přijetí.",
          },
          {
            q: "Jak pozná, co je poptávka a co spam?",
            a: "Podle obsahu zprávy, ne podle odesílatele. Nejistotu nehádá: zpráva, kterou nedokáže zařadit, jde člověku s poznámkou proč.",
          },
          {
            q: "Funguje to i ve slovenštině a angličtině?",
            a: "Ano. Zprávu roztřídí a koncept napíše v jazyce, ve kterém přišla. TODO(Ondrej): potvrdit seznam jazyků, které chcete slíbit.",
          },
          {
            q: "Jak dlouho trvá nasazení?",
            a: "Analýza 1–2 týdny, pilot v ostrém provozu do 30 dní od schválení.",
          },
          {
            q: "Co se stane s obsahem našich e-mailů?",
            a: "Zůstává ve vaší schránce. Zpracování běží ve vaší infrastruktuře nebo v EU cloudu a nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Pošta roztříděná před osmou. Odpovědi na jedno kliknutí.",
        summary: "Patnáct minut stačí na to, abychom řekli, co se u vás zaplatí jako první. Domluvte si je.",
        related: ["invoices", "quotes", "knowledge"],
      },
      en: {
        nav: "Email and inquiry automation",
        title: "Email and inquiry automation: sorted inbox, drafted replies",
        description:
          "Email and inquiry automation: incoming mail sorted before eight, replies drafted, people only review and send. Pilot live within 30 days.",
        eyebrow: "AI automation · email and inquiries",
        h1Pre: "Email and inquiry automation:",
        h1Em: "a sorted inbox and drafted replies.",
        lead: "Email and inquiry automation sorts incoming mail by what is in it, drafts a reply and hands a person only what needs a decision. An inquiry gets an answer in minutes, not by the afternoon.",
        tldr: [
          { k: "For whom", v: "Companies where one mailbox collects inquiries, orders, complaints and questions all at once." },
          { k: "What goes in", v: "A shared mailbox or web form, your price list and the rules you reply by today." },
          { k: "What comes out", v: "Sorted mail with labels and drafted replies. A person sends." },
          { k: "How long", v: "Assessment 1–2 weeks, pilot live within 30 days." },
        ],
        problemTitle: "Two and a half hours every morning before any real work",
        problem: [
          "Sixty messages in the inbox by morning. Inquiries, scheduling questions, orders, complaints, newsletters. Someone has to open each one, understand it and decide who handles it. Only then does anyone start replying.",
          "An inquiry that waits until the afternoon has often already received a quote from someone else. The most expensive email is the one answered late.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["A shared mailbox (M365, Google Workspace)", "Web forms", "Your price list, FAQ and past replies", "Rules for who owns what"],
        outputsTitle: "Outputs",
        outputs: ["Each message classified by type and urgency", "A drafted reply in your tone", "Hand-off to the right person with a summary", "A morning digest: what arrived, what is waiting"],
        integrations:
          "Connected to Microsoft 365 or Google Workspace and to your CRM or helpdesk if you use one. TODO(Ondrej): confirm which systems you connect.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["Mail is sorted by hand, every morning again.", "Inquiries wait until the afternoon.", "Nobody knows how many messages went unanswered."],
          after: ["Mail is sorted before eight, with labels and priority.", "A drafted reply waits for one click.", "The morning digest shows what arrived and what is still waiting."],
        },
        stepsTitle: "Three steps from assessment to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "Email automation FAQ",
        faqs: [
          {
            q: "Does the system send emails on its own?",
            a: "Not unless you want it to. By default it drafts and a person reviews and sends. We switch on automatic sending only for clearly bounded message types, such as acknowledgements.",
          },
          {
            q: "How does it tell an inquiry from spam?",
            a: "By the content of the message, not the sender. It does not guess: a message it cannot classify goes to a person with a note on why.",
          },
          {
            q: "Does it work in Slovak and English?",
            a: "Yes. It classifies the message and drafts the reply in the language it arrived in. TODO(Ondrej): confirm the list of languages you want to promise.",
          },
          { q: "How long does deployment take?", a: "Assessment 1–2 weeks, pilot live within 30 days of approval." },
          {
            q: "What happens to the content of our emails?",
            a: "It stays in your mailbox. Processing runs on your infrastructure or in an EU cloud and nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "Mail sorted before eight. Replies in one click.",
        summary: "Fifteen minutes is enough for us to say what would pay off first. Book them.",
        related: ["invoices", "quotes", "knowledge"],
      },
    },
  },

  /* -------------------------------------------------------------- quotes */
  {
    key: "quotes",
    serviceType: "Quote generation automation",
    copy: {
      cs: {
        nav: "Automatizace nabídek",
        title: "Automatizace cenových nabídek: nabídka za minuty místo hodin",
        description:
          "Automatizace cenových nabídek: z poptávky vznikne kalkulace a nabídka ve vašem formátu za minuty. Rychlejší nabídka vyhrává zakázky.",
        eyebrow: "AI automatizace · nabídky",
        h1Pre: "Automatizace cenových nabídek:",
        h1Em: "nabídka za minuty místo hodin.",
        lead: "Automatizace cenových nabídek vezme poptávku, vytáhne z ní položky a množství, spočítá cenu podle vašeho ceníku a připraví nabídku ve vašem formátu. Obchodník ji zkontroluje a odešle.",
        tldr: [
          { k: "Pro koho", v: "Firmy, kde každá poptávka znamená hodinu v Excelu a šabloně, než odejde nabídka." },
          { k: "Co vstupuje", v: "Poptávka e-mailem nebo z formuláře, ceník, pravidla slev a dopravy." },
          { k: "Co vychází", v: "Kalkulace a nabídka v PDF nebo ve vašem CRM. Odesílá obchodník." },
          { k: "Za jak dlouho", v: "Analýza 1–2 týdny, pilot v provozu do 30 dní." },
        ],
        problemTitle: "Hodina práce na nabídce, kterou zákazník porovnává se třemi dalšími",
        problem: [
          "Poptávka přijde v e-mailu, občas jako fotka ručně psaného seznamu. Obchodník ji přepíše do kalkulace, dohledá ceny, spočítá slevu a dopravu, vloží do šablony a pošle. Když je poptávek dvacet týdně, nabídky odcházejí s denním zpožděním.",
          "Zákazník mezitím dostal nabídku odjinud. V B2B často vyhrává ne nejlevnější, ale první srozumitelná nabídka.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["Poptávka e-mailem, z formuláře nebo jako příloha", "Ceník a číselník produktů", "Pravidla slev, marží a dopravy", "Vaše šablona nabídky"],
        outputsTitle: "Výstupy",
        outputs: ["Položky a množství vytažené z poptávky", "Kalkulace podle vašich pravidel", "Nabídka v PDF nebo v CRM", "Upozornění na položky, které systém nenašel v ceníku"],
        integrations:
          "Napojení na ceník v ERP nebo tabulce a na CRM, pokud ho používáte. TODO(Ondrej): potvrdit systémy, které napojíte.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Poptávka se přepisuje do kalkulace ručně.", "Nabídka odchází druhý den.", "Každý obchodník počítá slevy trochu jinak."],
          after: ["Položky a množství se vytáhnou z poptávky samy.", "Nabídka je připravená ke kontrole za minuty.", "Slevy a doprava podle jedněch pravidel."],
        },
        stepsTitle: "Tři kroky od analýzy k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k automatizaci nabídek",
        faqs: [
          {
            q: "Může nabídka odejít bez kontroly obchodníka?",
            a: "Může, ale nedoporučujeme to na začátku. Pilot nastavíme tak, že obchodník nabídku vidí a jedním kliknutím odešle. Automatické odesílání má smysl až u jednoduchých, opakujících se poptávek.",
          },
          {
            q: "Co když poptávka obsahuje položku, kterou neprodáváme?",
            a: "Systém ji označí a nabídne nejbližší položky z ceníku. Rozhodne obchodník. Nic se nevymýšlí.",
          },
          {
            q: "Jak dlouho trvá nasazení automatizace nabídek?",
            a: "Analýza 1–2 týdny, pilot v ostrém provozu do 30 dní od schválení.",
          },
          {
            q: "Musíme mít CRM?",
            a: "Ne. Stačí ceník a šablona nabídky. Nabídka může vznikat jako PDF a odcházet z vaší schránky.",
          },
        ],
        summaryTitle: "První srozumitelná nabídka vyhrává. Tak ať je vaše.",
        summary: "Popište, jak dnes nabídky vznikají, a řekneme na rovinu, co se u vás zaplatí a do kdy.",
        related: ["email", "invoices", "knowledge"],
      },
      en: {
        nav: "Quote automation",
        title: "Quote automation: a price quote in minutes instead of hours",
        description:
          "Quote automation: an inquiry becomes a calculation and a quote in your format within minutes. The faster quote wins the job. Pilot live within 30 days.",
        eyebrow: "AI automation · quotes",
        h1Pre: "Quote automation:",
        h1Em: "a price quote in minutes instead of hours.",
        lead: "Quote automation takes an inquiry, extracts items and quantities, prices them from your price list and prepares a quote in your format. A salesperson reviews and sends it.",
        tldr: [
          { k: "For whom", v: "Companies where every inquiry means an hour in Excel and a template before a quote goes out." },
          { k: "What goes in", v: "An inquiry by email or form, your price list, discount and shipping rules." },
          { k: "What comes out", v: "A calculation and a quote as PDF or in your CRM. A salesperson sends." },
          { k: "How long", v: "Assessment 1–2 weeks, pilot live within 30 days." },
        ],
        problemTitle: "An hour of work on a quote the customer compares with three others",
        problem: [
          "The inquiry arrives by email, sometimes as a photo of a handwritten list. A salesperson retypes it into a calculation, looks up prices, works out the discount and shipping, pastes it into a template and sends. At twenty inquiries a week, quotes go out a day late.",
          "Meanwhile the customer received a quote from someone else. In B2B the winner is often not the cheapest quote but the first clear one.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["An inquiry by email, form or attachment", "Price list and product catalogue", "Discount, margin and shipping rules", "Your quote template"],
        outputsTitle: "Outputs",
        outputs: ["Items and quantities extracted from the inquiry", "A calculation by your rules", "A quote as PDF or in your CRM", "Flags on items not found in the price list"],
        integrations:
          "Connected to the price list in your ERP or spreadsheet and to your CRM if you use one. TODO(Ondrej): confirm which systems you connect.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["The inquiry is retyped into a calculation.", "The quote goes out the next day.", "Every salesperson calculates discounts slightly differently."],
          after: ["Items and quantities come out of the inquiry on their own.", "The quote is ready for review in minutes.", "Discounts and shipping follow one set of rules."],
        },
        stepsTitle: "Three steps from assessment to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "Quote automation FAQ",
        faqs: [
          {
            q: "Can a quote go out without a salesperson checking it?",
            a: "It can, but we do not recommend it at first. The pilot is set up so a salesperson sees the quote and sends it with one click. Automatic sending makes sense only for simple, repeating inquiries.",
          },
          {
            q: "What if the inquiry contains an item we do not sell?",
            a: "The system flags it and suggests the closest items from your price list. The salesperson decides. Nothing is invented.",
          },
          { q: "How long does it take to deploy quote automation?", a: "Assessment 1–2 weeks, pilot live within 30 days of approval." },
          {
            q: "Do we need a CRM?",
            a: "No. A price list and a quote template are enough. The quote can be generated as a PDF and sent from your mailbox.",
          },
        ],
        summaryTitle: "The first clear quote wins. Make it yours.",
        summary: "Describe how quotes are made today and we will tell you straight what pays off and by when.",
        related: ["email", "invoices", "knowledge"],
      },
    },
  },

  /* ----------------------------------------------------------- knowledge */
  {
    key: "knowledge",
    serviceType: "AI company knowledge base with citations",
    copy: {
      cs: {
        nav: "AI firemní znalosti",
        title: "AI firemní znalostní báze: odpovědi z vašich dokumentů s citací",
        description:
          "AI firemní znalostní báze: zeptáte se vlastními slovy, odpověď přijde z vašich dokumentů s odkazem na stranu. Nevymýšlí si. Pilot do 30 dní.",
        eyebrow: "AI automatizace · firemní znalosti",
        h1Pre: "AI firemní znalostní báze:",
        h1Em: "odpovědi z vašich dokumentů, s citací.",
        lead: "AI firemní znalostní báze odpovídá na otázky lidí ve firmě jen z vašich dokumentů: smluv, směrnic, manuálů, ceníků. Ke každé odpovědi přiloží zdroj, dokument a stranu. Když odpověď nezná, řekne to.",
        tldr: [
          { k: "Pro koho", v: "Firmy, kde se stejné otázky ptají pořád dokola a odpověď zná jen pár lidí." },
          { k: "Co vstupuje", v: "Dokumenty, které už máte: PDF, Word, sdílené disky, wiki." },
          { k: "Co vychází", v: "Odpověď v jazyce otázky s odkazem na konkrétní dokument a stranu." },
          { k: "Za jak dlouho", v: "Analýza 1–2 týdny, pilot v provozu do 30 dní." },
        ],
        problemTitle: "Odpověď existuje. Jen ji nikdo nenajde.",
        problem: [
          "Podmínky záruky jsou v jedné smlouvě, postup reklamace ve směrnici z roku 2021, aktuální ceník v e-mailu od kolegy. Nový člověk se ptá, zkušený odpovídá. Pořád dokola.",
          "Obecný chatbot tenhle problém neřeší, protože neví nic o vaší firmě a při nejistotě si vymýšlí. Znalostní báze, která odpovídá jen z vašich dokumentů a cituje zdroj, ano.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["PDF, Word a tabulky ze sdílených disků", "Interní wiki a směrnice", "Smlouvy a produktová dokumentace", "Oprávnění: kdo smí co vidět"],
        outputsTitle: "Výstupy",
        outputs: ["Odpověď vlastními slovy s citací dokumentu a strany", "„Nevím“ místo odhadu, když zdroj chybí", "Přehled otázek, na které dokumenty neodpovídají", "Napojení do Teams, Slacku nebo webu"],
        integrations:
          "Čte dokumenty tam, kde jsou: SharePoint, Google Drive, síťový disk. Odpovídá v Teams, Slacku nebo v interním webu. TODO(Ondrej): potvrdit kanály, které nabízíte.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Odpověď zná jeden člověk a ten je na dovolené.", "Nový kolega hledá hodinu v pěti složkách.", "Nikdo neví, které dokumenty jsou aktuální."],
          after: ["Odpověď s odkazem na stranu do pár sekund.", "Stejná odpověď pro všechny, z jednoho zdroje.", "Seznam otázek, na které dokumenty neodpovídají."],
        },
        stepsTitle: "Tři kroky od analýzy k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k AI znalostní bázi",
        faqs: [
          {
            q: "AI si přece vymýšlí. Jak tomu zabráníte?",
            a: "Systém odpovídá jen z vašich dokumentů a ke každé odpovědi přiloží zdroj, dokument a stranu. Když odpověď v dokumentech není, řekne, že neví. Nic nedoplňuje z obecných znalostí.",
          },
          {
            q: "Kde naše dokumenty běží?",
            a: "Ve vaší infrastruktuře nebo v EU cloudu. Dokumenty neopouštějí prostředí, které schválíte, a nepoužívají se k trénování cizích modelů.",
          },
          {
            q: "Respektuje to oprávnění?",
            a: "Ano. Kdo nesmí vidět dokument, nedostane z něj ani odpověď. Oprávnění přebíráme z místa, kde dokumenty leží.",
          },
          {
            q: "Jak dlouho trvá nasazení AI znalostní báze?",
            a: "Analýza 1–2 týdny, pilot na vybrané sadě dokumentů v provozu do 30 dní od schválení.",
          },
          {
            q: "Co když jsou dokumenty neaktuální?",
            a: "To se při pilotu ukáže rychle: otázky, na které přicházejí protichůdné odpovědi, dostanete v přehledu. Je to často první užitečný výstup.",
          },
        ],
        summaryTitle: "Odpověď s citací do pár sekund. Pro každého ve firmě.",
        summary: "Vyberte deset otázek, které se u vás ptají nejčastěji, a domluvte si patnáct minut. Ukážeme, jak by to vypadalo na vašich dokumentech.",
        related: ["email", "invoices", "demo"],
      },
      en: {
        nav: "AI company knowledge base",
        title: "AI company knowledge base: answers from your documents, with citations",
        description:
          "AI company knowledge base: ask in your own words, get an answer from your own documents with a link to the page. It does not make things up. Pilot in 30 days.",
        eyebrow: "AI automation · company knowledge",
        h1Pre: "AI company knowledge base:",
        h1Em: "answers from your documents, with citations.",
        lead: "An AI company knowledge base answers your people's questions only from your documents: contracts, policies, manuals, price lists. Every answer cites its source, document and page. When it does not know, it says so.",
        tldr: [
          { k: "For whom", v: "Companies where the same questions get asked over and over and only a few people know the answer." },
          { k: "What goes in", v: "Documents you already have: PDF, Word, shared drives, wikis." },
          { k: "What comes out", v: "An answer in the language of the question, with a link to the exact document and page." },
          { k: "How long", v: "Assessment 1–2 weeks, pilot live within 30 days." },
        ],
        problemTitle: "The answer exists. Nobody can find it.",
        problem: [
          "Warranty terms are in one contract, the complaints procedure in a 2021 policy, the current price list in a colleague's email. The new hire asks, the experienced one answers. Over and over.",
          "A generic chatbot does not solve this, because it knows nothing about your company and makes things up when unsure. A knowledge base that answers only from your documents and cites the source does.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["PDF, Word and spreadsheets from shared drives", "Internal wiki and policies", "Contracts and product documentation", "Permissions: who may see what"],
        outputsTitle: "Outputs",
        outputs: ["An answer in plain words, citing document and page", "“I don't know” instead of a guess when the source is missing", "A list of questions your documents do not answer", "Available in Teams, Slack or an internal site"],
        integrations:
          "Reads documents where they live: SharePoint, Google Drive, a network share. Answers in Teams, Slack or an internal site. TODO(Ondrej): confirm the channels you offer.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["One person knows the answer and they are on holiday.", "A new colleague searches five folders for an hour.", "Nobody knows which documents are current."],
          after: ["An answer with a page reference in seconds.", "The same answer for everyone, from one source.", "A list of questions the documents do not answer."],
        },
        stepsTitle: "Three steps from assessment to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI knowledge base FAQ",
        faqs: [
          {
            q: "AI makes things up. How do you prevent that?",
            a: "The system answers only from your documents and attaches a source to every answer, the document and page. When the answer is not in the documents, it says it does not know. It adds nothing from general knowledge.",
          },
          {
            q: "Where do our documents run?",
            a: "On your infrastructure or in an EU cloud. Documents never leave the environment you approve and are not used to train third-party models.",
          },
          {
            q: "Does it respect permissions?",
            a: "Yes. Whoever may not see a document gets no answer from it. Permissions are inherited from where the documents live.",
          },
          { q: "How long does it take to deploy?", a: "Assessment 1–2 weeks, a pilot on a chosen set of documents live within 30 days of approval." },
          {
            q: "What if our documents are out of date?",
            a: "The pilot shows that quickly: questions that get contradictory answers appear in a report. It is often the first useful output.",
          },
        ],
        summaryTitle: "A cited answer in seconds. For everyone in the company.",
        summary: "Pick the ten questions people ask most and book fifteen minutes. We will show what it would look like on your documents.",
        related: ["email", "invoices", "demo"],
      },
    },
  },

  /* -------------------------------------------------------------- hotels */
  {
    key: "hotels",
    serviceType: "AI automation for hotels and guest communication",
    copy: {
      cs: {
        nav: "AI automatizace pro hotely",
        title: "AI automatizace pro hotely: dotazy hostů zodpovězené do minuty",
        description:
          "AI automatizace pro hotely a penziony: dotazy a rezervační poptávky zodpovězené do minuty v jazyce hosta, recepce jen potvrzuje. Pilot do 30 dní.",
        eyebrow: "AI automatizace · hotely",
        h1Pre: "AI automatizace pro hotely:",
        h1Em: "dotazy hostů zodpovězené do minuty.",
        lead: "AI automatizace pro hotely odpovídá na dotazy a rezervační poptávky hostů do minuty, v jazyce, kterým píší, a nabídne volné termíny z vašeho kalendáře. Recepce jen potvrzuje a řeší výjimky.",
        tldr: [
          { k: "Pro koho", v: "Hotely a penziony, kde recepce denně odpovídá na desítky stejných e-mailů a zmeškává hovory." },
          { k: "Co vstupuje", v: "E-maily a formuláře hostů, dostupnost a ceník, vaše pravidla (check-in, storno, parkování)." },
          { k: "Co vychází", v: "Odpověď s volnými termíny a potvrzení jedním kliknutím. Zmeškaný hovor → SMS do minuty." },
          { k: "Za jak dlouho", v: "Analýza 1–2 týdny, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Vyzkoušet živou ukázku →",
        problemTitle: "Recepce má dvě ruce a šedesát e-mailů",
        problem: [
          "„Máte volno od pátku do neděle pro dva?“ „Kdy je check-in?“ „Dá se parkovat?“ Stejné otázky, různé jazyky, celý den. Mezitím zvoní telefon a před pultem stojí host. Dotaz, který čeká tři hodiny, je rezervace jinde.",
          "Živou ukázku toho, jak to vypadá, si můžete vyzkoušet sami: napíšete jako host a sledujete, co systém udělá.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["E-maily a formuláře z webu a portálů", "Dostupnost a ceník z vašeho rezervačního systému", "Pravidla: check-in, storno, parkování, snídaně", "Zmeškané hovory na recepci"],
        outputsTitle: "Výstupy",
        outputs: ["Odpověď v jazyce hosta se třemi volnými termíny", "Potvrzení rezervace jedním kliknutím", "SMS s termínem do minuty po zmeškaném hovoru", "Předání recepci u všeho, co vyžaduje rozhodnutí"],
        integrations:
          "Napojení na rezervační systém (PMS) a kanál, kterým hosté píší. TODO(Ondrej): vyjmenovat PMS a channel managery, které reálně napojíte.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Dotaz čeká, až má recepce chvíli.", "Zmeškaný hovor je ztracená rezervace.", "Každý z recepce odpovídá trochu jinak."],
          after: ["Odpověď se třemi termíny do minuty, v jazyce hosta.", "Zmeškaný hovor dostane SMS s termínem.", "Recepce potvrzuje a řeší jen výjimky."],
        },
        stepsTitle: "Tři kroky od analýzy k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k AI pro hotely",
        faqs: [
          {
            q: "Nahradí to recepci?",
            a: "Ne. Odpoví na to, co se opakuje, a nabídne termíny. Všechno, co vyžaduje rozhodnutí nebo lidský tón, předá recepci se shrnutím. Nezvedá telefon a nic neposílá bez vaší kontroly, pokud to nenastavíte jinak.",
          },
          {
            q: "V jakých jazycích to odpovídá?",
            a: "V jazyce, kterým host píše. TODO(Ondrej): potvrdit seznam jazyků, které chcete slíbit.",
          },
          {
            q: "Napojíte se na náš rezervační systém?",
            a: "Ano, pokud má API nebo export dostupnosti. TODO(Ondrej): potvrdit konkrétní PMS.",
          },
          {
            q: "Jak dlouho trvá nasazení AI automatizace v hotelu?",
            a: "Analýza 1–2 týdny, pilot v ostrém provozu do 30 dní od schválení. Ukázku si můžete vyzkoušet hned.",
          },
          {
            q: "Co se stane s daty hostů?",
            a: "Zůstávají ve vašem systému. Zpracování běží ve vaší infrastruktuře nebo v EU cloudu a nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Dotaz zodpovězený do minuty. Rezervace, která neuteče.",
        summary: "Vyzkoušejte živou ukázku, nebo si domluvte patnáct minut a projdeme, jak u vás dnes vypadá komunikace s hosty.",
        related: ["demo", "email", "knowledge"],
      },
      en: {
        nav: "AI automation for hotels",
        title: "AI automation for hotels: guest inquiries answered within a minute",
        description:
          "AI automation for hotels and guesthouses: guest inquiries and booking requests answered within a minute in the guest's language; reception only confirms. Pilot in 30 days.",
        eyebrow: "AI automation · hotels",
        h1Pre: "AI automation for hotels:",
        h1Em: "guest inquiries answered within a minute.",
        lead: "AI automation for hotels answers guest inquiries and booking requests within a minute, in the language they write in, and offers free dates from your calendar. Reception only confirms and handles exceptions.",
        tldr: [
          { k: "For whom", v: "Hotels and guesthouses where reception answers dozens of the same emails a day and misses calls." },
          { k: "What goes in", v: "Guest emails and forms, availability and rates, your rules (check-in, cancellation, parking)." },
          { k: "What comes out", v: "A reply with free dates and one-click confirmation. Missed call → SMS within a minute." },
          { k: "How long", v: "Assessment 1–2 weeks, pilot live within 30 days." },
        ],
        ctaSecondary: "Try the live demo →",
        problemTitle: "Reception has two hands and sixty emails",
        problem: [
          "“Do you have a room for two from Friday to Sunday?” “When is check-in?” “Is there parking?” The same questions, different languages, all day. Meanwhile the phone rings and a guest is standing at the desk. An inquiry that waits three hours is a booking somewhere else.",
          "You can try a live demo of what this looks like yourself: write as a guest and watch what the system does.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Emails and forms from your site and portals", "Availability and rates from your booking system", "Rules: check-in, cancellation, parking, breakfast", "Missed calls at reception"],
        outputsTitle: "Outputs",
        outputs: ["A reply in the guest's language with three free dates", "One-click booking confirmation", "An SMS with a date within a minute of a missed call", "Hand-off to reception for anything needing a decision"],
        integrations:
          "Connected to your property management system and the channel guests write through. TODO(Ondrej): list the PMS and channel managers you actually connect.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["The inquiry waits until reception has a moment.", "A missed call is a lost booking.", "Everyone at reception answers slightly differently."],
          after: ["A reply with three dates within a minute, in the guest's language.", "A missed call gets an SMS with a date.", "Reception confirms and handles only the exceptions."],
        },
        stepsTitle: "Three steps from assessment to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI for hotels FAQ",
        faqs: [
          {
            q: "Does it replace reception?",
            a: "No. It answers what repeats and offers dates. Anything that needs a decision or a human tone goes to reception with a summary. It does not answer the phone and sends nothing without your review unless you set it up that way.",
          },
          { q: "Which languages does it answer in?", a: "The language the guest writes in. TODO(Ondrej): confirm the list of languages you want to promise." },
          { q: "Will you connect to our booking system?", a: "Yes, if it has an API or an availability export. TODO(Ondrej): confirm the specific PMS." },
          { q: "How long does it take to deploy in a hotel?", a: "Assessment 1–2 weeks, pilot live within 30 days of approval. You can try the demo right now." },
          {
            q: "What happens to guest data?",
            a: "It stays in your system. Processing runs on your infrastructure or in an EU cloud and nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "Inquiries answered within a minute. Bookings that don't slip away.",
        summary: "Try the live demo, or book fifteen minutes and we walk through how guest communication works for you today.",
        related: ["demo", "email", "knowledge"],
      },
    },
  },

  /* ---------------------------------------------------------- comparison */
  {
    key: "comparison",
    copy: {
      cs: {
        nav: "AI agentura vs. studio vs. SaaS",
        title: "AI agentura vs. vývojové studio vs. hotový software: co kdy dává smysl",
        description:
          "Férové srovnání: AI agentura, velké vývojové studio, hotový software, nebo interní tým. Cena předem, čas do provozu, co dostanete a kdo to udržuje.",
        eyebrow: "Srovnání",
        h1Pre: "AI agentura vs. vývojové studio vs. hotový software:",
        h1Em: "co kdy dává smysl.",
        lead: "AI agentura, velké vývojové studio, hotový software, nebo vlastní tým? Každá možnost má situace, kde je nejlepší volbou. Tohle je srovnání typů, ne konkrétních firem, včetně toho, kdy byste si neměli vybrat nás.",
        tldr: [
          { k: "Hotový software", v: "Nejlepší, když váš proces je běžný a software ho už umí. Nejlevnější start, nejméně přizpůsobení." },
          { k: "Velké studio", v: "Nejlepší pro velké, dlouhé projekty s vlastním IT, kde potřebujete desítky lidí a garance." },
          { k: "Interní tým", v: "Nejlepší, když automatizace jsou vaše hlavní konkurenční výhoda a máte na ně stálou práci." },
          { k: "AI agentura (my)", v: "Nejlepší pro jeden konkrétní proces, který má běžet do 30 dní, s pevnou cenou a bez vlastního IT." },
        ],
        problemTitle: "Proč to srovnání vůbec psát",
        problem: [
          "Většina firem, se kterými mluvíme, řeší stejnou otázku: koupit hotový nástroj, najmout studio, přijmout vývojáře, nebo vzít menší agenturu? Odpověď není „my“. Záleží na tom, jak běžný je váš proces, kolik ho chcete přizpůsobit a kdo se o něj bude starat.",
          "Tabulka níže srovnává obecné kategorie. Nejsou to konkrétní dodavatelé a každá kategorie má výjimky.",
        ],
        automateTitle: "Kdy si nás nevybírat",
        inputsTitle: "Vyberte hotový software, když",
        inputs: ["váš proces je standardní a nástroj ho umí z krabice", "potřebujete začít tento týden za nízkou měsíční cenu", "nechcete nic přizpůsobovat a stačí vám to, co umí"],
        outputsTitle: "Vyberte velké studio nebo interní tým, když",
        outputs: ["projekt má roky trvat a potřebuje desítky lidí", "máte vlastní IT, které bude systém dál rozvíjet", "automatizace jsou jádro vašeho byznysu, ne podpora"],
        integrations:
          "My dáváme smysl uprostřed: jeden konkrétní proces, který má běžet do 30 dní, s pevnou cenou analýzy, bez interního IT a s tím, že ho po nasazení dál udržujeme.",
        stepsTitle: "Jak u nás vypadá cesta k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        comparison: {
          columns: ["", "AI agentura (Full Canvas)", "Velké vývojové studio", "Hotový software (SaaS)", "Interní tým"],
          highlight: 1,
          rows: [
            {
              label: "Cena předem",
              cells: ["Pevná cena analýzy, pilot oceněný po ní", "Odhad, často hodinová sazba", "Licence za uživatele měsíčně", "Mzdy, bez stropu"],
            },
            {
              label: "Čas do provozu",
              cells: ["Do 30 dní od schválení", "Měsíce", "Dny, ale jen to, co nástroj umí", "Měsíce včetně náboru"],
            },
            {
              label: "Co dostanete",
              cells: ["Běžící automatizaci na vašich datech", "Systém podle zadání, obvykle větší", "Obecný nástroj", "Záleží na lidech"],
            },
            {
              label: "Přizpůsobení vašemu procesu",
              cells: ["Vysoké", "Vysoké", "Nízké", "Vysoké"],
            },
            {
              label: "Kdo to udržuje",
              cells: ["My, v rámci provozu", "Studio podle smlouvy, nebo vy", "Dodavatel, bez vašich úprav", "Vy"],
            },
            {
              label: "Kdy je to nejlepší volba",
              cells: ["Jeden konkrétní proces, rychle, bez IT", "Velký projekt s vlastním IT", "Standardní proces", "Automatizace jako jádro byznysu"],
            },
          ],
          note: "Srovnání obecných kategorií, ne konkrétních dodavatelů. V každé kategorii existují výjimky.",
        },
        faqTitle: "Časté otázky",
        faqs: [
          {
            q: "Je AI agentura levnější než vývojové studio?",
            a: "Na jeden konkrétní proces obvykle ano, protože rozsah je malý a cena analýzy je pevná. Na velký, roky trvající projekt může být studio s desítkami lidí vhodnější a v součtu i levnější.",
          },
          {
            q: "Proč nekoupit rovnou hotový software?",
            a: "Pokud váš proces je běžný a nástroj ho umí, kupte ho. Hotový software přestává dávat smysl, když musíte svůj proces ohýbat podle něj, nebo když potřebujete napojení, které nemá.",
          },
          {
            q: "Co když chceme mít systém ve svých rukou?",
            a: "Pilot i provoz stavíme tak, aby šel předat. Kód a data jsou vaše. TODO(Ondrej): potvrdit, jak přesně je to ve smlouvě.",
          },
          {
            q: "Jak poznáme, že se nám to zaplatí?",
            a: "Analýza spočítá, kolik vás proces stojí dnes, dřív než se cokoli staví. Když se to nezaplatí, řekneme to a neúčtujeme pilot.",
          },
        ],
        summaryTitle: "Jeden proces, 30 dní, pevná cena analýzy. Nebo vám řekneme, ať jdete jinam.",
        summary: "Popište svůj proces v patnácti minutách. Řekneme na rovinu, do které kolonky tabulky patříte.",
        related: ["invoices", "email", "knowledge"],
      },
      en: {
        nav: "AI agency vs. studio vs. SaaS",
        title: "AI agency vs. development studio vs. off-the-shelf software: when each makes sense",
        description:
          "A fair comparison: AI agency, large development studio, off-the-shelf software, or an in-house team. Price up front, time to production, what you get and who maintains it.",
        eyebrow: "Comparison",
        h1Pre: "AI agency vs. development studio vs. off-the-shelf software:",
        h1Em: "when each makes sense.",
        lead: "AI agency, large development studio, off-the-shelf software, or your own team? Each option has situations where it is the best choice. This compares types, not named companies, including when you should not pick us.",
        tldr: [
          { k: "Off-the-shelf software", v: "Best when your process is standard and the software already does it. Cheapest start, least customisation." },
          { k: "Large studio", v: "Best for big, long projects with your own IT, where you need dozens of people and guarantees." },
          { k: "In-house team", v: "Best when automation is your core competitive edge and there is steady work for it." },
          { k: "AI agency (us)", v: "Best for one specific process that has to run within 30 days, with a fixed price and no in-house IT." },
        ],
        problemTitle: "Why write this comparison at all",
        problem: [
          "Most companies we talk to face the same question: buy a tool, hire a studio, recruit a developer, or bring in a smaller agency? The answer is not “us”. It depends on how standard your process is, how much you want to adapt it and who will look after it.",
          "The table below compares general categories. They are not specific vendors and every category has exceptions.",
        ],
        automateTitle: "When not to choose us",
        inputsTitle: "Choose off-the-shelf software when",
        inputs: ["your process is standard and a tool does it out of the box", "you need to start this week at a low monthly price", "you don't want to customise anything and what it does is enough"],
        outputsTitle: "Choose a large studio or an in-house team when",
        outputs: ["the project will run for years and needs dozens of people", "you have your own IT that will keep developing the system", "automation is the core of your business, not support for it"],
        integrations:
          "We make sense in the middle: one specific process that has to run within 30 days, with a fixed-price assessment, no in-house IT, and us maintaining it after launch.",
        stepsTitle: "What the path to production looks like with us",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        comparison: {
          columns: ["", "AI agency (Full Canvas)", "Large development studio", "Off-the-shelf software (SaaS)", "In-house team"],
          highlight: 1,
          rows: [
            { label: "Price up front", cells: ["Fixed-price assessment, pilot priced after it", "An estimate, often hourly", "Per-user licence per month", "Salaries, no ceiling"] },
            { label: "Time to production", cells: ["Within 30 days of approval", "Months", "Days, but only what the tool does", "Months including hiring"] },
            { label: "What you get", cells: ["A running automation on your data", "A system to spec, usually larger", "A generic tool", "Depends on the people"] },
            { label: "Fit to your process", cells: ["High", "High", "Low", "High"] },
            { label: "Who maintains it", cells: ["We do, as part of operation", "The studio by contract, or you", "The vendor, without your changes", "You"] },
            { label: "When it's the best choice", cells: ["One specific process, fast, without IT", "A large project with your own IT", "A standard process", "Automation as the core of the business"] },
          ],
          note: "A comparison of general categories, not specific vendors. Every category has exceptions.",
        },
        faqTitle: "FAQ",
        faqs: [
          {
            q: "Is an AI agency cheaper than a development studio?",
            a: "For one specific process, usually yes, because the scope is small and the assessment price is fixed. For a large project running for years, a studio with dozens of people may be the better and, in total, cheaper fit.",
          },
          {
            q: "Why not just buy off-the-shelf software?",
            a: "If your process is standard and a tool does it, buy it. Off-the-shelf stops making sense when you have to bend your process to it, or when you need an integration it does not have.",
          },
          {
            q: "What if we want to own the system?",
            a: "The pilot and operation are built so they can be handed over. The code and data are yours. TODO(Ondrej): confirm exactly how the contract puts it.",
          },
          {
            q: "How do we know it will pay off?",
            a: "The assessment works out what the process costs you today, before anything is built. If it won't pay off, we say so and don't charge for a pilot.",
          },
        ],
        summaryTitle: "One process, 30 days, a fixed-price assessment. Or we tell you to go elsewhere.",
        summary: "Describe your process in fifteen minutes. We will tell you straight which column of the table you belong in.",
        related: ["invoices", "email", "knowledge"],
      },
    },
  },
];

export function service(key: string): ServiceDef {
  const found = SERVICES.find((s) => s.key === key);
  if (!found) throw new Error(`Unknown service key: ${key}`);
  return found;
}

export function serviceCopy(key: string, locale: Locale): ServiceCopy {
  return service(key).copy[locale];
}
