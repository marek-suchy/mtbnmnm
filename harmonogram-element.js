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
    { id: "thu", label: "Čt 21. 5.", date: "2026-05-21" },
    { id: "fri", label: "Pá 22. 5.", date: "2026-05-22" },
    { id: "sat", label: "So 23. 5.", date: "2026-05-23" },
    { id: "sun", label: "Ne 24. 5.", date: "2026-05-24" },
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

  // Oficiální hosté — koho na akci potkáš
  // Formát: { name: "Jméno", role: "Funkce/Popis", days: ["thu","fri","sat","sun"] }
  //   - role je volitelná (může být prázdný string)
  //   - days = pole dnů (id z DAYS), kdy bude host přítomen
  //   - host se zobrazí v každém dni, kde je v jeho days
  const HOSTS = [
    // { name: "Zdeněk Štybar", role: "Ambasador Czech Cycling Academy",
    //   days: ["sat", "sun"] },
    // { name: "Tereza Huříková", role: "Profesionální cyklistka",
    //   days: ["fri"] },
  ];

  const EVENTS = [

    // ─── ČTVRTEK 21. 5. ───
    { day: "thu", allDay: false, time: "09:00", duration: 360, type: "deti",
      title: "Festival cyklistiky pro školy",
      desc: "Dovednostní soutěže na kole i bez něj a vědomostní hry o sportu, zdraví a životním prostředí." },
    { day: "thu", allDay: false, time: "13:00", duration: 30, type: "deti",
      title: "Dětská tisková konference",
      desc: "Hvězdy MTB scény odpovídají dětem na dotazy v unikátním formátu." },
    { day: "thu", allDay: false, time: "14:00", duration: 180, type: "zavod",
      title: "XCO - Oficiální trénink",
      desc: "Oficiální trénink všech kategorií na olympijské cross-country trati.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "thu", allDay: false, time: "17:00", duration: null, type: "zavod",
      title: "XCC - Women Junior a Men Junior: Kvalifikace",
      desc: "Jedno kolo XCC tratě, kde se rozhoduje o postupu do finálových jízd.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "thu", allDay: false, time: "18:00", duration: null, type: "zavod",
      title: "XCC - Women Junior: Finále",
      desc: "40 nejrychlejších juniorek se popere o vítězství na XCC okruhu.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "thu", allDay: false, time: "18:25", duration: null, type: "zavod",
      title: "XCC - Men Junior: Finále",
      desc: "40 nejrychlejších juniorů se popere o vítězství na XCC okruhu.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "thu", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest [15-19h]",
      desc: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny." },

    // ─── PÁTEK 22. 5. ───
    { day: "fri", allDay: false, time: "08:00", duration: 540, type: "zavod",
      title: "XCO + XCC - Oficiální tréninky",
      desc: "Oficiální trénink všech kategorií na XCO i XCC trati." },
    { day: "fri", allDay: false, time: "09:00", duration: 360, type: "deti",
      title: "Festival cyklistiky pro školy",
      desc: "Dovednostní soutěže na kole i bez něj a vědomostní hry o sportu, zdraví a životním prostředí." },
    { day: "fri", allDay: true, time: null, duration: null, type: "vyjizd",
      title: "Edukativní e-MTB vyjížďka: Gaspi",
      desc: "Richard „Gaspi“ Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "fri", allDay: false, time: "13:00", duration: 240, type: "exhibice",
      title: "Jam session – freestyle MTB/BMX",
      desc: "Profi jezdci vyladí triky před víkendovou AIRBAG SHOW." },
    { day: "fri", allDay: false, time: "15:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-MTB vyjížďka: Gaspi",
      desc: "Richard „Gaspi“ Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "fri", allDay: false, time: "15:00", duration: 120, type: "vyjizd",
      title: "Holky holkám: workshop + vyjížďka",
      desc: "Tereza Huříková a Simona Foxová o biomechanice, psychice a poruchách příjmu potravy ve sportu. Završeno krátkou vyjížďkou." },
    { day: "fri", allDay: false, time: "17:15", duration: null, type: "zavod",
      title: "XCC - Women U23",
      desc: "Krátký, dynamický závod na cca 20-25 minut kategorie Women U23.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "fri", allDay: false, time: "18:05", duration: null, type: "zavod",
      title: "XCC - Men U23",
      desc: "Krátký, dynamický závod na cca 20-25 minut kategorie Men U23.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "fri", allDay: false, time: "18:40", duration: 30, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Známé sportovní a cyklistické osobnosti pod palbou zvídavých otázek Daniela Stacha." },
    { day: "fri", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest [10-19h]",
      desc: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny." },

    // ─── SOBOTA 23. 5. ───
    { day: "sat", allDay: false, time: "09:00", duration: null, type: "zavod",
      title: "XCO - UCI Junior Series - Men Junior",
      desc: "Závod kategorie Men Junior na oficiální trati olympijského cross-country (XCO)",
      link: "https://www.mtbnmnm.com/cs/race-program/junior-series" },
    { day: "sat", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-MTB vyjížďka: Gaspi",
      desc: "Richard „Gaspi“ Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "sat", allDay: false, time: "10:20", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Přední čeští freestyloví jezdci v show plné neuvěřitelných triků." },
    { day: "sat", allDay: false, time: "10:40", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Profi BMX jezdci ukáží svoje umění na ALLWYN U-rampě." },
    { day: "sat", allDay: false, time: "11:20", duration: null, type: "zavod",
      title: "XCC - Women Elite",
      desc: "Krátký, dynamický závod na cca 20-25 minut kategorie Women Elite.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "sat", allDay: false, time: "12:10", duration: null, type: "zavod",
      title: "XCC - Men Elite",
      desc: "Krátký, dynamický závod na cca 20-25 minut kategorie Men Elite.",
      link: "https://www.mtbnmnm.com/cs/race-program/xcc" },
    { day: "sat", allDay: false, time: "12:45", duration: 45, type: "talkshow",
      title: "Autogramiáda elitních XCO jezdců - KOMA",
      desc: "Získejte podpis hvězd světového poháru horských kol." },
    { day: "sat", allDay: false, time: "13:25", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Známé sportovní a cyklistické osobnosti pod palbou zvídavých otázek Daniela Stacha." },
    { day: "sat", allDay: false, time: "13:30", duration: 20, type: "talkshow",
      title: "Projekt Czech Cycling Academy - Office Area",
      desc: "Zdeněk Štybar představuje projekt pro mladé cyklistické naděje." },
    { day: "sat", allDay: false, time: "14:00", duration: null, type: "zavod",
      title: "XCO - Women U23",
      desc: "Závod kategorie Women U23 na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sat", allDay: false, time: "14:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-MTB vyjížďka: Gaspi",
      desc: "Richard „Gaspi“ Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "sat", allDay: false, time: "15:15", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Přední čeští freestyloví jezdci v show plné neuvěřitelných triků." },
    { day: "sat", allDay: false, time: "15:35", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Profi BMX jezdci ukáží svoje umění na ALLWYN U-rampě." },
    { day: "sat", allDay: false, time: "16:00", duration: null, type: "zavod",
      title: "XCO - Men U23",
      desc: "Závod kategorie Men U23 na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sat", allDay: false, time: "16:00", duration: 60, type: "vyjizd",
      title: "ABUS ride & jump: Jakub Vencl",
      desc: "Naučte se základní i pokročilejší techniku skákání na kole s Jakubem Venclem." },
    { day: "sat", allDay: false, time: "16:15", duration: null, type: "talkshow",
      title: "Promítání MS v hokeji: Česko – Slovensko",
      desc: "Veřejná projekce zápasu na LED obrazovce v cateringové zóně." },
    { day: "sat", allDay: false, time: "17:45", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Přední čeští freestyloví jezdci v show plné neuvěřitelných triků." },
    { day: "sat", allDay: false, time: "18:15", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Profi BMX jezdci ukáží svoje umění na ALLWYN U-rampě." },
    { day: "sat", allDay: false, time: "18:45", duration: 30, type: "talkshow",
      title: "Projekt Czech Cycling Academy - Office Area",
      desc: "Zdeněk Štybar představuje projekt pro mladé cyklistické naděje." },
    { day: "sat", allDay: false, time: "19:15", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Známé sportovní a cyklistické osobnosti pod palbou zvídavých otázek Daniela Stacha." },
    { day: "sat", allDay: false, time: "20:30", duration: 150, type: "talkshow",
      title: "DJ set: DJ Lucky Boy",
      desc: "DJ Lucky Boy se postará o večerní atmosféru. Powered by Monster Energy." },
    { day: "sat", allDay: false, time: "21:00", duration: null, type: "zavod",
      title: "Night Race & MTB party",
      desc: "Fanděte hvězdám, ale svezte se i vy! Veřejný noční závod pro každého.",
      link: "https://www.mtbnmnm.com/cs/side-events/night-race" },
    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: "Fan Zóna Kraje Vysočina [9-18h]",
      desc: "Virtuální biatlonová střelnice s cenami, Fruit Bike a fotokoutek." },
    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: "BESIP roadshow [9-18h]",
      desc: "Interaktivní vzdělávání o bezpečnosti cyklistů a prevenci na silnicích." },
    { day: "sat", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest [10-19h]",
      desc: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny." },

    // ─── NEDĚLE 24. 5. ───
    { day: "sun", allDay: false, time: "09:00", duration: 120, type: "vyjizd",
      title: "Edukativní e-MTB vyjížďka: Gaspi",
      desc: "Richard „Gaspi“ Gasperotti vás naučí ovládat asistenci motoru, brzdění s ABS i údržbu. Powered by Bosch." },
    { day: "sun", allDay: false, time: "09:20", duration: 20, type: "talkshow",
      title: "Saxo ROBE music show",
      desc: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku." },
    { day: "sun", allDay: false, time: "10:00", duration: null, type: "zavod",
      title: "XCO - UCI Junior Series - Women Junior",
      desc: "Závod kategorie Women Junior na oficiální trati olympijského cross-country (XCO)",
      link: "https://www.mtbnmnm.com/cs/race-program/junior-series" },
    { day: "sun", allDay: false, time: "11:00", duration: 15, type: "talkshow",
      title: "Saxo ROBE music show",
      desc: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku." },
    { day: "sun", allDay: false, time: "11:15", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha: Zdeněk Štybar",
      desc: "Zdeněk Štybar pod palbou zvídavých otázek Daniela Stacha." },
    { day: "sun", allDay: false, time: "11:15", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Nedělní freestyle setkání s nejlepšími českými jezdci." },
    { day: "sun", allDay: false, time: "11:30", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Ranní BMX triky na ALLWYN U-rampě – warmup před XCO." },
    { day: "sun", allDay: false, time: "12:00", duration: null, type: "zavod",
      title: "XCO - Women Elite",
      desc: "Závod kategorie Women Elite na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sun", allDay: false, time: "13:30", duration: null, type: "exhibice",
      title: "AIRBAG SHOW",
      desc: "Předzávodní freestyle dávka adrenalinu pro fanoušky." },
    { day: "sun", allDay: false, time: "14:00", duration: null, type: "exhibice",
      title: "BMX SHOW",
      desc: "Závěrečné BMX vystoupení víkendu na ALLWYN U-rampě." },
    { day: "sun", allDay: false, time: "14:00", duration: 25, type: "talkshow",
      title: "Talk Show Daniela Stacha",
      desc: "Známé sportovní a cyklistické osobnosti pod palbou zvídavých otázek Daniela Stacha." },
    { day: "sun", allDay: false, time: "14:25", duration: 15, type: "talkshow",
      title: "Saxo ROBE music show",
      desc: "Saxofonista Radim Nowak to rozjede z ROBE showtrucku." },
    { day: "sun", allDay: false, time: "15:00", duration: null, type: "zavod",
      title: "XCO - Men Elite",
      desc: "Závod kategorie Men Elite na olympijské cross-country trati plné překážek, rychlých sjezdů a náročných výjezdů.",
      link: "https://www.mtbnmnm.com/cs/race-program/xco" },
    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: "Nadace ČEZ – EPP Pomáhej pohybem [9-14h]",
      desc: "Podpořte vlastními silami vybrané charitativní projekty přes aplikaci EPP Pomáhej pohybem. Oranžový přívěs Nadace ČEZ." },
    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: "Fan Zóna Kraje Vysočina [9-17h]",
      desc: "Virtuální biatlonová střelnice s cenami, Fruit Bike a fotokoutek." },
    { day: "sun", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest [9-15h]",
      desc: "Vyzkoušejte si nejnovější MTB a e-MTB na trailech v okolí Vysočina Areny." },
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

    /* Sekce Oficiální hosté */
    .hosts-section { margin-top: 28px; }
    .host-card {
      display: flex; align-items: flex-start; gap: 11px;
      padding: 11px 13px; background: var(--bg-card);
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
  `;

  // ╔══════════════════════════════════════════════════════════╗
  // ║  WIDGET CLASS                                             ║
  // ╚══════════════════════════════════════════════════════════╝

  class HarmonogramWidget extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._activeDay     = this._pickInitialDay();
      this._activeFilters = new Set(['all']);
    }

    // Auto-výběr záložky: pokud dnešní datum odpovídá některému dni,
    // přepne se na něj. Jinak první den.
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

    _renderHosts() {
      const list = HOSTS.filter(h =>
        Array.isArray(h.days) && h.days.includes(this._activeDay)
      );
      if (list.length === 0) return '';

      const cards = list.map(h => `
        <div class="host-card">
          <div class="event-body">
            <div class="host-name">${h.name}</div>
            ${h.role ? `<div class="host-role">${h.role}</div>` : ''}
          </div>
        </div>`).join('');

      return `<div class="hosts-section">
        <div class="col-header">Oficiální hosté</div>
        <div class="event-list">${cards}</div>
      </div>`;
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
          ${this._renderHosts()}
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
