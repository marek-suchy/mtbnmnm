// ============================================================
// HARMONOGRAM MTB NMNM 2026 — Wix Custom Element (CS + EN)
// ============================================================
//
// Použití ve Wixu:
//   1. Nahraj tento soubor na GitHub Pages (nebo jiný hosting)
//   2. Wix Studio → Add → Embed Code → Custom Element
//      Server URL: https://USERNAME.github.io/REPO/harmonogram-element.js
//      Tag name:   harmonogram-widget
//   3. Drop element na obě stránky (CS + EN) — stejný element, stejný soubor
//
// Detekce jazyka:
//   - automaticky podle URL (cesta /cs/... → CS, jinak EN)
//   - manuální override: <harmonogram-widget lang="en"></harmonogram-widget>
//
// Editace dat:
//   - tituly, popisky a role hostů jsou objekty { cs: "...", en: "..." }
//   - link může být string (sdílený) nebo objekt { cs, en } (různé URL)
//   - když přidáváš nový event, vyplň OBA jazyky
//
// ============================================================

(function () {
  'use strict';

  // ╔══════════════════════════════════════════════════════════╗
  // ║  ✏️  EDITOVATELNÁ DATA                                    ║
  // ╚══════════════════════════════════════════════════════════╝

  // UI texty (záhlaví, filtry, sloupce, prázdné stavy)
  const STRINGS = {
    cs: {
      heading:        "Harmonogram",
      filter_label:   "Filtr:",
      all:            "Vše",
      timed_header:   "Časový program",
      allday_header:  "Celodenní aktivity",
      hosts_header:   "S kým se potkáte",
      empty_events:   "Žádné události pro tento filtr.",
      empty_allday:   "Žádné aktivity pro tento filtr.",
      duration_min:   "min",
      duration_h:     "hod",
      extras_heading: "Spousta další akce během celého závodního víkendu",
    },
    en: {
      heading:        "Schedule",
      filter_label:   "Filter:",
      all:            "All",
      timed_header:   "Time Schedule",
      allday_header:  "All-Day Activities",
      hosts_header:   "You'll Meet",
      empty_events:   "No events match this filter.",
      empty_allday:   "No activities match this filter.",
      duration_min:   "min",
      duration_h:     "h",
      extras_heading: "Plenty More Activities Throughout the Race Weekend",
    },
  };

  const DAYS = [
    { id: "thu", date: "2026-05-21", label: { cs: "Čt 21. 5.", en: "Thu May 21" } },
    { id: "fri", date: "2026-05-22", label: { cs: "Pá 22. 5.", en: "Fri May 22" } },
    { id: "sat", date: "2026-05-23", label: { cs: "So 23. 5.", en: "Sat May 23" } },
    { id: "sun", date: "2026-05-24", label: { cs: "Ne 24. 5.", en: "Sun May 24" } },
  ];

  const TYPES = {
    zavod:    { dot: "#ee1d4b", label: { cs: "Závod / Trénink",         en: "Race / Training" } },
    exhibice: { dot: "#e84c1d", label: { cs: "Exhibice",                en: "Exhibition" } },
    deti:     { dot: "#e8d21d", label: { cs: "Pro děti",                en: "For Children" } },
    vyjizd:   { dot: "#b7d433", label: { cs: "Vyjížďka / Workshop",     en: "Ride / Workshop" } },
    expo:     { dot: "#6ed41d", label: { cs: "Expo Zone",               en: "Expo Zone" } },
    testfest: { dot: "#1db8d4", label: { cs: "Test Fest",               en: "Test Fest" } },
    talkshow: { dot: "#1d4bee", label: { cs: "Talkshow / Autogramiáda", en: "Talkshow / Autograph" } },
  };

  // Oficiální hosté
  // Formát: { name: "Jméno", role: { cs: "...", en: "..." }, days: [...] }
  //   - jméno je sdílené (jazykově neutrální)
  //   - role volitelná, prázdný string se nezobrazí
  const HOSTS = [
    { name: "Richard 'Gaspi' Gasperotti", role: { cs: "", en: "" }, days: ["fri"] },
    { name: "Tereza Huříková",            role: { cs: "", en: "" }, days: ["fri"] },
    { name: "Daniel Stach",               role: { cs: "", en: "" }, days: ["fri", "sat", "sun"] },
    { name: "Kateřina Neumannová",        role: { cs: "", en: "" }, days: ["fri", "sat"] },
    { name: "Zdeněk Štybar",              role: { cs: "", en: "" }, days: ["sat", "sun"] },
    { name: "Jakub Vencl",                role: { cs: "", en: "" }, days: ["sat", "sun"] },
    { name: "DJ Lucky Boy",               role: { cs: "", en: "" }, days: ["sat"] },
    { name: "Eva Adamczyková",            role: { cs: "", en: "" }, days: ["sat"] },
    { name: "Vavřinec Hradílek",          role: { cs: "", en: "" }, days: ["sat"] },
    { name: "Michal Prokop",              role: { cs: "", en: "" }, days: ["sun"] },
    { name: "Filip Mareš",                role: { cs: "", en: "" }, days: ["sun"] },
    { name: "Petr Vabroušek",             role: { cs: "", en: "" }, days: ["sun"] },
    { name: "Jaroslav Kulhavý",           role: { cs: "", en: "" }, days: ["sun"] },
    { name: "Gabriela Soukalová",         role: { cs: "", en: "" }, days: ["sun"] },
  ];

  // URL pro race-program / side-events
  // CS = /cs/..., EN = /...   (jen /cs/ se mění na /)
  const URL_XCO          = { cs: "https://www.mtbnmnm.com/cs/race-program/xco",          en: "https://www.mtbnmnm.com/race-program/xco" };
  const URL_XCC          = { cs: "https://www.mtbnmnm.com/cs/race-program/xcc",          en: "https://www.mtbnmnm.com/race-program/xcc" };
  const URL_JUNIORSERIES = { cs: "https://www.mtbnmnm.com/cs/race-program/junior-series", en: "https://www.mtbnmnm.com/race-program/junior-series" };
  const URL_NIGHTRACE    = { cs: "https://www.mtbnmnm.com/cs/side-events/night-race",     en: "https://www.mtbnmnm.com/side-events/night-race" };
  const URL_TESTFEST    = { cs: "https://www.mtbnmnm.com/cs/old-side-events/bike-demos",     en: "https://www.mtbnmnm.com/old-side-events/bike-demos" };
  const URL_TEREHU    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshopy-a-vyjizdky-s66929/zeny-v-cyklistice-vykon-zdravi-a-radost-ze-sportu-social-mtb-gravel-ride-s-terezou-hurikovou-a-simonou-foxovou-patek-22-5-2026-15-00-17-00-e17227",     en: "https://mtbnmnm.reenio.cz/en/view/workshopy-a-vyjizdky-s66929/zeny-v-cyklistice-vykon-zdravi-a-radost-ze-sportu-social-mtb-gravel-ride-s-terezou-hurikovou-a-simonou-foxovou-patek-22-5-2026-15-00-17-00-e17227" };
  const URL_GASPI    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/richard-gaspi-gasperotti-edukativni-e-bike-vyjizdka-patek-nedele-vice-terminu-e17226",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/richard-gaspi-gasperotti-edukativni-e-bike-vyjizdka-patek-nedele-vice-terminu-e17226" };
  const URL_TH    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/pojezd-na-singletrailech-s-trailhuntercz-sobota-23-5-2026-14-00-e17273",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/pojezd-na-singletrailech-s-trailhuntercz-sobota-23-5-2026-14-00-e17273" };
  const URL_HZO    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/girls-only-ride-holkazocele-sobota-23-5-2026-14-00-e17246",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/girls-only-ride-holkazocele-sobota-23-5-2026-14-00-e17246" };
  const URL_VENCL    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/jakub-vencl-abus-vyjizdka-skokovy-workshop-sobota-23-5-2026-16-00-17-00-e17176",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/jakub-vencl-abus-vyjizdka-skokovy-workshop-sobota-23-5-2026-16-00-17-00-e17176" };
  const URL_ANDULA    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/social-run-andula-v-behu-sobota-23-5-2026-16-30-e17271",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/social-run-andula-v-behu-sobota-23-5-2026-16-30-e17271" };
  const URL_PASTOR    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/girls-only-ride-dostalova-g-nedele-24-5-2026-9-00-e17247",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/girls-only-ride-dostalova-g-nedele-24-5-2026-9-00-e17247" };
  const URL_MINICH    = { cs: "https://mtbnmnm.reenio.cz/cs/view/workshops-and-rides-s66929/social-run-daniel-minich-nedele-24-5-2026-9-00-e17272",     en: "https://mtbnmnm.reenio.cz/en/view/workshops-and-rides-s66929/social-run-daniel-minich-nedele-24-5-2026-9-00-e17272" };

  const EVENTS = [

    // ─── ČTVRTEK 21. 5. / THURSDAY MAY 21 ───
    { day: "thu", allDay: false, time: "09:00", duration: 360, type: "deti",
      title: { cs: "Festival cyklistiky pro školy",
               en: "Cycling Festival for Schools" },
      desc:  { cs: "Dovednostní soutěže na kole i bez něj a vědomostní hry o sportu, zdraví a životním prostředí.",
               en: "Skill competitions on and off the bike plus knowledge games about sports, health and the environment." } },

    { day: "thu", allDay: false, time: "12:30", duration: 30, type: "deti",
      title: { cs: "Dětská tisková konference",
               en: "Children's Press Conference" },
      desc:  { cs: "Hvězdy MTB scény odpovídají dětem na dotazy v unikátním formátu.",
               en: "MTB stars answer kids' questions in a unique format." } },

    { day: "thu", allDay: false, time: "14:00", duration: 180, type: "zavod",
      title: { cs: "XCO - Oficiální trénink",
               en: "XCO - Official Training" },
      desc:  { cs: "Oficiální trénink všech kategorií na olympijské cross-country trati.",
               en: "Official training for all categories on the Olympic cross-country track." },
      link: URL_XCO },

    { day: "thu", allDay: false, time: "17:00", duration: null, type: "zavod",
      title: { cs: "XCC - Women Junior a Men Junior: Kvalifikace",
               en: "XCC - Women Junior + Men Junior: Qualification" },
      desc:  { cs: "Jedno kolo XCC tratě, kde se rozhoduje o postupu do finálových jízd.",
               en: "One lap of the XCC track that decides who advances to the finals." },
      link: URL_XCC },

    { day: "thu", allDay: false, time: "18:00", duration: null, type: "zavod",
      title: { cs: "XCC - Women Junior: Finále",
               en: "XCC - Women Junior: Final" },
      desc:  { cs: "40 nejrychlejších juniorek se popere o vítězství na XCC okruhu.",
               en: "The 40 fastest junior women fight for victory on the XCC circuit." },
      link: URL_XCC },

    { day: "thu", allDay: false, time: "18:35", duration: null, type: "zavod",
      title: { cs: "XCC - Men Junior: Finále",
               en: "XCC - Men Junior: Final" },
      desc:  { cs: "40 nejrychlejších juniorů se popere o vítězství na XCC okruhu.",
               en: "The 40 fastest junior men fight for victory on the XCC circuit." },
      link: URL_XCC },

    { day: "thu", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Test Fest [15-19h]",
               en: "Test Fest [3-7 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny.",
               en: "Try the latest MTBs and e-MTBs on trails around the Vysočina Arena." },
      link: URL_TESTFEST },

    // ─── PÁTEK 22. 5. / FRIDAY MAY 22 ───
    { day: "fri", allDay: false, time: "08:00", duration: 540, type: "zavod",
      title: { cs: "XCO + XCC - Oficiální tréninky",
               en: "XCO + XCC - Official Trainings" },
      desc:  { cs: "Oficiální trénink všech kategorií na XCO i XCC trati.",
               en: "Official training for all categories on the XCO and XCC tracks." } },

    { day: "fri", allDay: false, time: "09:00", duration: 360, type: "deti",
      title: { cs: "Festival cyklistiky pro školy",
               en: "Cycling Festival for Schools" },
      desc:  { cs: "Dovednostní soutěže na kole i bez něj a vědomostní hry o sportu, zdraví a životním prostředí.",
               en: "Skill competitions on and off the bike plus knowledge games about sports, health and the environment." } },

    { day: "fri", allDay: false, time: "12:00", duration: 120, type: "vyjizd",
      title: { cs: "Edukativní e-MTB vyjížďka s @richardgasperotti",
               en: "Educational e-MTB Ride with @richardgasperotti" },
      desc:  { cs: "Richard 'Gaspi' Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu.",
               en: "Richard 'Gaspi' Gasperotti will teach you motor assistance control, ABS braking and maintenance." },
      link: URL_GASPI },
    
    { day: "fri", allDay: false, time: "13:00", duration: 240, type: "exhibice",
      title: { cs: "Jam session - freestyle MTB/BMX",
               en: "Jam Session - Freestyle MTB/BMX" },
      desc:  { cs: "Profi jezdci vyladí triky před víkendovou AIRBAG SHOW.",
               en: "Pro riders fine-tune their tricks before the weekend AIRBAG SHOW." } },

    { day: "fri", allDay: false, time: "15:00", duration: 120, type: "vyjizd",
      title: { cs: "Edukativní e-MTB vyjížďka s @richardgasperotti",
               en: "Educational e-MTB Ride with @richardgasperotti" },
      desc:  { cs: "Richard 'Gaspi' Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu.",
               en: "Richard 'Gaspi' Gasperotti will teach you motor assistance control, ABS braking and maintenance." },
      link: URL_GASPI },

    { day: "fri", allDay: false, time: "15:00", duration: 120, type: "vyjizd",
      title: { cs: "Ženy v cyklistice: výkon, zdraví a radost ze sportu + social MTB/Gravel ride s Terezou Huříkovou a Simonou Foxovou.",
               en: "Women in cycling: performance, health and joy of sport + social MTB/Gravel ride with Tereza Huříková and Simona Foxová." },
      desc:  { cs: "Otevřená diskuze o tom, jak podporovat dívky a ženy ve sportu zdravě, dlouhodobě a bez zbytečného tlaku. Diskuze propojí zkušenosti z vrcholového sportu i běžného života...",
               en: "An open discussion on how to support girls and women in sports in a healthy, long-term way without unnecessary pressure. The discussion will connect experiences from top sports and everyday life..." },
      link: URL_TEREHU },

    { day: "fri", allDay: false, time: "17:15", duration: null, type: "zavod",
      title: { cs: "XCC - Women U23",
               en: "XCC - Women U23" },
      desc:  { cs: "Krátký, dynamický závod na cca 20-25 minut kategorie Women U23.",
               en: "A short, dynamic race of approximately 20-25 minutes in the Women U23 category." },
      link: URL_XCC },

    { day: "fri", allDay: false, time: "18:05", duration: null, type: "zavod",
      title: { cs: "XCC - Men U23",
               en: "XCC - Men U23" },
      desc:  { cs: "Krátký, dynamický závod na cca 20-25 minut kategorie Men U23.",
               en: "A short, dynamic race of approximately 20-25 minutes in the Men U23 category." },
      link: URL_XCC },

    { day: "fri", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Test Fest [10-19h]",
               en: "Test Fest [10 AM - 7 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny.",
               en: "Try the latest MTBs and e-MTBs on trails around the Vysočina Arena." },
      link: URL_TESTFEST },

    { day: "fri", allDay: false, time: "16:20", duration: 20, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW předních českých jezdců",
               en: "BMX & Scootering Show by Top Czech Riders" },
      desc:  { cs: "Přední čeští BMX a scooter jezdci v show na ALLWYN U-rampě.",
               en: "Top Czech BMX and scooter riders in a show on the ALLWYN U-ramp." } },

    { day: "fri", allDay: false, time: "19:10", duration: 20, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW předních českých jezdců",
               en: "BMX & Scootering Show by Top Czech Riders" },
      desc:  { cs: "Přední čeští BMX a scooter jezdci v show na ALLWYN U-rampě.",
               en: "Top Czech BMX and scooter riders in a show on the ALLWYN U-ramp." } },

    { day: "fri", allDay: false, time: "19:30", duration: 30, type: "talkshow",
      title: { cs: "Talk Show Míry Lence: Superior Lions na Cape Epic 2026",
               en: "Talk Show by Míra Lenc: Superior Lions at Cape Epic 2026" },
      desc:  { cs: "Filip Adel a Vojta Neradil v ROBE Show Truck: Jak těžký byl letošní Cape Epic? O tom nám pohovoří jeho absolventi z týmu Superior Lions, Adlík s Vojtou!",
               en: "Filip Adel and Vojta Neradil in ROBE Show Truck: How difficult was this year's Cape Epic? Its graduates from the Superior Lions team, Adlík and Vojta, will tell us about it!" } },

    { day: "fri", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Testovačka nových gravelových bot Salomon [15-19h]",
               en: "Shoe-testing of a new Salomon gravel model [9 AM - 3 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější modely bot Salomon v různorodých terénech okolí Vysočina Areny: štěrkové cesty, traily, ale i volný les s měkkou hrabankou.",
               en: "Try out the latest Salomon shoe models in the diverse terrain around Vysočina Arena: gravel roads, trails, but also open forest with soft loam." } },




    // ─── SOBOTA 23. 5. / SATURDAY MAY 23 ───
    { day: "sat", allDay: false, time: "09:00", duration: null, type: "zavod",
      title: { cs: "XCO - UCI Junior Series - Men Junior",
               en: "XCO - UCI Junior Series - Men Junior" },
      desc:  { cs: "Závod kategorie Men Junior na oficiální trati olympijského cross-country (XCO)",
               en: "Men Junior race on the official Olympic cross-country (XCO) track." },
      link: URL_JUNIORSERIES },

    { day: "sat", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: { cs: "Edukativní e-MTB vyjížďka s @richardgasperotti",
               en: "Educational e-MTB Ride with @richardgasperotti" },
      desc:  { cs: "Richard 'Gaspi' Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu.",
               en: "Richard 'Gaspi' Gasperotti will teach you motor assistance control, ABS braking and maintenance." },
      link: URL_GASPI },

    { day: "sat", allDay: false, time: "10:20", duration: null, type: "exhibice",
      title: { cs: "AIRBAG SHOW", en: "AIRBAG SHOW" },
      desc:  { cs: "Přední čeští freestyloví jezdci v show plné neuvěřitelných triků.",
               en: "Top Czech freestyle riders in a show full of incredible tricks." } },

    { day: "sat", allDay: false, time: "10:30", duration: 25, type: "talkshow",
      title: { cs: "Talk Show Daniela Stacha",
               en: "Talk Show with Daniel Stach" },
      desc:  { cs: "Kateřina Neumannová v ROBE Show Truck: 30 let od její účasti na OH 1996 Atlanta v disciplíně cross-country horských kol. Jak se náš sport za 30 let vyvinul a jakou roli hraje kolo v jejím životě dnes?",
               en: "Kateřina Neumannová in ROBE Show Truck: 30 years since her participation at the 1996 Atlanta Olympics in MTB cross-country: how has the sport developed since then? And what role plays a bike in her life nowadays?" } },
    
    { day: "sat", allDay: false, time: "10:40", duration: null, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW", en: "BMX & SCOOTERING SHOW" },
      desc:  { cs: "Profi BMX jezdci ukáží svoje umění na ALLWYN U-rampě.",
               en: "Pro BMX riders showcase their skills on the ALLWYN U-ramp." } },

    { day: "sat", allDay: false, time: "11:20", duration: null, type: "zavod",
      title: { cs: "XCC - Women Elite", en: "XCC - Women Elite" },
      desc:  { cs: "Krátký, dynamický závod na cca 20-25 minut kategorie Women Elite.",
               en: "A short, dynamic race of approximately 20-25 minutes in the Women Elite category." },
      link: URL_XCC },

    { day: "sat", allDay: false, time: "12:10", duration: null, type: "zavod",
      title: { cs: "XCC - Men Elite", en: "XCC - Men Elite" },
      desc:  { cs: "Krátký, dynamický závod na cca 20-25 minut kategorie Men Elite.",
               en: "A short, dynamic race of approximately 20-25 minutes in the Men Elite category." },
      link: URL_XCC },

    { day: "sat", allDay: false, time: "13:30", duration: 45, type: "talkshow",
      title: { cs: "Autogramiáda elitních XCO jezdců - KOMA",
               en: "Autograph Session with Elite XCO Riders - KOMA" },
      desc:  { cs: "Získejte podpis hvězd světového poháru horských kol.",
               en: "Get autographs from the stars of the MTB World Cup." } },

    { day: "sat", allDay: false, time: "12:45", duration: 30, type: "talkshow",
      title: { cs: "Talk Show Daniela Stacha",
               en: "Talk Show with Daniel Stach" },
      desc:  { cs: "Eva Adamczyková v ROBE Show Truck: zlato 2014, bronz 2018 a stříbro 2026, naše olympijská královna. Jakou roli hraje v jejím životě kolo a jak těžké bylo připravit se letos na Olympiádu s malým potomkem?",
               en: "Eva Adamczyková, a true Czech Olympic Queen, in ROBE Show Truck: snowboardcross Olympic Gold in 2014, Bronze in 2018 and Silver in 2026. What role plays bike in her life and how difficult was it to prepare for the Olympics with a new little human around her?" } },

    { day: "sat", allDay: false, time: "13:30", duration: 20, type: "talkshow",
      title: { cs: "Projekt Czech Cycling Academy - Office Area",
               en: "Czech Cycling Academy Project - Office Area" },
      desc:  { cs: "Zdeněk Štybar představuje projekt pro mladé cyklistické naděje.",
               en: "Zdeněk Štybar presents his project for young cycling talents." } },

    { day: "sat", allDay: false, time: "14:00", duration: null, type: "zavod",
      title: { cs: "XCO - Women U23", en: "XCO - Women U23" },
      desc:  { cs: "Závod kategorie Women U23 na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
               en: "Women U23 race on the Olympic cross-country track full of obstacles, fast descents and demanding climbs." },
      link: URL_XCO },

    { day: "sat", allDay: false, time: "14:00", duration: 120, type: "vyjizd",
      title: { cs: "Pojezd na singletrailech s @trailhuntercz",
               en: "Ride local singletrails with @trailhuntercz" },
      desc:  { cs: "Připojte se k Trail Hunterovi na lovu trailů v Cyklo aréně Vysočina.",
               en: "Join Trail Hunter on a trail hunt around Vysočina Arena." },
      link: URL_TH },

    { day: "sat", allDay: false, time: "14:00", duration: 120, type: "vyjizd",
      title: { cs: "Girls-only ride s @holkazocele",
               en: "Girls-only ride with @holkazocele" },
      desc:  { cs: "MTB vyjížďka k pramenům Vysočiny, 40 km v přátelském tempu.",
               en: "MTB ride to the springs of Vysočina, 40 km at a friendly pace." },
      link: URL_HZO },

    { day: "sat", allDay: false, time: "15:15", duration: null, type: "exhibice",
      title: { cs: "AIRBAG SHOW", en: "AIRBAG SHOW" },
      desc:  { cs: "Přední čeští freestyloví jezdci v show plné neuvěřitelných triků.",
               en: "Top Czech freestyle riders in a show full of incredible tricks." } },

    { day: "sat", allDay: false, time: "15:35", duration: null, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW", en: "BMX & SCOOTERING SHOW" },
      desc:  { cs: "Profi BMX jezdci ukáží svoje umění na ALLWYN U-rampě.",
               en: "Pro BMX riders showcase their skills on the ALLWYN U-ramp." } },

    { day: "sat", allDay: false, time: "16:00", duration: null, type: "zavod",
      title: { cs: "XCO - Men U23", en: "XCO - Men U23" },
      desc:  { cs: "Závod kategorie Men U23 na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
               en: "Men U23 race on the Olympic cross-country track full of obstacles, fast descents and demanding climbs." },
      link: URL_XCO },

    { day: "sat", allDay: false, time: "16:00", duration: 60, type: "vyjizd",
      title: { cs: "ABUS ride & jump s @jakubvencl",
               en: "ABUS Ride & Jump with @jakubvencl" },
      desc:  { cs: "Naučte se základní i pokročilejší techniku skákání na kole s Jakubem Venclem.",
               en: "Learn basic and advanced jumping techniques on the bike with Jakub Vencl." },
      link: URL_VENCL },

    { day: "sat", allDay: false, time: "16:15", duration: null, type: "talkshow",
      title: { cs: "Promítání MS v hokeji: Česko - Slovensko",
               en: "Hockey World Championship Screening: Czech Republic - Slovakia" },
      desc:  { cs: "Veřejná projekce zápasu na LED obrazovce v cateringové zóně.",
               en: "Public screening of the match on the LED screen in the catering zone." } },

    { day: "sat", allDay: false, time: "16:30", duration: 60, type: "vyjizd",
      title: { cs: "Social run SALOMON s @andula_v_behu",
               en: "Social run SALOMON with @andula_v_behu" },
      desc:  { cs: "Společný výběh do okolí Vysočina Arény směr Bílá Skála, Vlachovice, Sykovec a přes Zahradníkův kout zpět. 7-10 km dle nadšení skupiny v přátelském tempu. Možnost otestovat nejnovější modely gravelových bot Salomon.",
               en: "Joint run to the surroundings of Vysočina Arena towards Bílá Skála, Vlachovice, Sykovec and back via Zahradníkův kout. 7-10 KM depending on the enthusiasm of the group at a friendly pace. Opportunity to test the latest model of Salomon gravel shoes." },
      link: URL_ANDULA },

    { day: "sat", allDay: false, time: "17:45", duration: null, type: "exhibice",
      title: { cs: "AIRBAG SHOW", en: "AIRBAG SHOW" },
      desc:  { cs: "Přední čeští freestyloví jezdci v show plné neuvěřitelných triků.",
               en: "Top Czech freestyle riders in a show full of incredible tricks." } },

    { day: "sat", allDay: false, time: "18:15", duration: null, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW", en: "BMX & SCOOTERING SHOW" },
      desc:  { cs: "Profi BMX jezdci ukáží svoje umění na ALLWYN U-rampě.",
               en: "Pro BMX riders showcase their skills on the ALLWYN U-ramp." } },

    { day: "sat", allDay: false, time: "18:45", duration: 30, type: "talkshow",
      title: { cs: "Projekt Czech Cycling Academy - Office Area",
               en: "Czech Cycling Academy Project - Office Area" },
      desc:  { cs: "Zdeněk Štybar představuje projekt pro mladé cyklistické naděje.",
               en: "Zdeněk Štybar presents his project for young cycling talents." } },

    { day: "sat", allDay: false, time: "19:15", duration: 25, type: "talkshow",
      title: { cs: "Talk Show Daniela Stacha",
               en: "Talk Show with Daniel Stach" },
      desc:  { cs: "Vavřinec Hradilek v ROBE Show Truck pohovoří o tom, jak si užívá sportovní důchod, povypráví o svých úspěších v reality show Asia Express a určitě také pohovoří o svém vztahu k cyklistice.",
               en: "Former Olympic medalist Vavřinec Hradilek in ROBE Show Truck will talk about his sports retirement, successful appearance in the Asia Express reality show and about his beloved bike." } },

    { day: "sat", allDay: false, time: "19:40", duration: 20, type: "talkshow",
      title: { cs: "Saxo ROBE music show - Radim Nowak",
               en: "Saxo ROBE Music Show - Radim Nowak" },
      desc:  { cs: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku.",
               en: "Saxophonist Radim Nowak gets it going from the ROBE showtruck." } },

    { day: "sat", allDay: false, time: "20:30", duration: 150, type: "talkshow",
      title: { cs: "DJ set: DJ Lucky Boy", en: "DJ Set: DJ Lucky Boy" },
      desc:  { cs: "DJ Lucky Boy se postará o večerní atmosféru. Powered by Monster Energy.",
               en: "DJ Lucky Boy will take care of the evening atmosphere. Powered by Monster Energy." } },

    { day: "sat", allDay: false, time: "21:00", duration: 30, type: "talkshow",
      title: { cs: "Saxo ROBE LIVE-MUSIC TRUCK",
               en: "Saxo ROBE Live-Music Truck" },
      desc:  { cs: "Exkluzivně pro závodníky MTB Night Race.",
               en: "Exclusively for MTB Night Race participants." } },

    { day: "sat", allDay: false, time: "21:00", duration: null, type: "zavod",
      title: { cs: "KNOG Night Race & MTB party",
               en: "KNOG Night Race & MTB Party" },
      desc:  { cs: "Fanděte hvězdám, ale svezte se i vy! Veřejný noční závod pro každého.",
               en: "Cheer for the stars, but ride yourself too! A public night race for everyone." },
      link: URL_NIGHTRACE },

    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: { cs: "Fan Zóna Kraje Vysočina [9-18h]",
               en: "Vysočina Region Fan Zone [9 AM - 6 PM]" },
      desc:  { cs: "Virtuální biatlonová střelnice s cenami, Fruit Bike a fotokoutek.",
               en: "Virtual biathlon shooting range with prizes, Fruit Bike and photo corner." } },

    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: { cs: "BESIP roadshow [9-18h]",
               en: "BESIP Roadshow [9 AM - 6 PM]" },
      desc:  { cs: "Interaktivní vzdělávání o bezpečnosti cyklistů a prevenci na silnicích.",
               en: "Interactive education on cyclist safety and road traffic prevention." } },

    { day: "sat", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Test Fest [10-19h]",
               en: "Test Fest [10 AM - 7 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny.",
               en: "Try the latest MTBs and e-MTBs on trails around the Vysočina Arena." },
      link: URL_TESTFEST },

        { day: "sat", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Testovačka nových gravelových bot Salomon [10-19h]",
               en: "Shoe-testing of a new Salomon gravel model [10 AM - 7 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější modely bot Salomon v různorodých terénech okolí Vysočina Areny: štěrkové cesty, traily, ale i volný les s měkkou hrabankou.",
               en: "Try out the latest Salomon shoe models in the diverse terrain around Vysočina Arena: gravel roads, trails, but also open forest with soft loam." } },


    // ─── NEDĚLE 24. 5. / SUNDAY MAY 24 ───
    { day: "sun", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: { cs: "Edukativní e-MTB vyjížďka s @richardgasperotti",
               en: "Educational e-MTB Ride with @richardgasperotti" },
      desc:  { cs: "Richard 'Gaspi' Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu.",
               en: "Richard 'Gaspi' Gasperotti will teach you motor assistance control, ABS braking and maintenance." },
      link: URL_GASPI },

    { day: "sun", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: { cs: "Girls-only ride s @dostalova_g",
               en: "Girls-only ride with @dostalova_g" },
      desc:  { cs: "Gravel vyjížďka na vrchol Žďárských vrchů, 40 km v přátelském tempu.",
               en: "Gravel ride to the top of the Žďárské vrchy hills, 40 km at a friendly pace." },
      link: URL_PASTOR },

    { day: "sun", allDay: false, time: "09:00", duration: 60, type: "vyjizd",
      title: { cs: "Social run SALOMON s @daniel_minich",
               en: "Social run SALOMON with @daniel_minich" },
      desc:  { cs: "Společný výběh za výhledy do okolí Vysočina Arény směr skokanský můstek na Šibenici, Harusův kopec, Jiříkovice a Vlachovice. 7-10 km dle nadšení skupiny v přátelském tempu. Možnost otestovat nejnovější modely gravelových bot Salomon.",
               en: "Joint run with views to the surroundings of Vysočina Arena towards the ski-jumping hill Šibenice, Jiříkovice and Vlachovice. 7-10 KM depending on the enthusiasm of the group at a friendly pace. Opportunity to test the latest model of Salomon gravel shoes." },
      link: URL_MINICH },

    { day: "sun", allDay: false, time: "09:20", duration: 20, type: "talkshow",
      title: { cs: "Saxo ROBE music show",
               en: "Saxo ROBE Music Show" },
      desc:  { cs: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku.",
               en: "Saxophonist Radim Nowak gets it going from the ROBE showtruck." } },

    { day: "sun", allDay: false, time: "10:00", duration: null, type: "zavod",
      title: { cs: "XCO - UCI Junior Series - Women Junior",
               en: "XCO - UCI Junior Series - Women Junior" },
      desc:  { cs: "Závod kategorie Women Junior na oficiální trati olympijského cross-country (XCO)",
               en: "Women Junior race on the official Olympic cross-country (XCO) track." },
      link: URL_JUNIORSERIES },

    { day: "sun", allDay: false, time: "11:00", duration: 15, type: "talkshow",
      title: { cs: "Saxo ROBE music show",
               en: "Saxo ROBE Music Show" },
      desc:  { cs: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku.",
               en: "Saxophonist Radim Nowak gets it going from the ROBE showtruck." } },

    { day: "sun", allDay: false, time: "11:15", duration: 25, type: "talkshow",
      title: { cs: "Talk Show Daniela Stacha: Zdeněk Štybar",
               en: "Talk Show with Daniel Stach: Zdeněk Štybar" },
      desc:  { cs: "Zdeněk Štybar pod palbou zvídavých otázek Daniela Stacha.",
               en: "Zdeněk Štybar under fire from Daniel Stach's curious questions." } },

    { day: "sun", allDay: false, time: "11:15", duration: null, type: "exhibice",
      title: { cs: "AIRBAG SHOW", en: "AIRBAG SHOW" },
      desc:  { cs: "Nedělní freestyle setkání s nejlepšími českými jezdci.",
               en: "Sunday freestyle meetup with the best Czech riders." } },

    { day: "sun", allDay: false, time: "11:30", duration: null, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW", en: "BMX & SCOOTERING SHOW" },
      desc:  { cs: "Ranní BMX triky na ALLWYN U-rampě - warmup před XCO.",
               en: "Morning BMX tricks on the ALLWYN U-ramp - warmup before XCO." } },

    { day: "sun", allDay: false, time: "12:00", duration: null, type: "zavod",
      title: { cs: "XCO - Women Elite", en: "XCO - Women Elite" },
      desc:  { cs: "Závod kategorie Women Elite na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
               en: "Women Elite race on the Olympic cross-country track full of obstacles, fast descents and demanding climbs." },
      link: URL_XCO },

    { day: "sun", allDay: false, time: "13:30", duration: null, type: "exhibice",
      title: { cs: "AIRBAG SHOW", en: "AIRBAG SHOW" },
      desc:  { cs: "Předzávodní freestyle dávka adrenalinu pro fanoušky.",
               en: "Pre-race freestyle adrenaline dose for fans." } },

    { day: "sun", allDay: false, time: "14:00", duration: null, type: "exhibice",
      title: { cs: "BMX & SCOOTERING SHOW", en: "BMX & SCOOTERING SHOW" },
      desc:  { cs: "Závěrečné BMX vystoupení víkendu na ALLWYN U-rampě.",
               en: "Final BMX performance of the weekend on the ALLWYN U-ramp." } },

    { day: "sun", allDay: false, time: "14:00", duration: 25, type: "talkshow",
      title: { cs: "Talk Show Daniela Stacha",
               en: "Talk Show with Daniel Stach" },
      desc:  { cs: "Biatonistka Gabriela Soukalová pod palbou zvídavých otázek Daniela Stacha: na jakém kole jezdí a proč? Jak vzpomíná na léta své úžasné sportovní kariéry a zážitky z naplněné Vysočina Arény? Jak se se jí líbí atmosféra elitních závodů horských kol v porovnání s biatlonem?",
               en: "Former famous biathlete Gabriela Soukalová under fire from Daniel Stach's curious questions: what bike does she ride and why? How does she reckon the years of her amazing biathlon career? How does she like the atmosphere of elite MTB XC races comparing to biathlon?" } },

    { day: "sun", allDay: false, time: "14:25", duration: 15, type: "talkshow",
      title: { cs: "Saxo ROBE music show",
               en: "Saxo ROBE Music Show" },
      desc:  { cs: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku.",
               en: "Saxophonist Radim Nowak gets it going from the ROBE showtruck." } },

    { day: "sun", allDay: false, time: "15:00", duration: null, type: "zavod",
      title: { cs: "XCO - Men Elite", en: "XCO - Men Elite" },
      desc:  { cs: "Závod kategorie Men Elite na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
               en: "Men Elite race on the Olympic cross-country track full of obstacles, fast descents and demanding climbs." },
      link: URL_XCO },

    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: { cs: "Nadace ČEZ - EPP Pomáhej pohybem [9-14h]",
               en: "ČEZ Foundation - EPP Help by Movement [9 AM - 2 PM]" },
      desc:  { cs: "Podpořte vlastními silami vybrané charitativní projekty přes aplikaci EPP Pomáhej pohybem. Oranžový přívěs Nadace ČEZ.",
               en: "Support selected charity projects through the EPP Help by Movement app using your own physical effort. ČEZ Foundation orange trailer." } },

    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: { cs: "Fan Zóna Kraje Vysočina [9-17h]",
               en: "Vysočina Region Fan Zone [9 AM - 5 PM]" },
      desc:  { cs: "Virtuální biatlonová střelnice s cenami, Fruit Bike a fotokoutek.",
               en: "Virtual biathlon shooting range with prizes, Fruit Bike and photo corner." } },

    { day: "sun", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Test Fest [9-15h]",
               en: "Test Fest [9 AM - 3 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny.",
               en: "Try the latest MTBs and e-MTBs on trails around the Vysočina Arena." },
      link: URL_TESTFEST },

    { day: "sun", allDay: true, time: null, duration: null, type: "testfest",
      title: { cs: "Testovačka nových gravelových bot Salomon [9-15h]",
               en: "Shoe-testing of a new Salomon gravel model [9 AM - 3 PM]" },
      desc:  { cs: "Vyzkoušejte si nejnovější modely bot Salomon v různorodých terénech okolí Vysočina Areny: štěrkové cesty, traily, ale i volný les s měkkou hrabankou.",
               en: "Try out the latest Salomon shoe models in the diverse terrain around Vysočina Arena: gravel roads, trails, but also open forest with soft loam." } },

  ];

  const EXTRAS = [
    { cs: "Nový PŘEDZÁVODNÍ PROGRAM: 10minutová talk show Míry Lence a Patricie Srnské před každým závodem!",
      en: "New PRE-RACE PROGRAM: A 10-minute talk show by Míra Lenc and Patricia Srnská before each race!" },
    { cs: "Online QR hry na LED obrazovkách o hodnotné ceny a britská DJka rozpoutají tu správnou předzávodní atmosféru.",
      en: "Online QR games on LED screens for valuable prizes and a British DJ will unleash the right pre-race atmosphere." },
    { cs: "O své úžasné sportovní zkušenosti se podělí Michal Prokop, Petr Vabroušek a spousta dalších sportovních celebrit.",
      en: "Michal Prokop, Petr Vabroušek and several other sport celebrities will share their amazing sports experiences." },
    { cs: "Shimano přiveze testovací e-biky osazené těmi nejlepšími komponenty a pohony: vyzkoušejte je!",
      en: "Shimano will bring test e-bikes equipped with the best components and drives: try them out at Shimano Test Area!" },
    { cs: "Monster Energy přiveze Manual Machine a přichystá soutěž o nejdelší manuál.",
      en: "Monster Energy will bring the Manual Machine and prepare the longest manual competition." },
    { cs: "Czech Cycling Academy Zdeňka Štybara prověří vaše děti svým důkladným testováním a vás pobaví virtuální realitou!",
      en: "Czech Cycling Academy patronated by Zdeněk Štybar will test your children with its thorough testing and entertain you with virtual reality!" },
    { cs: "Specialized si připraví zábavný dětský pumptrack program.",
      en: "Specialized will prepare a fun children's pumptrack program." },
    { cs: "S ROUVY si vyzkoušíte soutěže na trenažerech i jízdu na válcích.",
      en: "With ROUVY, you will try out competitions on trainers and riding on rollers." },
    { cs: "Elitní český rallye jezdec Filip Mareš a jeho Toyota Yaris WRC2 se ukáže fanouškům cyklistiky díky značce SUPERIOR.",
      en: "Elite Czech rally driver Filip Mareš and his Toyota Yaris WRC2 will show themselves to cycling fans thanks to the SUPERIOR brand." },
    { cs: "Kateřina Neumannová, účastnice prvního olympijského závodu horských kol na OH v Atlantě 1996, porovná náročnost cross-country tratí tehdy a dnes.",
      en: "Kateřina Neumannová, a participant in the first Olympic mountain bike race at the 1996 Atlanta Olympics, will compare the difficulty of cross-country courses then and now." },
  ];

  // ╔══════════════════════════════════════════════════════════╗
  // ║  STYLES — uvnitř shadow DOM (neovlivní zbytek webu)       ║
  // ╚══════════════════════════════════════════════════════════╝

  const STYLES = `
    :host {
      display: block;
      font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 300;
      color: #ffffff;
      font-size: 14px;
      line-height: 1.5;
      --bg-surface: rgba(255,255,255,0.08);
      --bg-card:    #2b2b2b;
      --border:     #383838;
      --text:       #ffffff;
      --text-muted: #999999;
      --accent:     #ee1d4b;
      --font-display: 'Helvetica Neue LT Com', 'HelveticaNeueW01-75Bold',
                      'Helvetica Neue', Helvetica, Arial, sans-serif;
      --font-body:    'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      --r-pill: 100px;
      --r-card: 8px;
      --c-zavod:    #ee1d4b;
      --c-exhibice: #e84c1d;
      --c-deti:     #e8d21d;
      --c-vyjizd:   #b7d433;
      --c-expo:     #6ed41d;
      --c-testfest: #1db8d4;
      --c-talkshow: #1d4bee;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    .schedule-heading {
      font-family: var(--font-display);
      font-weight: 900;
      font-size: clamp(2.4rem, 6vw, 4rem);
      text-transform: uppercase;
      letter-spacing: .04em;
      color: var(--text);
      margin-bottom: 28px;
      line-height: 1;
    }

    .tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
    .tab-btn {
      display: inline-flex; align-items: center; justify-content: center;
      height: 38px; padding: 2px 22px 0 22px;
      border: 2px solid var(--border); background: transparent;
      border-radius: var(--r-pill); cursor: pointer;
      font-family: var(--font-display); font-weight: 700;
      font-size: 13px; line-height: 1; letter-spacing: .03em;
      color: var(--text-muted); transition: all .18s;
      -webkit-appearance: none; appearance: none;
    }
    .tab-btn:hover:not(.active) { border-color: var(--accent); color: var(--accent); }
    .tab-btn.active { background: var(--accent); border-color: var(--accent); color: #fff; }

    .filters { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 28px; align-items: center; }
    .filter-label {
      font-family: var(--font-display); font-weight: 700;
      font-size: 11px; text-transform: uppercase; letter-spacing: .09em;
      color: var(--text-muted); margin-right: 4px;
    }
    .filter-btn {
      display: inline-flex; align-items: center; gap: 6px;
      height: 28px; padding: 0 12px;
      border-radius: var(--r-pill); border: 1.5px solid var(--border);
      background: transparent; cursor: pointer;
      font-family: var(--font-body); font-weight: 300;
      font-size: 12px; line-height: 1; color: var(--text-muted);
      transition: all .18s;
      -webkit-appearance: none; appearance: none;
    }
    .filter-btn .dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
    .filter-btn:hover { color: var(--text); border-color: #666; }
    .filter-btn.active { font-weight: 400; }
    .filter-btn.active[data-type="all"]      { border-color: #fff;              color: #fff;              background: var(--bg-surface); }
    .filter-btn.active[data-type="zavod"]    { border-color: var(--c-zavod);    color: var(--c-zavod);    }
    .filter-btn.active[data-type="exhibice"] { border-color: var(--c-exhibice); color: var(--c-exhibice); }
    .filter-btn.active[data-type="deti"]     { border-color: var(--c-deti);     color: var(--c-deti);     }
    .filter-btn.active[data-type="vyjizd"]   { border-color: var(--c-vyjizd);   color: var(--c-vyjizd);   }
    .filter-btn.active[data-type="expo"]     { border-color: var(--c-expo);     color: var(--c-expo);     }
    .filter-btn.active[data-type="testfest"] { border-color: var(--c-testfest); color: var(--c-testfest); }
    .filter-btn.active[data-type="talkshow"] { border-color: var(--c-talkshow); color: var(--c-talkshow); }

    .columns { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
    @media (max-width: 580px) { .columns { grid-template-columns: 1fr; } }

    .col-header {
      font-family: var(--font-display); font-weight: 700;
      font-size: 11px; text-transform: uppercase; letter-spacing: .1em;
      color: var(--text-muted);
      padding-bottom: 10px; border-bottom: 1px solid var(--border); margin-bottom: 10px;
    }

    .event-list { display: flex; flex-direction: column; gap: 7px; }

    .event-card {
      display: flex; align-items: flex-start; gap: 11px;
      padding: 11px 13px; background: var(--bg-card);
      border-radius: var(--r-card); border-left: 3px solid transparent;
    }
    .event-card.hidden { display: none; }

    /* Klikatelná karta — když má event link */
    a.event-card {
      text-decoration: none; color: inherit;
      cursor: pointer;
      transition: background .18s, transform .18s;
      position: relative;
    }
    a.event-card:hover { background: #353535; transform: translateX(2px); }
    a.event-card::after {
      content: "→";
      position: absolute; top: 50%; right: 14px;
      transform: translateY(-50%);
      font-family: var(--font-display); font-weight: 700;
      font-size: 16px; color: var(--text-muted);
      opacity: 0; transition: opacity .18s, transform .18s;
    }
    a.event-card:hover::after { opacity: 1; transform: translateY(-50%) translateX(3px); }
    .event-card[data-type="zavod"]    { border-left-color: var(--c-zavod);    }
    .event-card[data-type="exhibice"] { border-left-color: var(--c-exhibice); }
    .event-card[data-type="deti"]     { border-left-color: var(--c-deti);     }
    .event-card[data-type="vyjizd"]   { border-left-color: var(--c-vyjizd);   }
    .event-card[data-type="expo"]     { border-left-color: var(--c-expo);     }
    .event-card[data-type="testfest"] { border-left-color: var(--c-testfest); }
    .event-card[data-type="talkshow"] { border-left-color: var(--c-talkshow); }

    .event-time {
      font-family: var(--font-display); font-weight: 700;
      font-size: 13px; color: var(--text-muted);
      min-width: 44px; padding-top: 1px; flex-shrink: 0;
    }
    .event-body { flex: 1; min-width: 0; }
    .event-title { font-family: var(--font-display); font-weight: 700; font-size: 14px; line-height: 1.3; }
    .event-desc { font-family: var(--font-body); font-weight: 300; font-size: 12px; color: var(--text-muted); margin-top: 3px; line-height: 1.4; }
    .event-meta { display: flex; align-items: center; gap: 7px; margin-top: 6px; flex-wrap: wrap; }

    .event-tag {
      display: inline-flex; align-items: center;
      height: 18px; padding: 2px 8px 0 8px;
      font-family: var(--font-display); font-weight: 700;
      font-size: 9px; line-height: 1;
      text-transform: uppercase; letter-spacing: .07em;
      border-radius: var(--r-pill); color: #fff;
    }
    .event-card[data-type="zavod"]    .event-tag { background: var(--c-zavod);    }
    .event-card[data-type="exhibice"] .event-tag { background: var(--c-exhibice); }
    .event-card[data-type="deti"]     .event-tag { background: var(--c-deti);     color: #111; }
    .event-card[data-type="vyjizd"]   .event-tag { background: var(--c-vyjizd);   color: #111; }
    .event-card[data-type="expo"]     .event-tag { background: var(--c-expo);     color: #111; }
    .event-card[data-type="testfest"] .event-tag { background: var(--c-testfest); }
    .event-card[data-type="talkshow"] .event-tag { background: var(--c-talkshow); }

    .event-duration { font-family: var(--font-body); font-weight: 300; font-size: 11px; color: var(--text-muted); }

    .empty-msg {
      font-family: var(--font-body); font-weight: 300;
      font-size: 13px; font-style: italic;
      color: var(--text-muted); padding: 10px 0;
    }

    /* Sekce Oficiální hosté — pod celodenními aktivitami v pravém sloupci */
    .hosts-section { margin-top: 24px; }
    .host-card {
      display: flex; align-items: flex-start; gap: 11px;
      padding: 11px 13px;
      background: var(--bg-card);
      border-radius: var(--r-card);
      border-left: 3px solid var(--accent);
    }
    .host-name {
      font-family: var(--font-display); font-weight: 700;
      font-size: 14px; line-height: 1.3;
    }
    .host-role {
      font-family: var(--font-body); font-weight: 300;
      font-size: 12px; color: var(--text-muted);
      margin-top: 3px; line-height: 1.4;
    }

/* Sekce "Spousta dalších akcí" */
    .extras-section { margin-top: 36px; }
    .extras-heading {
      font-family: var(--font-display); font-weight: 700;
      font-size: 11px; text-transform: uppercase; letter-spacing: .1em;
      color: var(--text-muted);
      padding-bottom: 10px; border-bottom: 1px solid var(--border); margin-bottom: 10px;
    }
    .extras-list {
      list-style: disc;
      padding-left: 18px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .extras-item {
      font-family: var(--font-body); font-weight: 300;
      font-size: 13px; line-height: 1.5; color: var(--text);
    }

    .handle { color: var(--c-vyjizd); }
  `;

  // ╔══════════════════════════════════════════════════════════╗
  // ║  POMOCNÉ FUNKCE                                           ║
  // ╚══════════════════════════════════════════════════════════╝

  // Zjisti aktuální jazyk:
  //   1. explicit attribut <harmonogram-widget lang="cs|en">
  //   2. URL cesta začíná /cs (např. /cs/schedule) → CS
  //   3. jinak EN (např. /schedule)
  function detectLang(element) {
    if (element && element.hasAttribute('lang')) {
      const v = element.getAttribute('lang').toLowerCase();
      if (v === 'cs' || v === 'cz') return 'cs';
      if (v === 'en') return 'en';
    }
    const path = window.location.pathname || '';
    if (path === '/cs' || path.startsWith('/cs/')) return 'cs';
    return 'en';
  }

  // Vrať překlad z multi-language objektu, fallback na CS pak EN
  function tx(value, lang) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value.cs || value.en || '';
  }

  // ╔══════════════════════════════════════════════════════════╗
  // ║  WIDGET CLASS                                             ║
  // ╚══════════════════════════════════════════════════════════╝

  class HarmonogramWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._lang          = 'en';                        // přepíše se v connectedCallback
      this._activeDay     = this._pickInitialDay();
      this._activeFilters = new Set(['all']);
    }

    _pickInitialDay() {
      const t = new Date();
      const yyyy = t.getFullYear();
      const mm   = String(t.getMonth() + 1).padStart(2, '0');
      const dd   = String(t.getDate()).padStart(2, '0');
      const today = `${yyyy}-${mm}-${dd}`;
      const match = DAYS.find(d => d.date === today);
      return match ? match.id : DAYS[0].id;
    }

    connectedCallback() {
      this._lang = detectLang(this);
      this._loadFont();
      this._render();
    }

    _loadFont() {
      if (document.head.querySelector('link[data-harmonogram-font]')) return;
      const link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap';
      link.dataset.harmonogramFont = 'true';
      document.head.appendChild(link);
    }

    _t(key) {
      return STRINGS[this._lang] && STRINGS[this._lang][key]
        || STRINGS.cs[key] || '';
    }

    _fmtDuration(min) {
      if (!min) return '';
      const h = Math.floor(min / 60);
      const m = min % 60;
      const minLabel = this._t('duration_min');
      const hLabel   = this._t('duration_h');
      if (h === 0) return `${m} ${minLabel}`;
      if (m === 0) return `${h} ${hLabel}`;
      return `${h}:${String(m).padStart(2, '0')} ${hLabel}`;
    }

    _isVisible(e) {
      return this._activeFilters.has('all') || this._activeFilters.has(e.type);
    }

    _renderHeading() {
      return `<h1 class="schedule-heading">${this._t('heading')}</h1>`;
    }

    _renderTabs() {
      return `<div class="tabs">${
        DAYS.map(d => `
          <button class="tab-btn${d.id === this._activeDay ? ' active' : ''}" data-day="${d.id}">
            ${tx(d.label, this._lang)}
          </button>`).join('')
      }</div>`;
    }

    _renderFilters() {
      const allActive = this._activeFilters.has('all');
      return `<div class="filters">
        <span class="filter-label">${this._t('filter_label')}</span>
        <button class="filter-btn${allActive ? ' active' : ''}" data-type="all">${this._t('all')}</button>
        ${Object.entries(TYPES).map(([id, t]) => `
          <button class="filter-btn${!allActive && this._activeFilters.has(id) ? ' active' : ''}" data-type="${id}">
            <span class="dot" style="background:${t.dot}"></span>${tx(t.label, this._lang)}
          </button>`).join('')}
      </div>`;
    }

    _renderCard(e) {
      const dur   = e.duration ? `<span class="event-duration">· ${this._fmtDuration(e.duration)}</span>` : '';
      const title = tx(e.title, this._lang).replace(/@([\w]+)/g, '<span class="handle">@$1</span>');
      const desc  = tx(e.desc,  this._lang);
      const tag   = tx(TYPES[e.type].label, this._lang);
      const link  = tx(e.link,  this._lang);

      const inner = `
        ${!e.allDay ? `<div class="event-time">${e.time}</div>` : ''}
        <div class="event-body">
          <div class="event-title">${title}</div>
          ${desc ? `<div class="event-desc">${desc}</div>` : ''}
          <div class="event-meta">
            <span class="event-tag">${tag}</span>
            ${dur}
          </div>
        </div>`;

      const cls    = `event-card${this._isVisible(e) ? '' : ' hidden'}`;
      const target = link && !link.includes('mtbnmnm.com') ? ' target="_blank" rel="noopener"' : '';

      return link
        ? `<a class="${cls}" data-type="${e.type}" href="${link}"${target}>${inner}</a>`
        : `<div class="${cls}" data-type="${e.type}">${inner}</div>`;
    }

    _renderHosts() {
      const list = HOSTS.filter(h =>
        Array.isArray(h.days) && h.days.includes(this._activeDay)
      );
      if (list.length === 0) return '';

      const cards = list.map(h => {
        const role = tx(h.role, this._lang);
        return `
          <div class="host-card">
            <div>
              <div class="host-name">${h.name}</div>
              ${role ? `<div class="host-role">${role}</div>` : ''}
            </div>
          </div>`;
      }).join('');

      return `<div class="hosts-section">
        <div class="col-header">${this._t('hosts_header')}</div>
        <div class="event-list">${cards}</div>
      </div>`;
    }

    _renderExtras() {
      const items = EXTRAS.map(item =>
        `<li class="extras-item">${tx(item, this._lang)}</li>`
      ).join('');
      return `<div class="extras-section">
        <div class="extras-heading">${this._t('extras_heading')}</div>
        <ul class="extras-list">${items}</ul>
      </div>`;
    }

    _renderColumns() {
      const day    = EVENTS.filter(e => e.day === this._activeDay);
      const timed  = day.filter(e => !e.allDay).sort((a, b) => a.time.localeCompare(b.time));
      const allDay = day.filter(e => e.allDay);

      return `<div class="columns">
        <div>
          <div class="col-header">${this._t('timed_header')}</div>
          <div class="event-list">
            ${timed.map(e => this._renderCard(e)).join('')}
            ${timed.filter(e => this._isVisible(e)).length === 0
              ? `<p class="empty-msg">${this._t('empty_events')}</p>` : ''}
          </div>
        </div>
        <div>
          <div class="col-header">${this._t('allday_header')}</div>
          <div class="event-list">
            ${allDay.map(e => this._renderCard(e)).join('')}
            ${allDay.filter(e => this._isVisible(e)).length === 0
              ? `<p class="empty-msg">${this._t('empty_allday')}</p>` : ''}
          </div>
          ${this._renderHosts()}
        </div>
      </div>`;
    }

    _render() {
      this.shadowRoot.innerHTML = `<style>${STYLES}</style>` +
        this._renderHeading() + this._renderTabs() +
        this._renderFilters() + this._renderColumns() +
        this._renderExtras();
      this._attachEvents();
    }

    _attachEvents() {
      this.shadowRoot.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this._activeDay = btn.dataset.day;
          this._render();
        });
      });

      this.shadowRoot.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const t = btn.dataset.type;
          if (t === 'all') {
            this._activeFilters = new Set(['all']);
          } else {
            this._activeFilters.delete('all');
            this._activeFilters.has(t)
              ? this._activeFilters.delete(t)
              : this._activeFilters.add(t);
            if (this._activeFilters.size === 0) this._activeFilters.add('all');
          }
          this._render();
        });
      });
    }

    // Reaguj na změnu lang attribute (pro Wix Velo override)
    static get observedAttributes() { return ['lang']; }
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'lang' && this.shadowRoot && this.shadowRoot.innerHTML) {
        this._lang = detectLang(this);
        this._render();
      }
    }
  }

  if (!customElements.get('harmonogram-widget')) {
    customElements.define('harmonogram-widget', HarmonogramWidget);
  }
})();
