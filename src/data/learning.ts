import { generatedLessons } from './generatedLearning'

export type TopicId =
  | 'ai'
  | 'wellbeing'
  | 'money'
  | 'strategy'
  | 'leadership'
  | 'communication'
  | 'learning'
  | 'productivity'
  | 'digital-safety'
  | 'critical-thinking'
  | 'writing'
  | 'creativity'
  | 'health'
  | 'relationships'
  | 'science'
  | 'sustainability'
  | 'media'
  | 'projects'
  | 'career'
  | 'data'

export interface Topic {
  id: TopicId
  label: string
  shortLabel: string
  description: string
  icon: string
  notice?: string
  resources: { label: string; url: string }[]
}

export const topics: Topic[] = [
  {
    id: 'ai',
    label: 'AI & teknik',
    shortLabel: 'AI',
    description: 'Förstå AI och använd den klokt.',
    icon: 'sparkles',
    resources: [
      { label: 'OpenAI – Prompt engineering', url: 'https://developers.openai.com/api/docs/guides/prompt-engineering' },
      { label: 'IMY – Integritet och dataskydd', url: 'https://www.imy.se/' },
    ],
  },
  {
    id: 'wellbeing',
    label: 'Mental hälsa',
    shortLabel: 'Mående',
    description: 'Små verktyg för återhämtning och vardag.',
    icon: 'heart',
    notice: 'Lärpuls ger allmän kunskap, inte vård eller diagnos. Kontakta 1177 för råd; ring 112 vid akut fara.',
    resources: [{ label: '1177 – Hälsa och vård', url: 'https://www.1177.se/' }],
  },
  {
    id: 'money',
    label: 'Pengar',
    shortLabel: 'Pengar',
    description: 'Bygg tryggare vanor kring din ekonomi.',
    icon: 'wallet',
    notice: 'Innehållet är allmän kunskap, inte personlig finansiell rådgivning. Villkor och behov skiljer sig åt.',
    resources: [
      { label: 'Finansinspektionen – För konsumenter', url: 'https://www.fi.se/sv/for-konsumenter/' },
      { label: 'Konsumentverket – Stöd kring ekonomin', url: 'https://www.konsumentverket.se/' },
    ],
  },
  {
    id: 'strategy',
    label: 'Strategiskt tänkande',
    shortLabel: 'Strategi',
    description: 'Fatta bättre beslut och se ett steg längre.',
    icon: 'compass',
    resources: [{ label: 'Harvard Business Review', url: 'https://hbr.org/' }],
  },
  {
    id: 'leadership',
    label: 'Ledarskap',
    shortLabel: 'Ledarskap',
    description: 'Skapa tydlighet, tillit och framdrift.',
    icon: 'users',
    resources: [{ label: 'Arbetsmiljöverket – Arbetsmiljö', url: 'https://www.av.se/' }],
  },
  {
    id: 'communication',
    label: 'Kommunikation',
    shortLabel: 'Snacka smart',
    description: 'Gör idéer tydliga och samtal bättre.',
    icon: 'messages',
    resources: [{ label: 'Suntarbetsliv – Kommunikation och samarbete', url: 'https://www.suntarbetsliv.se/' }],
  },
  {
    id: 'learning',
    label: 'Lärande & minne',
    shortLabel: 'Lärande',
    description: 'Lär dig effektivare och kom ihåg mer.',
    icon: 'book-open',
    resources: [
      { label: 'Skolverket – Lärande och undervisning', url: 'https://www.skolverket.se/' },
      { label: 'Forskning.se – Utbildning', url: 'https://www.forskning.se/' },
    ],
  },
  {
    id: 'productivity',
    label: 'Fokus & planering',
    shortLabel: 'Fokus',
    description: 'Planera klokt och skapa utrymme för fokus.',
    icon: 'target',
    resources: [{ label: 'Arbetsmiljöverket – Organisatorisk arbetsmiljö', url: 'https://www.av.se/' }],
  },
  {
    id: 'digital-safety',
    label: 'Digital säkerhet',
    shortLabel: 'Säkerhet',
    description: 'Skydda konton, information och din digitala vardag.',
    icon: 'shield-check',
    resources: [
      { label: 'MSB – Råd om informationssäkerhet', url: 'https://www.msb.se/' },
      { label: 'Internetstiftelsen – Digital trygghet', url: 'https://internetstiftelsen.se/' },
    ],
  },
  {
    id: 'critical-thinking',
    label: 'Kritiskt tänkande',
    shortLabel: 'Kritiskt',
    description: 'Pröva påståenden, antaganden och belägg.',
    icon: 'search',
    resources: [{ label: 'Internetstiftelsen – Källkritik på nätet', url: 'https://internetstiftelsen.se/' }],
  },
  {
    id: 'writing',
    label: 'Skrivande',
    shortLabel: 'Skrivande',
    description: 'Skriv tydligt för den som ska läsa.',
    icon: 'pen-line',
    resources: [{ label: 'Institutet för språk och folkminnen – Språkrådet', url: 'https://www.isof.se/' }],
  },
  {
    id: 'creativity',
    label: 'Kreativitet',
    shortLabel: 'Idéer',
    description: 'Utforska idéer, testa och utveckla dem.',
    icon: 'lightbulb',
    resources: [{ label: 'Vinnova – Innovation och utveckling', url: 'https://www.vinnova.se/' }],
  },
  {
    id: 'health',
    label: 'Hälsa & vanor',
    shortLabel: 'Hälsa',
    description: 'Små, hållbara vanor för vardagens välmående.',
    icon: 'activity',
    notice: 'Lärpuls ger allmän kunskap, inte vård eller diagnos. Kontakta 1177 för råd; ring 112 vid akut fara.',
    resources: [{ label: '1177 – Hälsa och vård', url: 'https://www.1177.se/' }],
  },
  {
    id: 'relationships',
    label: 'Relationer',
    shortLabel: 'Relationer',
    description: 'Bygg förtroende med lyhördhet och respekt.',
    icon: 'users',
    resources: [{ label: '1177 – Relationer och mående', url: 'https://www.1177.se/' }],
  },
  {
    id: 'science',
    label: 'Vetenskap',
    shortLabel: 'Vetenskap',
    description: 'Förstå hur frågor undersöks och kunskap prövas.',
    icon: 'flask-conical',
    resources: [{ label: 'Forskning.se – Forskningsnyheter', url: 'https://www.forskning.se/' }],
  },
  {
    id: 'sustainability',
    label: 'Hållbar vardag',
    shortLabel: 'Hållbart',
    description: 'Se samband och gör medvetna vardagsval.',
    icon: 'leaf',
    resources: [{ label: 'Naturvårdsverket – Hållbar utveckling', url: 'https://www.naturvardsverket.se/' }],
  },
  {
    id: 'media',
    label: 'Medier & information',
    shortLabel: 'Medier',
    description: 'Förstå hur information sprids och påverkar.',
    icon: 'newspaper',
    resources: [
      { label: 'Internetstiftelsen – Internet och källkritik', url: 'https://internetstiftelsen.se/' },
      { label: 'Mediemyndigheten – Medie- och informationskunnighet', url: 'https://www.mediemyndigheten.se/' },
    ],
  },
  {
    id: 'projects',
    label: 'Projektarbete',
    shortLabel: 'Projekt',
    description: 'Gör idéer genomförbara med tydliga steg.',
    icon: 'clipboard-list',
    resources: [{ label: 'Arbetsmiljöverket – Planera och organisera arbetet', url: 'https://www.av.se/' }],
  },
  {
    id: 'career',
    label: 'Arbetsliv & karriär',
    shortLabel: 'Karriär',
    description: 'Utveckla färdigheter och navigera arbetslivet.',
    icon: 'briefcase',
    resources: [{ label: 'Arbetsförmedlingen – Tips och stöd', url: 'https://arbetsformedlingen.se/' }],
  },
  {
    id: 'data',
    label: 'Data & statistik',
    shortLabel: 'Data',
    description: 'Läs siffror, diagram och osäkerhet klokare.',
    icon: 'chart',
    resources: [{ label: 'SCB – Statistikskolan', url: 'https://www.scb.se/hitta-statistik/sverige-i-siffror/statistikskolan/' }],
  },
]

export interface LearningSlide {
  title: string
  body: string
}

export interface LearningSection {
  title: string
  body: string
  bullets: string[]
}

export interface LearningCard {
  id: string
  topicId: TopicId
  title: string
  subtitle: string
  minutes: number
  level: 'Start' | 'Medel'
  xp: number
  slides: LearningSlide[]
  deepDive: {
    intro: string
    sections: LearningSection[]
    tryThis: string
  }
  quiz: {
    question: string
    options: string[]
    correctIndex: number
    explanation: string
  }
}

const authoredLessons: LearningCard[] = [
  {
    id: 'ai-sannolikhet',
    topicId: 'ai',
    title: 'AI låter säker – men gissar nästa ord',
    subtitle: 'Skilj ett flytande svar från ett sant svar.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Flyt är inte fakta', body: 'En språkmodell hittar mönster i text och bygger ett svar bit för bit. Den kontrollerar inte automatiskt om varje påstående är sant.' },
      { title: 'Därför uppstår fel', body: 'När underlaget saknas kan modellen fylla luckan med något som låter rimligt. Ett självsäkert tonfall är ingen kvalitetsstämpel.' },
      { title: 'Gör så här', body: 'Be om källor, öppna dem själv och kontrollera namn, siffror och datum. Dubbelkolla viktiga beslut mot en oberoende källa.' },
    ],
    deepDive: {
      intro: 'Generativ AI är bra på att formulera och sammanfatta mönster. Den egenskapen är användbar – men gör också att fel kan se övertygande ut.',
      sections: [
        { title: 'Tänk på svaret som ett utkast', body: 'Använd AI för att komma igång, strukturera eller hitta frågor att undersöka. Behandla inte ett svar som en verifierad faktakälla bara för att det är välskrivet.', bullets: ['Leta efter konkreta, kontrollerbara påståenden.', 'Kontrollera att källan verkligen säger det som påstås.', 'Sök en oberoende källa när konsekvensen av ett fel är stor.'] },
        { title: 'Be om osäkerhet, inte bara säkerhet', body: 'Du kan be modellen skilja mellan fakta, antaganden och sådant den inte kan avgöra. Det ersätter inte kontroll, men gör nästa steg tydligare.', bullets: ['Fråga: ”Vad i svaret är du minst säker på?”', 'Be om datum och länkar för aktuella uppgifter.', 'Låt en människa fatta beslut i viktiga frågor.'] },
      ],
      tryThis: 'Ta ett AI-svar du nyligen fått. Markera ett faktapåstående och kontrollera det mot originalkällan.',
    },
    quiz: {
      question: 'Vad betyder ett självsäkert AI-svar bäst?',
      options: ['Att svaret är kontrollerat', 'Att svaret är formulerat med säker ton', 'Att källan är aktuell'],
      correctIndex: 1,
      explanation: 'Ton och sanningshalt är olika saker. Verifiera påståenden som spelar roll.',
    },
  },
  {
    id: 'ai-prompt',
    topicId: 'ai',
    title: 'Skriv en prompt som faktiskt hjälper',
    subtitle: 'Fyra byggstenar ger AI:n bättre förutsättningar.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Börja med målet', body: 'Säg vad du vill få gjort och vem svaret är till för. ”Hjälp mig” ger få ledtrådar; ett tydligt mål gör skillnad.' },
      { title: 'Lägg till ramar', body: 'Ge relevant sammanhang, önskat format och begränsningar. Exempel: en tabell, fem punkter eller ett utkast på lätt svenska.' },
      { title: 'Förfina tillsammans', body: 'Läs svaret och ge konkret feedback: vad saknas, vad blev för långt och vilket exempel skulle hjälpa? En bra prompt växer i dialog.' },
    ],
    deepDive: {
      intro: 'En användbar instruktion hjälper modellen förstå uppgiften, sammanhanget och hur ett bra svar ska se ut. Den behöver inte innehålla hemliga nyckelord.',
      sections: [
        { title: 'Fyra enkla byggstenar', body: 'Sätt ihop uppgiften steg för steg. Lägg bara till bakgrund som påverkar svaret.', bullets: ['Uppgift: vad ska göras?', 'Sammanhang: för vem och i vilken situation?', 'Format: hur ska resultatet presenteras?', 'Ramar: längd, ton, sådant som ska undvikas.'] },
        { title: 'Be om en första version', body: 'Det är ofta snabbare att reagera på ett utkast än att försöka skriva en perfekt instruktion från början.', bullets: ['Be modellen ställa en fråga om något viktigt saknas.', 'Ge exempel på stil eller struktur när det behövs.', 'Kontrollera att svaret passar din verkliga situation.'] },
      ],
      tryThis: 'Skriv om ”ge mig idéer” till en instruktion med mål, målgrupp, format och en tydlig begränsning.',
    },
    quiz: {
      question: 'Vilken detalj gör oftast en prompt mer användbar?',
      options: ['Fler utropstecken', 'Tydligt mål, sammanhang och önskat format', 'Att skriva ”svara perfekt”'],
      correctIndex: 1,
      explanation: 'Modellen får bättre ledtrådar när uppgift, sammanhang och leverans är tydliga.',
    },
  },
  {
    id: 'ai-verifiera',
    topicId: 'ai',
    title: 'Faktakolla ett AI-svar på 30 sekunder',
    subtitle: 'En snabb rutin innan du delar eller agerar.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Plocka ut påståendet', body: 'Gör om svaret till en konkret fråga: vilket datum, vilken siffra eller vilket orsakssamband behöver faktiskt stämma?' },
      { title: 'Gå till originalet', body: 'Öppna den länkade källan i stället för att nöja dig med en sammanfattning. Kontrollera även publiceringsdatum och sammanhang.' },
      { title: 'Jämför oberoende', body: 'Hitta en tillförlitlig källa som inte bara upprepar samma text. Om du inte kan verifiera det: skriv att det är osäkert.' },
    ],
    deepDive: {
      intro: 'Källkritik fungerar även när en text är skriven av AI. Lägg mest tid på sådant som är nytt, exakt eller har stor påverkan.',
      sections: [
        { title: 'Sök efter det som går att kontrollera', body: 'Namn, datum, procentsatser, lagar och citat går ofta att kontrollera direkt. Generella råd kan kräva att du först preciserar situationen.', bullets: ['Sök på en kort fras ur påståendet.', 'Kontrollera att länken går till den organisation den säger sig gå till.', 'Var extra noga med hälsa, juridik och ekonomi.'] },
        { title: 'Titta på källans ursprung', body: 'En återpublicering kan vara långt från den ursprungliga studien eller myndighetsinformationen. Följ kedjan bakåt när det är möjligt.', bullets: ['Vem publicerade informationen?', 'När uppdaterades sidan?', 'Stämmer slutsatsen med originalmaterialet?'] },
      ],
      tryThis: 'Kontrollera en siffra från ett AI-svar. Skriv ned källans namn och datum innan du använder den.',
    },
    quiz: {
      question: 'Vilket är det bästa nästa steget när AI:n ger en länk?',
      options: ['Anta att länken bevisar svaret', 'Öppna länken och kontrollera originalets sammanhang', 'Dela svaret om det låter rimligt'],
      correctIndex: 1,
      explanation: 'En länk är bara användbar om den är relevant, äkta och stöder påståendet.',
    },
  },
  {
    id: 'ai-larcoach',
    topicId: 'ai',
    title: 'Gör AI till din lärcoach',
    subtitle: 'Öva på att minnas – inte bara läsa igen.',
    minutes: 4,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Förklara först själv', body: 'Läs ett avsnitt och stäng texten. Försök återberätta huvudidén utan att titta.' },
      { title: 'Be om frågor', body: 'Låt AI skapa en fråga i taget. Svara själv innan du ber om ledtråd eller facit.' },
      { title: 'Rätta missförstånd', body: 'Be om återkoppling på ditt svar och fråga vad som saknas. Kontrollera viktiga förklaringar i en pålitlig källa.' },
    ],
    deepDive: {
      intro: 'Att plocka fram kunskap ur minnet hjälper dig märka vad du faktiskt kan. AI kan skapa övningstillfällen, men tänkandet behöver fortfarande vara ditt.',
      sections: [
        { title: 'En enkel övningsloop', body: 'Kombinera korta frågor med återkoppling. Håll dig till ett begrepp i taget och höj svårigheten när grunderna sitter.', bullets: ['Be om en fråga utan facit.', 'Svara med egna ord innan du ber om hjälp.', 'Be om en följdfråga som testar ett nytt exempel.'] },
        { title: 'Behåll kvaliteten', body: 'En AI-genererad fråga kan själv vara fel eller otydlig. Välj material där du kan kontrollera svaret och be om förklaringen, inte bara poängen.', bullets: ['Ge modellen din kursbokstext eller egna anteckningar om du har rätt att använda dem.', 'Be att frågorna håller sig till underlaget.', 'Jämför facit med en betrodd källa.'] },
      ],
      tryThis: 'Välj ett ämne du vill minnas. Be om tre öppna frågor, en i taget, och svara utan att titta.',
    },
    quiz: {
      question: 'Vilken metod tränar aktiv återkallning bäst?',
      options: ['Läsa samma stycke om och om igen', 'Försöka svara själv innan du tittar på facit', 'Kopiera AI:ns sammanfattning'],
      correctIndex: 1,
      explanation: 'Att aktivt plocka fram svaret gör det tydligt vad du minns och vad du behöver öva mer på.',
    },
  },
  {
    id: 'ai-integritet',
    topicId: 'ai',
    title: 'Tänk efter innan du klistrar in',
    subtitle: 'Skydda personuppgifter och arbetshemligheter.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Texten kan lämna din miljö', body: 'När du använder en AI-tjänst kan innehåll behandlas enligt tjänstens villkor och inställningar.' },
      { title: 'Ta bort det identifierande', body: 'Namn, kunduppgifter, personnummer, hälsodata och interna dokument kan vara känsliga även när du bara vill ha hjälp med formuleringen.' },
      { title: 'Använd säkrare underlag', body: 'Anonymisera, använd påhittade exempel eller godkända verktyg. Följ alltid reglerna på din arbetsplats.' },
    ],
    deepDive: {
      intro: 'En bra tumregel är att inte lämna ut mer information än vad uppgiften kräver. Kontrollera tjänstens villkor och din organisations regler innan du använder verkliga uppgifter.',
      sections: [
        { title: 'Känn igen känslig information', body: 'Även en kombination av till synes vanliga detaljer kan göra en person eller kund identifierbar.', bullets: ['Personnummer, kontaktuppgifter och inloggningsuppgifter.', 'Hälsoinformation, ekonomiska uppgifter och privata meddelanden.', 'Kunddata, avtal, källkod eller information som inte offentliggjorts.'] },
        { title: 'Minimera och anonymisera', body: 'Ofta kan du få hjälp med strukturen utan att dela originalmaterialet. Byt ut namn och detaljer mot generiska platshållare.', bullets: ['Kontrollera att platshållarna inte går att koppla tillbaka.', 'Använd arbetsgivarens godkända verktyg för arbetsmaterial.', 'Fråga ansvarig vid osäkerhet i stället för att chansa.'] },
      ],
      tryThis: 'Skriv om en arbetsuppgift med helt påhittade namn och siffror. Se om AI:n fortfarande kan hjälpa dig.',
    },
    quiz: {
      question: 'Vad är säkrast när du vill ha hjälp med ett kundmejl?',
      options: ['Klistra in mejlet med personuppgifter', 'Ta bort identifierande uppgifter och följa arbetsplatsens regler', 'Ladda upp hela kundmappen'],
      correctIndex: 1,
      explanation: 'Dataminimering och godkända verktyg minskar risken att känslig information exponeras.',
    },
  },
  {
    id: 'wellbeing-stressignal',
    topicId: 'wellbeing',
    title: 'Lär känna din stressignal',
    subtitle: 'Upptäck vad kroppen försöker berätta.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Stress syns olika', body: 'Spända axlar, kort tålamod eller svårt att fokusera kan vara signaler på belastning – men betyder inte automatiskt att något är fel.' },
      { title: 'Leta efter mönstret', body: 'Notera när signalen dyker upp och vad som hände precis före. Nyfikenhet hjälper mer än självkritik.' },
      { title: 'Gör en liten förändring', body: 'Välj en sak som går att påverka: pausa, be om förtydligande eller dela upp uppgiften. Sök stöd om besvären håller i sig.' },
    ],
    deepDive: {
      intro: 'Stress är kroppens reaktion på krav och förändringar. Reaktionen kan hjälpa oss att agera kortsiktigt, men långvarig belastning kan behöva uppmärksammas.',
      sections: [
        { title: 'Samla ledtrådar utan att döma', body: 'En enkel logg kan visa vad som tar energi och vad som hjälper dig återhämta dig. Den är ett verktyg för reflektion, inte en diagnos.', bullets: ['Vad märkte jag i kroppen eller tankarna?', 'Vad hände precis före?', 'Vad hjälpte, även lite grann?'] },
        { title: 'Välj stöd som passar', body: 'Ibland går det att ändra en vana eller be om hjälp att prioritera. Om oro, sömnproblem eller stress påverkar vardagen under längre tid kan vården ge stöd.', bullets: ['Prata med någon du litar på.', 'Kontakta vårdcentral eller 1177 för rådgivning.', 'Ring 112 om det finns akut risk att du eller någon annan skadas.'] },
      ],
      tryThis: 'Skriv en enda mening om vad som brukar vara din första stressignal. Lägg till en liten sak som kan hjälpa just då.',
    },
    quiz: {
      question: 'Vad är en stressignal bäst att använda till?',
      options: ['Dra en snabb diagnos', 'Lägga märke till mönster och välja ett hjälpsamt nästa steg', 'Ignorera allt som känns obekvämt'],
      correctIndex: 1,
      explanation: 'Signaler kan hjälpa dig bli uppmärksam, men ställer inte en diagnos.',
    },
  },
  {
    id: 'wellbeing-paus',
    topicId: 'wellbeing',
    title: 'En kort paus som faktiskt blir av',
    subtitle: 'Skapa en liten växel mellan två uppgifter.',
    minutes: 2,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Byt läge medvetet', body: 'När du går direkt från en krävande uppgift till nästa får hjärnan ingen tydlig signal om att något är avslutat.' },
      { title: 'Gör pausen enkel', body: 'Res dig, titta ut genom ett fönster eller ta några lugna andetag. En kort paus behöver inte bli ett nytt projekt.' },
      { title: 'Återvänd med en riktning', body: 'Skriv nästa lilla steg innan du går vidare. Då behöver du inte börja om med att lista ut var du var.' },
    ],
    deepDive: {
      intro: 'En paus löser inte en ohållbar arbetsbelastning, men en enkel övergång kan hjälpa dig återfå fokus mellan aktiviteter.',
      sections: [
        { title: 'Gör pausen friktionsfri', body: 'Välj en handling som inte kräver utrustning eller planering. Det viktiga är att bryta autopiloten en kort stund.', bullets: ['Ställ dig upp och rör på kroppen.', 'Vila blicken från nära skärmseende.', 'Ta några bekväma andetag utan att pressa dem.'] },
        { title: 'Gör återstarten tydlig', body: 'En paus blir lättare att använda när du vet vad du ska göra efteråt. Avsluta med en tydlig nästa handling.', bullets: ['Skriv nästa steg med ett verb.', 'Lämna en kort anteckning om var du slutade.', 'Om du är överbelastad: pausa och ta även upp prioriteringen.'] },
      ],
      tryThis: 'Nästa gång du byter uppgift: ta en minut utan skärm och skriv sedan ned första steget i den nya uppgiften.',
    },
    quiz: {
      question: 'Vad gör det lättare att komma tillbaka efter pausen?',
      options: ['En tydlig nästa handling', 'Flera nya mål', 'Att aldrig avsluta den förra uppgiften'],
      correctIndex: 0,
      explanation: 'En liten, konkret startpunkt minskar tröskeln när du återvänder.',
    },
  },
  {
    id: 'wellbeing-tanke',
    topicId: 'wellbeing',
    title: 'En tanke är inte alltid ett faktum',
    subtitle: 'Skapa lite utrymme mellan tanke och reaktion.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Märka, inte fastna', body: '”Jag kommer misslyckas” är en tanke – inte ett bevis på framtiden.' },
      { title: 'Fråga vad du vet', body: 'Vilka konkreta fakta stöder tanken? Finns det något du inte tagit med eller en annan rimlig förklaring?' },
      { title: 'Välj en hjälpsam handling', body: 'Du behöver inte tvinga fram positivitet. Välj ett litet steg som fungerar även när känslan finns kvar.' },
    ],
    deepDive: {
      intro: 'Att skilja mellan en tanke och ett observerbart faktum kan göra det lättare att välja hur du vill agera. Det är en reflektionsövning, inte en ersättning för professionellt stöd.',
      sections: [
        { title: 'Skriv ned situationen', body: 'Beskriv vad som hände så neutralt du kan. Lägg sedan till tanken och känslan som dök upp.', bullets: ['Situation: vad skulle en kamera ha sett?', 'Tanke: vilken mening dök upp i huvudet?', 'Känsla: vad märkte jag, utan att värdera det?'] },
        { title: 'Testa en mer balanserad tolkning', body: 'En alternativ tanke behöver inte vara glad eller säker. Den ska bara ta med mer av det du faktiskt vet.', bullets: ['Vilket stöd finns för och emot tanken?', 'Vad skulle jag säga till en vän i samma läge?', 'Vilket litet steg kan jag påverka nu?'] },
      ],
      tryThis: 'Skriv ”Jag märker att jag tänker att …” nästa gång en oro tar över. Lägg märke till om formuleringen skapar lite avstånd.',
    },
    quiz: {
      question: 'Vad är en balanserad alternativ tanke?',
      options: ['Att tvinga sig själv att vara positiv', 'En rimlig tolkning som tar med fler fakta', 'Att låtsas att känslan inte finns'],
      correctIndex: 1,
      explanation: 'Målet är inte att förneka känslan, utan att se situationen med lite mer bredd.',
    },
  },
  {
    id: 'wellbeing-somn',
    topicId: 'wellbeing',
    title: 'Bygg en kväll som hjälper sömnen',
    subtitle: 'Små vanor slår jakten på den perfekta rutinen.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Sikta på regelbundenhet', body: 'Ungefär samma tid för uppstigning kan hjälpa kroppen hitta en rytm. Börja med det som känns realistiskt.' },
      { title: 'Skapa en mjuk landning', body: 'En återkommande, lugn aktivitet kan markera att dagen går mot sitt slut.' },
      { title: 'Sök hjälp när det behövs', body: 'Enstaka dåliga nätter händer. Om sömnproblem håller i sig och påverkar vardagen kan vården hjälpa dig reda ut orsaken.' },
    ],
    deepDive: {
      intro: 'Sömn påverkas av många saker och ingen kvällsrutin fungerar för alla. Testa en förändring i taget och se hur den fungerar i din vardag.',
      sections: [
        { title: 'Gör det lätt att varva ned', body: 'En lugn avslutning kan vara enkel: förbered morgondagen, dämpa aktivitet eller läs något behagligt.', bullets: ['Välj en ungefärlig tid att börja varva ned.', 'Håll rummet så mörkt, tyst och behagligt du kan.', 'Undvik att förvandla sömn till ett prestationsmål.'] },
        { title: 'Var snäll mot variation', body: 'Stress, sjukdom, skiftarbete och livssituation påverkar sömnen. Om problemen återkommer finns stöd och råd via vården.', bullets: ['Notera vanor och hur du mår, inte bara antal timmar.', 'Testa små justeringar i taget.', 'Kontakta 1177 eller vårdcentral om besvären påverkar dig under längre tid.'] },
      ],
      tryThis: 'Välj en lugn femminutersaktivitet som får bli din signal att kvällen börjar.',
    },
    quiz: {
      question: 'Vilket förhållningssätt är mest hjälpsamt?',
      options: ['En rutin måste vara perfekt för att fungera', 'Testa en realistisk vana och utvärdera över tid', 'Dålig sömn betyder alltid att något är fel'],
      correctIndex: 1,
      explanation: 'Sömn påverkas av många faktorer. Små, rimliga vanor är lättare att utvärdera än perfektion.',
    },
  },
  {
    id: 'wellbeing-granser',
    topicId: 'wellbeing',
    title: 'Sätt en gräns utan att bli hård',
    subtitle: 'Tydlighet kan vara både vänlig och bestämd.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Säg vad du kan', body: 'En gräns handlar om vad du har möjlighet att göra, inte om att kontrollera någon annan.' },
      { title: 'Var konkret', body: '”Jag kan ta det på torsdag, inte i dag” är ofta tydligare än ett långt försvarstal.' },
      { title: 'Föreslå nästa steg', body: 'Om du vill, erbjud ett alternativ. Ett nej behöver inte innehålla en ursäkt eller en ny lösning.' },
    ],
    deepDive: {
      intro: 'Gränser hjälper dig kommunicera tid, ork och ansvar. De fungerar bäst när du uttrycker dem tydligt och följer upp på ett respektfullt sätt.',
      sections: [
        { title: 'Använd en enkel formulering', body: 'Beskriv din kapacitet och vad som händer härnäst. Håll dig till det du faktiskt kan påverka.', bullets: ['”Jag kan hjälpa till med X, men inte Y.”', '”Jag behöver tänka på det och återkommer i morgon.”', '”Jag hör att det är viktigt. Jag kan inte ta det just nu.”'] },
        { title: 'Stå kvar utan att eskalera', body: 'Det kan kännas ovant när någon blir besviken. Du kan bekräfta känslan utan att ändra ditt svar.', bullets: ['Upprepa din gräns lugnt.', 'Undvik att lägga till fler skäl om de blir en förhandling.', 'Be om stöd om en situation känns otrygg.'] },
      ],
      tryThis: 'Skriv en vänlig mening som börjar med ”Jag kan …, men jag kan inte …”.',
    },
    quiz: {
      question: 'Vad gör en gräns tydlig?',
      options: ['Ett långt försvarstal', 'Att beskriva vad du kan och vad du inte kan ta på dig', 'Att lova mer än du orkar'],
      correctIndex: 1,
      explanation: 'En tydlig gräns beskriver din kapacitet och nästa steg utan att angripa den andra.',
    },
  },
  {
    id: 'money-koll',
    topicId: 'money',
    title: 'Få koll på pengarna på tio minuter',
    subtitle: 'Börja med överblick, inte en perfekt budget.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Se vad som kommer in', body: 'Skriv upp ungefärlig inkomst efter skatt och när den brukar komma.' },
      { title: 'Skilj fast från rörligt', body: 'Samla boende, räkningar och abonnemang för sig. Lägg vardagsköp i en annan hög.' },
      { title: 'Välj en liten justering', body: 'Hitta en sak du vill ändra eller följa upp. En översikt ska hjälpa dig – inte skuldbelägga dig.' },
    ],
    deepDive: {
      intro: 'En budget är en plan för pengarna du har, inte ett betyg på hur du sköter dig. Börja med nuläget innan du sätter mål.',
      sections: [
        { title: 'Gör en enkel översikt', body: 'Använd kontoutdrag eller en anteckning. Du behöver inte kategorisera varje krona för att se tydliga mönster.', bullets: ['Inkomst efter skatt.', 'Fasta utgifter och räkningar.', 'Rörliga kostnader och sådant du vill spara till.'] },
        { title: 'Gör planen realistisk', body: 'Lämna utrymme för variation och oväntade kostnader. Se över planen när livet förändras.', bullets: ['Börja med en förändring som känns möjlig.', 'Automatisera en överföring om det passar dig.', 'Om skulder eller räkningar känns svåra: sök kostnadsfri budget- och skuldrådgivning i kommunen.'] },
      ],
      tryThis: 'Öppna dina senaste kontotransaktioner och hitta en återkommande kostnad du vill granska.',
    },
    quiz: {
      question: 'Vad är ett bra första steg i en budget?',
      options: ['Förstå nuläget för inkomster och utgifter', 'Sätta ett perfekt sparmål direkt', 'Sluta med alla nöjen'],
      correctIndex: 0,
      explanation: 'En överblick ger ett underlag för beslut utan att kräva en komplicerad budget.',
    },
  },
  {
    id: 'money-buffert',
    topicId: 'money',
    title: 'Börja bygga en buffert',
    subtitle: 'Lite trygghet kan vara bättre än ett stort mål.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Vad ska den täcka?', body: 'En buffert är till för oväntade utgifter – inte planerade köp eller vanlig konsumtion.' },
      { title: 'Börja med en milstolpe', body: 'Välj ett första belopp som känns realistiskt för din ekonomi. Det finns ingen nivå som passar alla.' },
      { title: 'Gör sparandet enkelt', body: 'En liten automatisk överföring efter lön kan skapa en vana. Anpassa den när din situation ändras.' },
    ],
    deepDive: {
      intro: 'En buffert kan minska behovet av att låna när något oväntat händer. Storleken beror på din ekonomi, dina utgifter och din trygghet i övrigt.',
      sections: [
        { title: 'Sätt ett mål som passar dig', body: 'Utgå från kostnader som skulle bli svåra att skjuta upp. Ett litet första delmål kan göra vanan mer hanterbar.', bullets: ['Lista några rimliga oväntade kostnader.', 'Välj ett första delmål i stället för en perfekt slutsumma.', 'Prioritera dyr skuld och nödvändiga räkningar utifrån din situation.'] },
        { title: 'Håll bufferten tillgänglig', body: 'Pengar som är avsedda för en nära oförutsedd utgift behöver normalt vara lätta att komma åt. Kontrollera villkor och insättningsgaranti för kontot.', bullets: ['Jämför avgifter och uttagsvillkor.', 'Skilj buffert från långsiktigt sparande.', 'Fyll på igen om bufferten används.'] },
      ],
      tryThis: 'Välj ett första buffertmål som känns möjligt och bestäm när du vill se över det igen.',
    },
    quiz: {
      question: 'Vad kännetecknar en buffert?',
      options: ['Pengar för oväntade utgifter', 'Ett löfte om avkastning', 'Ett lån för vardagsköp'],
      correctIndex: 0,
      explanation: 'Bufferten är en reserv för utgifter du inte rimligen kan planera bort.',
    },
  },
  {
    id: 'money-ranta',
    topicId: 'money',
    title: 'Förstå ränta-på-ränta',
    subtitle: 'Tid kan förstärka både avkastning och kostnad.',
    minutes: 4,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Avkastning kan växa vidare', body: 'Om en investering ger avkastning och den får vara kvar kan framtida avkastning beräknas på ett större belopp.' },
      { title: 'Tiden spelar roll', body: 'Längre tid kan ge större effekt av återinvestering – men utfallet varierar och är aldrig garanterat.' },
      { title: 'Samma princip på lån', body: 'Ränta och avgifter kan också göra en skuld dyrare över tid. Jämför den effektiva räntan och hela återbetalningen.' },
    ],
    deepDive: {
      intro: 'Ränta-på-ränta beskriver hur ett belopp förändras när ränta eller avkastning läggs till och sedan själv påverkar framtida beräkningar.',
      sections: [
        { title: 'Ett förenklat exempel', body: '500 kr i månaden i 20 år med ett hypotetiskt jämnt årsutfall på 6 procent blir ungefär 231 000 kr före avgifter, skatt och inflation. Du har då satt in 120 000 kr. Verklig avkastning varierar och kan också vara negativ.', bullets: ['Exemplet är matematik, inte en prognos.', 'Avgifter och skatt påverkar utfallet.', 'Historisk eller hypotetisk avkastning garanterar inte framtida resultat.'] },
        { title: 'Se även skuldens riktning', body: 'På lån kan upplupen ränta öka kostnaden, särskilt om betalningar missas eller villkoren ändras. Ta reda på hur betalningsplanen fungerar.', bullets: ['Jämför effektiv ränta, avgifter och total kostnad.', 'Betala enligt avtal och kontakta långivaren vid problem.', 'Sök oberoende vägledning vid osäkerhet.'] },
      ],
      tryThis: 'Jämför två spar- eller låneexempel och skriv ned vilka antaganden som skiljer dem åt.',
    },
    quiz: {
      question: 'Vad är viktigt att komma ihåg om ett räkneexempel på avkastning?',
      options: ['Det garanterar framtida avkastning', 'Det bygger på antaganden och utfallet kan bli annorlunda', 'Avgifter spelar aldrig roll'],
      correctIndex: 1,
      explanation: 'Räkneexempel visar matematik utifrån antaganden – inte vad som säkert kommer att hända.',
    },
  },
  {
    id: 'money-lan',
    topicId: 'money',
    title: 'Jämför lån på rätt sätt',
    subtitle: 'Titta längre än den lockande månadsbetalningen.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Jämför effektiv ränta', body: 'Effektiv ränta räknar in ränta och vissa avgifter och gör erbjudanden lättare att jämföra.' },
      { title: 'Se hela återbetalningen', body: 'En låg månadsbetalning kan bero på lång återbetalningstid. Titta på totalbelopp och hur länge du betalar.' },
      { title: 'Läs villkoren', body: 'Kontrollera avgifter, rörlig ränta, förseningskostnader och vad som händer om du vill lösa lånet tidigare.' },
    ],
    deepDive: {
      intro: 'Låneerbjudanden kan skilja sig åt i ränta, avgifter och återbetalningstid. Räkna därför på hela kostnaden och inte bara på den första månadens belopp.',
      sections: [
        { title: 'Jämför samma förutsättningar', body: 'Använd samma lånebelopp och tidsperiod när du jämför. Effektiv ränta inkluderar fler kostnader än den nominella räntan.', bullets: ['Total återbetalning i kronor.', 'Effektiv ränta och avgifter.', 'Återbetalningstid och månadskostnad.'] },
        { title: 'Fråga innan du skriver under', body: 'Ett avtal gäller även när erbjudandet känns brådskande. Ta tid att läsa villkoren och fråga om något är oklart.', bullets: ['Är räntan fast eller rörlig?', 'Tillkommer uppläggnings- eller aviavgift?', 'Vad kostar det att betala sent eller lösa lånet i förtid?'] },
      ],
      tryThis: 'Ta två låneexempel och jämför effektiv ränta, total återbetalning och tidsperiod – inte bara månadsbelopp.',
    },
    quiz: {
      question: 'Vad gör effektiv ränta användbar?',
      options: ['Den visar alla framtida räntor säkert', 'Den inkluderar ränta och vissa avgifter för jämförelse', 'Den visar bara månadskostnaden'],
      correctIndex: 1,
      explanation: 'Effektiv ränta är ett jämförelsemått som tar med fler kostnader än den nominella räntan.',
    },
  },
  {
    id: 'money-bluff',
    topicId: 'money',
    title: 'Känn igen ett pengabedrägeri',
    subtitle: 'Brådska och hemliga koder är varningsflaggor.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Bedragare stressar dig', body: '”Agera nu”, ”hemligt ärende” eller hot om att kontot stängs ska få dig att fatta beslut snabbt.' },
      { title: 'Dela aldrig koder', body: 'Banken, polisen eller seriösa företag ber dig inte att lämna ut BankID-koder eller engångskoder via telefon.' },
      { title: 'Avsluta och kontrollera', body: 'Lägg på. Ring organisationen via numret i deras officiella app eller på deras webbplats.' },
    ],
    deepDive: {
      intro: 'Bedrägerier kan se professionella ut och använda information om dig. Fokusera på hur kontakten försöker få dig att agera.',
      sections: [
        { title: 'Vanliga varningssignaler', body: 'En falsk avsändare kan efterlikna en bank, myndighet, släkting eller leverantör. Avsändarnamn och telefonnummer kan också förfalskas.', bullets: ['Oväntad brådska eller krav på tystnad.', 'Begäran att logga in, signera eller flytta pengar.', 'Länkar till sidor som ber om lösenord eller koder.'] },
        { title: 'Om du misstänker något', body: 'Avbryt kontakten och ta själv kontakt med banken via en känd kanal. Om du har lämnat ut uppgifter, agera snabbt och följ bankens råd.', bullets: ['Spärra BankID eller kort vid behov.', 'Kontakta banken på numret i den officiella appen.', 'Polisanmäl och spara meddelanden eller kvitton.'] },
      ],
      tryThis: 'Spara bankens officiella kontaktväg i appen. Använd den i stället för ett nummer i ett oväntat meddelande.',
    },
    quiz: {
      question: 'Någon ringer från ”banken” och ber dig signera med BankID. Vad gör du?',
      options: ['Signerar för att stoppa en påstådd överföring', 'Avslutar och kontaktar banken via en officiell kanal', 'Läser upp engångskoden'],
      correctIndex: 1,
      explanation: 'Avbryt oväntad kontakt och ta själv kontakt med banken via en känd kanal.',
    },
  },
  {
    id: 'strategy-alternativkostnad',
    topicId: 'strategy',
    title: 'Se priset på det du väljer bort',
    subtitle: 'Varje ja använder tid och fokus någon annanstans.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Val har en baksida', body: 'Alternativkostnaden är värdet av det bästa alternativet du inte valde.' },
      { title: 'Jämför med verkliga alternativ', body: 'Fråga inte bara om en idé är bra. Jämför den med vad du annars skulle göra med samma tid och resurser.' },
      { title: 'Välj med öppna ögon', body: 'Du behöver inte räkna ut allt exakt. Att namnge det du väljer bort kan räcka för ett bättre beslut.' },
    ],
    deepDive: {
      intro: 'Alternativkostnad hjälper dig jämföra verkliga val. Den handlar om det bästa realistiska alternativ du avstår från, inte om alla tänkbara möjligheter.',
      sections: [
        { title: 'Ställ jämförelsefrågan', body: 'När en möjlighet verkar lockande, fråga vad du annars hade gjort med samma pengar, tid eller uppmärksamhet.', bullets: ['Vad är mitt bästa realistiska alternativ?', 'Vilken resurs är mest begränsad just nu?', 'Vilket val blir svårt att ändra senare?'] },
        { title: 'Undvik låtsasprecision', body: 'I personliga beslut går det sällan att sätta en exakt siffra på allt. Använd begreppet för att synliggöra en avvägning, inte för att låtsas att allt går att mäta.', bullets: ['Skriv upp den största uppoffringen.', 'Jämför samma tidsperiod.', 'Var tydlig med vad du inte vet ännu.'] },
      ],
      tryThis: 'Innan du tackar ja till nästa sak: skriv ”om jag gör detta väljer jag bort …”.',
    },
    quiz: {
      question: 'Vad är alternativkostnaden för ett val?',
      options: ['Summan av alla tänkbara val', 'Värdet av det bästa alternativ du avstår från', 'Bara pengarna du betalar'],
      correctIndex: 1,
      explanation: 'Begreppet pekar på värdet i det bästa realistiska alternativet som inte blev valt.',
    },
  },
  {
    id: 'strategy-8020',
    topicId: 'strategy',
    title: 'Hitta de få saker som gör stor skillnad',
    subtitle: '80/20 är en fråga att undersöka – inte en naturlag.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Resultat är ofta ojämnt fördelade', body: 'En mindre del av aktiviteterna kan stå för en stor del av resultatet – men proportionen varierar.' },
      { title: 'Leta efter mönster', body: 'Undersök vad som faktiskt driver utfallet i din situation i stället för att anta att det alltid är exakt 80/20.' },
      { title: 'Skydda det som fungerar', body: 'Lägg mer fokus på insatser med tydlig effekt, men kontrollera att du inte försummar nödvändigt underhåll.' },
    ],
    deepDive: {
      intro: '80/20-principen är en tumregel för att undersöka ojämna samband. Den är inte en garanti för att just 20 procent ger 80 procent av resultatet.',
      sections: [
        { title: 'Börja med data', body: 'Samla några konkreta observationer innan du bestämmer vad som verkar viktigast. Mät rätt sak och titta på en rimlig tidsperiod.', bullets: ['Vilka uppgifter leder oftast till önskat resultat?', 'Vilka problem återkommer?', 'Vilka mätningar saknas eller är missvisande?'] },
        { title: 'Var uppmärksam på bieffekter', body: 'Att optimera en sak kan skapa problem någon annanstans. En säljinsats som ger fler kunder kan också öka belastningen på supporten.', bullets: ['Kontrollera både nytta och kostnad.', 'Fråga vem som påverkas av förändringen.', 'Behåll nödvändiga uppgifter även om de syns mindre i statistiken.'] },
      ],
      tryThis: 'Välj ett område och skriv ned tre aktiviteter som verkar påverka resultatet mest. Kontrollera dem mot faktiska exempel.',
    },
    quiz: {
      question: 'Hur bör 80/20-principen användas?',
      options: ['Som en exakt regel i alla situationer', 'Som en hypotes att testa mot data', 'Som skäl att sluta med allt underhåll'],
      correctIndex: 1,
      explanation: 'Det är en tumregel som kan hjälpa dig leta efter mönster – inte en universell matematikregel.',
    },
  },
  {
    id: 'strategy-premortem',
    topicId: 'strategy',
    title: 'Gör en pre-mortem före starten',
    subtitle: 'Föreställ dig hindren innan de dyker upp.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Hoppa fram i tiden', body: 'Föreställ dig att projektet misslyckades om sex månader.' },
      { title: 'Skriv möjliga orsaker', body: 'Låt alla skriva ned vad som kan ha gått snett innan ni diskuterar. Då blir fler risker synliga.' },
      { title: 'Gör riskerna hanterbara', body: 'Välj de viktigaste riskerna och bestäm hur ni märker dem tidigt och vem som agerar.' },
    ],
    deepDive: {
      intro: 'En pre-mortem är en kort planeringsövning: i stället för att fråga varför ett projekt kan misslyckas frågar ni vad som orsakade det tänkta misslyckandet.',
      sections: [
        { title: 'Kör övningen enkelt', body: 'Ge alla några minuter att tänka själva innan ni delar. Det minskar risken att den första idén styr hela samtalet.', bullets: ['Sätt en tydlig tidpunkt: ”Vi är sex månader framåt.”', 'Skriv risker utan att värdera dem direkt.', 'Gruppera liknande orsaker efteråt.'] },
        { title: 'Koppla risk till handling', body: 'En lista gör liten nytta utan ägare och nästa steg. Börja med en risk som både är viktig och möjlig att påverka.', bullets: ['Vilken tidig signal kan vi se?', 'Vem följer upp den?', 'Vilken åtgärd minskar risken eller begränsar följden?'] },
      ],
      tryThis: 'Välj ett mål du har framför dig. Skriv tre skäl till att det kanske inte blir av och en motåtgärd för vart och ett.',
    },
    quiz: {
      question: 'Vad är poängen med en pre-mortem?',
      options: ['Bevisa att projektet kommer misslyckas', 'Synliggöra möjliga hinder medan det fortfarande går att agera', 'Hitta en person att skylla på'],
      correctIndex: 1,
      explanation: 'Övningen är till för att upptäcka risker tidigt och planera hur ni ska möta dem.',
    },
  },
  {
    id: 'strategy-andraordning',
    topicId: 'strategy',
    title: 'Tänk ett steg efter konsekvensen',
    subtitle: 'Fråga ”och sedan då?” innan du bestämmer dig.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Första effekten är inte hela bilden', body: 'En lösning kan lösa dagens problem men skapa nya beteenden eller kostnader längre fram.' },
      { title: 'Följ kedjan', body: 'Fråga vad som händer efter den första effekten – och hur andra människor kan reagera.' },
      { title: 'Leta efter återkoppling', body: 'Om följderna förstärker varandra kan ett litet beslut växa. Bestäm hur du följer upp och kan ändra kurs.' },
    ],
    deepDive: {
      intro: 'Andra ordningens tänkande innebär att undersöka följderna av följderna. Det gör beslut mer robusta, särskilt när människor anpassar sig till en ny regel.',
      sections: [
        { title: 'Rita en enkel kedja', body: 'Börja med beslutet, skriv den omedelbara effekten och lägg till minst ett steg till.', bullets: ['Vad händer direkt efter beslutet?', 'Hur kan människor ändra sitt beteende?', 'Vem får en ny kostnad eller ett nytt incitament?'] },
        { title: 'Lägg till en kontrollpunkt', body: 'Du kan inte förutse allt. Gör det därför möjligt att se tidigt om utfallet blev annorlunda än du tänkte.', bullets: ['Välj en signal som går att observera.', 'Bestäm när den ska följas upp.', 'Sätt en gräns för när beslutet ska ändras.'] },
      ],
      tryThis: 'Ta ett beslut du överväger och skriv två rader: ”Först händer … Sedan kan …”.',
    },
    quiz: {
      question: 'Vad frågar andra ordningens tänkande?',
      options: ['Hur känns beslutet just nu?', 'Vad blir följden av den första följden?', 'Vem har rätt?'],
      correctIndex: 1,
      explanation: 'Metoden hjälper dig följa kedjan av effekter i stället för att bara se den första.',
    },
  },
  {
    id: 'strategy-beslutslogg',
    topicId: 'strategy',
    title: 'Skriv en beslutslogg',
    subtitle: 'Lär av resonemanget – inte bara utfallet.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Fånga beslutet när det tas', body: 'Skriv vad du valde och varför, innan du vet hur det kommer att gå.' },
      { title: 'Notera antagandena', body: 'Vad tror du behöver vara sant? Hur säker är du och vad skulle ändra din uppfattning?' },
      { title: 'Återkom senare', body: 'Jämför utfallet med resonemanget. Ett dåligt utfall kan följa av ett rimligt beslut – och tvärtom.' },
    ],
    deepDive: {
      intro: 'Minnet färgas lätt av hur det gick. En kort beslutslogg gör det enklare att se om du tänkte klart med den information du hade då.',
      sections: [
        { title: 'Skriv bara det viktiga', body: 'Loggen behöver vara kort nog att du faktiskt använder den. Fokusera på beslut som är viktiga eller återkommer.', bullets: ['Beslut och datum.', 'Alternativ du övervägde.', 'Viktigaste antaganden och vad du var osäker på.'] },
        { title: 'Lär från processen', body: 'När du följer upp, skilj mellan kvaliteten på beslutet och turen i utfallet. Leta efter mönster över flera beslut.', bullets: ['Vilken information saknades?', 'Var sannolikheten rimligt bedömd?', 'Vad skulle du göra likadant eller annorlunda nästa gång?'] },
      ],
      tryThis: 'Skriv ned ett litet beslut du tar i dag och en signal som visar om ditt antagande stämde.',
    },
    quiz: {
      question: 'Varför skriva ned ett beslut innan du vet utfallet?',
      options: ['För att alltid kunna bevisa att du hade rätt', 'För att minnet annars kan färgas av hur det gick', 'För att slippa ompröva beslut'],
      correctIndex: 1,
      explanation: 'En logg gör resonemanget synligt innan efterklokhet färgar minnet.',
    },
  },
  {
    id: 'leadership-delegera',
    topicId: 'leadership',
    title: 'Delegera ett resultat, inte bara en uppgift',
    subtitle: 'Ge frihet inom tydliga ramar.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Beskriv vad som ska bli klart', body: 'Förklara vilket resultat som behövs och varför det spelar roll.' },
      { title: 'Var tydlig med ramarna', body: 'Dela deadline, resurser, mandat och sådant som inte får ändras.' },
      { title: 'Bestäm en avstämning', body: 'Kom överens om när ni följer upp. Delegera arbetet utan att överge personen.' },
    ],
    deepDive: {
      intro: 'Tydlig delegering ger någon annan möjlighet att ta ansvar utan att behöva gissa vad som är viktigt. Rätt nivå av frihet beror på uppgiften och erfarenheten.',
      sections: [
        { title: 'Kom överens om uppdraget', body: 'Beskriv önskat resultat, tidsram och vilka beslut personen får fatta själv.', bullets: ['Vad ska vara annorlunda när uppgiften är klar?', 'Vilka begränsningar eller beroenden finns?', 'Vem kan hjälpa till om något kör fast?'] },
        { title: 'Följ upp utan att detaljstyra', body: 'En avstämning ska göra det lättare att be om stöd tidigt. Anpassa hur ofta ni ses efter risk och erfarenhet.', bullets: ['Bestäm tidpunkt och format tillsammans.', 'Fråga vad som går bra och vad som blockerar.', 'Ge mandat tillbaka när personen är redo.'] },
      ],
      tryThis: 'Nästa gång du delegerar: säg önskat resultat, en tydlig ram och när ni stämmer av.',
    },
    quiz: {
      question: 'Vad behöver en tydlig delegering innehålla?',
      options: ['Bara en deadline', 'Resultat, ramar och en avstämning', 'Detaljstyrning av varje steg'],
      correctIndex: 1,
      explanation: 'Tydlighet i resultat och ramar kombinerat med stöd gör det lättare att ta eget ansvar.',
    },
  },
  {
    id: 'leadership-feedback',
    topicId: 'leadership',
    title: 'Ge feedback som går att använda',
    subtitle: 'Beskriv beteende och effekt – inte personlighet.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Var konkret', body: 'Beskriv en faktisk situation och ett observerbart beteende i stället för att sätta en etikett på personen.' },
      { title: 'Förklara effekten', body: 'Säg vad beteendet ledde till eller hur det påverkade arbetet.' },
      { title: 'Bjud in till samtal', body: 'Fråga hur personen såg på situationen. Feedback blir bättre när den blir en dialog.' },
    ],
    deepDive: {
      intro: 'En enkel modell är situation, beteende och påverkan. Den hjälper dig hålla samtalet nära det som faktiskt hände.',
      sections: [
        { title: 'Beskriv utan att döma', body: 'Välj en färsk händelse och var så specifik du kan. Undvik ord som alltid, aldrig eller lat.', bullets: ['Situation: när och var?', 'Beteende: vad kunde någon se eller höra?', 'Påverkan: vad blev följden för arbetet eller andra?'] },
        { title: 'Skapa en tvåvägsdialog', body: 'Säg vad du önskar framåt och fråga efter personens perspektiv. Ta känsliga samtal enskilt och med respekt.', bullets: ['Var tydlig med vad du vill se mer eller mindre av.', 'Lyssna på sammanhang du inte kände till.', 'Kom överens om ett nästa steg och följ upp.'] },
      ],
      tryThis: 'Skriv ett feedbackexempel i tre delar: situation, observerbart beteende, påverkan.',
    },
    quiz: {
      question: 'Vilken återkoppling är enklast att agera på?',
      options: ['”Du är alltid slarvig.”', '”I rapporten i går saknades källan, så jag kunde inte kontrollera siffran.”', '”Skärp dig.”'],
      correctIndex: 1,
      explanation: 'Den beskriver en situation, ett konkret beteende och en faktisk påverkan.',
    },
  },
  {
    id: 'leadership-en-till-en',
    topicId: 'leadership',
    title: 'Håll ett enskilt samtal som hjälper',
    subtitle: 'Ställ öppna frågor och lämna plats för svaret.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Börja med personen', body: 'Fråga vad som känns viktigast att prata om i dag i stället för att börja med din färdiga agenda.' },
      { title: 'Lyssna före lösningen', body: 'Ge personen tid att tänka färdigt. Fråga om de vill bolla eller vill ha hjälp att lösa något.' },
      { title: 'Avsluta med nästa steg', body: 'Sammanfatta vad ni kom överens om och vem som gör vad.' },
    ],
    deepDive: {
      intro: 'Ett återkommande enskilt samtal kan skapa utrymme för hinder, utveckling och tydlighet. Samtalet behöver anpassas efter person och situation.',
      sections: [
        { title: 'Frågor som öppnar', body: 'Öppna frågor gör det lättare att förstå läget innan du föreslår en lösning.', bullets: ['Vad har varit mest givande sedan sist?', 'Vad står i vägen för det viktigaste just nu?', 'Vilket stöd skulle göra störst skillnad?'] },
        { title: 'Gör uppföljningen gemensam', body: 'Ett bra samtal får en fortsättning. Skriv ned få, tydliga överenskommelser och följ upp dem nästa gång.', bullets: ['Sammanfatta vad du hört.', 'Fråga om ni förstått varandra rätt.', 'Bestäm ansvar och när ni återkommer.'] },
      ],
      tryThis: 'Byt ut ”Har du några problem?” mot ”Vad tar mest energi i arbetet just nu?”.',
    },
    quiz: {
      question: 'Vad är ett bra första steg i ett enskilt samtal?',
      options: ['Ge lösningen direkt', 'Fråga vad personen vill använda tiden till', 'Läsa upp hela agendan'],
      correctIndex: 1,
      explanation: 'En öppen start gör det lättare att möta det som faktiskt är viktigast.',
    },
  },
  {
    id: 'leadership-trygghet',
    topicId: 'leadership',
    title: 'Bygg trygghet utan att sänka ribban',
    subtitle: 'Trygghet gör det lättare att säga vad som behövs.',
    minutes: 4,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Gör frågor välkomna', body: 'I ett tryggt team kan människor säga ”jag vet inte” eller lyfta en risk utan att förödmjukas.' },
      { title: 'Behåll ansvar och riktning', body: 'Trygghet betyder inte att alla beteenden är okej eller att resultat saknar betydelse.' },
      { title: 'Visa vägen själv', body: 'Be om invändningar, tacka för tidiga problem och visa att du också kan ändra dig.' },
    ],
    deepDive: {
      intro: 'Psykologisk trygghet handlar om hur möjligt det känns att ta mellanmänskliga risker, som att ställa frågor eller erkänna ett misstag. Den ersätter inte tydliga mål eller ansvar.',
      sections: [
        { title: 'Skapa utrymme att bidra', body: 'Ledare sätter tonen genom hur de reagerar när någon ifrågasätter ett beslut eller berättar om ett misstag.', bullets: ['Be uttryckligen om avvikande perspektiv.', 'Tacka för att problem lyfts tidigt.', 'Skilj mellan ett ärligt misstag och ett återkommande beteende som behöver hanteras.'] },
        { title: 'Kombinera trygghet med tydlighet', body: 'Team mår bra av att veta både vad som förväntas och att det går att be om hjälp när något är oklart.', bullets: ['Gör mål och roller begripliga.', 'Följ upp överenskommelser konsekvent.', 'Diskutera problem sakligt och respektfullt.'] },
      ],
      tryThis: 'På nästa möte: bjud in en invändning innan ni fattar beslut och tacka den som delar den.',
    },
    quiz: {
      question: 'Vad betyder psykologisk trygghet i ett team?',
      options: ['Att ingen behöver ta ansvar', 'Att det går att ta mellanmänskliga risker utan förödmjukelse', 'Att alla alltid tycker lika'],
      correctIndex: 1,
      explanation: 'Trygghet gör det möjligt att fråga, säga emot och lära – samtidigt som teamet behåller ansvar.',
    },
  },
  {
    id: 'leadership-mote',
    topicId: 'leadership',
    title: 'Gör mötet värt allas tid',
    subtitle: 'Boka beslut – inte bara en tidslucka.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Skriv syftet först', body: 'Behöver ni fatta beslut, lösa ett problem eller bara dela information? Välj det tydligaste målet.' },
      { title: 'Bjud in rätt personer', body: 'Ta med dem som behövs för beslutet eller arbetet. Skicka underlag i förväg när det hjälper.' },
      { title: 'Avsluta med ansvar', body: 'Sammanfatta beslut, ansvarig och datum. Om inget kräver samtal kanske ett meddelande räcker.' },
    ],
    deepDive: {
      intro: 'Ett möte kostar allas samlade tid. En tydlig avsikt hjälper gruppen förbereda sig och gör det lättare att avgöra om synkron tid behövs.',
      sections: [
        { title: 'Gör agendan beslutsbar', body: 'Skriv vad deltagarna ska kunna göra efter mötet. Ge varje punkt en ägare och en rimlig tidsram.', bullets: ['Syfte och önskat utfall.', 'Vilket underlag deltagarna behöver.', 'Vilka frågor som måste avgöras tillsammans.'] },
        { title: 'Stäng loopen', body: 'Skilj på beslut, diskussion och öppna frågor. Dokumentera det som behövs för att arbetet ska fortsätta.', bullets: ['Beslut: vad bestämdes?', 'Ansvar: vem gör vad?', 'Uppföljning: när vet ni om det fungerade?'] },
      ],
      tryThis: 'Skriv om nästa mötesinbjudan så att den börjar med ”Efter mötet ska vi ha …”.',
    },
    quiz: {
      question: 'Vad bör en mötesinbjudan göra tydligt?',
      options: ['Syfte, önskat utfall och deltagarnas roll', 'Bara starttid', 'En så lång agenda som möjligt'],
      correctIndex: 0,
      explanation: 'Tydligt syfte och utfall hjälper deltagarna förbereda sig och avgöra om mötet behövs.',
    },
  },
  {
    id: 'communication-budskap',
    topicId: 'communication',
    title: 'Börja med det viktigaste',
    subtitle: 'Gör det lätt att förstå vad du behöver.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Säg poängen tidigt', body: 'Läsaren ska förstå vad meddelandet gäller innan de behöver plöja hela bakgrunden.' },
      { title: 'Lägg till det som behövs', body: 'Beskriv kort varför det spelar roll, vad som redan är känt och vad som fortfarande är oklart.' },
      { title: 'Gör nästa steg synligt', body: 'Säg vem du behöver svar från, vad de ska göra och när det behövs.' },
    ],
    deepDive: {
      intro: 'En enkel struktur för tydliga meddelanden är: huvudpoäng, relevant sammanhang och önskat nästa steg. Anpassa detaljnivån efter mottagaren.',
      sections: [
        { title: 'Skriv för mottagarens fråga', body: 'Börja med vad mottagaren behöver veta eller göra. Bakgrund är värdefull när den hjälper beslutet, inte för att den alltid ska stå först.', bullets: ['Vad är budskapet i en mening?', 'Vilken kontext behöver läsaren?', 'Vad ska hända efter att de läst?'] },
        { title: 'Gör nästa steg konkret', body: 'Ett tydligt önskemål minskar risken att ett meddelande leder till ännu fler frågor.', bullets: ['Skriv en ansvarig person eller grupp.', 'Ange ett datum när det behövs.', 'Säg om du vill ha beslut, återkoppling eller bara information.'] },
      ],
      tryThis: 'Ta ett mejl du ska skicka. Flytta önskemålet till första stycket och gör tidsramen tydlig.',
    },
    quiz: {
      question: 'Vilken ordning gör ofta ett arbetsmeddelande lättare att agera på?',
      options: ['Lång bakgrund, sedan kanske en fråga', 'Huvudpoäng, relevant sammanhang, nästa steg', 'Bara en vag rubrik'],
      correctIndex: 1,
      explanation: 'Läsaren får snabbt veta varför meddelandet kom och vad som behövs.',
    },
  },
  {
    id: 'communication-lyssna',
    topicId: 'communication',
    title: 'Lyssna så att den andra märker det',
    subtitle: 'Förstå först – formulera svaret sedan.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Lägg undan nästa replik', body: 'När du planerar ditt svar medan den andra talar missar du lätt sammanhanget.' },
      { title: 'Sammanfatta kort', body: 'Återge med egna ord vad du tror att du hört. Då kan personen rätta dig innan ni går vidare.' },
      { title: 'Ställ en öppen fråga', body: 'Fråga vad som är viktigast eller vad som saknas. Lyssnande betyder inte att du måste hålla med.' },
    ],
    deepDive: {
      intro: 'Aktivt lyssnande visar att du försöker förstå den andres perspektiv. Det är en dialogfärdighet, inte ett löfte om att alltid säga ja.',
      sections: [
        { title: 'Visa att du följer med', body: 'Låt personen prata färdigt och kontrollera sedan din förståelse innan du föreslår en lösning.', bullets: ['Sammanfatta huvudpoängen utan att lägga till din tolkning.', 'Fråga ”har jag förstått dig rätt?”.', 'Låt pauser finnas så att fler tankar får plats.'] },
        { title: 'Skilj mellan förståelse och enighet', body: 'Du kan bekräfta vad någon menar och ändå ha en annan uppfattning. Att förstå först gör oenighet mer saklig.', bullets: ['Bekräfta det du faktiskt hört.', 'Ställ följdfrågor i stället för att anta.', 'Berätta sedan tydligt vad du själv ser annorlunda.'] },
      ],
      tryThis: 'I nästa samtal: sammanfatta den andres poäng i en mening innan du svarar.',
    },
    quiz: {
      question: 'Vad hjälper dig kontrollera att du förstått?',
      options: ['Avbryta med din lösning', 'Sammanfatta och fråga om det stämmer', 'Byta ämne snabbt'],
      correctIndex: 1,
      explanation: 'En kort sammanfattning ger den andra personen chans att bekräfta eller rätta din förståelse.',
    },
  },
  {
    id: 'communication-oe',
    topicId: 'communication',
    title: 'Var oense utan att göra det personligt',
    subtitle: 'Sätt ord på sakfrågan och visa ditt resonemang.',
    minutes: 3,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Beskriv vad du ser', body: 'Säg vilken del av förslaget du reagerar på i stället för att bedöma personen som föreslog det.' },
      { title: 'Förklara varför', body: 'Knyt din invändning till ett mål, en risk eller ett underlag som ni kan undersöka tillsammans.' },
      { title: 'Bjud in en lösning', body: 'Fråga vad som skulle behöva vara sant för att du ska känna dig tryggare med förslaget.' },
    ],
    deepDive: {
      intro: 'Saklig oenighet kan förbättra beslut när gruppen kan undersöka idéer utan att göra dem till personliga konflikter.',
      sections: [
        { title: 'Använd en respektfull struktur', body: 'Beskriv din bild, skälet till att du ser en risk och vad som skulle hjälpa er komma vidare.', bullets: ['”Jag ser det annorlunda på den här punkten …”', '”Min oro är … eftersom …”', '”Vilken information skulle hjälpa oss avgöra det?”'] },
        { title: 'Håll dörren öppen', body: 'Var beredd att ändra dig när underlaget ändras. Om frågan är värderingsstyrd kan ni behöva säga vilken avvägning ni gör.', bullets: ['Skilj fakta från antaganden.', 'Be om ett exempel eller motargument.', 'Sammanfatta vad ni fortfarande är oense om.'] },
      ],
      tryThis: 'Skriv om en invändning genom att börja med ”Min oro är … eftersom …”.',
    },
    quiz: {
      question: 'Vad gör en invändning mer konstruktiv?',
      options: ['Att bedöma den som föreslog idén', 'Att koppla invändningen till en konkret risk eller ett mål', 'Att undvika att förklara sig'],
      correctIndex: 1,
      explanation: 'En konkret sakfråga går att undersöka tillsammans utan att bedöma personen.',
    },
  },
  {
    id: 'communication-forhandling',
    topicId: 'communication',
    title: 'Förhandla om behov – inte bara positioner',
    subtitle: 'Bakom ett krav kan det finnas flera möjliga lösningar.',
    minutes: 4,
    level: 'Medel',
    xp: 20,
    slides: [
      { title: 'Skilj önskemål från behov', body: '”Jag vill ha fredag” är en position. Behovet bakom kan vara återhämtning, ansvar eller en deadline.' },
      { title: 'Utforska den andres skäl', body: 'Ställ frågor innan du föreslår en kompromiss. Samma behov kan ibland mötas på flera sätt.' },
      { title: 'Bestäm hur ni följer upp', body: 'Skriv vad ni kom överens om och när ni ska se om lösningen fungerar.' },
    ],
    deepDive: {
      intro: 'En intressebaserad förhandling försöker förstå vad som är viktigt för parterna innan man låser sig vid en viss lösning.',
      sections: [
        { title: 'Kartlägg intressena', body: 'Flera personer kan vilja olika saker av legitima skäl. Att förstå skälen betyder inte att alla önskemål måste uppfyllas.', bullets: ['Vad försöker varje part skydda eller uppnå?', 'Vilka delar är krav och vilka är önskemål?', 'Vilka objektiva kriterier kan hjälpa er jämföra förslag?'] },
        { title: 'Skapa och pröva alternativ', body: 'Ta fram fler än ett möjligt upplägg innan ni väljer. Var tydlig med vad du kan lova och vad som behöver förankras.', bullets: ['Sök lösningar som möter flera behov.', 'Sätt tydliga gränser för ditt mandat.', 'Dokumentera överenskommelsen och en uppföljning.'] },
      ],
      tryThis: 'I en aktuell förhandling: fråga ”Vad är viktigast för dig med just den lösningen?”.',
    },
    quiz: {
      question: 'Varför fråga efter behovet bakom ett önskemål?',
      options: ['För att hitta fler möjliga lösningar', 'För att övertala den andra snabbare', 'För att slippa vara tydlig med ditt eget mandat'],
      correctIndex: 0,
      explanation: 'När ni förstår intressena kan det finnas fler alternativ än de första två positionerna.',
    },
  },
  {
    id: 'communication-presentation',
    topicId: 'communication',
    title: 'Berätta så att idén fastnar',
    subtitle: 'En enkel röd tråd gör innehållet lättare att följa.',
    minutes: 3,
    level: 'Start',
    xp: 20,
    slides: [
      { title: 'Börja med varför', body: 'Säg vilket problem eller vilken möjlighet publiken ska förstå.' },
      { title: 'Visa vägen till förslaget', body: 'Välj några få poänger som leder från nuläge till din idé. Ett konkret exempel gör resonemanget lättare att se.' },
      { title: 'Avsluta med en fråga', body: 'Berätta vilket beslut eller nästa steg du önskar. Lämna utrymme för frågor.' },
    ],
    deepDive: {
      intro: 'En presentation behöver hjälpa publiken förstå vad som står på spel och vad de förväntas göra. En tydlig struktur är viktigare än många bilder.',
      sections: [
        { title: 'Bygg en enkel berättelse', body: 'Ordna innehållet så att varje del besvarar en fråga för publiken.', bullets: ['Varför är ämnet viktigt nu?', 'Vad behöver vi förstå?', 'Vilket förslag eller beslut följer av det?'] },
        { title: 'Gör det lätt att följa', body: 'Använd exempel och visuellt material som stödjer budskapet, inte konkurrerar med det.', bullets: ['En huvudpoäng per bild eller avsnitt.', 'Skriv rubriker som uttrycker slutsatsen.', 'Avsluta med ett tydligt nästa steg.'] },
      ],
      tryThis: 'Skriv presentationens budskap i en enda mening innan du öppnar ett bildspel.',
    },
    quiz: {
      question: 'Vad bör komma tidigt i en tydlig presentation?',
      options: ['Varför frågan är viktig för publiken', 'Alla detaljer och bilagor', 'En lista på alla som arbetat med materialet'],
      correctIndex: 0,
      explanation: 'Publiken får en ram för resten av innehållet när syftet blir tydligt från början.',
    },
  },
]

export const lessons: LearningCard[] = [...authoredLessons, ...generatedLessons]

export function getTopic(topicId: TopicId): Topic {
  const topic = topics.find((item) => item.id === topicId)

  if (!topic) {
    throw new Error(`Okänt ämne: ${topicId}`)
  }

  return topic
}
