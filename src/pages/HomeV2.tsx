import { useState, useEffect, useRef, Fragment, type MouseEvent } from "react";
import {
  ChartBarIcon,
  PencilSquareIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  BoltIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import "./HomeV2.css";

// ── Hero execution card data ──────────────────────────────────────

const CARD_ROWS = {
  en: [
    { Icon: ChartBarIcon, team: "Sales Ops", status: "Pipeline sync in progress", state: "running" },
    { Icon: PencilSquareIcon, team: "Content", status: "3 drafts ready for review", state: "ready" },
    { Icon: CircleStackIcon, team: "Data", status: "Weekly report updated", state: "done" },
    { Icon: Cog6ToothIcon, team: "Ops", status: "7 follow-ups queued", state: "running" },
  ],
  es: [
    { Icon: ChartBarIcon, team: "Sales Ops", status: "Sincronizando pipeline", state: "running" },
    { Icon: PencilSquareIcon, team: "Contenido", status: "3 borradores para revisar", state: "ready" },
    { Icon: CircleStackIcon, team: "Data", status: "Reporte semanal listo", state: "done" },
    { Icon: Cog6ToothIcon, team: "Ops", status: "7 seguimientos en cola", state: "running" },
  ],
} as const;

const TEAM_ICONS = [ChartBarIcon, PencilSquareIcon, CircleStackIcon, Cog6ToothIcon];

// Icons for the 3 "How it works" steps — visual story at a glance
const STEP_ICONS = [MagnifyingGlassIcon, BoltIcon, UserGroupIcon];

// ── Scramble-build animation hook ────────────────────────────────

// Only uppercase + numbers: readable at a glance, feels computational not chaotic
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type CharState = { char: string; locked: boolean };
type BuildState = "idle" | "announced" | "building" | "done";

function useScrambleBuild(text: string) {
  const [chars, setChars] = useState<CharState[]>([]);
  const [buildState, setBuildState] = useState<BuildState>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setChars([]);
    setBuildState("idle");

    const ANNOUNCE_DELAY = 400;  // tag appears first — user reads "xenni."
    const START_DELAY    = 1400; // writing starts after the pause
    const STAGGER        = 80;   // ms between each character (readable pace)
    const FRAMES         = 3;    // minimal scramble — less chaos, more intent
    const FRAME_MS       = 65;   // ms per frame

    const announceTimer = setTimeout(() => {
      setBuildState("announced");
    }, ANNOUNCE_DELAY);

    const startTimer = setTimeout(() => {
      setBuildState("building");
      const arr: CharState[] = text.split("").map(() => ({ char: "\u00A0", locked: false }));
      setChars([...arr]);

      let lockedCount = 0;

      text.split("").forEach((target, idx) => {
        const t = setTimeout(() => {
          if (target === " ") {
            arr[idx] = { char: " ", locked: true };
            setChars([...arr]);
            lockedCount++;
            if (lockedCount === text.length) setBuildState("done");
            return;
          }

          let frame = 0;
          const tick = setInterval(() => {
            frame++;
            if (frame >= FRAMES) {
              clearInterval(tick);
              arr[idx] = { char: target, locked: true };
              lockedCount++;
              if (lockedCount === text.length) setBuildState("done");
            } else {
              arr[idx] = {
                char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
                locked: false,
              };
            }
            setChars([...arr]);
          }, FRAME_MS);

          timers.current.push(tick as unknown as ReturnType<typeof setTimeout>);
        }, idx * STAGGER);

        timers.current.push(t);
      });
    }, START_DELAY);

    timers.current.push(announceTimer, startTimer);

    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, [text]);

  return { chars, buildState };
}

// ── Layer diagram component ───────────────────────────────────────

function LayerDiagram({ lang }: { lang: "en" | "es" }) {
  const labels = {
    en: {
      top: { title: "YOUR TEAM", sub: "Reviews · Approves · Steers" },
      mid: { title: "xenni EXECUTION LAYER", sub: "Sales Ops · Content · Data · Ops" },
      bot: { title: "YOUR TOOLS & PIPELINE", sub: "CRM · Calendar · Channels · Data" },
      a1: "oversight",
      a2: "operates on",
    },
    es: {
      top: { title: "TU EQUIPO", sub: "Revisa · Aprueba · Dirige" },
      mid: { title: "CAPA DE EJECUCIÓN xenni", sub: "Sales Ops · Contenido · Data · Ops" },
      bot: { title: "TUS HERRAMIENTAS", sub: "CRM · Calendario · Canales · Data" },
      a1: "supervisión",
      a2: "opera sobre",
    },
  };
  const l = labels[lang];
  return (
    <div className="v2-layer-diagram">
      <div className="v2-layer-box v2-layer-box--team">
        <div className="v2-layer-title">{l.top.title}</div>
        <div className="v2-layer-sub">{l.top.sub}</div>
      </div>
      <div className="v2-layer-connector">
        <div className="v2-connector-line" />
        <span className="v2-connector-label">{l.a1}</span>
        <div className="v2-connector-arrow" />
      </div>
      <div className="v2-layer-box v2-layer-box--xenni">
        <div className="v2-layer-badge">
          <span className="v2-layer-live-dot" />
          {lang === "en" ? "Active" : "Activo"}
        </div>
        <div className="v2-layer-title">{l.mid.title}</div>
        <div className="v2-layer-sub">{l.mid.sub}</div>
      </div>
      <div className="v2-layer-connector">
        <div className="v2-connector-line" />
        <span className="v2-connector-label">{l.a2}</span>
        <div className="v2-connector-arrow" />
      </div>
      <div className="v2-layer-box v2-layer-box--tools">
        <div className="v2-layer-title">{l.bot.title}</div>
        <div className="v2-layer-sub">{l.bot.sub}</div>
      </div>
    </div>
  );
}

// ── Copy ─────────────────────────────────────────────────────────

const copy = {
  en: {
    brand: "xenni.",
    heroTitle: ["Small team.", "Heavy pipeline."],
    heroSub:
      "xenni gives lean B2B teams an AI execution layer for sales ops, content, and growth workflows — so they can run more pipeline, follow up faster, and ship more without hiring headcount too early.",
    heroCta: "Book a demo",
    heroNote: "30 min · with a real human · no commitment",
    cardLabel: "AI Execution Layer",
    cardFooter: "12 tasks completed today",

    proofLabel: "Used by lean teams that need to grow without breaking operations.",
    proofItems: [
      "Follow-ups and CRM hygiene handled automatically",
      "Content workflows executed across channels",
      "Reporting and repetitive ops kept moving in the background",
      "Humans approve, steer, and step in where judgment matters",
    ],

    whatKicker: "What xenni actually is",
    whatHeading1: "Not another AI assistant.",
    whatHeading2: "An execution layer for your growth operation.",
    whatP1:
      "Most startups do not fail because they lack ideas. They stall because a small team cannot keep execution consistent across pipeline, content, reporting, and day-to-day ops.",
    whatP2:
      "xenni deploys specialized AI teams that work as one unit inside your operation. They do the repetitive work, keep workflows moving, and expand your execution capacity without adding unnecessary friction.",

    whoKicker: "Built for lean B2B teams",
    whoTitle:
      "xenni is for companies that already have traction, but whose team is still too small for the operational load.",
    whoItems: [
      "Founder-led sales teams",
      "Lean revenue teams",
      "Startups running growth with a small internal team",
      "Companies where execution is fragmented across tools, people, and manual follow-up",
    ],

    painKicker: "Where teams usually break",
    painTitle: "As pipeline grows, execution starts leaking:",
    painItems: [
      "Leads are not followed up consistently",
      "CRM data gets messy fast",
      "Content production depends on overloaded people",
      "Reporting arrives late or never becomes actionable",
      "High-value work gets buried under repetitive tasks",
    ],
    painClose1: "The problem is not strategy.",
    painClose2: "The problem is operational drag.",

    promiseKicker: "What changes with xenni",
    promiseTitle: "With xenni, the team stays lean — but the operation does not.",
    promiseItems: [
      "More follow-through across your pipeline",
      "Faster execution across sales ops and content ops",
      "Less dependence on manual coordination",
      "More consistent output without rushing to hire",
      "Human oversight where judgment, context, or approval matter",
    ],

    howKicker: "How it works",
    howTitle: "Simple. In three steps.",
    steps: [
      {
        n: "01",
        title: "We map your growth operation",
        body: "We review your workflows, tools, bottlenecks, and goals in a focused working session.",
      },
      {
        n: "02",
        title: "We deploy AI execution teams",
        body: "xenni activates specialized agents across sales ops, content, and repetitive operational work.",
      },
      {
        n: "03",
        title: "Humans stay in control",
        body: "Your team reviews outcomes, approves critical actions, and helps refine the system over time.",
      },
    ],

    teamsKicker: "Specialized teams. Working as one.",
    teams: [
      {
        name: "Sales Ops Team",
        body: "Keeps pipeline workflows moving, updates records, supports follow-up, and reduces operational leakage.",
      },
      {
        name: "Content Team",
        body: "Turns briefs, ideas, and recurring needs into content workflows that actually get executed.",
      },
      {
        name: "Data & Reporting Team",
        body: "Keeps operational reporting organized, updated, and useful for decisions.",
      },
      {
        name: "Ops Team",
        body: "Handles repetitive coordination work that usually slows down the business.",
      },
    ],

    whyKicker: "Why now",
    whyTitle: "Hiring is expensive. Delay is worse.",
    whyP1:
      "Most growing teams wait too long to fix operational drag. They keep adding tools, pile more work onto a small team, and lose consistency right when execution matters most.",
    whyP2:
      "xenni helps you add capacity before operational chaos forces a larger headcount decision.",

    ctaTitle: "Run a heavier operation without building a heavier team.",
    ctaButton: "Book a demo",
    ctaNote: "30 min · with a real human · no commitment",
    navHow: "How it works",
    navTeams: "Teams",
    navCta: "Book a demo",
  },
  es: {
    brand: "xenni.",
    heroTitle: ["Escalas.", "Sin escalar el equipo."],
    heroSub:
      "xenni le da a equipos B2B pequeños una capa de ejecución con IA para sales ops, contenido y crecimiento — para mover más pipeline, responder más rápido y producir más, sin contratar gente antes de tiempo.",
    heroCta: "Agenda una demo",
    heroNote: "30 min · con un humano real · sin compromiso",
    cardLabel: "Equipos de ejecución IA",
    cardFooter: "12 tareas completadas hoy",

    proofLabel: "Para equipos que necesitan crecer sin que la operación se les salga de control.",
    proofItems: [
      "Seguimientos y limpieza de CRM en automático",
      "Flujos de contenido corriendo en todos los canales",
      "Reportes y tareas repetitivas avanzando en segundo plano",
      "Los humanos aprueban, redirigen e intervienen cuando hay criterio de por medio",
    ],

    whatKicker: "Qué es xenni en realidad",
    whatHeading1: "No es otro asistente de IA.",
    whatHeading2: "Es la capa de ejecución que tu operación necesita.",
    whatP1:
      "La mayoría de las startups no fracasan por falta de ideas. Se traban porque un equipo chico no puede mantener la ejecución consistente en pipeline, contenido, reportes y operación del día a día.",
    whatP2:
      "xenni despliega equipos de IA especializados que trabajan como una sola unidad dentro de tu operación. Se encargan del trabajo repetitivo, mantienen los flujos en movimiento y amplían tu capacidad sin agregar fricción.",

    whoKicker: "Para equipos B2B que ya tienen tracción",
    whoTitle:
      "xenni es para empresas que ya están creciendo, pero cuyo equipo todavía es demasiado chico para la carga operativa.",
    whoItems: [
      "Equipos de ventas liderados por el founder",
      "Equipos de revenue pequeños",
      "Startups que crecen con un equipo interno reducido",
      "Empresas donde la ejecución está fragmentada entre herramientas, personas y seguimiento manual",
    ],

    painKicker: "Dónde se rompe la ejecución",
    painTitle: "Cuando el pipeline crece, la operación empieza a perder:",
    painItems: [
      "Los leads no reciben seguimiento de forma consistente",
      "El CRM se convierte en un desastre rápidamente",
      "El contenido depende de gente que ya está al límite",
      "Los reportes llegan tarde o no sirven para decidir nada",
      "El trabajo que importa queda enterrado bajo tareas repetitivas",
    ],
    painClose1: "El problema no es la estrategia.",
    painClose2: "El problema es la operación.",

    promiseKicker: "Qué cambia con xenni",
    promiseTitle: "Con xenni, el equipo sigue siendo chico — pero la operación no lo parece.",
    promiseItems: [
      "Más seguimiento real en tu pipeline",
      "Ejecución más rápida en ventas y contenido",
      "Menos dependencia de la coordinación manual",
      "Output más consistente sin correr a contratar",
      "Supervisión humana donde el criterio y la aprobación importan",
    ],

    howKicker: "Cómo funciona",
    howTitle: "Simple. En tres pasos.",
    steps: [
      {
        n: "01",
        title: "Mapeamos tu operación",
        body: "Revisamos tus flujos, herramientas, cuellos de botella y objetivos en una sesión de trabajo enfocada.",
      },
      {
        n: "02",
        title: "Activamos los equipos de IA",
        body: "xenni pone a trabajar agentes especializados en sales ops, contenido y operación repetitiva.",
      },
      {
        n: "03",
        title: "El equipo mantiene el control",
        body: "Revisan resultados, aprueban lo que importa y van afinando el sistema con el tiempo.",
      },
    ],

    teamsKicker: "Equipos especializados. Trabajando como uno.",
    teams: [
      {
        name: "Equipo de Sales Ops",
        body: "Mantiene el pipeline en movimiento, actualiza registros, apoya el seguimiento y reduce fugas operativas.",
      },
      {
        name: "Equipo de Contenido",
        body: "Convierte ideas, briefs y necesidades recurrentes en contenido que realmente sale al mundo.",
      },
      {
        name: "Equipo de Data & Reporting",
        body: "Mantiene los reportes al día y útiles para tomar decisiones, sin que nadie tenga que perseguirlos.",
      },
      {
        name: "Equipo de Ops",
        body: "Se encarga de la coordinación repetitiva que normalmente traba al negocio.",
      },
    ],

    whyKicker: "Por qué ahora",
    whyTitle: "Contratar sale caro. Esperar, más.",
    whyP1:
      "La mayoría de los equipos en crecimiento esperan demasiado para atacar el problema operativo. Siguen sumando herramientas, le apilan más trabajo a un equipo chico y pierden consistencia justo cuando más importa ejecutar.",
    whyP2:
      "xenni te ayuda a sumar capacidad antes de que el caos te fuerce a contratar más gente de la que necesitas.",

    ctaTitle: "Opera a mayor escala sin crecer el equipo.",
    ctaButton: "Agenda una demo",
    ctaNote: "30 min · con un humano real · sin compromiso",
    navHow: "Cómo funciona",
    navTeams: "Equipos",
    navCta: "Agenda demo",
  },
};

// ── Main component ────────────────────────────────────────────────

export default function HomeV2() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = copy[lang];
  const rows = CARD_ROWS[lang];
  const { chars: scrambledChars, buildState } = useScrambleBuild(t.heroTitle[1]);

  // Tag appears at "announced" — before writing starts — so users read it first
  const [tagVisible, setTagVisible] = useState(false);
  const [tagFading, setTagFading] = useState(false);
  useEffect(() => {
    if (buildState === "announced" || buildState === "building") {
      setTagVisible(true);
      setTagFading(false);
    } else if (buildState === "done") {
      // Keep tag for 3 seconds after done so users connect the dots
      const fadeTimer = setTimeout(() => setTagFading(true), 3000);
      const hideTimer = setTimeout(() => setTagVisible(false), 3500);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [buildState]);

  // Nav becomes "scrolled" (glass + shows links) after passing the hero
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setNavScrolled(window.scrollY > 80);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const closeContactModal = () => setContactModalOpen(false);
  const openContactModal = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setContactModalOpen(true);
  };

  useEffect(() => {
    if (!contactModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContactModal();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [contactModalOpen]);

  const demoLink = createWhatsAppUrl(
    lang === "en"
      ? "Hi xenni, I want to book a demo for my company. I came from the homepage and want to see how your AI teams could support our operation."
      : "Hola xenni, quiero agendar una demo para mi empresa. Vengo desde la home y quiero ver cómo sus equipos AI podrían apoyar nuestra operación."
  );

  const modalCopy = {
    en: {
      title: "Book a demo your way",
      rush: "In a hurry?",
      rushCta: "Go to WhatsApp",
      classic: "Prefer the old school way?",
      classicCta: "Send us an email",
      emailLabel: "Write to us at",
      close: "Close",
    },
    es: {
      title: "Agenda una demo a tu manera",
      rush: "¿Tienes prisa?",
      rushCta: "Ir a WhatsApp",
      classic: "¿Prefieres a la antigua?",
      classicCta: "Escribir por correo",
      emailLabel: "Escríbenos a",
      close: "Cerrar",
    },
  }[lang];

  // Scroll-triggered entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("v2-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".v2-animate").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="v2-page">

      {/* ── Unified top nav ───────────────────────────────────────── */}
      <header className={`v2-top-nav${navScrolled ? " v2-top-nav--scrolled" : ""}`}>
        <span className="v2-brand">xenni.</span>

        <nav className="v2-top-nav-links" aria-label="Site navigation">
          <a href="#how" className="v2-top-nav-link">{t.navHow}</a>
          <a href="#teams" className="v2-top-nav-link">{t.navTeams}</a>
          <a href={demoLink} target="_blank" rel="noreferrer" className="v2-top-nav-cta" onClick={openContactModal}>
            {t.navCta}
          </a>
        </nav>

        <button
          className="v2-lang-toggle"
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          aria-label="Toggle language"
        >
          <span className={lang === "en" ? "v2-lang-active" : ""}>EN</span>
          <span className="v2-lang-sep">·</span>
          <span className={lang === "es" ? "v2-lang-active" : ""}>ES</span>
        </button>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="v2-hero">

        <div className="v2-hero-body">
          <main className="v2-main">
            <h1 className="v2-title">
              {t.heroTitle[0]}
              <br />
              <span className="v2-built-line" aria-label={t.heroTitle[1]}>
                {buildState !== "idle" && buildState !== "announced" && scrambledChars.map((c, i) => (
                  <span
                    key={i}
                    className={c.locked ? "v2-char v2-char--locked" : "v2-char v2-char--scramble"}
                  >
                    {c.char}
                  </span>
                ))}
                <span className="v2-cursor-wrap" aria-hidden="true">
                  {tagVisible && (
                    <span className={`v2-xenni-tag${tagFading ? " v2-xenni-tag--fade" : ""}`}>
                      <span className={`v2-xenni-tag-dot${buildState === "building" ? " v2-xenni-tag-dot--active" : ""}`} />
                      xenni.
                    </span>
                  )}
                  <span
                    className={`v2-cursor${buildState === "announced" || buildState === "done" ? " v2-cursor--blink" : ""}`}
                  />
                </span>
              </span>
            </h1>
            <p className="v2-sub">{t.heroSub}</p>
            <div className="v2-actions">
              <a href={demoLink} className="v2-cta" target="_blank" rel="noreferrer" onClick={openContactModal}>
                {t.heroCta}
              </a>
              <span className="v2-note">{t.heroNote}</span>
            </div>
          </main>

          {/* Execution status card */}
          <div className="v2-hero-visual" aria-hidden="true">
            <div className="v2-exec-card">
              <div className="v2-exec-card-header">
                <span className="v2-exec-card-label">{t.cardLabel}</span>
                <span className="v2-live-badge">
                  <span className="v2-live-dot" />
                  Live
                </span>
              </div>
              <div className="v2-exec-rows">
                {rows.map((row, i) => (
                  <div
                    key={row.team}
                    className="v2-exec-row"
                    style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                  >
                    <div className="v2-exec-icon">
                      <row.Icon />
                    </div>
                    <div className="v2-exec-text">
                      <span className="v2-exec-team">{row.team}</span>
                      <span className="v2-exec-status">{row.status}</span>
                    </div>
                    <span className={`v2-state v2-state--${row.state}`} />
                  </div>
                ))}
              </div>
              <div className="v2-exec-footer">
                <BoltIcon className="v2-bolt-icon" />
                <span>{t.cardFooter}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof strip ───────────────────────────────────────────── */}
      <section className="v2-proof">
        <div className="v2-proof-wrap">
          <p className="v2-proof-label v2-animate">{t.proofLabel}</p>
          <ul className="v2-proof-grid">
            {t.proofItems.map((item, i) => (
              <li
                key={i}
                className="v2-proof-item v2-animate"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <span className="v2-proof-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── What xenni actually is ────────────────────────────────── */}
      <section className="v2-what">
        <div className="v2-section-wrap">
          <p className="v2-section-kicker v2-animate">{t.whatKicker}</p>
          <div className="v2-what-layout">
            <div className="v2-what-left v2-animate" style={{ transitionDelay: "0.05s" }}>
              <h2 className="v2-what-h">{t.whatHeading1}</h2>
              <h2 className="v2-what-h v2-what-h--serif">{t.whatHeading2}</h2>
              <div className="v2-what-body">
                <p>{t.whatP1}</p>
                <p>{t.whatP2}</p>
              </div>
            </div>
            <div className="v2-what-right v2-animate" style={{ transitionDelay: "0.18s" }}>
              <LayerDiagram lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Who this is for ───────────────────────────────────────── */}
      <section className="v2-for">
        <div className="v2-section-wrap">
          <p className="v2-section-kicker v2-animate">{t.whoKicker}</p>
          <p className="v2-for-title v2-animate" style={{ transitionDelay: "0.07s" }}>
            {t.whoTitle}
          </p>
          <ul className="v2-for-grid">
            {t.whoItems.map((item, i) => (
              <li
                key={i}
                className="v2-for-item v2-animate"
                style={{ transitionDelay: `${0.1 + i * 0.08}s` }}
              >
                <ArrowRightIcon className="v2-for-arrow" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The pain ──────────────────────────────────────────────── */}
      <section className="v2-pain">
        <div className="v2-section-wrap">
          <p className="v2-section-kicker v2-animate">{t.painKicker}</p>
          <p className="v2-pain-title v2-animate" style={{ transitionDelay: "0.06s" }}>
            {t.painTitle}
          </p>
          <ul className="v2-pain-list">
            {t.painItems.map((item, i) => (
              <li
                key={i}
                className="v2-pain-item v2-animate"
                style={{ transitionDelay: `${0.1 + i * 0.07}s` }}
              >
                <ExclamationTriangleIcon className="v2-pain-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="v2-pain-close v2-animate" style={{ transitionDelay: "0.5s" }}>
            <p>{t.painClose1}</p>
            <p className="v2-pain-close--bold">{t.painClose2}</p>
          </div>
        </div>
      </section>

      {/* ── The promise ───────────────────────────────────────────── */}
      <section className="v2-promise">
        <div className="v2-section-wrap">
          <p className="v2-section-kicker v2-animate">{t.promiseKicker}</p>
          <p className="v2-promise-title v2-animate" style={{ transitionDelay: "0.07s" }}>
            {t.promiseTitle}
          </p>
          <ul className="v2-promise-list">
            {t.promiseItems.map((item, i) => (
              <li
                key={i}
                className="v2-promise-item v2-animate"
                style={{ transitionDelay: `${0.12 + i * 0.09}s` }}
              >
                <CheckCircleIcon className="v2-promise-icon" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section id="how" className="v2-how">
        <div className="v2-how-wrap">
          <p className="v2-how-kicker v2-animate">{t.howKicker}</p>
          <h2 className="v2-how-title v2-animate" style={{ transitionDelay: "0.07s" }}>
            {t.howTitle}
          </h2>
          <div className="v2-how-flow">
            {t.steps.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Fragment key={s.n}>
                  <article
                    className="v2-step v2-animate"
                    data-step={i}
                    style={{ transitionDelay: `${0.12 + i * 0.28}s` }}
                  >
                    <div className="v2-step-icon-wrap">
                      <Icon className="v2-step-icon" />
                    </div>
                    <span className="v2-step-n">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </article>

                  {i < t.steps.length - 1 && (
                    <div
                      className="v2-how-connector v2-animate"
                      style={{ transitionDelay: `${0.34 + i * 0.28}s` }}
                      aria-hidden="true"
                    >
                      <div className="v2-connector-track">
                        <div className="v2-connector-fill" />
                      </div>
                      <div className="v2-connector-tip" />
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Teams ─────────────────────────────────────────────────── */}
      <section id="teams" className="v2-teams">
        <div className="v2-teams-wrap">
          <p className="v2-section-kicker v2-animate">{t.teamsKicker}</p>
          <div className="v2-team-cards">
            {t.teams.map((team, i) => {
              const Icon = TEAM_ICONS[i];
              return (
                <article
                  key={i}
                  className="v2-team-card v2-animate"
                  style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
                >
                  <div className="v2-team-card-icon">
                    <Icon />
                  </div>
                  <h3 className="v2-team-name">{team.name}</h3>
                  <p className="v2-team-body">{team.body}</p>
                  <div className="v2-team-active">
                    <span className="v2-team-dot" />
                    <span>{lang === "en" ? "Active" : "Activo"}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why now ───────────────────────────────────────────────── */}
      <section className="v2-whynow">
        <div className="v2-section-wrap">
          <p className="v2-section-kicker v2-animate">{t.whyKicker}</p>
          <div className="v2-whynow-layout">
            <h2 className="v2-whynow-title v2-animate" style={{ transitionDelay: "0.08s" }}>
              {t.whyTitle}
            </h2>
            <div className="v2-whynow-body">
              <p className="v2-animate" style={{ transitionDelay: "0.16s" }}>
                {t.whyP1}
              </p>
              <p className="v2-animate" style={{ transitionDelay: "0.24s" }}>
                {t.whyP2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="v2-final-cta">
        <div className="v2-final-cta-wrap">
          <h2 className="v2-cta-title v2-animate">{t.ctaTitle}</h2>
          <div className="v2-actions v2-animate" style={{ transitionDelay: "0.15s" }}>
            <a href={demoLink} className="v2-cta v2-cta--dark" target="_blank" rel="noreferrer" onClick={openContactModal}>
              {t.ctaButton}
            </a>
            <span className="v2-note v2-note--light">{t.ctaNote}</span>
          </div>
        </div>
      </section>

      {contactModalOpen && (
        <div
          className="v2-contact-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeContactModal();
          }}
        >
          <div className="v2-contact-modal" role="dialog" aria-modal="true" aria-labelledby="v2-contact-modal-title">
            <button className="v2-contact-modal-close" onClick={closeContactModal} aria-label={modalCopy.close}>
              ×
            </button>
            <h3 id="v2-contact-modal-title">{modalCopy.title}</h3>
            <div className="v2-contact-modal-actions">
              <a href={demoLink} className="v2-contact-option v2-contact-option--wa" target="_blank" rel="noreferrer">
                <span>{modalCopy.rush}</span>
                <strong>{modalCopy.rushCta}</strong>
              </a>
              <a href="mailto:contact@xenni.xyz" className="v2-contact-option v2-contact-option--mail">
                <span>{modalCopy.classic}</span>
                <strong>{modalCopy.classicCta}</strong>
              </a>
            </div>
            <p className="v2-contact-email">
              {modalCopy.emailLabel} <a href="mailto:contact@xenni.xyz">contact@xenni.xyz</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
