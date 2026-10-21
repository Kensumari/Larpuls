import type { LearningCard, TopicId } from './learning'

interface LearningUnit {
  focus: string
  principle: string
  example: string
  action: string
}

interface PracticeFormat {
  title: string
  prompt: string
  rationale: string
  answer: string
}

interface TopicCurriculum {
  topicId: TopicId
  label: string
  units: LearningUnit[]
}

function unit(focus: string, principle: string, example: string, action: string): LearningUnit {
  return { focus, principle, example, action }
}

const practiceFormats: PracticeFormat[] = [
  { title: 'Sammanfatta med egna ord', prompt: 'Skriv huvudpoängen i en enda mening.', rationale: 'En egen sammanfattning visar om kärnan blivit begriplig.', answer: 'Återge huvudpoängen kort utan att ändra dess innebörd.' },
  { title: 'Förklara för en nybörjare', prompt: 'Beskriv idén utan fackord och lägg till ett exempel.', rationale: 'En enkel förklaring synliggör vad som behöver bli tydligare.', answer: 'Använd vardagligt språk och ett relevant exempel.' },
  { title: 'Rita sambanden', prompt: 'Rita tre rutor och visa hur de påverkar varandra.', rationale: 'En enkel karta gör relationer och beroenden lättare att se.', answer: 'Visa sambanden mellan de viktigaste delarna, inte bara en lista.' },
  { title: 'Ge ett konkret exempel', prompt: 'Skriv ett exempel från en situation du känner igen.', rationale: 'Ett konkret fall gör en abstrakt princip lättare att pröva.', answer: 'Koppla principen till en verklig eller tydligt påhittad situation.' },
  { title: 'Hitta ett motexempel', prompt: 'Fundera på när regeln inte skulle fungera som tänkt.', rationale: 'Ett motexempel hjälper dig förstå principens gränser.', answer: 'Pröva när påståendet inte gäller och vilka villkor som ändras.' },
  { title: 'Jämför två alternativ', prompt: 'Jämför två val utifrån samma mål och förutsättningar.', rationale: 'En rättvis jämförelse synliggör vad du faktiskt byter bort.', answer: 'Jämför alternativen mot samma kriterier och tidsperspektiv.' },
  { title: 'Gör en minilista', prompt: 'Skriv tre punkter som hjälper dig att minnas det viktigaste.', rationale: 'En kort lista blir användbar när den går att använda i stunden.', answer: 'Välj få, konkreta punkter som stödjer ett verkligt nästa steg.' },
  { title: 'Skapa en om–så-regel', prompt: 'Fyll i: ”Om ___ händer, så ska jag ___.”', rationale: 'En tydlig signal kopplad till en handling gör planen lättare att följa.', answer: 'Knyt en igenkännbar situation till en realistisk handling.' },
  { title: 'Prioritera tre saker', prompt: 'Välj den viktigaste saken, den näst viktigaste och det som kan vänta.', rationale: 'Prioritering hjälper dig använda begränsad tid medvetet.', answer: 'Utgå från målet och välj vad som gör störst skillnad först.' },
  { title: 'Bestäm nästa steg', prompt: 'Skriv en handling som tar högst tio minuter att börja med.', rationale: 'Ett litet första steg minskar tröskeln mellan idé och handling.', answer: 'Välj en konkret, genomförbar handling i stället för ett vagt mål.' },
  { title: 'Gör en tvåminutersövning', prompt: 'Prova en mycket liten version av färdigheten i två minuter.', rationale: 'En kort testomgång ger erfarenhet utan att kräva en stor plan.', answer: 'Börja smått, observera resultatet och bestäm sedan om du ska fortsätta.' },
  { title: 'Testa dig själv utan stöd', prompt: 'Vänd bort blicken och återberätta de viktigaste stegen ur minnet.', rationale: 'Att försöka plocka fram kunskap visar vad du minns och vad du behöver repetera.', answer: 'Försök återkalla först och kontrollera sedan mot underlaget.' },
  { title: 'Planera en repetition', prompt: 'Bestäm när du ska återkomma till idén och hur du ska testa minnet.', rationale: 'Återbesök över tid hjälper dig se vad som sitter kvar.', answer: 'Lägg in en framtida repetition med en aktiv fråga, inte bara omläsning.' },
  { title: 'Dela upp i mindre delar', prompt: 'Dela upp uppgiften i tre delar som går att göra var för sig.', rationale: 'Mindre delar gör ett stort problem lättare att överblicka.', answer: 'Skapa tydliga delsteg och börja med det som låser upp resten.' },
  { title: 'Planera bakifrån', prompt: 'Börja med önskat resultat och räkna bakåt till första steget.', rationale: 'Baklängesplanering gör beroenden och tidsbehov synliga.', answer: 'Utgå från slutresultatet och identifiera vad som måste vara klart före det.' },
  { title: 'Utmana ett antagande', prompt: 'Skriv ned ett antagande och vad du skulle behöva se för att ändra dig.', rationale: 'Synliga antaganden går att undersöka i stället för att behandla som fakta.', answer: 'Gör antagandet tydligt och bestäm vilket underlag som kan pröva det.' },
  { title: 'Leta efter belägg', prompt: 'Hitta det bästa underlaget för och emot ett påstående.', rationale: 'Flera relevanta belägg ger en mer balanserad bild än en snabb magkänsla.', answer: 'Sök underlag som faktiskt stödjer eller motsäger påståendet.' },
  { title: 'Skriv ned osäkerheten', prompt: 'Skriv vad du vet, vad du antar och vad du ännu inte vet.', rationale: 'Att skilja kunskap från antaganden gör nästa fråga tydligare.', answer: 'Markera osäkerheten öppet i stället för att dölja den med säker ton.' },
  { title: 'Hitta en annan förklaring', prompt: 'Formulera en ytterligare rimlig förklaring till det du observerat.', rationale: 'Alternativa förklaringar minskar risken att låsa sig vid första tolkningen.', answer: 'Jämför flera rimliga förklaringar innan du drar en slutsats.' },
  { title: 'Gör en riskcheck', prompt: 'Skriv vad som kan gå fel, hur du märker det och vad du gör då.', rationale: 'En enkel riskplan gör det lättare att agera om något oväntat inträffar.', answer: 'Beskriv en konkret risk, en varningssignal och ett säkert nästa steg.' },
  { title: 'Byt perspektiv', prompt: 'Beskriv hur situationen kan se ut för någon som påverkas av beslutet.', rationale: 'Ett annat perspektiv kan visa behov eller konsekvenser du missat.', answer: 'Ta reda på hur beslutet påverkar andra i stället för att gissa.' },
  { title: 'Ställ en bättre fråga', prompt: 'Skriv om en bred fråga så att den går att undersöka eller besvara.', rationale: 'En avgränsad fråga gör det lättare att hitta relevant information.', answer: 'Formulera en tydlig fråga med ett avgränsat ämne och sammanhang.' },
  { title: 'Lär ut till någon', prompt: 'Förklara idén för en annan person och be dem säga vad som var oklart.', rationale: 'Att lära ut synliggör luckor och ger chans att förtydliga.', answer: 'Förklara med egna ord och kontrollera om mottagaren förstått.' },
  { title: 'Be om återkoppling', prompt: 'Be någon svara på en tydlig fråga om det du har gjort.', rationale: 'En konkret fråga ger återkoppling som går att använda.', answer: 'Be om specifik återkoppling kopplad till ett mål eller en del av arbetet.' },
  { title: 'Använd återkoppling', prompt: 'Välj en synpunkt att testa och skriv hur du ser om ändringen hjälper.', rationale: 'En liten prövning skiljer användbar återkoppling från en ändring på chans.', answer: 'Testa en konkret ändring och följ upp dess effekt.' },
  { title: 'Jämför före och efter', prompt: 'Skriv hur läget ser ut nu och vad du vill kunna se efteråt.', rationale: 'En utgångspunkt gör förändring lättare att bedöma.', answer: 'Jämför mot en tydlig utgångspunkt med samma mått.' },
  { title: 'Välj ett mått', prompt: 'Bestäm en enkel observation som visar om nästa steg fungerade.', rationale: 'Ett relevant mått hjälper dig skilja aktivitet från resultat.', answer: 'Mät något som speglar målet och tolka måttet med sammanhang.' },
  { title: 'Förenkla ett steg', prompt: 'Ta bort eller förtydliga en del som inte hjälper dig nå målet.', rationale: 'Färre onödiga steg gör en bra lösning lättare att använda.', answer: 'Behåll det som bidrar till målet och förenkla resten.' },
  { title: 'Bygg en första prototyp', prompt: 'Gör en enkel version som går att prova och lära sig av.', rationale: 'En liten prototyp kan avslöja problem innan du investerar mer tid.', answer: 'Testa en begränsad version och använd resultatet för att förbättra den.' },
  { title: 'Koppla en påminnelse', prompt: 'Välj en befintlig rutin som kan påminna dig om nästa handling.', rationale: 'En tydlig signal minskar behovet av att komma ihåg planen i stunden.', answer: 'Koppla handlingen till en stabil och igenkännbar signal.' },
  { title: 'Ta bort ett hinder', prompt: 'Gör det önskade nästa steget lite enklare att starta.', rationale: 'Mindre startmotstånd gör en hållbar vana lättare att upprepa.', answer: 'Förbered det du behöver och minska onödiga startsteg.' },
  { title: 'Sätt en tydlig gräns', prompt: 'Skriv vad du kan göra, vad du inte kan göra och vad du behöver.', rationale: 'En tydlig gräns gör förväntningar lättare att förstå och respektera.', answer: 'Beskriv gränsen konkret och kommunicera den på ett respektfullt sätt.' },
  { title: 'Gör en enkel beslutsmatris', prompt: 'Välj tre kriterier och jämför alternativen mot dem.', rationale: 'Tydliga kriterier gör beslutsunderlaget mer jämförbart.', answer: 'Välj relevanta kriterier före du jämför alternativen.' },
  { title: 'Bestäm en stoppsignal', prompt: 'Skriv vilken signal som betyder att du ska pausa och ompröva.', rationale: 'En förutbestämd stoppsignal hjälper dig undvika att fortsätta på autopilot.', answer: 'Bestäm i förväg när det är klokt att pausa, kontrollera eller be om hjälp.' },
  { title: 'Gör en efterhandskoll', prompt: 'Jämför vad du trodde skulle hända med vad som faktiskt hände.', rationale: 'En kort återblick gör erfarenheten användbar nästa gång.', answer: 'Jämför plan och utfall utan att döma och notera vad du lärde dig.' },
  { title: 'Skriv ett kort manus', prompt: 'Formulera en mening du kan använda när situationen uppstår.', rationale: 'Ett förberett uttryck gör det lättare att vara tydlig under press.', answer: 'Förbered ett respektfullt och konkret budskap för den aktuella situationen.' },
  { title: 'Skapa en miniguide', prompt: 'Skriv tre ord eller begrepp som behöver en kort förklaring.', rationale: 'En liten ordlista minskar risken för olika tolkningar.', answer: 'Förklara centrala begrepp med korta och begripliga definitioner.' },
  { title: 'Koppla till något du kan', prompt: 'Jämför den nya idén med något du redan känner till och notera skillnaden.', rationale: 'En koppling kan göra ny kunskap lättare att förstå och minnas.', answer: 'Använd tidigare kunskap som stöd men kontrollera också vad som skiljer sig.' },
  { title: 'Skapa en analogi', prompt: 'Hitta en vardagsjämförelse och skriv var den fungerar och var den brister.', rationale: 'En analogi kan förklara en idé om dess begränsningar också blir tydliga.', answer: 'Använd jämförelsen som stöd, inte som bevis för att två saker är identiska.' },
  { title: 'Spela upp ett scenario', prompt: 'Beskriv ett tänkbart scenario och välj vad du skulle göra först.', rationale: 'En övning i förväg gör val och konsekvenser lättare att upptäcka.', answer: 'Pröva ett realistiskt scenario och motivera ditt första steg.' },
  { title: 'Förbered ett svårt läge', prompt: 'Tänk ut hur du kan pausa, kontrollera fakta eller söka stöd om det blir svårt.', rationale: 'En förberedd reservplan kan hjälpa när förutsättningarna förändras.', answer: 'Planera ett säkert alternativ om den första planen inte fungerar.' },
  { title: 'Leta efter en tidig signal', prompt: 'Skriv vilken liten förändring som kan visa att något behöver uppmärksamhet.', rationale: 'Tidiga signaler kan ge tid att undersöka innan ett problem växer.', answer: 'Välj en observerbar signal och bestäm vad du gör om den dyker upp.' },
  { title: 'Välj en tillförlitlig källa', prompt: 'Hitta en källa med tydlig avsändare, relevant kompetens och öppet underlag.', rationale: 'Källans ursprung och underlag hjälper dig bedöma vad den kan stödja.', answer: 'Kontrollera avsändare, underlag och om källan passar frågan.' },
  { title: 'Kontrollera datum och sammanhang', prompt: 'Ta reda på när informationen publicerades och vad den faktiskt handlar om.', rationale: 'Gammal eller lösryckt information kan ge en missvisande bild.', answer: 'Kontrollera datum och läs tillräckligt av originalet för att förstå sammanhanget.' },
  { title: 'Planera en paus', prompt: 'Välj en kort återhämtning och bestäm vad som blir första steget efter den.', rationale: 'En tydlig övergång gör pausen lättare att använda och avsluta.', answer: 'Gör pausen enkel och bestäm en konkret återstart.' },
  { title: 'Anpassa till dina ramar', prompt: 'Skriv vilka tids-, kunskaps- eller resursgränser du behöver ta hänsyn till.', rationale: 'En plan fungerar bättre när den utgår från verkliga förutsättningar.', answer: 'Anpassa steget efter dina resurser och var tydlig med begränsningarna.' },
  { title: 'Välj vad du kan sluta göra', prompt: 'Identifiera en aktivitet som tar tid men inte hjälper det viktigaste målet.', rationale: 'Att välja bort kan skapa mer utrymme än att försöka hinna allt.', answer: 'Välj bort något med låg nytta och kontrollera följden av beslutet.' },
  { title: 'Dela din lärdom', prompt: 'Skriv en sak du lärt dig och vem den kan vara till nytta för.', rationale: 'En kort delning hjälper dig formulera lärdomen och sprida den vidare.', answer: 'Dela en konkret och relevant lärdom utan att överdriva vad den visar.' },
  { title: 'Planera en uppföljning', prompt: 'Bestäm när du ska se tillbaka på resultatet och vad du vill lära dig då.', rationale: 'En planerad uppföljning hjälper dig justera utifrån erfarenhet.', answer: 'Sätt en rimlig tid för uppföljning och välj en tydlig lärfråga.' },
  { title: 'Välj nästa lärfråga', prompt: 'Skriv en fråga som skulle hjälpa dig ta nästa steg i ämnet.', rationale: 'En avgränsad följdfråga gör fortsatt lärande mer målinriktat.', answer: 'Välj en fråga som går att undersöka och som bygger vidare på det du vet.' },
]

const topicCurriculums: TopicCurriculum[] = [
  {
    topicId: 'ai',
    label: 'AI & teknik',
    units: [
      unit('Språkmodeller och sannolikhet', 'En språkmodell skapar text utifrån mönster och sannolika fortsättningar; den verifierar inte automatiskt varje uppgift.', 'Ett svar kan låta säkert men ändå ange fel årtal eller namn.', 'Be om underlag och kontrollera viktiga påståenden i originalkällan.'),
      unit('Tydliga instruktioner', 'Ett tydligt mål, relevant sammanhang och önskat format ger ett verktyg bättre förutsättningar att hjälpa.', '”Sammanfatta för en ny kollega i fem punkter” är lättare att följa än ”förklara”.', 'Ange uppgift, mottagare, format och viktiga begränsningar.'),
      unit('Verifiera källor', 'En hänvisning är bara användbar om källan finns och faktiskt stödjer påståendet.', 'En länk kan leda till en riktig webbplats men ändå inte belägga slutsatsen.', 'Öppna originalkällan och kontrollera datum, citat och sammanhang.'),
      unit('Integritet och dataminimering', 'Dela bara den information som behövs och följ reglerna för tjänsten och organisationen.', 'Ett mejl kan ofta anonymiseras innan du ber om hjälp med tonen.', 'Ta bort identifierande uppgifter och använd godkända verktyg.'),
      unit('Snedvridning och representativitet', 'Träningsdata, urval och designval kan påverka vilka perspektiv ett AI-svar visar.', 'Ett rekryteringsutkast kan oavsiktligt beskriva en smal bild av vem som passar.', 'Granska svar med varierade exempel och kontrollera vem som riskerar att missgynnas.'),
      unit('Mänsklig granskning', 'Människor behöver bedöma kvalitet och konsekvenser när ett resultat påverkar viktiga beslut.', 'Ett automatiskt förslag kan behöva kontrolleras mot regler och den berördas situation.', 'Bestäm vem som granskar resultatet och vilka kriterier granskningen använder.'),
      unit('Automatisering med omdöme', 'Automatisera tydliga och upprepbara steg, men behåll ansvar för mål och konsekvenser.', 'Ett verktyg kan sortera utkast medan en person fattar det slutliga beslutet.', 'Dela upp arbetet i maskinstöd och mänskligt ansvar.'),
      unit('Aktualitet och kunskapsgränser', 'Modeller och källor kan sakna den senaste informationen eller rätt sammanhang.', 'Regler och priser kan ha ändrats sedan ett svar skapades.', 'Kontrollera tidskänsliga uppgifter mot en aktuell förstahandskälla.'),
      unit('Förfina genom återkoppling', 'Ett första utkast blir oftast bättre när du pekar ut vad som saknas och vad som ska ändras.', '”Gör den kortare och behåll de tre besluten” ger tydligare återkoppling än ”försök igen”.', 'Jämför svaret med målet och ge en avgränsad ändringsbegäran.'),
      unit('Tillgänglig användning', 'Teknik blir mer användbar när innehåll går att förstå och använda på olika sätt.', 'En sammanfattning i klarspråk kan komplettera en längre rapport.', 'Kontrollera språk, struktur och tillgänglighet med avsedda användare.'),
    ],
  },
  {
    topicId: 'wellbeing',
    label: 'Mental hälsa',
    units: [
      unit('Lägga märke till stressignaler', 'Stressignaler är information att uppmärksamma, inte en diagnos.', 'Spända axlar eller svårt att fokusera kan vara skäl att se över belastningen.', 'Notera mönster och välj ett litet steg eller sök stöd vid behov.'),
      unit('Små återhämtningspauser', 'En kort paus kan skapa en övergång mellan uppgifter men ersätter inte en hållbar arbetsbelastning.', 'Att resa sig och vila blicken en stund kan markera ett uppgiftsbyte.', 'Gör pausen enkel och skriv ned vad du börjar med efteråt.'),
      unit('Rimliga gränser', 'Gränser blir tydligare när du beskriver vad du kan göra och vad du behöver.', 'Du kan föreslå en ny tid i stället för att lova att hinna allt direkt.', 'Kommunicera en konkret gräns och ett möjligt nästa steg.'),
      unit('Vardagens återhämtning', 'Återhämtning behöver anpassas till personen och situationen.', 'En lugn stund, rörelse eller kontakt med någon kan hjälpa olika personer på olika sätt.', 'Lägg märke till vad som ger dig återhämtning utan att göra det till ett krav.'),
      unit('Tanke och fakta', 'En tanke är en tolkning, inte automatiskt ett bevis på vad som hänt eller kommer att hända.', '”Jag kommer misslyckas” är inte samma sak som ett känt resultat.', 'Skriv vad du vet, vad du tänker och vad du kan påverka nu.'),
      unit('Balanserat självprat', 'En hjälpsam tanke behöver vara realistisk, inte påtvingat positiv.', '”Det här är svårt, men jag kan be om förtydligande” rymmer både hinder och möjlighet.', 'Formulera en rättvis mening som tar med både fakta och nästa steg.'),
      unit('Be om stöd', 'Att söka stöd kan vara ett klokt steg när en situation känns svår att hantera ensam.', 'Du kan börja med att berätta konkret vad som påverkar vardagen.', 'Välj en trygg person eller kontakta vården via 1177 när du behöver råd.'),
      unit('Dela upp överväldigande uppgifter', 'Ett avgränsat delsteg kan göra en stor uppgift mer överskådlig.', 'Att öppna dokumentet och skriva en rubrik kan vara en start.', 'Välj en liten handling och ompröva omfattningen efteråt.'),
      unit('Skydda uppmärksamheten', 'Fokus påverkas av miljö, avbrott och hur många saker du försöker hålla i huvudet.', 'En anteckning om nästa steg kan hjälpa dig återvända efter ett avbrott.', 'Minska en störning och lämna en tydlig återstartspunkt.'),
      unit('När professionell hjälp behövs', 'Långvariga eller starka besvär kan behöva stöd från vården; en app kan inte bedöma eller behandla dem.', 'Vårdcentralen eller 1177 kan hjälpa dig att hitta rätt väg vidare.', 'Sök professionell hjälp vid oro och ring 112 om det är akut fara.'),
    ],
  },
  {
    topicId: 'money',
    label: 'Pengar',
    units: [
      unit('Överblick över inkomster och utgifter', 'En enkel överblick hjälper dig se hur pengar rör sig utan att värdera dina val.', 'Att skilja återkommande räkningar från varierande köp kan göra mönster synliga.', 'Samla inkomster, fasta kostnader och rörliga utgifter på samma tidsperiod.'),
      unit('Fasta och rörliga kostnader', 'Olika utgifter förändras olika snabbt när förutsättningarna ändras.', 'Hyra är ofta återkommande medan matkostnaden kan variera från månad till månad.', 'Sortera kostnader efter hur ofta och hur mycket de kan förändras.'),
      unit('Buffert och framförhållning', 'En buffert kan minska behovet av att låna vid oväntade utgifter, men storleken beror på situationen.', 'En trasig hushållsapparat kan kräva ett annat belopp än en oväntad räkning.', 'Börja med att lista vilka oväntade kostnader du vill kunna hantera.'),
      unit('Effektiv ränta och totalkostnad', 'Effektiv ränta inkluderar ränta och vissa avgifter och gör låneerbjudanden lättare att jämföra.', 'En lägre månadsbetalning kan bero på en längre återbetalningstid.', 'Jämför effektiv ränta, avgifter, totalbelopp och löptid.'),
      unit('Ränta-på-ränta och osäkerhet', 'Ränta-på-ränta beskriver hur ränta eller avkastning kan påverka framtida beräkningar; utfallet är inte garanterat.', 'Ett räkneexempel med jämn avkastning visar matematik, inte en prognos.', 'Kontrollera antaganden, avgifter, skatt och risk i ett exempel.'),
      unit('Skulder och tidig kontakt', 'Avgifter och ränta kan påverka den totala skuldkostnaden; tidig kontakt kan ge bättre överblick över alternativen.', 'En missad betalning blir lättare att reda ut när du kontaktar fordringsägaren tidigt.', 'Samla villkoren och kontakta långivaren eller kommunal budget- och skuldrådgivning.'),
      unit('Sparmål och tidshorisont', 'Ett mål blir tydligare när du anger vad pengarna ska användas till och när de kan behövas.', 'Pengar som behövs snart har en annan tidshorisont än ett långsiktigt mål.', 'Skriv ned mål, ungefärlig tid och hur mycket osäkerhet du klarar.'),
      unit('Varningssignaler för bedrägeri', 'Oväntad brådska, hemlighetskrav och begäran om koder är varningssignaler.', 'En person som säger sig ringa från banken kan ändå vara en bedragare.', 'Avsluta kontakten och ring organisationen via en officiell kanal.'),
      unit('Abonnemang och återkommande köp', 'Små återkommande belopp kan tillsammans bli en betydande kostnad över tid.', 'En gratisperiod kan övergå i en betalning enligt villkoren.', 'Kontrollera pris, bindningstid, uppsägning och vilka tjänster du faktiskt använder.'),
      unit('Betänketid inför ekonomiska beslut', 'Tidspress kan göra det svårare att jämföra villkor och upptäcka risker.', 'Ett erbjudande som kräver omedelbar överföring förtjänar extra kontroll.', 'Pausa, läs villkoren och sök oberoende vägledning innan du binder dig.'),
    ],
  },
  {
    topicId: 'strategy',
    label: 'Strategiskt tänkande',
    units: [
      unit('Avgränsa problemet', 'Ett tydligt problem skiljer observationer från antaganden och önskade lösningar.', '”Svarstiden ökade” beskriver läget bättre än ”teamet bryr sig inte”.', 'Skriv problemet som en observerbar skillnad mot målet.'),
      unit('Alternativkostnad', 'Alternativkostnaden är värdet av det bästa realistiska alternativ du väljer bort.', 'En ny uppgift tar tid från något annat som annars hade gjorts.', 'Namnge det viktigaste du väljer bort innan du säger ja.'),
      unit('Gör antaganden synliga', 'Beslut bygger ofta på antaganden som går att pröva innan en stor satsning.', 'En plan kan anta att kunder vill ha en funktion som ingen ännu testat.', 'Skriv ned det osäkraste antagandet och hur du kan testa det billigt.'),
      unit('Basfrekvenser och jämförelser', 'Tidigare utfall i liknande situationer kan ge en nyttig utgångspunkt för en prognos.', 'En enskild lyckad historia säger mindre än utfallet för många jämförbara projekt.', 'Sök ett relevant jämförelsefall innan du gör en uppskattning.'),
      unit('Reversibla beslut', 'Beslut som är lätta att ändra kan ofta testas i mindre skala än svåråterkalleliga beslut.', 'En tidsbegränsad pilot kan ge kunskap innan ett stort införande.', 'Bedöm hur dyrt det är att ändra beslutet och anpassa testets storlek.'),
      unit('Förhandsgranska vad som kan gå fel', 'En förhandsanalys gör det möjligt att upptäcka risker innan planen genomförs.', 'Frågan ”projektet misslyckades – vad bidrog?” kan synliggöra beroenden.', 'Lista några rimliga hinder och välj en förebyggande åtgärd.'),
      unit('Andra ordningens effekter', 'Ett beslut kan ge följder utöver den direkta effekten.', 'En snabbare process kan också flytta mer arbete till ett senare steg.', 'Fråga vad som händer därefter och vem som påverkas.'),
      unit('Stoppregler', 'En tydlig stoppregel kan hindra att resurser fortsätter gå till ett val som inte fungerar.', 'Ett test kan avslutas om en förutbestämd säkerhetsgräns överskrids.', 'Bestäm i förväg vilken signal som kräver paus eller omprövning.'),
      unit('Avvägningar', 'Strategiska val innebär ofta att något prioriteras framför något annat.', 'Lägre kostnad kan innebära mindre flexibilitet eller längre väntetid.', 'Skriv den viktigaste nyttan och uppoffringen för varje alternativ.'),
      unit('Lärande efter beslut', 'En kort utvärdering hjälper skilja tur från ett arbetssätt som går att upprepa.', 'Jämför den ursprungliga prognosen med det faktiska utfallet.', 'Spara antaganden och följ upp vad som förändrades.'),
    ],
  },
  {
    topicId: 'leadership',
    label: 'Ledarskap',
    units: [
      unit('Tydliga förväntningar', 'Tydliga mål och ansvar gör det lättare för en grupp att samordna sitt arbete.', '”Klart på fredag” blir tydligare med omfattning och ansvarig person.', 'Beskriv resultat, ansvar och när ni följer upp.'),
      unit('Delegera med mandat', 'En delegerad uppgift fungerar bättre när ansvar, befogenheter och stöd hänger ihop.', 'Den som ansvarar för ett förslag behöver veta vilka beslut som får tas själv.', 'Kom överens om mandat, resurser och när frågor ska lyftas.'),
      unit('Konkret återkoppling', 'Återkoppling blir lättare att agera på när den beskriver en handling och dess effekt.', '”Sammanfattningen gjorde beslutet tydligt” är mer användbart än ”bra jobbat”.', 'Beskriv situationen, beteendet och vilken effekt du såg.'),
      unit('Lyssna på invändningar', 'Det blir lättare att upptäcka risker när gruppen kan uttrycka saklig oenighet.', 'En fråga om vad som kan gå fel kan komplettera ett optimistiskt förslag.', 'Bjud in alternativa perspektiv innan beslutet låses.'),
      unit('Möten med syfte', 'Ett möte behöver ett tydligt syfte och ett resultat som deltagarna kan förstå.', 'Ett informationsmöte och ett beslutsmöte behöver olika förberedelser.', 'Ange syfte, förberedelse och vilket beslut eller resultat ni behöver.'),
      unit('Arbetsbelastning och kapacitet', 'Planer behöver ta hänsyn till människors tid, beroenden och återhämtning.', 'En ny prioritet kan kräva att en annan uppgift pausas.', 'Gör synligt vad som ska väljas bort när nya uppgifter tillkommer.'),
      unit('Beslutsroller', 'Tydliga beslutsroller minskar risken att viktiga frågor faller mellan stolar.', 'En person kan samla underlag medan en annan fattar beslutet.', 'Säg vem som föreslår, beslutar, bidrar och informeras.'),
      unit('Inkluderande arbetssätt', 'Olika deltagare kan behöva olika vägar för att bidra med sin kunskap.', 'En skriftlig förberedelse kan hjälpa personer som inte tänker bäst högt i grupp.', 'Variera sätt att samla synpunkter och följ upp vilka röster som saknas.'),
      unit('Uppmärksamma bidrag', 'Specifik uppskattning hjälper människor förstå vilket bidrag som gjorde skillnad.', 'Att nämna hur en noggrann kontroll förebyggde fel är tydligare än ett generellt tack.', 'Koppla uppskattning till en konkret handling och effekt.'),
      unit('Följ upp överenskommelser', 'Uppföljning visar om beslut har blivit handling och om planen behöver ändras.', 'En kort avstämning kan upptäcka ett hinder innan en deadline passerar.', 'Dokumentera ansvarig, nästa steg och datum för avstämning.'),
    ],
  },
  {
    topicId: 'communication',
    label: 'Kommunikation',
    units: [
      unit('Aktivt lyssnande', 'Att lyssna aktivt innebär att kontrollera att du förstått innan du svarar.', 'En kort sammanfattning kan fånga vad den andra personen menar.', 'Återge huvudpoängen och fråga om du uppfattat rätt.'),
      unit('Öppna och avgränsade frågor', 'En bra fråga hjälper samtalet framåt utan att styra svaret i onödan.', '”Vad är viktigast att lösa först?” öppnar för mer än ja eller nej.', 'Ställ en fråga i taget och följ upp svaret.'),
      unit('Kärnbudskap först', 'Ett tydligt budskap börjar med vad mottagaren behöver förstå eller göra.', 'En rekommendation kan följas av två skäl och en fråga om beslut.', 'Skriv slutsatsen först och välj bara stöd som hjälper mottagaren.'),
      unit('Respektfull återkoppling', 'Återkoppling blir tydligare när den beskriver det du såg och vad du önskar framåt.', '”Jag saknade tidsplanen i underlaget” är konkretare än ”du är slarvig”.', 'Beskriv observation, effekt och en tydlig önskan utan personangrepp.'),
      unit('Svåra samtal', 'Ett svårt samtal går ofta bättre med ett tydligt syfte och respektfull nyfikenhet.', 'Du kan beskriva ett konkret tillfälle innan du diskuterar ett återkommande mönster.', 'Förbered vad du sett, hur det påverkar och vad du vill förstå.'),
      unit('Skriftlig tydlighet', 'Skriftliga meddelanden behöver ange sammanhang, önskat svar och eventuell tidsram.', 'En mejlrubrik med beslutet som behövs gör det lättare att prioritera.', 'Skriv vad mottagaren behöver göra och när det behövs.'),
      unit('Kommunikation i presentationer', 'En presentation blir lättare att följa när poängerna leder till ett önskat beslut eller nästa steg.', 'En slutsatsrubrik hjälper publiken förstå varför en bild visas.', 'Skriv huvudbudskapet innan du utformar bilderna.'),
      unit('Asynkron samverkan', 'När människor arbetar vid olika tider behöver beslut och ansvar dokumenteras.', 'En mötesanteckning med ägare och deadline kan ersätta en extra avstämning.', 'Skriv beslut, ansvarig och nästa steg på en gemensam plats.'),
      unit('Förhandla om intressen', 'Behovet bakom ett önskemål kan öppna fler lösningar än den första positionen.', 'Två personer kan vilja ha samma resurs av olika skäl.', 'Fråga vad som är viktigast innan ni jämför konkreta förslag.'),
      unit('Kontrollera förståelse', 'En överenskommelse är starkare när båda parter kan beskriva den på samma sätt.', 'Att sammanfatta vem som gör vad före fredag minskar oklarhet.', 'Avsluta med att bekräfta ansvar, tidsram och nästa kontakt.'),
    ],
  },
  {
    topicId: 'learning',
    label: 'Lärande & minne',
    units: [
      unit('Aktiv återkallning', 'Att plocka fram kunskap ur minnet kan visa vad du kan och vad du behöver öva mer på.', 'Försök återberätta begreppet innan du tittar på anteckningarna.', 'Stäng materialet och skriv vad du minns, kontrollera sedan vad som saknas.'),
      unit('Utspridd repetition', 'Att återkomma till kunskap vid flera tillfällen kan hjälpa dig upptäcka vad som sitter kvar.', 'En kort repetition senare i veckan kan visa mer än en enda lång omläsning.', 'Planera flera korta återbesök och testa minnet aktivt.'),
      unit('Variera övningar', 'Att blanda närliggande typer av problem kan träna dig att välja rätt metod.', 'Växla mellan olika slags tal i stället för att lösa alla av samma typ i följd.', 'Blanda några uppgiftstyper och motivera varför varje metod passar.'),
      unit('Dela upp kunskap', 'Arbetsminnet har begränsningar; tydliga delsteg kan göra nytt innehåll mer överskådligt.', 'En lång instruktion blir lättare att följa när den har numrerade steg.', 'Dela upp materialet i begripliga delar och koppla dem till ett mål.'),
      unit('Bygg vidare på förkunskap', 'Ny kunskap blir mer begriplig när du kopplar den till sådant du redan känner till.', 'Ett nytt begrepp kan jämföras med en bekant process, samtidigt som skillnaderna noteras.', 'Skriv en koppling till det du redan vet och en viktig skillnad.'),
      unit('Exempel och principer', 'Exempel visar hur en princip kan användas, men flera exempel hjälper dig se vad som är gemensamt.', 'Jämför två lösningar och leta efter steget de båda använder.', 'Studera exempel och formulera regeln som förklarar dem.'),
      unit('Användbar återkoppling', 'Återkoppling är mest lärorik när den visar vad som fungerar och vad nästa steg kan vara.', '”Kontrollera enheten i sista raden” ger en tydligare riktning än ”fel”.', 'Be om ett konkret förbättringsförslag kopplat till målet.'),
      unit('Mål för lärande', 'Ett lärandemål blir användbart när det beskriver vad du ska kunna göra.', '”Kunna förklara skillnaden” är tydligare än ”läsa kapitlet”.', 'Formulera ett observerbart resultat och kontrollera det med en övning.'),
      unit('Metakognition', 'Din känsla av säkerhet kan skilja sig från hur väl du kan använda kunskapen.', 'Markera först hur säker du är och testa sedan svaret utan anteckningar.', 'Gör en egen förutsägelse och jämför med resultatet.'),
      unit('Vila och lärande', 'Uppmärksamhet och ork varierar; pauser kan göra det lättare att fortsätta arbeta med innehållet.', 'En kort paus kan hjälpa dig återvända till en text med ny koncentration.', 'Planera en paus och bestäm vilket litet steg du tar när du kommer tillbaka.'),
    ],
  },
  {
    topicId: 'productivity',
    label: 'Fokus & planering',
    units: [
      unit('Välj dagens viktigaste', 'Prioritering innebär att välja vad som ska få tid när allt inte ryms samtidigt.', 'En viktig uppgift kan behöva få plats före flera enklare småsaker.', 'Välj ett huvudmål och bestäm vad som får vänta.'),
      unit('Tidsblock med marginal', 'En tidsplan blir mer realistisk när den lämnar utrymme för avbrott och övergångar.', 'Ett möte direkt efter en svår uppgift kan ge för lite tid för avslut.', 'Planera fokustid och lägg in marginal mellan större aktiviteter.'),
      unit('Gör nästa steg synligt', 'En uppgift blir lättare att börja när första handlingen är tydlig.', '”Skriv tre rubriker” är mer konkret än ”jobba med rapporten”.', 'Skriv nästa handling med ett verb och en tydlig slutpunkt.'),
      unit('Minska kontextbyten', 'Frekventa byten mellan olika uppgifter kan göra det svårare att behålla sammanhanget.', 'Samla liknande administrativa småuppgifter i ett avgränsat pass.', 'Samla liknande uppgifter och skriv en återstartspunkt före ett byte.'),
      unit('Forma en fokuserad miljö', 'Miljön kan göra det lättare eller svårare att hålla uppmärksamheten på uppgiften.', 'Att lägga undan en avisering kan minska ett återkommande avbrott.', 'Ta bort en störning och lägg fram det du behöver börja.'),
      unit('Arbeta med energi', 'Din ork kan variera under dagen och påverka vilken typ av uppgift som passar.', 'En krävande uppgift kan planeras när du brukar ha bättre fokus.', 'Lägg märke till ditt energimönster och anpassa ordningen där det går.'),
      unit('Uppskatta arbetsinsats', 'Uppskattningar är osäkra och förbättras när de delas upp och jämförs med tidigare utfall.', 'Ett arbete som uppskattas till en timme kan innehålla flera osynliga delsteg.', 'Dela upp uppgiften, gör en grov uppskattning och följ upp avvikelsen.'),
      unit('Möten och fokus', 'Möten tar både kalendertid och tid för förberedelse och återstart.', 'Ett tydligt skriftligt beslut kan ibland ersätta ett informationsmöte.', 'Kontrollera syftet och välj minsta fungerande mötesform.'),
      unit('Välj bort arbete', 'Att lägga till nya uppgifter utan att ta bort något kan göra planen ohållbar.', 'En ny brådskande uppgift kan kräva att en annan deadline flyttas.', 'Gör kapaciteten synlig och föreslå vad som ska pausas.'),
      unit('Veckovis översyn', 'En återkommande översyn hjälper dig stänga öppna loopar och välja nästa fokus.', 'En kort genomgång kan fånga väntande svar och orealistiska åtaganden.', 'Granska åtaganden, hinder och kommande prioriteringar en gång i veckan.'),
    ],
  },
  {
    topicId: 'digital-safety',
    label: 'Digital säkerhet',
    units: [
      unit('Unika lösenord', 'Unika lösenord minskar risken att ett läckt lösenord används på flera konton.', 'Ett gammalt lösenord från en tjänst bör inte återanvändas till e-posten.', 'Använd olika starka lösenord och överväg en betrodd lösenordshanterare.'),
      unit('Flerfaktorsinloggning', 'En extra verifieringsfaktor kan skydda kontot även om lösenordet röjs.', 'En inloggning kan kräva både lösenord och en separat bekräftelse.', 'Aktivera flerfaktorsinloggning där tjänsten erbjuder det.'),
      unit('Känna igen nätfiske', 'Oväntade meddelanden som skapar brådska eller begär koder behöver kontrolleras via en separat kanal.', 'En länk i ett oväntat sms kan leda till en falsk inloggningssida.', 'Öppna inte länken; kontakta avsändaren via en känd kontaktväg.'),
      unit('Uppdateringar', 'Uppdateringar kan rätta kända säkerhetsproblem och förbättra programvara.', 'En telefon som länge saknar uppdateringar kan behöva särskild uppmärksamhet.', 'Aktivera automatiska uppdateringar där det passar och starta om vid behov.'),
      unit('Säkerhetskopior', 'En separat säkerhetskopia kan göra det lättare att återställa viktig information.', 'En fil som bara finns på en trasig dator kan vara svår att få tillbaka.', 'Säkerhetskopiera det viktiga och kontrollera ibland att kopian går att återställa.'),
      unit('Integritetsinställningar', 'Appar och tjänster kan samla in olika uppgifter beroende på inställningar och användning.', 'En ficklampsapp behöver sällan tillgång till platsdata.', 'Granska behörigheter och stäng av sådant som inte behövs.'),
      unit('Appbehörigheter', 'En behörighet bör passa appens funktion och kan ofta begränsas.', 'En kartapp kan behöva plats medan den används, inte hela tiden.', 'Kontrollera varför behörigheten behövs och välj minsta rimliga åtkomst.'),
      unit('Delade nätverk', 'På delade nätverk är det klokt att undvika att lämna känsliga uppgifter till okända sidor.', 'Ett offentligt nätverksnamn kan efterliknas av någon annan.', 'Använd betrodda nätverk och organisationens godkända lösning för känsliga ärenden.'),
      unit('Säker fildelning', 'Delningslänkar kan ge bredare åtkomst än avsett om mottagare och behörigheter inte kontrolleras.', 'En länk som är öppen för alla kan spridas vidare.', 'Välj rätt mottagare, begränsa åtkomst och ta bort delning när den inte behövs.'),
      unit('Agera vid misstanke', 'Snabb kontakt med den berörda tjänsten kan begränsa följderna av ett misstänkt intrång.', 'Om du lämnat ut en kod bör du kontakta banken eller tjänsten direkt via en officiell kanal.', 'Byt berörda uppgifter, spärra vid behov och följ tjänstens säkerhetsråd.'),
    ],
  },
  {
    topicId: 'critical-thinking',
    label: 'Kritiskt tänkande',
    units: [
      unit('Påstående och belägg', 'Ett påstående behöver relevant underlag innan det kan behandlas som välgrundat.', 'En personlig berättelse kan visa en erfarenhet men inte ensam hur vanligt något är.', 'Skriv vad som påstås och vilket underlag som faktiskt stöder det.'),
      unit('Källans avsändare', 'Avsändare, kompetens, syfte och transparens hjälper dig bedöma en källa.', 'En tydlig författare och öppna hänvisningar gör en text lättare att kontrollera.', 'Kontrollera vem som står bakom informationen och varför den publicerats.'),
      unit('Samband och orsak', 'Två saker som förändras samtidigt behöver inte innebära att den ena orsakar den andra.', 'Glassförsäljning och badolyckor kan öka samtidigt på varma dagar.', 'Leta efter andra möjliga förklaringar innan du drar en slutsats om orsak.'),
      unit('Basfrekvenser', 'Hur vanligt något är från början påverkar hur en ny uppgift bör tolkas.', 'Ett ovanligt utfall kan fortfarande vara osannolikt även efter en positiv signal.', 'Ta reda på utgångsläget och vilka felkällor mätningen har.'),
      unit('Urval och skevhet', 'Ett urval som inte representerar gruppen kan ge en missvisande bild.', 'En webbenkät som bara besvaras av särskilt engagerade personer kan snedvridas.', 'Fråga vilka som saknas och hur deltagarna valdes ut.'),
      unit('Prövbara påståenden', 'Ett påstående blir mer användbart när det går att ange vad som skulle tala emot det.', 'En tydlig förutsägelse kan jämföras med ett observerbart resultat.', 'Formulera vilket utfall som skulle göra att du omprövar din idé.'),
      unit('Osäkerhet i slutsatser', 'En slutsats bör inte uttryckas säkrare än underlaget medger.', 'Ett begränsat test kan ge en ledtråd men inte ett säkert svar för alla.', 'Beskriv både vad underlaget visar och vad det inte kan avgöra.'),
      unit('Alternativa förklaringar', 'Flera rimliga förklaringar kan passa samma observation.', 'En försening kan bero på flera steg, inte bara den person som skickade sista mejlet.', 'Lista minst en annan förklaring och vilket underlag som skiljer dem åt.'),
      unit('Bekräftelsebias', 'Människor lägger lättare märke till sådant som stödjer det de redan tror.', 'Du kanske minns de exempel som bekräftar din första uppfattning.', 'Sök aktivt efter information som skulle kunna motsäga din tolkning.'),
      unit('Starka argument', 'Ett starkt argument redovisar skäl och tar sakligt hänsyn till invändningar.', 'En rekommendation blir tydligare när den visar både fördelar och begränsningar.', 'Formulera slutsats, stöd och en relevant invändning.'),
    ],
  },
  {
    topicId: 'writing',
    label: 'Skrivande',
    units: [
      unit('Målgrupp och syfte', 'Textens ordval och detaljnivå bör passa den som ska läsa och det läsaren behöver göra.', 'Ett internt arbetsunderlag kan behöva mer fackdetaljer än en kundguide.', 'Skriv vem texten är till för och vad läsaren ska förstå eller göra.'),
      unit('Disposition före formulering', 'En enkel struktur hjälper läsaren följa resonemanget innan du finslipar varje mening.', 'En rapport kan börja med slutsats och sedan visa bakgrund och underlag.', 'Skissa rubriker i den ordning läsaren behöver informationen.'),
      unit('En huvudpoäng per stycke', 'Ett stycke blir lättare att följa när det utvecklar en tydlig huvudpoäng.', 'En ny invändning kan behöva ett eget stycke i stället för en bisats.', 'Skriv en kärnmening och samla bara stöd som hör till den.'),
      unit('Klarspråk', 'Vardagliga ord och tydliga verb hjälper fler läsare förstå vad texten säger.', '”Använd” är ofta lättare att förstå än ”nyttja”.', 'Byt ut onödigt svåra ord och förklara de facktermer som behövs.'),
      unit('Aktiva verb', 'Aktiva formuleringar visar ofta tydligare vem som gör vad.', '”Gruppen skickade rapporten” anger ansvar tydligare än ”rapporten skickades”.', 'Sök efter meningar där ansvarig person eller handling är oklar.'),
      unit('Revidera i omgångar', 'Innehåll, struktur och språk blir lättare att förbättra om du granskar dem var för sig.', 'Du kan först kontrollera argumentet och sedan leta efter stavfel.', 'Gör en läsning för innehåll, en för struktur och en för språk.'),
      unit('Källhänvisningar', 'Läsaren behöver kunna se var faktauppgifter kommer ifrån och kontrollera dem.', 'En länk till originalrapporten är mer användbar än en obestämd hänvisning.', 'Lägg hänvisningen nära påståendet och kontrollera att den stöder det.'),
      unit('Informativa rubriker', 'En rubrik kan hjälpa läsaren förstå poängen utan att läsa hela avsnittet först.', '”Svarstiden minskade efter testet” säger mer än ”Resultat”.', 'Skriv rubriker som sammanfattar innehållet, inte bara ämnet.'),
      unit('Korrekturläsning', 'En separat korrekturläsning kan fånga misstag som försvinner i innehållsarbetet.', 'Att läsa en text högt kan hjälpa dig upptäcka ord som saknas.', 'Kontrollera namn, siffror, länkar och meningar efter innehållsrevisionen.'),
      unit('Tillgänglig text', 'Tydliga rubriker, begripligt språk och beskrivande länkar gör text lättare att använda.', '”Läs rapporten” förklarar länken bättre än ”klicka här”.', 'Använd rubriker i ordning och skriv länkar som beskriver målet.'),
    ],
  },
  {
    topicId: 'creativity',
    label: 'Kreativitet',
    units: [
      unit('Skilj idéfas från urval', 'Det kan hjälpa att först ta fram flera idéer och sedan bedöma dem mot målet.', 'En grupp kan samla förslag innan den väljer vilka som är möjliga att testa.', 'Bestäm när ni skapar alternativ och när ni utvärderar dem.'),
      unit('Använd begränsningar', 'En tydlig begränsning kan hjälpa dig fokusera på lösningar inom verkliga ramar.', 'En prototyp som ska byggas på en timme kräver andra val än en färdig produkt.', 'Skriv en resursgräns och skapa idéer som respekterar den.'),
      unit('Skapa många första utkast', 'Flera tidiga alternativ kan minska risken att fastna vid den första idén.', 'Skriv fem rubrikförslag innan du väljer en.', 'Skapa flera utkast snabbt och spara bedömningen till nästa steg.'),
      unit('Använd analogier', 'En jämförelse med ett annat område kan ge nya sätt att se ett problem.', 'En kö kan inspirera till hur en väntelista ska visa ordning.', 'Låna en princip från ett annat område och kontrollera var jämförelsen slutar gälla.'),
      unit('Observera behov', 'Kreativa lösningar blir mer relevanta när de utgår från verkliga hinder och behov.', 'Att se var människor fastnar kan ge bättre idéer än att gissa åt dem.', 'Observera en situation och skilj det du såg från din tolkning.'),
      unit('Kombinera idéer', 'En ny lösning kan växa fram när delar från flera förslag sätts ihop.', 'En påminnelse kan kombineras med en tydligare checklista.', 'Välj två idéer och hitta en liten kombination att pröva.'),
      unit('Prototypa tidigt', 'En enkel prototyp gör en idé lättare att diskutera och testa.', 'En pappersskiss kan visa om en navigering är begriplig innan kod skrivs.', 'Bygg minsta versionen som kan ge relevant återkoppling.'),
      unit('Förbättra i iterationer', 'En iteration använder resultatet från ett test för att justera nästa version.', 'En rubrik kan ändras efter att läsare missförstått instruktionen.', 'Testa, notera en observation och ändra en sak i taget.'),
      unit('Omformulera problemet', 'En annan problemformulering kan göra tidigare osynliga lösningar möjliga.', 'Frågan ”hur får vi fler möten?” kan bli ”hur får vi snabbare beslut?”.', 'Skriv problemet på två sätt och jämför vilken fråga som hjälper mest.'),
      unit('Bedöm idéer mot behov', 'En originell idé är inte automatiskt användbar; den behöver möta ett verkligt behov.', 'En avancerad funktion kan vara mindre hjälpsam än en tydligare instruktion.', 'Jämför idéerna med användarnytta, genomförbarhet och risk.'),
    ],
  },
  {
    topicId: 'health',
    label: 'Hälsa & vanor',
    units: [
      unit('Sömnrutiner', 'Regelbundna vanor kring vila kan stödja återhämtning, men sömnbehov och svårigheter varierar.', 'En lugnare rutin före läggdags kan passa vissa men inte alla.', 'Lägg märke till vad som hjälper dig och kontakta vården vid långvariga problem.'),
      unit('Rörelse i vardagen', 'Rörelse kan byggas in i vardagen på sätt som passar förmåga och förutsättningar.', 'En kort promenad eller att resa sig regelbundet kan vara möjliga alternativ.', 'Välj en trygg aktivitet som passar din situation och börja på en rimlig nivå.'),
      unit('Variation i måltider', 'Matvanor påverkas av behov, tillgång och kultur; generella råd passar inte alla.', 'En plan för enkla måltider kan underlätta när tiden är knapp.', 'Utgå från dina behov och sök professionella råd vid medicinska frågor.'),
      unit('Vätska och kroppens signaler', 'Vätskebehov kan variera med bland annat aktivitet, miljö och hälsa.', 'En varm dag kan påverka hur ofta du behöver dricka.', 'Var uppmärksam på din situation och följ vårdens råd om du har särskilda behov.'),
      unit('Pauser och ergonomi', 'Arbetsställning och pauser kan påverka hur bekvämt det känns att arbeta.', 'En justerad stol och variation i arbetsställning kan minska långvarig statisk belastning.', 'Variera position och sök stöd om smärta eller besvär inte går över.'),
      unit('Granska hälsopåståenden', 'Hälsopåståenden bör kontrolleras mot trovärdiga källor och vägas mot personliga förutsättningar.', 'Ett råd på sociala medier behöver inte vara lämpligt för alla.', 'Kontrollera avsändaren och fråga vården om råd påverkar din behandling.'),
      unit('Bygg vanor gradvis', 'En hållbar vana brukar behöva passa vardagen och kunna upprepas.', 'Att lägga fram promenadskorna kan göra ett planerat steg lättare att börja.', 'Välj en liten handling och en tydlig signal som passar din vardag.'),
      unit('Anpassa efter förmåga', 'En vana behöver kunna anpassas efter hälsa, funktionsförmåga och livssituation.', 'En aktivitet kan göras sittande eller i kortare omgångar.', 'Välj en trygg anpassning och be om professionellt stöd vid behov.'),
      unit('Beskriv besvär sakligt', 'En enkel beskrivning av när besvär uppstår kan hjälpa i ett samtal med vården.', 'Det kan vara användbart att notera tidpunkt, varaktighet och vad som påverkar besväret.', 'Skriv ned observationer utan att dra en egen diagnos.'),
      unit('Sök vård vid behov', 'Vården kan bedöma symtom och hjälpa dig hitta rätt stöd; utbildningsmaterial kan inte ersätta det.', '1177 kan ge vägledning om vart du ska vända dig.', 'Kontakta 1177 eller vårdcentralen och ring 112 vid akut fara.'),
    ],
  },
  {
    topicId: 'relationships',
    label: 'Relationer',
    units: [
      unit('Lyssna för att förstå', 'Lyssnande handlar om att förstå den andres budskap innan du försöker lösa problemet.', 'Frågan ”vill du ha råd eller vill du mest att jag lyssnar?” kan tydliggöra behovet.', 'Sammanfatta vad du hört och fråga om det stämmer.'),
      unit('Fråga i stället för att anta', 'En fråga kan visa om din tolkning stämmer med vad den andra personen menade.', 'Ett kort svar kan bero på stress och behöver inte betyda ointresse.', 'Beskriv vad du märkte och fråga öppet hur situationen var för den andra.'),
      unit('Tydliga önskemål', 'Ett konkret önskemål hjälper andra förstå vad du hoppas ska hända.', '”Kan du säga till före du ändrar planen?” är tydligare än ”visa mer respekt”.', 'Formulera vad du önskar utan att tillskriva den andra en avsikt.'),
      unit('Respektera gränser', 'En gräns beskriver vad du själv är bekväm med och behöver respekteras av andra.', 'Någon kan tacka nej till ett samtal eller en aktivitet.', 'Fråga, lyssna på svaret och respektera ett nej.'),
      unit('Reparera efter konflikt', 'Efter en konflikt kan ett sakligt erkännande och en fråga om nästa steg hjälpa samtalet vidare.', 'Att ta ansvar för en hård formulering är konkretare än att säga att den andra överreagerade.', 'Beskriv din del, lyssna på effekten och fråga vad som behövs nu.'),
      unit('Perspektivtagande', 'Att förstå ett perspektiv betyder inte att du måste hålla med om allt.', 'Två personer kan uppleva samma förändring på olika sätt.', 'Fråga vad som är viktigast för den andra innan du svarar.'),
      unit('Visa uppskattning', 'Specifik uppskattning visar vilken handling du lade märke till.', '”Tack för att du återkom när du lovat” är tydligare än ett allmänt tack.', 'Nämn vad personen gjorde och vilken skillnad det gjorde.'),
      unit('Samtycke och frivillighet', 'Respektfulla relationer kräver att frivillighet och gränser tas på allvar.', 'Ett ja till en sak innebär inte automatiskt ja till något annat.', 'Fråga tydligt och acceptera ett nej eller en ändring utan press.'),
      unit('Prata om känsliga frågor', 'Ett lugnt tillfälle och ett tydligt syfte kan göra ett känsligt samtal lättare att förstå.', 'Du kan be om tid för ett samtal i stället för att ta det mitt i en konflikt.', 'Berätta vad du vill prata om och lyssna utan att avbryta.'),
      unit('Följ upp överenskommelser', 'En överenskommelse blir tydligare när båda vet vad som ska hända och när ni stämmer av.', 'En plan för hushållssysslor kan behöva följas upp efter en vecka.', 'Sammanfatta vad ni kommit överens om och fråga när ni ska följa upp.'),
    ],
  },
  {
    topicId: 'science',
    label: 'Vetenskap',
    units: [
      unit('Formulera undersökningsfrågor', 'En avgränsad fråga hjälper dig välja vilken observation eller mätning som behövs.', '”Påverkar ljus mängden växtlighet?” behöver ett tydligt mått på växtlighet.', 'Skriv vad du ska undersöka, hos vilka och under vilken period.'),
      unit('Hypoteser och förutsägelser', 'En hypotes blir mer användbar när den leder till en förutsägelse som kan jämföras med data.', 'Om temperaturen ökar kan en viss reaktion ske snabbare under angivna villkor.', 'Skriv i förväg vilket utfall som skulle stödja eller utmana hypotesen.'),
      unit('Variabler och kontroller', 'När flera faktorer ändras samtidigt blir det svårare att veta vad som bidrog till resultatet.', 'En jämförelse behöver hålla relevanta villkor lika.', 'Identifiera vad du ändrar, mäter och håller så konstant som möjligt.'),
      unit('Mätning och definitioner', 'Tydliga definitioner gör det lättare att förstå vad en mätning faktiskt representerar.', '”Produktivitet” behöver beskrivas med ett konkret mått innan den räknas.', 'Bestäm hur varje begrepp ska observeras eller mätas.'),
      unit('Urval och stickprov', 'Ett litet eller skevt urval kan missa variationen i den grupp du vill förstå.', 'En enkät bland bara en klass beskriver inte automatiskt alla elever.', 'Beskriv vilka som ingick och vilka som kan saknas.'),
      unit('Upprepning och reproducerbarhet', 'Upprepade försök kan visa om ett resultat återkommer eller beror på tillfälligheter.', 'Ett oväntat mätvärde kan behöva kontrolleras igen.', 'Dokumentera metoden och upprepa mätningen när det är rimligt.'),
      unit('Fackgranskning och evidens', 'Fackgranskning är en kvalitetskontroll, inte en garanti för att varje slutsats är korrekt.', 'En publicerad studie kan fortfarande ha begränsningar eller senare motsägas.', 'Läs metod, begränsningar och hur resultatet passar med annan forskning.'),
      unit('Osäkerhet i mätningar', 'Mätvärden påverkas av metod, instrument och naturlig variation.', 'Två mätningar kan skilja sig lite utan att den underliggande förändringen är säker.', 'Redovisa osäkerhet och undvik större precision än mätningen stödjer.'),
      unit('Orsak och samvariation', 'Samvariation visar att mått förändras tillsammans men bevisar inte ensam en orsak.', 'Två trender kan påverkas av en tredje faktor.', 'Pröva alternativa orsaker och se vilken studiedesign som behövs.'),
      unit('Modeller och verklighet', 'En vetenskaplig modell förenklar verkligheten för att beskriva eller förutsäga vissa delar.', 'En vädermodell är användbar utan att återge varje detalj i atmosfären.', 'Fråga vad modellen förklarar, vilka antaganden den gör och när den brister.'),
    ],
  },
  {
    topicId: 'sustainability',
    label: 'Hållbar vardag',
    units: [
      unit('Se hela livscykeln', 'En produkts påverkan kan uppstå vid tillverkning, användning, transport och avfall.', 'En energieffektiv apparat kan också kräva resurser att tillverka.', 'Jämför relevanta delar av livscykeln i stället för en enda egenskap.'),
      unit('Energianvändning', 'Energibehov påverkas av utrustning, beteende och byggnadens förutsättningar.', 'Att sänka användningen av en apparat kan spela roll på olika sätt beroende på hur ofta den används.', 'Mät eller uppskatta vad som används mest innan du väljer åtgärd.'),
      unit('Transportval', 'Transporters påverkan varierar med avstånd, färdsätt, beläggning och alternativ.', 'En kort resa kan ibland gå att samordna med andra ärenden.', 'Jämför genomförbara resalternativ för den sträcka du faktiskt ska åka.'),
      unit('Minska matsvinn', 'Planering och förvaring kan hjälpa mat att bli använd innan den slängs.', 'En synlig lista över mat som bör användas snart gör det lättare att planera.', 'Kontrollera vad du redan har innan du handlar och använd rester säkert.'),
      unit('Reparera och återanvänd', 'Reparation och återanvändning kan förlänga en produkts användningstid.', 'En mindre reparation kan göra att en sak går att använda längre.', 'Kontrollera säkerhet, kostnad och möjlighet att reparera innan du ersätter.'),
      unit('Hållbara materialval', 'Materialval behöver bedömas utifrån funktion, livslängd och hur de tillverkas och hanteras.', 'En återvinningsbar förpackning är inte automatiskt det bästa valet i alla jämförelser.', 'Kontrollera hela sammanhanget och välj material som passar användningen.'),
      unit('Vatten i vardagen', 'Vattenanvändning och tillgång varierar mellan platser och situationer.', 'En åtgärd som är viktig i ett område kan ha annan betydelse där vatten är gott om.', 'Ta reda på lokala förutsättningar innan du jämför lösningar.'),
      unit('Mät påverkan med eftertanke', 'Miljömått bygger på avgränsningar och antaganden som påverkar resultatet.', 'Ett klimatavtryck kan skilja sig beroende på vilka utsläpp som räknas med.', 'Kontrollera systemgräns, källa och jämförbarhet innan du tolkar ett mått.'),
      unit('Undvik enkla lösningar på systemfrågor', 'Hållbarhetsfrågor har ofta flera mål och följder som behöver vägas mot varandra.', 'En förändring kan minska en påverkan men öka en annan.', 'Skriv nyttor, kostnader och berörda grupper innan du väljer åtgärd.'),
      unit('Gör en genomförbar förändring', 'En förändring som passar vardagen kan vara lättare att hålla fast vid än en stor plan utan stöd.', 'Att samordna inköp kan minska både tid och onödiga resor.', 'Välj ett påverkbart steg och följ upp om det faktiskt fungerar.'),
    ],
  },
  {
    topicId: 'media',
    label: 'Medier & information',
    units: [
      unit('Rubrik och innehåll', 'En rubrik kan förenkla eller förstärka; läs själva materialet innan du drar slutsatser.', 'En lockande rubrik kan beskriva en studie mer säkert än vad resultatet gör.', 'Jämför rubriken med artikelns underlag och formuleringar.'),
      unit('Hitta originalkällan', 'En hänvisning blir lättare att bedöma när du kan läsa ursprungligt material.', 'En nyhet om en rapport bör länka till rapporten när den finns offentligt.', 'Följ hänvisningen till originalet och kontrollera vad som faktiskt står där.'),
      unit('Kontrollera publiceringsdatum', 'Äldre information kan delas på nytt och misstas för aktuell.', 'En gammal bild från en händelse kan spridas som om den vore ny.', 'Kontrollera datum, plats och om uppgiften fortfarande gäller.'),
      unit('Bilder och videor i sammanhang', 'Bilder kan vara äkta men ändå visas med fel plats, tid eller sammanhang.', 'Ett korrekt foto från en tidigare händelse kan användas i en ny berättelse.', 'Sök efter ursprunglig publicering och jämför oberoende rapportering.'),
      unit('Reklam och sponsring', 'Kommersiellt innehåll kan utformas så att det liknar redaktionellt material.', 'En rekommendation kan vara betald även om den berättas personligt.', 'Leta efter märkning och kontrollera avsändarens intresse.'),
      unit('Algoritmiska flöden', 'Rekommendationssystem väljer innehåll utifrån signaler och kan påverka vad du ser.', 'Ett flöde kan visa mer av det du redan tittat på.', 'Jämför flera källor och justera inställningar när flödet blir ensidigt.'),
      unit('Känslomässigt laddat språk', 'Starka känslor kan påverka hur snabbt information delas och bedöms.', 'Ett inlägg som väcker ilska kan behöva extra kontroll innan du sprider det.', 'Pausa och kontrollera påståendet innan du reagerar eller delar.'),
      unit('Citat och sammanhang', 'Ett citat kan få en annan innebörd när orden runt omkring tas bort.', 'En mening ur en längre intervju kan låta mer kategorisk än talaren menade.', 'Läs eller lyssna på ett större sammanhang innan du återger citatet.'),
      unit('Fakta, åsikt och tolkning', 'En text kan blanda verifierbara uppgifter med värderingar och slutsatser.', '”Mötet började klockan nio” skiljer sig från ”mötet var ett fiasko”.', 'Markera vad som kan kontrolleras och vad som är en bedömning.'),
      unit('Pausa innan du delar', 'En kort kontroll före delning kan minska spridningen av felaktig eller lösryckt information.', 'Att läsa länken och kontrollera avsändaren tar ofta mindre tid än att rätta ett misstag senare.', 'Kontrollera avsändare, datum och original innan du delar.'),
    ],
  },
  {
    topicId: 'projects',
    label: 'Projektarbete',
    units: [
      unit('Mål och omfattning', 'Ett projektmål behöver beskriva önskat resultat och vad som inte ingår.', 'En ny webbplats kan avgränsas till en första version med tydliga användarbehov.', 'Skriv resultat, målgrupp och viktigaste avgränsning.'),
      unit('Leveranser', 'Synliga leveranser gör framsteg lättare att följa än enbart en lång aktivitetslista.', 'En testad prototyp är en tydligare leverans än ”arbeta med design”.', 'Beskriv vad som ska finnas och hur ni vet att det är klart.'),
      unit('Arbetsnedbrytning', 'Stora projekt blir lättare att uppskatta och följa upp när de delas i hanterbara delar.', 'En lansering kan delas i innehåll, test, godkännande och publicering.', 'Dela arbetet tills varje del har ett tydligt resultat och ansvar.'),
      unit('Beroenden', 'Ett beroende kan påverka ordning och tidsplan även när ett delarbete går bra.', 'Testning kan inte börja förrän en fungerande version finns.', 'Rita vilka leveranser som behöver bli klara före nästa steg.'),
      unit('Ansvar och roller', 'Tydliga roller minskar dubbelarbete och gör det lättare att få beslut.', 'En person kan äga leveransen medan andra bidrar med expertkunskap.', 'Skriv vem som ansvarar, beslutar och behöver informeras.'),
      unit('Projektets risker', 'Risker går lättare att hantera när de är konkreta och har en ansvarig uppföljning.', 'Sen tillgång till data kan hota testplanen.', 'Notera risk, sannolik följd, tidig signal och möjlig åtgärd.'),
      unit('Uppskattningar', 'Tidsuppskattningar blir bättre när osäkerhet och arbete utanför huvuduppgiften räknas in.', 'Granskning och samordning kan ta tid utöver själva skrivandet.', 'Visa antaganden och intervall i stället för falsk precision.'),
      unit('Milstolpar', 'Milstolpar visar när viktiga resultat behöver vara klara för att projektet ska fortsätta.', 'Ett godkänt test kan vara en milstolpe före lansering.', 'Välj ett fåtal verifierbara resultat och datum för uppföljning.'),
      unit('Projektkommunikation', 'Relevant information behöver nå rätt personer i tid för att de ska kunna agera.', 'En kort status kan lyfta beslut och hinder i stället för alla detaljer.', 'Anpassa statusformat efter mottagare, risk och vilket beslut som behövs.'),
      unit('Avslut och lärdomar', 'Ett projektavslut bör fånga leveranser, öppna frågor och lärdomar för nästa arbete.', 'En kort återblick kan visa att en tidig användartest sparade omarbete.', 'Dokumentera vad som blev klart, vad som återstår och vad ni lärde er.'),
    ],
  },
  {
    topicId: 'career',
    label: 'Arbetsliv & karriär',
    units: [
      unit('Överförbara färdigheter', 'Färdigheter kan användas i nya roller även när arbetsuppgifterna har ett annat namn.', 'Planering och kundkontakt kan vara relevanta i flera branscher.', 'Beskriv färdigheten med ett exempel på när du använde den.'),
      unit('Visa arbetet i en portfolio', 'Ett konkret arbetsprov kan visa hur du tänker och vad du kan bidra med.', 'En kort före-och-efter-beskrivning kan förklara din del i ett projekt.', 'Välj ett relevant exempel och beskriv din roll och resultatet.'),
      unit('Anpassa ansökan', 'En ansökan blir tydligare när erfarenheter kopplas till den aktuella rollen.', 'Ett krav på samarbete kan styrkas med ett konkret grupparbete.', 'Välj några relevanta exempel i stället för att lista allt du gjort.'),
      unit('Förbered en intervju', 'Genomtänkta exempel kan hjälpa dig beskriva hur du agerat i arbetssituationer.', 'Beskriv situation, din uppgift, handling och vad du lärde dig.', 'Förbered ett kort exempel och var tydlig med din egen insats.'),
      unit('Nätverkande med nyfikenhet', 'Ett professionellt nätverk kan byggas genom ömsesidigt utbyte, inte bara genom att be om en tjänst.', 'Ett konkret samtal om en yrkesroll kan ge bättre inblick än en allmän fråga om jobb.', 'Ställ en respektfull, avgränsad fråga och tacka för personens tid.'),
      unit('Användbar återkoppling', 'Återkoppling kan hjälpa dig utvecklas när du ber om den på ett sätt som går att besvara.', '”Vad kan jag göra tydligare i nästa presentation?” är konkret.', 'Be om en specifik observation kopplad till en färdighet du tränar.'),
      unit('Planera kompetensutveckling', 'En kompetensplan blir mer genomförbar när den kopplas till en uppgift och ett litet lärsteg.', 'Du kan öva en ny färdighet i ett avgränsat arbetsmoment.', 'Välj en färdighet, ett tillfälle att öva och ett sätt att följa upp.'),
      unit('Jämför jobberbjudanden', 'Ett erbjudande innehåller fler villkor än lön och bör bedömas utifrån din situation.', 'Arbetstid, pension, resor och provanställning kan också spela roll.', 'Läs samtliga villkor och fråga om sådant som är oklart innan du tackar ja.'),
      unit('Hållbara arbetsgränser', 'Tydliga gränser kring tid och tillgänglighet kan hjälpa dig se vad som är möjligt.', 'En ny uppgift kan kräva en diskussion om befintliga prioriteringar.', 'Beskriv kapacitet och be om hjälp att prioritera när allt inte ryms.'),
      unit('Känn igen falska jobberbjudanden', 'Oväntade erbjudanden som kräver avgifter, koder eller känsliga uppgifter bör kontrolleras.', 'En arbetsgivare bör kunna bekräftas via en officiell kanal.', 'Verifiera företag och kontaktperson innan du skickar uppgifter eller pengar.'),
    ],
  },
  {
    topicId: 'data',
    label: 'Data & statistik',
    units: [
      unit('Datatyper och frågor', 'Vilken typ av data du samlar in påverkar vilka frågor du kan besvara.', 'Ett ja-eller-nej-svar visar inte varför någon valde ett alternativ.', 'Kontrollera att datatypen passar frågan du vill undersöka.'),
      unit('Medelvärde och median', 'Medelvärde påverkas av alla värden, medan medianen visar mitten i en sorterad lista.', 'En mycket hög inkomst kan dra upp medelvärdet i en liten grupp.', 'Jämför måtten och titta på fördelningen innan du sammanfattar.'),
      unit('Fördelningar', 'En fördelning visar hur observationer sprids, inte bara ett enda sammanfattande tal.', 'Två grupper kan ha samma medelvärde men mycket olika variation.', 'Granska form, spridning och eventuella grupper i datan.'),
      unit('Representativa urval', 'Slumpmässiga och relevanta urval kan minska risken att vissa grupper saknas.', 'En enkät på en webbplats når inte automatiskt personer som inte besöker den.', 'Beskriv urvalet och jämför det med gruppen du vill uttala dig om.'),
      unit('Diagramaxlar', 'Skalor och avklippta axlar kan förändra hur stor en skillnad ser ut.', 'En y-axel som börjar nära värdena kan förstora små förändringar visuellt.', 'Kontrollera axlarnas start, intervall, enheter och tidsperiod.'),
      unit('Nämnare och andelar', 'En procentsats behöver en tydlig nämnare för att gå att tolka.', 'Fem procent av hundra personer är ett annat antal än fem procent av tusen.', 'Skriv både andel och relevant antal när det går.'),
      unit('Samband i data', 'Ett statistiskt samband visar samvariation men avgör inte ensamt vad som orsakar vad.', 'Två mått kan samvariera för att båda påverkas av en tredje faktor.', 'Undvik orsaksspråk om datan bara visar ett samband.'),
      unit('Bortfall och saknade värden', 'Saknade svar kan påverka resultatet om bortfallet hänger ihop med frågan.', 'Personer som inte svarar kan skilja sig från dem som gör det.', 'Redovisa bortfall och fundera på vilka slutsatser som påverkas.'),
      unit('Osäkerhet och precision', 'Ett beräknat värde är inte mer precist än mätning och urval tillåter.', 'Många decimaler gör inte en osäker uppskattning mer exakt.', 'Visa rimlig precision och förklara viktiga osäkerheter.'),
      unit('Integritet i dataarbete', 'Data kan identifiera personer även när direkta namn saknas.', 'Små grupper och ovanliga kombinationer kan göra någon igenkännbar.', 'Samla minsta nödvändiga data och följ gällande integritetsregler.'),
    ],
  },
]

function createLesson(
  curriculum: TopicCurriculum,
  learningUnit: LearningUnit,
  unitIndex: number,
  practice: PracticeFormat,
  practiceIndex: number,
): LearningCard {
  const correctIndex = practiceIndex % 3
  const options = [
    'Dra en säker slutsats innan du har kontrollerat underlaget.',
    'Samla fler detaljer utan att välja ett konkret nästa steg.',
  ]
  options.splice(correctIndex, 0, practice.answer)

  return {
    id: `extra-${curriculum.topicId}-${String(unitIndex + 1).padStart(2, '0')}-${String(practiceIndex + 1).padStart(2, '0')}`,
    topicId: curriculum.topicId,
    title: `${learningUnit.focus} · ${practice.title}`,
    subtitle: `${practice.rationale} (${curriculum.label})`,
    minutes: practiceIndex % 4 === 0 ? 3 : 2,
    level: unitIndex > 5 && practiceIndex % 2 === 0 ? 'Medel' : 'Start',
    xp: 20,
    slides: [
      { title: learningUnit.focus, body: learningUnit.principle },
      { title: 'Exempel i vardagen', body: learningUnit.example },
      { title: practice.title, body: `${practice.prompt} Koppla övningen till: ${learningUnit.action}` },
    ],
    deepDive: {
      intro: `${learningUnit.principle} ${learningUnit.example}`,
      sections: [
        {
          title: 'Förstå principen',
          body: learningUnit.principle,
          bullets: [
            `Exempel: ${learningUnit.example}`,
            `Ett användbart steg: ${learningUnit.action}`,
            'Skilj mellan vad du vet, vad du antar och vad du vill ta reda på.',
          ],
        },
        {
          title: practice.title,
          body: `${practice.rationale} ${practice.prompt}`,
          bullets: [
            `Utgå från ${learningUnit.focus.toLocaleLowerCase('sv')}: ${learningUnit.action}`,
            'Håll övningen till en konkret situation.',
            'Skriv ned vad som blev tydligare efteråt.',
          ],
        },
      ],
      tryThis: `${practice.prompt} ${learningUnit.action}`,
    },
    quiz: {
      question: `Vad är ett bra sätt att träna ${learningUnit.focus.toLocaleLowerCase('sv')}?`,
      options,
      correctIndex,
      explanation: `${practice.rationale} ${learningUnit.principle}`,
    },
  }
}

export const generatedLessons: LearningCard[] = topicCurriculums.flatMap((curriculum) =>
  curriculum.units.flatMap((learningUnit, unitIndex) =>
    practiceFormats.map((practice, practiceIndex) =>
      createLesson(curriculum, learningUnit, unitIndex, practice, practiceIndex),
    ),
  ),
)

if (generatedLessons.length !== 10_000) {
  throw new Error(`Lärpuls förväntade 10 000 nya lärstunder men skapade ${generatedLessons.length}.`)
}
