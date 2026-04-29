// ============================================================
// HARMONOGRAM MTB NMNM 2026 — Wix Custom Element
// ============================================================
//
// Použití ve Wixu:
//   1. Nahraj tento soubor na GitHub Pages (nebo jiný hosting)
//   2. Wix Studio → Add → Embed Code → Custom Element
//      Server URL: https://USERNAME.github.io/REPO/harmonogram-element.js
//      Tag name:   harmonogram-widget
//   3. Drop element na stránku — automaticky se přizpůsobí výšce obsahu
//
// Editace dat: uprav pole DAYS / TYPES / EVENTS níže
// a nahraj soubor znovu na GitHub.
//
// ============================================================

(function () {
  'use strict';

  // ╔══════════════════════════════════════════════════════════╗
  // ║  ✏️  EDITOVATELNÁ DATA                                    ║
  // ╚══════════════════════════════════════════════════════════╝

  const DAYS = [
    { id: "thu", label: "Čt 21. 5." },
    { id: "fri", label: "Pá 22. 5." },
    { id: "sat", label: "So 23. 5." },
    { id: "sun", label: "Ne 24. 5." },
  ];

  const TYPES = {
    zavod:    { label: "Závod / Trénink",         dot: "#ee1d4b" },
    exhibice: { label: "Exhibice",                dot: "#e84c1d" },
    deti:     { label: "Pro děti",                dot: "#e8d21d" },
    vyjizd:   { label: "Vyjížďka / Workshop",     dot: "#b7d433" },
    expo:     { label: "Expo Zone",               dot: "#6ed41d" },
    testfest: { label: "Test Fest",               dot: "#1db8d4" },
    talkshow: { label: "Talkshow / Autogramiáda", dot: "#1d4bee" },
  };

  const EVENTS = [

    // ─── ČTVRTEK 21. 5. ───
    { day: "thu", allDay: false, time: "09:00", duration: 360, type: "deti",
      title: "Festival cyklistiky pro školy",
      desc: "Dovednostní soutěže na kole i bez něj a vědomostní hry o sportu, zdraví a životním prostředí pro školy z Kraje Vysočina." },
    { day: "thu", allDay: false, time: "13:00", duration: 30, type: "deti",
      title: "Dětská tisková konference",
      desc: "Hvězdy MTB scény odpovídají dětem na dotazy v unikátním formátu." },
    { day: "thu", allDay: false, time: "14:00", duration: 180, type: "zavod",
      title: "XCO – Oficiální trénink",
      desc: "Závodníci si zajedou olympijskou trať před víkendovými závody.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "thu", allDay: false, time: "17:00", duration: null, type: "zavod",
      title: "XCC – Juniorky a junioři: Kvalifikace",
      desc: "Krátká rychlá tratí, kde se rozhoduje o postupu do finálových jízd.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "thu", allDay: false, time: "18:00", duration: null, type: "zavod",
      title: "XCC – Juniorky: Finále",
      desc: "Vítězka získává prestižní pozici pro hlavní víkendový závod.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "thu", allDay: false, time: "18:25", duration: null, type: "zavod",
      title: "XCC – Junioři: Finále",
      desc: "Vítěz získává prestižní pozici pro hlavní víkendový závod.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "thu", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest",
      desc: "Vyzkoušej si ty nejnovější MTB a e-bike modely od top značek (15:00 – 19:00)." },

    // ─── PÁTEK 22. 5. ───
    { day: "fri", allDay: false, time: "08:00", duration: 540, type: "zavod",
      title: "XCO + XCC – Oficiální tréninky",
      desc: "Závodníci finalizují přípravy na obou tratích před víkendem." },
    { day: "fri", allDay: false, time: "09:00", duration: 360, type: "deti",
      title: "Festival cyklistiky pro školy",
      desc: "Dovednostní soutěže a vědomostní hry o sportu a zdraví pro školáky z Vysočiny." },
    { day: "fri", allDay: false, time: "12:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-bike vyjížďka",
      desc: "Richard Gaspi Gasperotti tě naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "fri", allDay: false, time: "13:00", duration: 240, type: "exhibice",
      title: "Jam session – freestyle MTB/BMX",
      desc: "Profi jezdci ladí triky před víkendovou AIRBAG SHOW. Atmosféra, hudba, salta." },
    { day: "fri", allDay: false, time: "15:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-bike vyjížďka",
      desc: "Richard Gaspi Gasperotti tě naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "fri", allDay: false, time: "15:00", duration: 120, type: "vyjizd",
      title: "Holky holkám: workshop + vyjížďka",
      desc: "Tereza Huříková a Simona Foxová o biomechanice, psychice a poruchách příjmu potravy ve sportu. Završeno krátkou vyjížďkou." },
    { day: "fri", allDay: false, time: "17:15", duration: null, type: "zavod",
      title: "XCC – Ženy U23",
      desc: "Mladá generace bojuje o cenné body do Světového poháru.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "fri", allDay: false, time: "18:05", duration: null, type: "zavod",
      title: "XCC – Muži U23",
      desc: "Krátká explozivní jízda, ve které se rodí budoucí elite hvězdy.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "fri", allDay: false, time: "18:40", duration: 30, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Pohoda před závodem s předními osobnostmi MTB scény." },
    { day: "fri", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest",
      desc: "Vyzkoušej si MTB i e-bike novinky od top značek včetně Shimano (10:00 – 19:00)." },

    // ─── SOBOTA 23. 5. ───
    { day: "sat", allDay: false, time: "09:00", duration: null, type: "zavod",
      title: "Junior Series – XCO",
      desc: "Mezinárodní seriál pro juniorské hvězdy zítřka. Nezapomenutelná atmosféra.",
      link: "https://www.mtbnmnm.com/cs/race-program/junior-series" },
    { day: "sat", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-bike vyjížďka",
      desc: "Richard Gaspi Gasperotti tě naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "sat", allDay: false, time: "10:20", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Přední čeští freestyloví jezdci v čele s Jakubem Venclem skáčou do airbagu salta a bicyklové triky." },
    { day: "sat", allDay: false, time: "10:40", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Profi BMX jezdci ukáží sérii triků na ALLWYN U-rampě." },
    { day: "sat", allDay: false, time: "11:20", duration: null, type: "zavod",
      title: "XCC – Ženy Elite",
      desc: "Hvězdy světové scény bojují o body do Světového poháru.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "sat", allDay: false, time: "12:10", duration: null, type: "zavod",
      title: "XCC – Muži Elite",
      desc: "Krátká explozivní jízda nejlepších XC jezdců světa.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "sat", allDay: false, time: "12:45", duration: 45, type: "talkshow",
      title: "Autogramiáda elitních XCO jezdců",
      desc: "Setkej se osobně s hvězdami světové scény – KOMA Rent modul." },
    { day: "sat", allDay: false, time: "13:25", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Bezprostřední dojmy z dopoledních závodů a víkendová předpověď." },
    { day: "sat", allDay: false, time: "13:30", duration: 20, type: "talkshow",
      title: "Czech Cycling Academy",
      desc: "Zdeněk Štybar představuje svůj projekt a jeho ambasadorské poslání." },
    { day: "sat", allDay: false, time: "14:00", duration: null, type: "zavod",
      title: "XCO – Ženy U23",
      desc: "Olympijská disciplína – mladé jezdkyně útočí na pódium.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sat", allDay: false, time: "14:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-bike vyjížďka",
      desc: "Richard Gaspi Gasperotti tě naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "sat", allDay: false, time: "15:15", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Druhá dávka adrenalinu – nové triky a salta předních freestyle jezdců." },
    { day: "sat", allDay: false, time: "15:35", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Pokračování BMX triků na ALLWYN U-rampě." },
    { day: "sat", allDay: false, time: "16:00", duration: null, type: "zavod",
      title: "XCO – Muži U23",
      desc: "Olympijská disciplína – nastupující generace mužských hvězd.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sat", allDay: false, time: "16:00", duration: 60, type: "vyjizd",
      title: "ABUS vyjížďka + skokový workshop",
      desc: "Jakub Vencl tě naučí skákat na jump trail u arény. Pro začátečníky i pokročilé." },
    { day: "sat", allDay: false, time: "16:15", duration: null, type: "talkshow",
      title: "MS v hokeji: Česko – Slovensko",
      desc: "Veřejná projekce zápasu na LED obrazovce v cateringové zóně. Pivo + atmosféra." },
    { day: "sat", allDay: false, time: "17:45", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Vrchol freestyle programu – nejodvážnější triky večera." },
    { day: "sat", allDay: false, time: "18:15", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Závěrečné BMX vystoupení na ALLWYN U-rampě před Night Race." },
    { day: "sat", allDay: false, time: "18:45", duration: 30, type: "talkshow",
      title: "Czech Cycling Academy",
      desc: "Zdeněk Štybar – druhá prezentace projektu v garáži budovy Office Area." },
    { day: "sat", allDay: false, time: "19:15", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Závěrečný díl s dojmy ze závodního dne." },
    { day: "sat", allDay: false, time: "20:30", duration: 150, type: "talkshow",
      title: "DJ set: DJ Lucky Boy",
      desc: "Hudba a atmosféra během Night Race. Powered by Monster Energy." },
    { day: "sat", allDay: false, time: "21:00", duration: null, type: "zavod",
      title: "Night Race & MTB party",
      desc: "Fanděte hvězdám, ale zazařte na kole i vy! Veřejný noční závod pro každého.",
      link: "https://www.mtbnmnm.com/cs/side-events/night-race" },
    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: "Fan Zóna Kraje Vysočina",
      desc: "Virtuální biatlonová střelnice s cenami, Fruit Bike a fotokoutek (9:00 – 18:00)." },
    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: "BESIP roadshow",
      desc: "Interaktivní vzdělávání o bezpečnosti cyklistů a prevenci na silnicích (9:00 – 18:00)." },
    { day: "sat", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest",
      desc: "Vyzkoušej si MTB a e-bike novinky od top značek (10:00 – 19:00)." },

    // ─── NEDĚLE 24. 5. ───
    { day: "sun", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-bike vyjížďka",
      desc: "Richard Gaspi Gasperotti tě naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "sun", allDay: false, time: "09:20", duration: 20, type: "talkshow",
      title: "Saxo ROBE music show",
      desc: "Saxofonista Radim Nowak rozjede ráno z ROBE showtrucku." },
    { day: "sun", allDay: false, time: "10:00", duration: null, type: "zavod",
      title: "Junior Series – XCO",
      desc: "Druhý nedělní závod talentovaných juniorů z celého světa.",
      link: "https://www.mtbnmnm.com/cs/race-program/junior-series" },
    { day: "sun", allDay: false, time: "11:00", duration: 15, type: "talkshow",
      title: "Saxo ROBE music show",
      desc: "Druhý saxofonový set Radima Nowaka před hlavními závody." },
    { day: "sun", allDay: false, time: "11:15", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Speciální host: Zdeněk Štybar – exkluzivní rozhovor před XCO finále." },
    { day: "sun", allDay: false, time: "11:15", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Nedělní freestyle setkání s nejlepšími českými jezdci." },
    { day: "sun", allDay: false, time: "11:30", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Ranní BMX triky na ALLWYN U-rampě – warmup před XCO." },
    { day: "sun", allDay: false, time: "12:00", duration: null, type: "zavod",
      title: "XCO – Ženy Elite: FINÁLE",
      desc: "Vrchol víkendu – hvězdy světové scény bojují o titul Světového poháru.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sun", allDay: false, time: "13:30", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Předzávodní freestyle dávka adrenalinu pro fanoušky." },
    { day: "sun", allDay: false, time: "14:00", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Závěrečné BMX vystoupení víkendu na ALLWYN U-rampě." },
    { day: "sun", allDay: false, time: "14:00", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Předzávodní napětí a předpovědi pro mužské finále." },
    { day: "sun", allDay: false, time: "14:25", duration: 15, type: "talkshow",
      title: "Saxo ROBE music show",
      desc: "Závěrečný hudební set Radima Nowaka před vyvrcholením víkendu." },
    { day: "sun", allDay: false, time: "15:00", duration: null, type: "zavod",
      title: "XCO – Muži Elite: FINÁLE",
      desc: "Vyvrcholení celého víkendu. Olympijská disciplína nejlepších jezdců světa.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: "Nadace ČEZ – EPP Pomáhej pohybem",
      desc: "Vybírej peníze na dobrou věc pohybem skrz aplikaci. Oranžový karavan (9:00 – 14:00)." },
    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: "Fan Zóna Kraje Vysočina",
      desc: "Virtuální biatlon, Fruit Bike, fotokoutek a další zábava (9:00 – 17:00)." },
    { day: "sun", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest",
      desc: "Poslední šance otestovat si MTB a e-bike novinky (9:00 – 15:00)." },
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
      font-weight: 700;
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
  `;

  // ╔══════════════════════════════════════════════════════════╗
  // ║  WIDGET CLASS                                             ║
  // ╚══════════════════════════════════════════════════════════╝

  class HarmonogramWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._activeDay     = DAYS[0].id;
      this._activeFilters = new Set(['all']);
    }

    connectedCallback() {
      this._loadFont();
      this._render();
    }

    // Načti Montserrat z Google Fonts (jen jednou pro celou stránku)
    _loadFont() {
      if (document.head.querySelector('link[data-harmonogram-font]')) return;
      const link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap';
      link.dataset.harmonogramFont = 'true';
      document.head.appendChild(link);
    }

    _fmtDuration(min) {
      if (!min) return '';
      const h = Math.floor(min / 60);
      const m = min % 60;
      if (h === 0) return `${m} min`;
      if (m === 0) return `${h} hod`;
      return `${h}:${String(m).padStart(2, '0')} hod`;
    }

    _isVisible(e) {
      return this._activeFilters.has('all') || this._activeFilters.has(e.type);
    }

    _renderHeading() {
      return `<h1 class="schedule-heading">Harmonogram</h1>`;
    }

    _renderTabs() {
      return `<div class="tabs">${
        DAYS.map(d => `
          <button class="tab-btn${d.id === this._activeDay ? ' active' : ''}" data-day="${d.id}">
            ${d.label}
          </button>`).join('')
      }</div>`;
    }

    _renderFilters() {
      const allActive = this._activeFilters.has('all');
      return `<div class="filters">
        <span class="filter-label">Filtr:</span>
        <button class="filter-btn${allActive ? ' active' : ''}" data-type="all">Vše</button>
        ${Object.entries(TYPES).map(([id, t]) => `
          <button class="filter-btn${!allActive && this._activeFilters.has(id) ? ' active' : ''}" data-type="${id}">
            <span class="dot" style="background:${t.dot}"></span>${t.label}
          </button>`).join('')}
      </div>`;
    }

    _renderCard(e) {
      const dur = e.duration ? `<span class="event-duration">· ${this._fmtDuration(e.duration)}</span>` : '';
      const inner = `
        ${!e.allDay ? `<div class="event-time">${e.time}</div>` : ''}
        <div class="event-body">
          <div class="event-title">${e.title}</div>
          ${e.desc ? `<div class="event-desc">${e.desc}</div>` : ''}
          <div class="event-meta">
            <span class="event-tag">${TYPES[e.type].label}</span>
            ${dur}
          </div>
        </div>`;

      const cls    = `event-card${this._isVisible(e) ? '' : ' hidden'}`;
      const target = e.linkBlank ? ' target="_blank" rel="noopener"' : '';

      // Pokud má event link → render jako <a>, jinak <div>
      return e.link
        ? `<a class="${cls}" data-type="${e.type}" href="${e.link}"${target}>${inner}</a>`
        : `<div class="${cls}" data-type="${e.type}">${inner}</div>`;
    }

    _renderColumns() {
      const day    = EVENTS.filter(e => e.day === this._activeDay);
      const timed  = day.filter(e => !e.allDay).sort((a, b) => a.time.localeCompare(b.time));
      const allDay = day.filter(e => e.allDay);

      return `<div class="columns">
        <div>
          <div class="col-header">Časový program</div>
          <div class="event-list">
            ${timed.map(e => this._renderCard(e)).join('')}
            ${timed.filter(e => this._isVisible(e)).length === 0
              ? `<p class="empty-msg">Žádné události pro tento filtr.</p>` : ''}
          </div>
        </div>
        <div>
          <div class="col-header">Celodenní aktivity</div>
          <div class="event-list">
            ${allDay.map(e => this._renderCard(e)).join('')}
            ${allDay.filter(e => this._isVisible(e)).length === 0
              ? `<p class="empty-msg">Žádné aktivity pro tento filtr.</p>` : ''}
          </div>
        </div>
      </div>`;
    }

    _render() {
      this.shadowRoot.innerHTML = `<style>${STYLES}</style>` +
        this._renderHeading() + this._renderTabs() +
        this._renderFilters() + this._renderColumns();
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
  }

  // Registrace custom elementu
  if (!customElements.get('harmonogram-widget')) {
    customElements.define('harmonogram-widget', HarmonogramWidget);
  }
})();
