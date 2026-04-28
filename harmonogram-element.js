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
    { day: "thu", allDay: false, time: "10:00", duration: null, type: "zavod",
      title: "Prezentace závodníků XCC & XCO", desc: "" },
    { day: "thu", allDay: false, time: "14:00", duration: 180, type: "zavod",
      title: "Trénink XCO – volné kola",
      desc: "Trasy otevřeny pro registrované závodníky" },
    { day: "thu", allDay: true, time: null, duration: null, type: "expo",
      title: "Expo Zone – výstavní zóna",
      desc: "Prezentace značek a novinek z MTB světa" },
    { day: "thu", allDay: true, time: null, duration: null, type: "vyjizd",
      title: "Paddocks – zákulisí týmů",
      desc: "Nahlédněte do zákulisí světových týmů" },

    // ─── PÁTEK 22. 5. ───
    { day: "fri", allDay: false, time: "09:00", duration: 120, type: "zavod",
      title: "Officiální trénink XCC", desc: "" },
    { day: "fri", allDay: false, time: "11:00", duration: 40, type: "zavod",
      title: "XCC U23 Ženy", desc: "Short Track – Světový pohár" },
    { day: "fri", allDay: false, time: "11:40", duration: 40, type: "zavod",
      title: "XCC U23 Muži", desc: "Short Track – Světový pohár" },
    { day: "fri", allDay: false, time: "15:00", duration: 40, type: "zavod",
      title: "XCC Elite Ženy", desc: "Short Track – Světový pohár" },
    { day: "fri", allDay: false, time: "16:00", duration: 40, type: "zavod",
      title: "XCC Elite Muži", desc: "Short Track – Světový pohár" },
    { day: "fri", allDay: false, time: "20:00", duration: 120, type: "talkshow",
      title: "Talk Show & Party", desc: "Večerní show s hosty" },
    { day: "fri", allDay: true, time: null, duration: null, type: "expo",
      title: "Expo Zone", desc: "" },
    { day: "fri", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest – testování kol",
      desc: "Otestujte si přes 200 modelů MTB kol" },
    { day: "fri", allDay: true, time: null, duration: null, type: "deti",
      title: "Children's Zone – dětská zóna",
      desc: "Aktivity a závodění pro nejmenší fanoušky" },

    // ─── SOBOTA 23. 5. ───
    { day: "sat", allDay: false, time: "08:00", duration: 180, type: "zavod",
      title: "Open MTB Maraton",
      desc: "Veřejný závod – přihlaste se na webu" },
    { day: "sat", allDay: false, time: "09:00", duration: 240, type: "zavod",
      title: "Junior Series XCO",
      desc: "UCI Junior Series – juniorské kategorie" },
    { day: "sat", allDay: false, time: "13:00", duration: 90, type: "vyjizd",
      title: "Jenny Rissveds Ride",
      desc: "Skupinová vyjížďka s legendou MTB světa" },
    { day: "sat", allDay: false, time: "15:00", duration: 75, type: "zavod",
      title: "XCM Elite Ženy",
      desc: "Cross-Country Marathon – Světový pohár" },
    { day: "sat", allDay: false, time: "16:30", duration: 75, type: "zavod",
      title: "XCM Elite Muži",
      desc: "Cross-Country Marathon – Světový pohár" },
    { day: "sat", allDay: false, time: "21:00", duration: 120, type: "zavod",
      title: "Night Race",
      desc: "Noční MTB závod za umělého osvětlení – otevřeno pro veřejnost" },
    { day: "sat", allDay: true, time: null, duration: null, type: "expo",
      title: "Expo Zone", desc: "" },
    { day: "sat", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest", desc: "" },
    { day: "sat", allDay: true, time: null, duration: null, type: "deti",
      title: "Children's Zone", desc: "" },

    // ─── NEDĚLE 24. 5. ───
    { day: "sun", allDay: false, time: "11:00", duration: 90, type: "zavod",
      title: "XCO Elite Ženy",
      desc: "Finálový závod XCO – Světový pohár" },
    { day: "sun", allDay: false, time: "14:30", duration: 90, type: "zavod",
      title: "XCO Elite Muži",
      desc: "Finálový závod XCO – Světový pohár" },
    { day: "sun", allDay: false, time: "17:00", duration: 60, type: "talkshow",
      title: "Vyhlášení výsledků & Ceremoniál",
      desc: "Slavnostní předávání cen" },
    { day: "sun", allDay: true, time: null, duration: null, type: "expo",
      title: "Expo Zone", desc: "" },
    { day: "sun", allDay: true, time: null, duration: null, type: "testfest",
      title: "Test Fest", desc: "" },
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
      return `
        <div class="event-card${this._isVisible(e) ? '' : ' hidden'}" data-type="${e.type}">
          ${!e.allDay ? `<div class="event-time">${e.time}</div>` : ''}
          <div class="event-body">
            <div class="event-title">${e.title}</div>
            ${e.desc ? `<div class="event-desc">${e.desc}</div>` : ''}
            <div class="event-meta">
              <span class="event-tag">${TYPES[e.type].label}</span>
              ${dur}
            </div>
          </div>
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
