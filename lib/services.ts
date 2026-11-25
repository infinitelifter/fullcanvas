import type { Locale } from "@/lib/routes";

/**
 * One entry per service page, in both languages. The template in
 * components/service-page.tsx renders every entry the same way; the comparison
 * page is the one entry with a `comparison` table and no `Service` schema.
 *
 * Writing rules (from the SEO brief): keyword in title, slug, H1 and first
 * sentence; answer first; no self-praise; no invented numbers. Integrations
 * are named only where they are known to be true; price ranges appear once
 * SHOW_PRICING is on.
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
    title: "Ukázka na vašich datech",
    body: "Pošlete pár starších poptávek nebo dokumentů. Do týdne uvidíte, co by s nimi systém udělal. Zdarma, bez závazku.",
  },
  {
    num: "02",
    title: "Pilot",
    body: "Jedna automatizace v ostrém provozu do 30 dní od podpisu, za pevnou cenu. Když rozšíříte, celá částka se započítá.",
  },
  {
    num: "03",
    title: "Provoz",
    body: "Dohled, ladění a další automatizace. Na začátku vše schvaluje váš člověk.",
  },
];

const STEPS_EN: ServiceStep[] = [
  {
    num: "01",
    title: "Preview on your own data",
    body: "Send a few past inquiries or documents. Within a week you see what the system would do with them. Free, no commitment.",
  },
  {
    num: "02",
    title: "Pilot",
    body: "One automation live within 30 days of signing, at a fixed price. If you roll it out further, the full amount is credited.",
  },
  {
    num: "03",
    title: "Operation",
    body: "Monitoring, tuning and further automations. At the start a person on your team approves everything.",
  },
];

const PRICE_CS = [
  "Ukázka na vašich datech: zdarma, do týdne.",
  "Pilot: pevná cena, kterou znáte před podpisem, v provozu do 30 dní. Při rozšíření se celá částka započítá.",
  "Provoz: měsíční paušál za dohled, ladění a rozvoj.",
];

const PRICE_EN = [
  "Preview on your own data: free, within a week.",
  "Pilot: a fixed price you know before you sign, live within 30 days. Credited in full if you roll out further.",
  "Operation: a monthly fee for monitoring, tuning and improvements.",
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
          { k: "Za jak dlouho", v: "Ukázka na vašich datech do týdne, pilot v provozu do 30 dní." },
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
          "Napojení na účetní systém, který už používáte, například Pohodu, přes API nebo import, který účetní zná.",
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
          STEPS_CS[1],
          STEPS_CS[2],
        ],
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k automatizaci faktur",
        faqs: [
          {
            q: "Kolik stojí automatizace faktur pro malou firmu?",
            a: "Začíná se zkouškou zdarma na 20 vašich fakturách. Pilot má pevnou cenu, kterou znáte před podpisem; záleží na tom, odkud faktury chodí a kam mají jít.",
          },
          {
            q: "Jak dlouho trvá nasazení automatizace faktur?",
            a: "Ukázku na vašich datech máte do týdne, pilot je v ostrém provozu do 30 dní od podpisu. Zkoušku na 20 fakturách uvidíte do týdne.",
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
          { k: "How long", v: "Preview on your own data within a week, pilot live within 30 days." },
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
          "Connected to the accounting system you already use, Pohoda for example, through its API or an import your accountant knows.",
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
          STEPS_EN[1],
          STEPS_EN[2],
        ],
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "Invoice automation FAQ",
        faqs: [
          {
            q: "How much does invoice automation cost for a small company?",
            a: "It starts with a free test on 20 of your invoices. The pilot has a fixed price you know before you sign; it depends on where invoices come from and where they need to go.",
          },
          {
            q: "How long does it take to deploy invoice automation?",
            a: "A preview on your own data within a week, pilot live within 30 days of signing. The 20-invoice test comes back within a week.",
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
        title: "Automatizace e-mailů a poptávek: odpověď do minuty, i v noci",
        description:
          "Automatizace e-mailů a poptávek: každý dotaz z e-mailu nebo webu dostane do minuty odpověď s cenou či volným termínem. Pošta roztříděná, lidé jen schvalují.",
        eyebrow: "AI automatizace · e-maily a poptávky",
        h1Pre: "Automatizace e-mailů a poptávek:",
        h1Em: "roztříděná pošta a hotové koncepty odpovědí.",
        lead: "Automatizace e-mailů a poptávek roztřídí příchozí poštu podle toho, co v ní je, připraví koncept odpovědi a předá člověku jen to, co vyžaduje rozhodnutí. Poptávka dostane odpověď do minut, ne do odpoledne.",
        tldr: [
          { k: "Pro koho", v: "Firmy, kde jedna schránka denně sbírá poptávky, objednávky, reklamace a dotazy dohromady." },
          { k: "Co vstupuje", v: "Sdílená schránka nebo formulář na webu, ceník a pravidla, podle kterých dnes odpovídáte." },
          { k: "Co vychází", v: "Roztříděná pošta se štítky a koncepty odpovědí. Odesílá člověk." },
          { k: "Za jak dlouho", v: "Ukázka na vašich datech do týdne, pilot v provozu do 30 dní." },
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
          "Napojení na Microsoft 365 nebo Google Workspace a na CRM nebo helpdesk, pokud ho používáte.",
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
        stepsTitle: "Tři kroky od ukázky k provozu",
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
            a: "Ano. Zprávu roztřídí a koncept napíše v jazyce, ve kterém přišla.",
          },
          {
            q: "Jak dlouho trvá nasazení?",
            a: "Ukázku na vašich datech máte do týdne, pilot je v ostrém provozu do 30 dní od podpisu.",
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
        title: "Email and inquiry automation: a reply within a minute, 24/7",
        description:
          "Email and inquiry automation: every email or web inquiry gets a reply with a price or a free slot within a minute. Inbox sorted, people only approve.",
        eyebrow: "AI automation · email and inquiries",
        h1Pre: "Email and inquiry automation:",
        h1Em: "a sorted inbox and drafted replies.",
        lead: "Email and inquiry automation sorts incoming mail by what is in it, drafts a reply and hands a person only what needs a decision. An inquiry gets an answer in minutes, not by the afternoon.",
        tldr: [
          { k: "For whom", v: "Companies where one mailbox collects inquiries, orders, complaints and questions all at once." },
          { k: "What goes in", v: "A shared mailbox or web form, your price list and the rules you reply by today." },
          { k: "What comes out", v: "Sorted mail with labels and drafted replies. A person sends." },
          { k: "How long", v: "Preview on your own data within a week, pilot live within 30 days." },
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
          "Connected to Microsoft 365 or Google Workspace and to your CRM or helpdesk if you use one.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["Mail is sorted by hand, every morning again.", "Inquiries wait until the afternoon.", "Nobody knows how many messages went unanswered."],
          after: ["Mail is sorted before eight, with labels and priority.", "A drafted reply waits for one click.", "The morning digest shows what arrived and what is still waiting."],
        },
        stepsTitle: "Three steps from preview to production",
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
            a: "Yes. It classifies the message and drafts the reply in the language it arrived in.",
          },
          { q: "How long does deployment take?", a: "A preview on your own data within a week, pilot live within 30 days of signing." },
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
          { k: "Za jak dlouho", v: "Ukázka na vašich datech do týdne, pilot v provozu do 30 dní." },
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
          "Napojení na ceník v ERP nebo tabulce a na CRM, pokud ho používáte.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Poptávka se přepisuje do kalkulace ručně.", "Nabídka odchází druhý den.", "Každý obchodník počítá slevy trochu jinak."],
          after: ["Položky a množství se vytáhnou z poptávky samy.", "Nabídka je připravená ke kontrole za minuty.", "Slevy a doprava podle jedněch pravidel."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
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
            a: "Ukázku na vašich datech máte do týdne, pilot je v ostrém provozu do 30 dní od podpisu.",
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
          { k: "How long", v: "Preview on your own data within a week, pilot live within 30 days." },
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
          "Connected to the price list in your ERP or spreadsheet and to your CRM if you use one.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["The inquiry is retyped into a calculation.", "The quote goes out the next day.", "Every salesperson calculates discounts slightly differently."],
          after: ["Items and quantities come out of the inquiry on their own.", "The quote is ready for review in minutes.", "Discounts and shipping follow one set of rules."],
        },
        stepsTitle: "Three steps from preview to production",
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
          { q: "How long does it take to deploy quote automation?", a: "A preview on your own data within a week, pilot live within 30 days of signing." },
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
          { k: "Za jak dlouho", v: "Ukázka na vašich datech do týdne, pilot v provozu do 30 dní." },
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
          "Čte dokumenty tam, kde jsou: SharePoint, Google Drive, síťový disk. Odpovídá v Teams, Slacku nebo v interním webu.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Odpověď zná jeden člověk a ten je na dovolené.", "Nový kolega hledá hodinu v pěti složkách.", "Nikdo neví, které dokumenty jsou aktuální."],
          after: ["Odpověď s odkazem na stranu do pár sekund.", "Stejná odpověď pro všechny, z jednoho zdroje.", "Seznam otázek, na které dokumenty neodpovídají."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
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
            a: "Ukázku máte do týdne, pilot na vybrané sadě dokumentů je v provozu do 30 dní od podpisu.",
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
          { k: "How long", v: "Preview on your own data within a week, pilot live within 30 days." },
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
          "Reads documents where they live: SharePoint, Google Drive, a network share. Answers in Teams, Slack or an internal site.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["One person knows the answer and they are on holiday.", "A new colleague searches five folders for an hour.", "Nobody knows which documents are current."],
          after: ["An answer with a page reference in seconds.", "The same answer for everyone, from one source.", "A list of questions the documents do not answer."],
        },
        stepsTitle: "Three steps from preview to production",
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
          { q: "How long does it take to deploy?", a: "A preview within a week, a pilot on a chosen set of documents live within 30 days of signing." },
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
        title: "AI pro hotely a penziony: dotazy hostů zodpovězené do minuty",
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
          { k: "Za jak dlouho", v: "Ukázka na vašich datech do týdne, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Vyzkoušet živou ukázku →",
        problemTitle: "Recepce má dvě ruce a šedesát e-mailů",
        problem: [
          "„Máte volno od pátku do neděle pro dva?“ „Kdy je check-in?“ „Dá se parkovat?“ Stejné otázky, různé jazyky, celý den. Mezitím zvoní telefon a před pultem stojí host. Dotaz, který čeká tři hodiny, je rezervace jinde.",
          "Stejně to funguje pro poptávky svateb, oslav a firemních akcí: termín, vhodný sál a pozvánka na prohlídku do minuty.",
          "Živou ukázku toho, jak to vypadá, si můžete vyzkoušet sami: napíšete jako host a sledujete, co systém udělá.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["E-maily a formuláře z webu a portálů", "Dostupnost a ceník z vašeho rezervačního systému", "Pravidla: check-in, storno, parkování, snídaně", "Zmeškané hovory na recepci"],
        outputsTitle: "Výstupy",
        outputs: ["Odpověď v jazyce hosta se třemi volnými termíny", "Potvrzení rezervace jedním kliknutím", "SMS s termínem do minuty po zmeškaném hovoru", "Předání recepci u všeho, co vyžaduje rozhodnutí"],
        integrations:
          "Napojení na rezervační systém (PMS), který už používáte, a na kanál, kterým hosté píší.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Dotaz čeká, až má recepce chvíli.", "Zmeškaný hovor je ztracená rezervace.", "Každý z recepce odpovídá trochu jinak."],
          after: ["Odpověď se třemi termíny do minuty, v jazyce hosta.", "Zmeškaný hovor dostane SMS s termínem.", "Recepce potvrzuje a řeší jen výjimky."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
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
            a: "V jazyce, kterým host píše.",
          },
          {
            q: "Napojíte se na náš rezervační systém?",
            a: "Ano, pokud má API nebo export dostupnosti.",
          },
          {
            q: "Jak dlouho trvá nasazení AI automatizace v hotelu?",
            a: "Ukázku na vašich datech máte do týdne, pilot je v ostrém provozu do 30 dní od podpisu. Ukázku si můžete vyzkoušet hned.",
          },
          {
            q: "Co se stane s daty hostů?",
            a: "Zůstávají ve vašem systému. Zpracování běží ve vaší infrastruktuře nebo v EU cloudu a nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Dotaz zodpovězený do minuty. Rezervace, která neuteče.",
        summary: "Vyzkoušejte živou ukázku, nebo si domluvte patnáct minut a projdeme, jak u vás dnes vypadá komunikace s hosty.",
        related: ["weddings", "demo", "email"],
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
          { k: "How long", v: "Preview on your own data within a week, pilot live within 30 days." },
        ],
        ctaSecondary: "Try the live demo →",
        problemTitle: "Reception has two hands and sixty emails",
        problem: [
          "“Do you have a room for two from Friday to Sunday?” “When is check-in?” “Is there parking?” The same questions, different languages, all day. Meanwhile the phone rings and a guest is standing at the desk. An inquiry that waits three hours is a booking somewhere else.",
          "It works the same way for wedding, celebration and corporate event inquiries: the date, a suitable room and a viewing invitation within a minute.",
          "You can try a live demo of what this looks like yourself: write as a guest and watch what the system does.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Emails and forms from your site and portals", "Availability and rates from your booking system", "Rules: check-in, cancellation, parking, breakfast", "Missed calls at reception"],
        outputsTitle: "Outputs",
        outputs: ["A reply in the guest's language with three free dates", "One-click booking confirmation", "An SMS with a date within a minute of a missed call", "Hand-off to reception for anything needing a decision"],
        integrations:
          "Connected to the property management system you already use and the channel guests write through.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["The inquiry waits until reception has a moment.", "A missed call is a lost booking.", "Everyone at reception answers slightly differently."],
          after: ["A reply with three dates within a minute, in the guest's language.", "A missed call gets an SMS with a date.", "Reception confirms and handles only the exceptions."],
        },
        stepsTitle: "Three steps from preview to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI for hotels FAQ",
        faqs: [
          {
            q: "Does it replace reception?",
            a: "No. It answers what repeats and offers dates. Anything that needs a decision or a human tone goes to reception with a summary. It does not answer the phone and sends nothing without your review unless you set it up that way.",
          },
          { q: "Which languages does it answer in?", a: "The language the guest writes in." },
          { q: "Will you connect to our booking system?", a: "Yes, if it has an API or an availability export." },
          { q: "How long does it take to deploy in a hotel?", a: "A preview on your own data within a week, pilot live within 30 days of signing. You can try the demo right now." },
          {
            q: "What happens to guest data?",
            a: "It stays in your system. Processing runs on your infrastructure or in an EU cloud and nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "Inquiries answered within a minute. Bookings that don't slip away.",
        summary: "Try the live demo, or book fifteen minutes and we walk through how guest communication works for you today.",
        related: ["weddings", "demo", "email"],
      },
    },
  },

  /* ------------------------------------------------------------ weddings */
  {
    key: "weddings",
    serviceType: "AI automation for wedding and event venues",
    copy: {
      cs: {
        nav: "AI pro svatební místa a zámky",
        title: "AI pro svatební místa a zámky: poptávka svatby zodpovězená do minuty",
        description:
          "AI pro svatební místa, zámky a resorty: poptávky svateb a firemních akcí zodpovězené do minuty, s volným termínem a pozvánkou na prohlídku.",
        eyebrow: "AI automatizace · svatby a akce",
        h1Pre: "AI pro svatební místa a zámky:",
        h1Em: "poptávka svatby zodpovězená do minuty.",
        lead: "AI pro svatební místa a zámky odpoví na poptávku svatby nebo firemní akce do minuty: řekne, jestli je termín volný, který prostor se hodí, a nabídne čas prohlídky s vaší koordinátorkou. Koordinátorka každou odpověď schvaluje a rozhodnutí zůstávají na ní.",
        tldr: [
          { k: "Pro koho", v: "Zámky, resorty, hotely a svatební místa, kam chodí poptávky na svatby, oslavy a firemní akce." },
          { k: "Co vstupuje", v: "Poptávky z e-mailu a webového formuláře, kalendář termínů a sálů, balíčky a vaše pravidla." },
          { k: "Co vychází", v: "Odpověď s dostupností, vhodným prostorem a termínem prohlídky. Připomenutí páru, který se odmlčel." },
          { k: "Za jak dlouho", v: "Ukázka na vašich poptávkách do týdne, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Vyzkoušet živou ukázku →",
        problemTitle: "Pár napíše v neděli večer a čeká",
        problem: [
          "Snoubenci si vyberou pár míst a napíšou všem najednou. Kdo jim první odpoví, jestli je termín volný, a pozve je na prohlídku, ten má velkou šanci svatbu dostat. Koordinátorka ale v neděli nepracuje a v pondělí řeší akci, která právě běží.",
          "Každé místo má navíc svá pravidla: který sál pro kolik hostů, co jde zkombinovat, kdy je termín jen předběžně blokovaný. Ta pravidla zná koordinátorka a systém se je naučí od ní.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["Poptávky svateb, oslav a firemních akcí z e-mailu a webu", "Kalendář termínů, sálů a prostorů", "Balíčky, ceník a co v první odpovědi nikdy nechybí", "Pravidla koordinátorky: kapacity, kombinace prostor, předběžné rezervace"],
        outputsTitle: "Výstupy",
        outputs: ["Odpověď do minuty: volný termín, vhodný prostor, balíček", "Návrh termínu prohlídky z kalendáře koordinátorky", "Jemné připomenutí páru, který se po první odpovědi neozval", "Přehled poptávek a předání koordinátorce u všeho, co vyžaduje rozhodnutí"],
        integrations:
          "Napojení na e-mail a kalendář, které už používáte, a na webový formulář. Hotelový nebo rezervační systém doplníme, pokud to umožňuje.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Poptávka čeká, až má koordinátorka chvíli.", "Termín se ověřuje ručně v kalendáři.", "Pár, který se odmlčí, už se nikdo nepřipomene."],
          after: ["Odpověď s dostupností a prohlídkou do minuty.", "Koordinátorka jen schválí nebo upraví návrh.", "Systém se páru sám připomene a koordinátorce řekne, kdo čeká."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k AI pro svatební místa",
        faqs: [
          {
            q: "Nepřijdeme o osobní přístup?",
            a: "Ne. Systém zrychlí první odpověď a připraví podklady. Prohlídku, rozhovor s párem a všechna rozhodnutí dělá dál koordinátorka. Na začátku každou odpověď schvaluje ona.",
          },
          {
            q: "Co když je termín obsazený?",
            a: "Systém nabídne nejbližší volné termíny nebo jiný vhodný prostor podle vašich pravidel. Pokud vedete čekací listinu, zapíše pár na ni.",
          },
          {
            q: "Můžu si pravidla měnit sama?",
            a: "Ano. Kapacity, balíčky, texty a pravidla pro jednotlivé sály upravíte sami a změna platí hned. Při nasazení je s vámi projdeme na jedné až třech schůzkách.",
          },
          {
            q: "Zvládne to i firemní akce a konference?",
            a: "Ano. Na firemní poptávku odpoví s kapacitou sálu a doptá se na chybějící údaje, obchodní oddělení pak jen dokončí nabídku.",
          },
          {
            q: "Co se stane s daty klientů?",
            a: "Zůstávají u vás. Řešení běží na účtech, které vlastníte, v EU cloudu, a nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Poptávka svatby zodpovězená do minuty. Prohlídka domluvená dřív než u konkurence.",
        summary: "Pošlete nám pár starších poptávek a do týdne uvidíte, jak by na ně systém odpověděl. Nebo si domluvte patnáct minut.",
        related: ["hotels", "email", "demo"],
      },
      en: {
        nav: "AI for wedding venues",
        title: "AI for wedding and event venues: inquiries answered within a minute",
        description:
          "AI for wedding venues, châteaux and resorts: wedding and event inquiries answered within a minute, with availability and a viewing slot.",
        eyebrow: "AI automation · weddings and events",
        h1Pre: "AI for wedding and event venues:",
        h1Em: "a wedding inquiry answered within a minute.",
        lead: "AI for wedding and event venues answers a wedding or corporate event inquiry within a minute: whether the date is free, which space fits, and a time to view it with your coordinator. The coordinator approves every reply and keeps every decision.",
        tldr: [
          { k: "For whom", v: "Châteaux, resorts, hotels and wedding venues that get inquiries for weddings, celebrations and corporate events." },
          { k: "What goes in", v: "Inquiries from email and the web form, the calendar of dates and rooms, packages and your rules." },
          { k: "What comes out", v: "A reply with availability, a suitable space and a viewing slot. A nudge to couples who went quiet." },
          { k: "How long", v: "Preview on your own inquiries within a week, pilot live within 30 days." },
        ],
        ctaSecondary: "Try the live demo →",
        problemTitle: "A couple writes on Sunday evening and waits",
        problem: [
          "Couples shortlist a few venues and write to all of them at once. Whoever first tells them the date is free and invites them to a viewing has a good chance of getting the wedding. But the coordinator doesn't work on Sundays and on Monday she is running the event that's on.",
          "Every venue also has its own rules: which room for how many guests, what can be combined, when a date is only provisionally held. The coordinator knows those rules, and the system learns them from her.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Wedding, celebration and corporate event inquiries from email and the web", "The calendar of dates, rooms and spaces", "Packages, prices and what the first reply must always include", "The coordinator's rules: capacities, room combinations, provisional holds"],
        outputsTitle: "Outputs",
        outputs: ["A reply within a minute: free date, suitable space, package", "A proposed viewing slot from the coordinator's calendar", "A gentle reminder to couples who went quiet after the first reply", "An overview of inquiries and hand-off to the coordinator for anything needing a decision"],
        integrations:
          "Connected to the email and calendar you already use and to your web form. Your hotel or booking system is added where it allows it.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["The inquiry waits until the coordinator has a moment.", "The date is checked by hand in the calendar.", "Nobody follows up with a couple who goes quiet."],
          after: ["A reply with availability and a viewing slot within a minute.", "The coordinator just approves or edits the draft.", "The system follows up and tells the coordinator who is waiting."],
        },
        stepsTitle: "Three steps from preview to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI for wedding venues FAQ",
        faqs: [
          {
            q: "Won't we lose the personal touch?",
            a: "No. The system speeds up the first reply and prepares the details. The viewing, the conversation with the couple and every decision stay with the coordinator, who approves every reply at the start.",
          },
          {
            q: "What if the date is taken?",
            a: "The system offers the nearest free dates or another suitable space according to your rules. If you keep a waiting list, it adds the couple to it.",
          },
          {
            q: "Can I change the rules myself?",
            a: "Yes. Capacities, packages, texts and per-room rules are yours to edit and take effect immediately. We go through them with you in one to three sessions during setup.",
          },
          {
            q: "Does it handle corporate events and conferences too?",
            a: "Yes. It answers a corporate inquiry with room capacity and asks for missing details; sales just finish the offer.",
          },
          {
            q: "What happens to client data?",
            a: "It stays with you. It runs on accounts you own in an EU cloud, and nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "A wedding inquiry answered within a minute. A viewing booked before the competition replies.",
        summary: "Send us a few past inquiries and within a week you'll see how the system would have answered them. Or book fifteen minutes.",
        related: ["hotels", "email", "demo"],
      },
    },
  },

  /* ------------------------------------------------------------- clinics */
  {
    key: "clinics",
    serviceType: "AI reception for private and dental clinics",
    copy: {
      cs: {
        nav: "AI recepce pro kliniky",
        title: "AI recepce pro kliniky a zubní ordinace: objednávky bez čekání",
        description:
          "AI recepce pro soukromé kliniky a zubní ordinace: zprávy pacientů roztříděné podle naléhavosti a návrh termínu podle vašich pravidel. Recepce jen schvaluje.",
        eyebrow: "AI automatizace · kliniky a ordinace",
        h1Pre: "AI recepce pro kliniky:",
        h1Em: "každá zpráva pacienta vyřízená podle vašich pravidel.",
        lead: "AI recepce pro kliniky a zubní ordinace přečte e-mail, SMS nebo formulář pacienta, pozná, co potřebuje a jak je to naléhavé, a navrhne termín u správného lékaře podle pravidel ordinace. Recepce návrh jedním kliknutím schválí nebo upraví.",
        tldr: [
          { k: "Pro koho", v: "Soukromé kliniky, zubní a estetické ordinace, kde recepce mezi telefony nestíhá psané zprávy." },
          { k: "Co vstupuje", v: "Zprávy pacientů, rozvrh lékařů a hygienistek, čekací listiny a váš manuál recepce." },
          { k: "Co vychází", v: "Roztříděné zprávy, návrh odpovědi a termínu, uvolněné termíny nabídnuté z čekačky." },
          { k: "Za jak dlouho", v: "Ukázka na vašich zprávách do týdne, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Vyzkoušet živou ukázku →",
        problemTitle: "Telefon zvoní, pacient stojí u pultu a v e-mailu čeká dvacet zpráv",
        problem: [
          "Objednání, přeobjednání, zrušení, dotaz na cenu, bolest zubu. Recepce to všechno třídí ručně a mezitím zvedá telefon. Když pacient den předem zruší, termín často zůstane prázdný, protože nikdo nestihne obvolat čekačku.",
          "U nové recepční to platí dvojnásob: pravidla ordinace zná jen ten, kdo tam je roky. Systém je má po ruce od prvního dne, přímo z vašeho manuálu.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["E-maily, SMS a formuláře pacientů", "Rozvrh lékařů a hygienistek, délky výkonů", "Čekací listiny pro jednotlivé lékaře", "Manuál recepce: naléhavost, šablony odpovědí, co se nikdy neřeší písemně"],
        outputsTitle: "Výstupy",
        outputs: ["Zprávy seřazené podle naléhavosti, akutní případy označené k okamžitému zavolání", "Návrh odpovědi a termínu ke schválení", "Uvolněný termín nabídnutý dalšímu z čekačky", "Pevné pokyny po zákroku schválené lékařem"],
        integrations:
          "Napojení na e-mail, formulář a čekací listiny. Na ordinační software se napojíme jen oficiální cestou se souhlasem jeho výrobce; jinak termín do odpovědi doplní recepce jedním kliknutím.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Zprávy se třídí ručně mezi telefony.", "Zrušený termín zůstane prázdný.", "Nová recepční se pravidla učí měsíce."],
          after: ["Zprávy seřazené podle naléhavosti s hotovým návrhem.", "Uvolněný termín jde hned dalšímu z čekačky.", "Pravidla z manuálu má systém od prvního dne."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k AI recepci pro kliniky",
        faqs: [
          {
            q: "Odpovídá systém na zdravotní otázky?",
            a: "Ne. Na zdravotní dotazy nikdy neodpovídá a nic nediagnostikuje. Pokyny po zákrocích posílá jen jako pevné texty schválené lékařem. Varovné příznaky označí recepci, aby pacientovi hned zavolala.",
          },
          {
            q: "Odejde pacientovi něco bez kontroly?",
            a: "Na začátku ne. Recepce schvaluje každou odpověď. Co se později může posílat automaticky, rozhodujete vy.",
          },
          {
            q: "Napojíte se na náš ordinační software?",
            a: "Jen oficiální cestou se souhlasem výrobce. Pokud napojení není možné, systém dál třídí zprávy a připravuje odpovědi a recepce doplní termín z kalendáře.",
          },
          {
            q: "Jak je to s ochranou zdravotních údajů?",
            a: "Řešení běží v EU na účtu, který patří vaší ordinaci. Podepisujeme smlouvu o zpracování osobních údajů, zprávy držíme jen po dobu nutnou ke kontrole a nic se nepoužívá k trénování modelů.",
          },
          {
            q: "Zvládne to i druhou pobočku?",
            a: "Ano. Pravidla, rozvrhy a čekačky se nastaví pro každou pobočku zvlášť.",
          },
        ],
        summaryTitle: "Žádná zpráva pacienta bez odpovědi. Žádný zrušený termín prázdný.",
        summary: "Pošlete nám pár anonymizovaných zpráv pacientů a do týdne uvidíte, co by s nimi systém udělal podle vašich pravidel.",
        related: ["demo", "email", "knowledge"],
      },
      en: {
        nav: "AI reception for clinics",
        title: "AI reception for clinics and dental practices: bookings without waiting",
        description:
          "AI reception for private clinics and dental practices: patient messages sorted by urgency and a proposed slot according to your rules. Reception only approves.",
        eyebrow: "AI automation · clinics and practices",
        h1Pre: "AI reception for clinics:",
        h1Em: "every patient message handled by your rules.",
        lead: "AI reception for clinics and dental practices reads a patient's email, SMS or form, works out what they need and how urgent it is, and proposes a slot with the right doctor according to the practice's rules. Reception approves or edits the proposal in one click.",
        tldr: [
          { k: "For whom", v: "Private clinics, dental and aesthetic practices where reception can't keep up with written messages between calls." },
          { k: "What goes in", v: "Patient messages, the doctors' and hygienists' schedule, waiting lists and your reception manual." },
          { k: "What comes out", v: "Sorted messages, a draft reply and slot, freed slots offered from the waiting list." },
          { k: "How long", v: "Preview on your own messages within a week, pilot live within 30 days." },
        ],
        ctaSecondary: "Try the live demo →",
        problemTitle: "The phone rings, a patient is at the desk and twenty messages wait",
        problem: [
          "Booking, rebooking, cancelling, price questions, toothache. Reception sorts it all by hand while answering the phone. When a patient cancels the day before, the slot often stays empty because nobody has time to call the waiting list.",
          "With a new receptionist it's doubly true: the practice's rules are known only to whoever has been there for years. The system has them from day one, straight from your manual.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Patient emails, SMS and forms", "Doctors' and hygienists' schedules, procedure lengths", "Waiting lists per doctor", "Your reception manual: urgency, reply templates, what is never handled in writing"],
        outputsTitle: "Outputs",
        outputs: ["Messages ordered by urgency, acute cases flagged for an immediate call", "A draft reply and slot for approval", "A freed slot offered to the next patient on the waiting list", "Fixed post-procedure instructions approved by a doctor"],
        integrations:
          "Connected to email, forms and waiting lists. We connect to practice software only through an official route with the vendor's consent; otherwise reception adds the slot to the reply in one click.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["Messages are sorted by hand between calls.", "A cancelled slot stays empty.", "A new receptionist takes months to learn the rules."],
          after: ["Messages ordered by urgency with a ready draft.", "A freed slot goes straight to the waiting list.", "The system has the manual's rules from day one."],
        },
        stepsTitle: "Three steps from preview to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI reception for clinics FAQ",
        faqs: [
          {
            q: "Does the system answer medical questions?",
            a: "No. It never answers medical questions and diagnoses nothing. Post-procedure instructions are sent only as fixed texts approved by a doctor. Warning signs are flagged so reception calls the patient right away.",
          },
          {
            q: "Does anything reach a patient unchecked?",
            a: "Not at the start. Reception approves every reply. What may later go out automatically is your decision.",
          },
          {
            q: "Will you connect to our practice software?",
            a: "Only through an official route with the vendor's consent. If that isn't possible, the system still sorts messages and drafts replies and reception adds the slot from the calendar.",
          },
          {
            q: "What about health data protection?",
            a: "It runs in the EU on an account owned by your practice. We sign a data processing agreement, keep messages only as long as needed for review, and nothing is used to train models.",
          },
          { q: "Does it work for a second branch?", a: "Yes. Rules, schedules and waiting lists are set up per branch." },
        ],
        summaryTitle: "No patient message without a reply. No cancelled slot left empty.",
        summary: "Send us a few anonymised patient messages and within a week you'll see what the system would do with them under your rules.",
        related: ["demo", "email", "knowledge"],
      },
    },
  },

  /* ----------------------------------------------------------------- car */
  {
    key: "car",
    serviceType: "AI automation for car dealers and car services",
    copy: {
      cs: {
        nav: "AI pro autosalony a autoservisy",
        title: "AI pro autoservisy a autosalony: termín servisu do minuty",
        description:
          "AI pro autoservisy a autosalony: poptávka servisu nebo zkušební jízdy zodpovězená do minuty, s volným termínem z kalendáře a všemi údaji o voze. I pro více poboček.",
        eyebrow: "AI automatizace · autosalony a servisy",
        h1Pre: "AI pro autoservisy a autosalony:",
        h1Em: "termín servisu nebo jízdy nabídnutý do minuty.",
        lead: "AI pro autoservisy a autosalony odpoví na poptávku servisu nebo zkušební jízdy do minuty, nabídne volný termín ze servisního kalendáře správné pobočky a rovnou se doptá na VIN, SPZ nebo stav kilometrů. Přijímací technik jen potvrdí.",
        tldr: [
          { k: "Pro koho", v: "Autosalony a autoservisy, kam chodí poptávky do více schránek a pro více poboček." },
          { k: "Co vstupuje", v: "E-maily a formuláře zákazníků, servisní kalendář, ceník běžných úkonů a vaše pravidla." },
          { k: "Co vychází", v: "Odpověď s volným termínem, doplněné údaje o voze, zpráva zákazníkovi o průběhu opravy." },
          { k: "Za jak dlouho", v: "Ukázka na vašich poptávkách do týdne, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Vyzkoušet živou ukázku →",
        problemTitle: "Poptávky ve čtyřech schránkách, technik u auta",
        problem: [
          "Zákazník napíše večer, že chce přezout nebo udělat servis. Ráno ho někdo musí najít v jedné ze schránek, zjistit, která pobočka, dohledat volný termín a doptat se na údaje o voze. Kdo chce zkušební jízdu ještě dnes, mezitím zavolá do jiného salonu.",
          "Když chybí VIN nebo údaje o voze, termín se posouvá a technik je shání po telefonu. Systém se na ně zeptá hned v první odpovědi.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["Poptávky servisu, pneuservisu a zkušebních jízd z e-mailu a webu", "Servisní kalendář jednotlivých poboček", "Ceník běžných úkonů a pravidla příjmu vozu", "Stav zakázky v dílně"],
        outputsTitle: "Výstupy",
        outputs: ["Odpověď do minuty s volným termínem na správné pobočce", "Doptání na VIN, SPZ, kilometry a popis závady", "Termín zkušební jízdy z kalendáře prodejce", "Zpráva zákazníkovi o průběhu a dokončení opravy"],
        integrations:
          "Napojení na e-maily, webové formuláře a servisní nebo rezervační kalendář, který používáte, pokud to jeho výrobce umožňuje.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Poptávky se hledají v několika schránkách.", "Chybějící VIN posouvá termíny.", "Zákazník volá, jestli je auto hotové."],
          after: ["Všechny poptávky na jednom místě, s návrhem termínu.", "Údaje o voze jsou vyžádané hned v první odpovědi.", "Zákazník dostane zprávu o průběhu sám."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k AI pro autoservisy",
        faqs: [
          {
            q: "Nahradí to přijímacího technika?",
            a: "Ne. Vezme mu opakovanou práci: třídění poptávek, hledání termínu, doptávání na údaje. Příjem vozu, diagnostika a domluva se zákazníkem zůstávají na něm.",
          },
          {
            q: "Zvládne to více poboček?",
            a: "Ano. Poptávku přiřadí správné pobočce podle místa nebo značky a nabídne termín z jejího kalendáře.",
          },
          {
            q: "Napojíte se na náš servisní systém?",
            a: "Pokud má výrobce API nebo export kalendáře, ano. Pokud ne, systém připraví odpověď a technik doplní termín jedním kliknutím.",
          },
          {
            q: "Co zkušební jízdy?",
            a: "Zájemce dostane do minuty nabídku termínu z kalendáře prodejce a prodejce ráno najde hotovou rezervaci, ne vzkaz k vyřízení.",
          },
          {
            q: "Co se stane s daty zákazníků?",
            a: "Zůstávají u vás. Řešení běží na účtech, které vlastníte, v EU cloudu, a nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Poptávka servisu zodpovězená do minuty. Termín, který neuteče jinam.",
        summary: "Pošlete nám pár starších poptávek a do týdne uvidíte, jak by na ně systém odpověděl. Nebo si domluvte patnáct minut.",
        related: ["email", "demo", "quotes"],
      },
      en: {
        nav: "AI for car dealers and services",
        title: "AI for car services and dealerships: a service slot within a minute",
        description:
          "AI for car services and dealerships: service and test-drive inquiries answered within a minute, with a free slot and all vehicle details.",
        eyebrow: "AI automation · car dealers and services",
        h1Pre: "AI for car services and dealerships:",
        h1Em: "a service or test-drive slot offered within a minute.",
        lead: "AI for car services and dealerships answers a service or test-drive inquiry within a minute, offers a free slot from the right branch's service calendar and asks straight away for the VIN, plate or mileage. The service advisor just confirms.",
        tldr: [
          { k: "For whom", v: "Dealerships and car services that get inquiries in several inboxes and for several branches." },
          { k: "What goes in", v: "Customer emails and forms, the service calendar, prices of common jobs and your rules." },
          { k: "What comes out", v: "A reply with a free slot, completed vehicle details, repair status updates to the customer." },
          { k: "How long", v: "Preview on your own inquiries within a week, pilot live within 30 days." },
        ],
        ctaSecondary: "Try the live demo →",
        problemTitle: "Inquiries in four inboxes, the advisor under a car",
        problem: [
          "A customer writes in the evening asking for a tyre change or a service. In the morning someone has to find it in one of the inboxes, work out which branch, look up a free slot and chase the vehicle details. Anyone who wants a test drive today meanwhile calls another showroom.",
          "When the VIN or vehicle details are missing, appointments shift and the advisor chases them by phone. The system asks for them in the very first reply.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Service, tyre and test-drive inquiries from email and the web", "Each branch's service calendar", "Prices of common jobs and vehicle intake rules", "Job status in the workshop"],
        outputsTitle: "Outputs",
        outputs: ["A reply within a minute with a free slot at the right branch", "A request for VIN, plate, mileage and a fault description", "A test-drive slot from the salesperson's calendar", "Updates to the customer on the repair's progress and completion"],
        integrations:
          "Connected to your inboxes, web forms and the service or booking calendar you use, where its vendor allows it.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["Inquiries are hunted down in several inboxes.", "A missing VIN shifts appointments.", "Customers call to ask if the car is ready."],
          after: ["Every inquiry in one place, with a proposed slot.", "Vehicle details are requested in the first reply.", "The customer gets progress updates on their own."],
        },
        stepsTitle: "Three steps from preview to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI for car services FAQ",
        faqs: [
          {
            q: "Does it replace the service advisor?",
            a: "No. It takes the repetitive work: sorting inquiries, finding a slot, chasing details. Vehicle intake, diagnosis and talking to the customer stay with the advisor.",
          },
          { q: "Does it handle several branches?", a: "Yes. It assigns each inquiry to the right branch by location or brand and offers a slot from that branch's calendar." },
          {
            q: "Will you connect to our service system?",
            a: "If the vendor offers an API or a calendar export, yes. If not, the system drafts the reply and the advisor adds the slot in one click.",
          },
          {
            q: "What about test drives?",
            a: "The prospect gets a slot from the salesperson's calendar within a minute, and in the morning the salesperson finds a ready booking, not a message to handle.",
          },
          {
            q: "What happens to customer data?",
            a: "It stays with you. It runs on accounts you own in an EU cloud, and nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "A service inquiry answered within a minute. A booking that doesn't go elsewhere.",
        summary: "Send us a few past inquiries and within a week you'll see how the system would have answered them. Or book fifteen minutes.",
        related: ["email", "demo", "quotes"],
      },
    },
  },

  /* ---------------------------------------------------------- realestate */
  {
    key: "realestate",
    serviceType: "AI automation for real estate agencies",
    copy: {
      cs: {
        nav: "AI pro realitní kanceláře",
        title: "AI pro realitní kanceláře: odpověď na ocenění i zájemce do minut",
        description:
          "AI pro realitní kanceláře: žádost o ocenění nebo dotaz na nemovitost zodpovězený do pár minut, prohlídka v kalendáři makléře a méně rutiny kolem inzerce.",
        eyebrow: "AI automatizace · reality",
        h1Pre: "AI pro realitní kanceláře:",
        h1Em: "každý zájemce odpověď do pár minut.",
        lead: "AI pro realitní kanceláře odpoví na žádost o ocenění nebo dotaz na nemovitost do pár minut, i v neděli večer, doptá se na to podstatné a nabídne termín schůzky nebo prohlídky z kalendáře makléře. Makléř ráno najde hotovou schůzku.",
        tldr: [
          { k: "Pro koho", v: "Realitní kanceláře, kam chodí žádosti o ocenění a dotazy zájemců z webu i portálů." },
          { k: "Co vstupuje", v: "Poptávky z webu a portálů, kalendáře makléřů, informace o nabídkách a vaše pravidla." },
          { k: "Co vychází", v: "Odpověď do pár minut, termín schůzky nebo prohlídky, koncepty inzerátů a reportů pro prodávající." },
          { k: "Za jak dlouho", v: "Ukázka na vašich poptávkách do týdne, pilot v provozu do 30 dní." },
        ],
        ctaSecondary: "Vyzkoušet živou ukázku →",
        problemTitle: "Kdo vyplní ocenění v neděli večer, v pondělí už jedná s jiným",
        problem: [
          "Prodávající často osloví víc kanceláří najednou a podepíše s tou, která se ozve první a působí nejprofesionálněji. Makléř je ale na prohlídkách a odpovídá večer, pokud vůbec.",
          "K tomu rutina: popisy inzerátů, reporty pro prodávající, odpovědi na stejné otázky zájemců. To všechno systém připraví a makléř jen zkontroluje.",
        ],
        automateTitle: "Co do toho vstupuje a co z toho vychází",
        inputsTitle: "Vstupy",
        inputs: ["Žádosti o ocenění a dotazy zájemců z webu a realitních portálů", "Kalendáře makléřů a rozdělení podle lokality", "Informace o nabídkách a časté otázky", "Kontakty bývalých klientů"],
        outputsTitle: "Výstupy",
        outputs: ["Odpověď do pár minut a termín schůzky nebo prohlídky", "Doptání na financování, časový rámec a parametry nemovitosti", "Koncepty popisů inzerátů a reportů pro prodávající", "Pravidelný kontakt s bývalými klienty, aby si na vás vzpomněli"],
        integrations:
          "Napojení na web, e-mail, kalendáře makléřů a realitní software, který používáte, pokud má API nebo export.",
        beforeAfter: {
          beforeTitle: "Ručně dnes",
          afterTitle: "S Full Canvas",
          before: ["Poptávka čeká, až se makléř vrátí z prohlídky.", "Inzeráty a reporty se píšou ručně.", "Bývalí klienti o vás roky neslyší."],
          after: ["Odpověď a termín schůzky do pár minut.", "Makléř jen kontroluje připravené texty.", "Bývalí klienti dostávají pravidelnou aktualizaci."],
        },
        stepsTitle: "Tři kroky od ukázky k provozu",
        steps: STEPS_CS,
        priceTitle: "Cena a termín",
        priceLines: PRICE_CS,
        faqTitle: "Časté otázky k AI pro reality",
        faqs: [
          {
            q: "Nahradí to makléře?",
            a: "Ne. Zrychlí první kontakt a vezme rutinu. Schůzky, prohlídky, vyjednávání a vztah s klientem zůstávají makléři.",
          },
          {
            q: "Jak se poptávka dostane ke správnému makléři?",
            a: "Podle vašich pravidel: lokalita, typ nemovitosti nebo kdo nabídku vede. Termín se nabídne z jeho kalendáře.",
          },
          {
            q: "Funguje to s dotazy z realitních portálů?",
            a: "Ano, pokud vám chodí e-mailem nebo přes export. Odpověď pak jde stejnou cestou jako dnes.",
          },
          {
            q: "Napíše to inzeráty samo?",
            a: "Připraví koncept z údajů o nemovitosti ve vašem stylu. Makléř ho zkontroluje a upraví, nic se nezveřejní samo.",
          },
          {
            q: "Co se stane s daty klientů?",
            a: "Zůstávají u vás. Řešení běží na účtech, které vlastníte, v EU cloudu, a nic se nepoužívá k trénování cizích modelů.",
          },
        ],
        summaryTitle: "Ocenění zodpovězené do pár minut. Zakázka, která neodejde ke konkurenci.",
        summary: "Pošlete nám pár starších poptávek a do týdne uvidíte, jak by na ně systém odpověděl. Nebo si domluvte patnáct minut.",
        related: ["email", "quotes", "demo"],
      },
      en: {
        nav: "AI for real estate agencies",
        title: "AI for real estate agencies: valuations and buyers answered in minutes",
        description:
          "AI for real estate agencies: a valuation request or property inquiry answered within minutes, a viewing in the agent's calendar and less routine around listings.",
        eyebrow: "AI automation · real estate",
        h1Pre: "AI for real estate agencies:",
        h1Em: "every lead answered within minutes.",
        lead: "AI for real estate agencies answers a valuation request or property inquiry within minutes, even on Sunday evening, asks what matters and offers a meeting or viewing slot from the agent's calendar. The agent finds a booked meeting in the morning.",
        tldr: [
          { k: "For whom", v: "Real estate agencies that get valuation requests and buyer inquiries from their site and property portals." },
          { k: "What goes in", v: "Inquiries from the web and portals, agents' calendars, listing details and your rules." },
          { k: "What comes out", v: "A reply within minutes, a meeting or viewing slot, draft listings and seller reports." },
          { k: "How long", v: "Preview on your own inquiries within a week, pilot live within 30 days." },
        ],
        ctaSecondary: "Try the live demo →",
        problemTitle: "Whoever fills in a valuation on Sunday is talking to someone else by Monday",
        problem: [
          "Sellers often contact several agencies at once and sign with the one that replies first and looks most professional. But the agent is out at viewings and replies in the evening, if at all.",
          "Then there's the routine: listing descriptions, seller reports, answers to the same buyer questions. The system drafts all of it and the agent just reviews.",
        ],
        automateTitle: "What goes in and what comes out",
        inputsTitle: "Inputs",
        inputs: ["Valuation requests and buyer inquiries from the web and property portals", "Agents' calendars and territory split", "Listing details and frequent questions", "Past clients' contacts"],
        outputsTitle: "Outputs",
        outputs: ["A reply within minutes and a meeting or viewing slot", "Questions about financing, timeframe and property details", "Draft listing descriptions and seller reports", "Regular contact with past clients so they remember you"],
        integrations:
          "Connected to your site, email, agents' calendars and the real estate software you use, if it has an API or export.",
        beforeAfter: {
          beforeTitle: "By hand today",
          afterTitle: "With Full Canvas",
          before: ["The inquiry waits until the agent is back from a viewing.", "Listings and reports are written by hand.", "Past clients don't hear from you for years."],
          after: ["A reply and a meeting slot within minutes.", "The agent just reviews prepared texts.", "Past clients get a regular update."],
        },
        stepsTitle: "Three steps from preview to production",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        faqTitle: "AI for real estate FAQ",
        faqs: [
          {
            q: "Does it replace agents?",
            a: "No. It speeds up first contact and takes the routine. Meetings, viewings, negotiation and the client relationship stay with the agent.",
          },
          {
            q: "How does an inquiry reach the right agent?",
            a: "By your rules: location, property type or who runs the listing. The slot is offered from that agent's calendar.",
          },
          {
            q: "Does it work with inquiries from property portals?",
            a: "Yes, if they reach you by email or export. The reply then goes back the same way as today.",
          },
          {
            q: "Will it write listings on its own?",
            a: "It drafts them from the property details in your style. The agent reviews and edits; nothing is published on its own.",
          },
          {
            q: "What happens to client data?",
            a: "It stays with you. It runs on accounts you own in an EU cloud, and nothing is used to train third-party models.",
          },
        ],
        summaryTitle: "A valuation answered within minutes. A mandate that doesn't go to a competitor.",
        summary: "Send us a few past inquiries and within a week you'll see how the system would have answered them. Or book fifteen minutes.",
        related: ["email", "quotes", "demo"],
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
          "My dáváme smysl uprostřed: jeden konkrétní proces, který má běžet do 30 dní, s pevnou cenou předem, bez interního IT a s tím, že ho po nasazení dál udržujeme.",
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
              cells: ["Ukázka zdarma, pilot za pevnou cenu", "Odhad, často hodinová sazba", "Licence za uživatele měsíčně", "Mzdy, bez stropu"],
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
            a: "Na jeden konkrétní proces obvykle ano, protože rozsah je malý a cena je pevná předem. Na velký, roky trvající projekt může být studio s desítkami lidí vhodnější a v součtu i levnější.",
          },
          {
            q: "Proč nekoupit rovnou hotový software?",
            a: "Pokud váš proces je běžný a nástroj ho umí, kupte ho. Hotový software přestává dávat smysl, když musíte svůj proces ohýbat podle něj, nebo když potřebujete napojení, které nemá.",
          },
          {
            q: "Co když chceme mít systém ve svých rukou?",
            a: "Pilot i provoz stavíme tak, aby šel předat. Kód a data jsou vaše.",
          },
          {
            q: "Jak poznáme, že se nám to zaplatí?",
            a: "Ukázka na vašich datech ukáže výsledek dřív, než se cokoli staví, a spočítáme, kolik vás proces stojí dnes. Když se to nezaplatí, řekneme to a pilot neprodáváme.",
          },
        ],
        summaryTitle: "Jeden proces, 30 dní, pevná cena předem. Nebo vám řekneme, ať jdete jinam.",
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
          "We make sense in the middle: one specific process that has to run within 30 days, with a fixed price up front, no in-house IT, and us maintaining it after launch.",
        stepsTitle: "What the path to production looks like with us",
        steps: STEPS_EN,
        priceTitle: "Price and timeline",
        priceLines: PRICE_EN,
        comparison: {
          columns: ["", "AI agency (Full Canvas)", "Large development studio", "Off-the-shelf software (SaaS)", "In-house team"],
          highlight: 1,
          rows: [
            { label: "Price up front", cells: ["Free preview, fixed-price pilot", "An estimate, often hourly", "Per-user licence per month", "Salaries, no ceiling"] },
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
            a: "For one specific process, usually yes, because the scope is small and the price is fixed up front. For a large project running for years, a studio with dozens of people may be the better and, in total, cheaper fit.",
          },
          {
            q: "Why not just buy off-the-shelf software?",
            a: "If your process is standard and a tool does it, buy it. Off-the-shelf stops making sense when you have to bend your process to it, or when you need an integration it does not have.",
          },
          {
            q: "What if we want to own the system?",
            a: "The pilot and operation are built so they can be handed over. The code and data are yours.",
          },
          {
            q: "How do we know it will pay off?",
            a: "A preview on your own data shows the result before anything is built, and we work out what the process costs you today. If it won't pay off, we say so and don't sell you a pilot.",
          },
        ],
        summaryTitle: "One process, 30 days, a fixed price up front. Or we tell you to go elsewhere.",
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
