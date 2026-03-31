import { useEffect } from "react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import "./Home.inspiration.css";
import flowDesktopImg from "../assets/xenni_for_desktop.png";
import flowMobileImg from "../assets/xenni_for_mobile.png";

type DeptRow = {
  label: string;
  status: string;
  isActive: boolean;
  icon: "user" | "cross" | "check";
};

type DepartmentCard = {
  number: string;
  tier: string;
  tierClass: string;
  icon: string;
  title: string;
  description: string;
  tags: string[];
  impact: string;
  lime?: boolean;
};

type PricingCard = {
  tier: string;
  price: string;
  period: string;
  features: string[];
  departments: string;
  cta: string;
  featured?: boolean;
};

type FaqItem = {
  question: string;
  answer: string;
};

const marqueeItems = [
  { text: "Sin equipo de datos", className: "red" },
  { text: "Competir entero", className: "bright" },
  { text: "Sin research", className: "" },
  { text: "Sin operaciones", className: "" },
  { text: "Amputación operativa", className: "red" },
  { text: "Sin dev interno", className: "" },
  { text: "xenni", className: "bright" },
  { text: "Sin contenido", className: "" },
  { text: "Sin sales ops", className: "" },
  { text: "Crecer incompleto", className: "red" },
  { text: "Sin finance ops", className: "" },
  { text: "El músculo que faltaba", className: "bright" },
];

const currentCompanyRows: DeptRow[] = [
  { label: "Tú + tu equipo core", status: "Activo", isActive: true, icon: "user" },
  { label: "Datos & analytics", status: "No existe", isActive: false, icon: "cross" },
  { label: "Contenido & comunicación", status: "No existe", isActive: false, icon: "cross" },
  { label: "Sales ops & pipeline", status: "No existe", isActive: false, icon: "cross" },
  { label: "Operaciones & admin", status: "No existe", isActive: false, icon: "cross" },
];

const withXenniRows: DeptRow[] = [
  { label: "Tú + tu equipo core", status: "Activo", isActive: true, icon: "user" },
  { label: "xenni Data", status: "Activo", isActive: true, icon: "check" },
  { label: "xenni Content", status: "Activo", isActive: true, icon: "check" },
  { label: "xenni Sales Ops", status: "Activo", isActive: true, icon: "check" },
  { label: "xenni Ops", status: "Activo", isActive: true, icon: "check" },
];

const notRows = [
  {
    bad: "Otra herramienta que aprender",
    good: "Un departamento que opera desde el día 1",
    isYes: false,
  },
  {
    bad: "Automatización ciega que falla sin aviso",
    good: "Agentes supervisados con humano en el loop",
    isYes: false,
  },
  {
    bad: "Más headcount, overhead y gestión",
    good: "Más capacidad sin agregar peso",
    isYes: false,
  },
  {
    bad: "",
    good: "Por primera vez, tu negocio puede operar entero.",
    isYes: true,
  },
];

const departmentCards: DepartmentCard[] = [
  {
    number: "01",
    tier: "Base · Todos los planes",
    tierClass: "tier-base",
    icon: "⚙️",
    title: "xenni Ops",
    description:
      "Tu capa operativa base. Flujos automáticos, coordinación diaria, tareas recurrentes. El orquestador central que nunca descansa.",
    tags: ["Publicaciones", "Seguimiento", "Atención WhatsApp", "Reportes"],
    impact: "Impacto: continuidad operativa semanal sin cuellos de botella.",
  },
  {
    number: "02",
    tier: "Growth +",
    tierClass: "tier-growth",
    icon: "📊",
    title: "xenni Data",
    description:
      "Tu analista de datos permanente. Cruza fuentes, detecta patrones, genera dashboards. Las decisiones que tomabas por intuición, ahora con números reales.",
    tags: ["Análisis de ventas", "Dashboards", "Alertas de churn", "KPIs"],
    impact: "Impacto: decisiones con datos en lugar de intuición tardía.",
  },
  {
    number: "03",
    tier: "Growth +",
    tierClass: "tier-growth",
    icon: "✍️",
    title: "xenni Content",
    description:
      "Tu equipo de contenido. Redacta, adapta formatos, genera variantes con tu voz de marca. El pipeline de contenido que no depende de tu humor ese día.",
    tags: ["Posts & copies", "Newsletters", "Casos de éxito", "Documentación"],
    impact: "Impacto: presencia constante y narrativa de marca más fuerte.",
  },
  {
    number: "04",
    tier: "Growth +",
    tierClass: "tier-growth",
    icon: "🔍",
    title: "xenni Research",
    description:
      "Tu analista de mercado. Investiga competidores, sintetiza tendencias, hace due diligence. Lo que tardarías días en leer, en horas.",
    tags: ["Benchmarks", "Competidores", "Due diligence", "Tendencias"],
    impact: "Impacto: oportunidades detectadas antes que la competencia.",
  },
  {
    number: "05",
    tier: "Scale",
    tierClass: "tier-scale",
    icon: "⚡",
    title: "xenni Dev",
    description:
      "Tu dev interno bajo demanda. Escribe scripts, construye automatizaciones, arma herramientas internas. El trabajo técnico que siempre queda para después.",
    tags: ["Scripts Python", "Automatizaciones", "Integraciones", "Herramientas internas"],
    impact: "Impacto: ejecución técnica sin frenar al equipo core.",
    lime: true,
  },
  {
    number: "06",
    tier: "Scale",
    tierClass: "tier-scale",
    icon: "🎯",
    title: "xenni Sales Ops",
    description:
      "Tu operación de ventas que no se cae. Enriquece leads, actualiza CRM, arma secuencias de follow-up personalizadas. El pipeline que nunca se abandona.",
    tags: ["Enriquecimiento leads", "CRM updates", "Follow-ups", "Propuestas"],
    impact: "Impacto: menos fugas en pipeline y más cierres consistentes.",
    lime: true,
  },
];

const proofItems = [
  { number: "$", highlight: "2,200", label: "vs. $8,000-$15,000 al mes en headcount equivalente" },
  { number: "10", highlight: "×", label: "más tareas en paralelo que cualquier contratación individual" },
  { number: "14", highlight: "", label: "días de acompañamiento humano para que todo funcione de verdad" },
];

const howCards = [
  {
    number: "01",
    title: "Eliges tus departamentos",
    body: "Defines qué capacidades necesita tu empresa hoy. xenni configura los sub-agentes exactos para tu flujo real — no uno genérico de demo.",
    chip: "30 min de setup",
    delayClass: "d1",
  },
  {
    number: "02",
    title: "Acceso seguro, cero contraseñas",
    body: "xenni se conecta a tus herramientas mediante acceso delegado. Sin exponer credenciales. Sin riesgo de datos. Sin depender de que recuerdes actualizar un password.",
    chip: "Conexión en minutos",
    delayClass: "d2",
  },
  {
    number: "03",
    title: "14 días con un humano real",
    body: 'Un especialista de xenni trabaja contigo en tu canal durante dos semanas. Calibra, corrige y garantiza que cada tarea quede realmente terminada — no "ejecutada".',
    chip: "Humano en el loop",
    delayClass: "d3",
  },
];

const pricingCards: PricingCard[] = [
  {
    tier: "Starter",
    price: "$300",
    period: "/ mes · hasta 2 personas",
    features: [
      "xenni Ops activo",
      "3 flujos automáticos",
      "80 tareas on-demand / mes",
      "Onboarding 14 días con especialista",
      "Dashboard de tareas completadas",
    ],
    departments: "Solo xenni Ops · Sin sub-agentes especializados",
    cta: "Solicitar demo",
  },
  {
    tier: "Growth",
    price: "$800",
    period: "/ mes · hasta 10 personas",
    features: [
      "Todo Starter incluido",
      "1 sub-agente incluido a elección",
      "350 tareas on-demand / mes",
      "Sub-agentes adicionales: +$120/mes c/u",
      "Paralelización 3× simultánea",
      "Integraciones avanzadas",
    ],
    departments: "Data · Content · Research disponibles",
    cta: "Solicitar demo →",
    featured: true,
  },
  {
    tier: "Scale",
    price: "$2,000",
    period: "/ mes · equipos sin límite",
    features: [
      "Todos los sub-agentes activos",
      "1,200 tareas / mes",
      "Paralelización full 10×",
      "Memoria y contexto acumulativo",
      "API access + White-label",
      "CSM dedicado post-onboarding",
    ],
    departments: "Todos: Data · Dev · Content · Research · Sales Ops",
    cta: "Solicitar demo",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "¿Cuánto tarda xenni en empezar a producir resultados reales?",
    answer:
      "En los primeros 14 días activamos operación con acompañamiento humano. El objetivo no es solo configurar, sino dejar tareas resueltas y un ritmo operativo estable desde la semana 1.",
  },
  {
    question: "¿Necesito equipo técnico para implementarlo?",
    answer:
      "No. El setup inicial está diseñado para founders y equipos de negocio. Si tienes equipo técnico, se integra para acelerar automatizaciones avanzadas.",
  },
  {
    question: "¿Qué pasa si ya uso CRM, Notion, Sheets o WhatsApp?",
    answer:
      "Perfecto. xenni se monta sobre tu stack actual y conecta flujos existentes. No necesitas reemplazar herramientas para empezar a operar mejor.",
  },
  {
    question: "¿Cómo se asegura la calidad y no solo 'automatización por automatizar'?",
    answer:
      "Trabajamos con humano en el loop, métricas de cumplimiento y checklist por flujo. El foco está en tareas terminadas con criterio de negocio, no solo ejecutadas.",
  },
  {
    question: "¿Tienen cobertura para compliance, seguridad y trazabilidad?",
    answer:
      "Sí. Cada flujo queda registrado con logs, trazabilidad y controles operativos. Para equipos enterprise, diseñamos un esquema específico de seguridad, gobierno y cumplimiento.",
  },
];

const executionModes = [
  { label: "Tareas específicas bajo demanda", iconId: "bolt" },
  { label: "Tareas programadas recurrentes", iconId: "clock" },
  { label: "Tareas proactivas por señal/alerta", iconId: "bell" },
  { label: "Revisiones de calidad y cumplimiento", iconId: "shield-check" },
] as const;
const executionActions = [
  { label: "Plataformas vía navegador", iconId: "browser" },
  { label: "Integraciones y automatizaciones por APIs", iconId: "api" },
  { label: "Desarrollo y scripts en terminal", iconId: "terminal" },
  { label: "Acceso a entornos privados y VPN", iconId: "lock" },
] as const;
const executionGuarantees = [
  { label: "Ejecución paralela multi-tarea", iconId: "layers" },
  { label: "Priorización por impacto de negocio", iconId: "arrow-up" },
  { label: "Human-in-the-loop para decisiones críticas", iconId: "user-cog" },
  { label: "Escalamiento automático por incidencia", iconId: "stairs" },
] as const;
const platformLogos = [
  "Google Drive", "Notion", "Slack", "HubSpot", "WhatsApp",
  "Sheets", "Gmail", "Jira", "Stripe", "Zapier",
];

const whatsappLinks = {
  navDemo: createWhatsAppUrl(
    "Hola Xenni, quiero solicitar una demo. Vengo desde la landing y quiero entender si esto aplica para mi empresa."
  ),
  heroDemo: createWhatsAppUrl(
    "Hola Xenni, quiero ver una demo sin costo. Quiero entender como xenni operaria en mi negocio y que tareas podria delegar."
  ),
  stackRecommendation: createWhatsAppUrl(
    "Hola Xenni, quiero que me recomienden un stack inicial. Necesito ayuda para definir que departamentos activar primero."
  ),
  pricingDemo: (tier: string) =>
    createWhatsAppUrl(
      `Hola Xenni, quiero una demo del plan ${tier}. Quiero entender si es el fit correcto para mi empresa.`
    ),
  finalDemo: createWhatsAppUrl(
    "Hola Xenni, quiero agendar una demo gratuita. Me interesa ver en 30 minutos como operarian en mi negocio."
  ),
};

function CapIcon({ id }: { id: string }) {
  const s = { width: 20, height: 20, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const props = { viewBox: "0 0 24 24", ...s, stroke: "currentColor", strokeWidth: 1.6 };
  switch (id) {
    case "bolt":
      return <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8" /></svg>;
    case "clock":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    case "bell":
      return <svg {...props}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>;
    case "shield-check":
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "browser":
      return <svg {...props}><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20" /><circle cx="6" cy="6" r="0.5" fill="currentColor" /><circle cx="9" cy="6" r="0.5" fill="currentColor" /></svg>;
    case "api":
      return <svg {...props}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>;
    case "terminal":
      return <svg {...props}><path d="M4 17l6-5-6-5" /><path d="M12 19h8" /></svg>;
    case "lock":
      return <svg {...props}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>;
    case "layers":
      return <svg {...props}><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>;
    case "arrow-up":
      return <svg {...props}><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></svg>;
    case "user-cog":
      return <svg {...props}><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 014-4h4" /><circle cx="19" cy="16" r="2" /><path d="M19 12v1m0 6v1m-3.5-5.5l.87.5m5.26 3l.87.5m-7 0l.87-.5m5.26-3l.87-.5" /></svg>;
    case "stairs":
      return <svg {...props}><path d="M22 5h-5v5h-5v5H2v4h20V5z" /></svg>;
    case "chat":
      return <svg {...props}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>;
    case "send":
      return <svg {...props}><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>;
    case "hash":
      return <svg {...props}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>;
    case "mail":
      return <svg {...props}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 7L2 7" /></svg>;
    case "gear-sm":
      return <svg {...props}><circle cx="12" cy="12" r="3" /><path d="M12 1v2m0 18v2m-9-11h2m18 0h2m-4.2-6.8l-1.4 1.4M6.6 17.4l-1.4 1.4m0-12.6l1.4 1.4m10.8 10.8l1.4 1.4" /></svg>;
    case "chart-sm":
      return <svg {...props}><rect x="3" y="12" width="4" height="9" rx="1" /><rect x="10" y="8" width="4" height="13" rx="1" /><rect x="17" y="3" width="4" height="18" rx="1" /></svg>;
    case "pen-sm":
      return <svg {...props}><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z" /></svg>;
    case "target-sm":
      return <svg {...props}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>;
    case "search-sm":
      return <svg {...props}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>;
    case "code-sm":
      return <svg {...props}><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>;
    default:
      return null;
  }
}

function Icon({ type, active }: { type: DeptRow["icon"]; active: boolean }) {
  if (type === "user") {
    return (
      <svg viewBox="0 0 13 13" fill="none" stroke="#C5F135" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="6.5" cy="4" r="2" />
        <path d="M2.5 11.5c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
      </svg>
    );
  }
  if (type === "check") {
    return (
      <svg viewBox="0 0 13 13" fill="none" stroke="#C5F135" strokeWidth="1.5" strokeLinecap="round">
        <path d="M2.5 7l3 3 5-5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 13 13"
      fill="none"
      stroke={active ? "#C5F135" : "rgba(255,56,32,0.4)"}
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M3 10L10 3M3 3l7 7" />
    </svg>
  );
}

const Home = () => {
  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        },
        { threshold: 0.07 }
      );

      reveals.forEach((el) => io.observe(el));
      return () => io.disconnect();
    }

    reveals.forEach((el) => el.classList.add("in"));
    return undefined;
  }, []);

  return (
    <div className="xenni-page">
      <div className="ambient ambient-cut" />
      <div className="ambient ambient-lime" />

      <nav>
        <div className="logo">
          xenni<span className="logo-dot">.</span>
        </div>
        <div className="nav-links">
          <a href="#departamentos" className="nav-link">
            Departamentos
          </a>
          <a href="#precios" className="nav-link">
            Precios
          </a>
          <a href={whatsappLinks.finalDemo} className="nav-link" target="_blank" rel="noreferrer">
            Demo
          </a>
          <a href="#faq" className="nav-link">
            FAQ
          </a>
        </div>
        <a href={whatsappLinks.navDemo} className="btn-nav" target="_blank" rel="noreferrer">
          Solicitar demo
        </a>
      </nav>

      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-number">8</div>
        <div className="hero-inner">
          <div className="hero-kicker">
            <span className="kicker-dot" />
            Infraestructura operativa · Para equipos que compiten en serio
          </div>
          <h1 className="hero-h1">
            <span className="h1-line1">Compites contra empresas</span>
            <span className="h1-line2">con 8 departamentos.</span>
            <span className="h1-line3">Tú tienes 3 personas.</span>
          </h1>
          <div className="hero-sub-row">
            <p className="hero-sub">
              El mercado no sabe que eres pequeño.
              <br />
              Pero tu operación lo delata <strong>cada semana</strong> — con seguimientos caídos,
              análisis que nunca ocurren y decisiones tomadas sin datos.
            </p>
            <div className="hero-actions">
              <a href={whatsappLinks.heroDemo} className="btn-primary btn-glow" target="_blank" rel="noreferrer">
                Ver demo → sin costo
              </a>
              <span className="hero-note">
                30 min · Con un humano real · <span>Sin compromiso</span>
              </span>
            </div>
          </div>
          <div className="hero-proof-row">
            <span className="hero-proof-chip">+120 founders asesorados</span>
            <span className="hero-proof-chip">Setup operativo en 30 min</span>
            <span className="hero-proof-chip">Onboarding humano de 14 días</span>
          </div>
        </div>
      </div>

      <div className="marquee-bar">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={`${item.text}-${index}`} className={`m-item ${item.className}`.trim()}>
              <span className="m-sep" />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div className="sec reveal">
        <div className="wrap">
          <div className="s-tag">El problema</div>
          <h2 className="gap-headline">
            Una empresa de 50 tiene
            <br />
            estructura.
            <br />
            La tuya tiene{" "}
            <span className="cut">
              <span className="serif">parches.</span>
            </span>
          </h2>
          <div className="split">
            <div className="split-col split-col-a">
              <div className="split-header">
                <span className="chip chip-bad">Tu empresa hoy</span>
              </div>
              <div className="dept-rows">
                {currentCompanyRows.map((row) => (
                  <div key={row.label} className={`dept-row ${row.isActive ? "here" : "gone"}`}>
                    <div className={`dept-ico ${row.isActive ? "dept-ico-here" : "dept-ico-gone"}`}>
                      <Icon type={row.icon} active={row.isActive} />
                    </div>
                    <span className="dept-label">{row.label}</span>
                    <span className={`dept-tag ${row.isActive ? "dept-tag-here" : "dept-tag-gone"}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="split-footer">
                Tu equipo hace el trabajo de siete funciones con la banda de una.
              </div>
            </div>
            <div className="split-col split-col-b">
              <div className="split-header">
                <span className="chip chip-good">Con xenni</span>
              </div>
              <div className="dept-rows">
                {withXenniRows.map((row) => (
                  <div key={row.label} className={`dept-row ${row.isActive ? "here" : "gone"}`}>
                    <div className={`dept-ico ${row.isActive ? "dept-ico-here" : "dept-ico-gone"}`}>
                      <Icon type={row.icon} active={row.isActive} />
                    </div>
                    <span className="dept-label">{row.label}</span>
                    <span className={`dept-tag ${row.isActive ? "dept-tag-here" : "dept-tag-gone"}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="split-footer">
                Tu empresa opera <strong>completa</strong> — con la estructura de una empresa grande.
              </div>
            </div>
          </div>

          <div className="split-manifesto">
            <p>Los análisis no se hacen. Los seguimientos se caen. Las oportunidades pasan.</p>
            <p className="cut">Eso no es mala suerte — es operar incompleto.</p>
          </div>
        </div>
      </div>

      <div className="rule" />

      <div className="sec reveal" id="producto">
        <div className="wrap">
          <div className="solution-top">
            <div className="sol-left">
              <div className="s-tag">La solución</div>
              <div className="sol-name">
                xenni<span>.</span>
              </div>
              <p className="sol-tagline">
                No te da otra herramienta.
                <br />
                Te da los <strong>departamentos que nunca pudiste contratar</strong> — supervisados,
                entrenables, disponibles desde el día uno.
              </p>
            </div>
            <div className="sol-right">
              <div className="not-grid">
                {notRows.map((row, index) => (
                  <div key={index} className={`not-row ${row.isYes ? "yes-row" : ""}`.trim()}>
                    <span className={`not-icon ${row.isYes ? "check" : "x"}`}>
                      {row.isYes ? "→" : "No"}
                    </span>
                    <div className="not-content">
                      {row.bad ? <div className="not-bad">{row.bad}</div> : null}
                      <div className={`not-good ${row.isYes ? "big" : ""}`.trim()}>{row.good}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 0 110px" }} id="departamentos">
        <div className="wrap">
          <div className="s-tag reveal">Los departamentos que activas</div>
          <div className="dept-section-head reveal">
            <h2 className="dept-headline">
              Elige la capacidad exacta que te falta <span>y actívala hoy.</span>
            </h2>
            <p className="dept-subcopy">
              No compras features sueltos. Activas departamentos completos con foco operativo
              claro, entregables semanales y resultados medibles.
            </p>
          </div>

          <div className="dept-lanes reveal">
            <div className="dept-lane">
              <span className="lane-name">Base</span>
              <span className="lane-desc">Operación diaria</span>
            </div>
            <div className="dept-lane">
              <span className="lane-name">Growth+</span>
              <span className="lane-desc">Decisión y demanda</span>
            </div>
            <div className="dept-lane">
              <span className="lane-name">Scale</span>
              <span className="lane-desc">Ejecución avanzada</span>
            </div>
          </div>

          <div className="dept-grid reveal">
            {departmentCards.map((card) => (
              <div key={card.number} className={`d-card ${card.lime ? "lime-card" : ""}`.trim()}>
                <div className="d-num">{card.number}</div>
                <span className={`d-tier ${card.tierClass}`}>{card.tier}</span>
                <span className="d-icon">{card.icon}</span>
                <div className="d-title">{card.title}</div>
                <div className="d-desc">{card.description}</div>
                <div className="d-tags">
                  {card.tags.map((tag) => (
                    <span key={tag} className="d-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="d-impact">{card.impact}</div>
              </div>
            ))}
          </div>

          <div className="dept-bottom-cta reveal">
            <p>
              ¿No sabes con cuál empezar? Recomendación para la mayoría de equipos:{" "}
              <strong>Ops + Data + Sales Ops.</strong>
            </p>
            <a
              href={whatsappLinks.stackRecommendation}
              className="dept-cta-link"
              target="_blank"
              rel="noreferrer"
            >
              Diseñar mi stack recomendado →
            </a>
          </div>
        </div>
      </div>

      <div className="proof-strip reveal">
        <div className="proof-inner">
          {proofItems.map((item) => (
            <div key={item.label} className="proof-item">
              <div className="proof-num">
                {item.number}
                {item.highlight ? <span>{item.highlight}</span> : null}
              </div>
              <div className="proof-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="sec reveal" id="arquitectura">
        <div className="wrap">
          <div className="exec-head">
            <div className="s-tag">Diagrama operativo</div>
            <h2 className="exec-title">
              Cómo trabaja xenni <span>de punta a punta</span>
            </h2>
            <p className="exec-sub">
              El usuario escribe por sus canales habituales. xenni interpreta el requerimiento,
              coordina al equipo especializado, ejecuta y vuelve con resultado. Si falta contexto,
              pregunta y continúa hasta cerrar la tarea.
            </p>
          </div>

          <picture className="exec-flow-picture">
            <source media="(max-width: 900px)" srcSet={flowMobileImg} />
            <img
              src={flowDesktopImg}
              alt="Diagrama de flujo de xenni: canales de entrada, núcleo de procesamiento y departamentos"
              className="exec-flow-img"
              loading="lazy"
            />
          </picture>

          <div className="exec-loop">
            <strong>Feedback loop:</strong> si un sub-agente necesita más información, xenni vuelve
            al canal correcto, consulta al usuario/equipo y retoma la ejecución sin perder contexto.
          </div>

          <div className="flow-connector" aria-hidden="true">
            <span className="connector-line" />
            <span className="connector-pulse" />
            <span className="connector-label">¿Qué puede hacer?</span>
            <span className="connector-line" />
          </div>

          <div className="exec-capabilities">
            <article className="exec-cap-card reveal d1">
              <h4>Modos de ejecución</h4>
              <ul>
                {executionModes.map((item) => (
                  <li key={item.label}>
                    <span className="cap-ico cap-ico-cut"><CapIcon id={item.iconId} /></span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </article>

            <article className="exec-cap-card reveal d2">
              <h4>Qué acciones puede realizar</h4>
              <ul>
                {executionActions.map((item) => (
                  <li key={item.label}>
                    <span className="cap-ico cap-ico-lime"><CapIcon id={item.iconId} /></span>
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="platform-logos">
                {platformLogos.map((name) => (
                  <span key={name} className="platform-pill">{name}</span>
                ))}
              </div>
            </article>

            <article className="exec-cap-card reveal d3">
              <h4>Garantías operativas</h4>
              <ul>
                {executionGuarantees.map((item) => (
                  <li key={item.label}>
                    <span className="cap-ico cap-ico-cream"><CapIcon id={item.iconId} /></span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          

          <div className="exec-enterprise">
            <p>
              <strong>Enterprise:</strong> para necesidades de compliance, seguridad o arquitectura
              avanzada, diseñamos un abordaje específico por industria y stack.
            </p>
            <a href="mailto:enterprise@xenni.io?subject=Enterprise%20xenni" className="dept-cta-link">
              Contactar para diseño enterprise →
            </a>
          </div>
        </div>
      </section>

      <div className="sec reveal">
        <div className="wrap">
          <div className="s-tag">Cómo funciona</div>
          <div className="how-grid">
            {howCards.map((card) => (
              <div key={card.number} className={`how-card reveal ${card.delayClass}`.trim()}>
                <div className="how-n">{card.number}</div>
                <div className="how-title">{card.title}</div>
                <div className="how-body">{card.body}</div>
                <span className="how-chip">{card.chip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rule" />

      <div className="sec reveal" id="precios">
        <div className="wrap">
          <div className="s-tag">Planes</div>
          <div className="pricing-grid">
            {pricingCards.map((card, index) => (
              <div
                key={card.tier}
                className={`p-card ${card.featured ? "featured" : ""} reveal d${index + 1}`.trim()}
              >
                <div className="p-tier">{card.tier}</div>
                <div className="p-price">{card.price}</div>
                <div className="p-period">{card.period}</div>
                <div className="p-rule" />
                <div className="p-feats">
                  {card.features.map((feature) => (
                    <div key={feature} className="p-feat">
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="p-depts">{card.departments}</div>
                <a
                  className="p-cta"
                  href={whatsappLinks.pricingDemo(card.tier)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="sec reveal" id="faq">
        <div className="wrap">
          <div className="faq-head">
            <div className="s-tag">Preguntas frecuentes</div>
            <h2 className="faq-title">
              Menos humo. <span>Más claridad.</span>
            </h2>
            <p className="faq-sub">
              Lo que normalmente preguntan founders antes de activar xenni.
            </p>
          </div>
          <div className="faq-list">
            {faqItems.map((item) => (
              <details key={item.question} className="faq-item">
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="final reveal" id="demo">
        <div className="final-inner">
          <h2 className="final-hl">
            <span className="dim">Deja de crecer</span>
            <br />
            <span className="bright">incompleto.</span>
            <span className="serif">Tu empresa puede operar entera — desde hoy.</span>
          </h2>
          <p className="final-body">
            Te mostramos en 30 minutos exactamente cómo xenni operaría en tu negocio. Qué
            departamentos activarías, qué tareas delegarías, cuántas horas recuperarías por semana.
          </p>
          <div className="final-cta-row">
            <a href={whatsappLinks.finalDemo} className="btn-final btn-glow" target="_blank" rel="noreferrer">
              Agendar demo gratuita →
            </a>
            <span className="final-sub">
              Sin costo · Sin compromiso · <span>Con un humano real del otro lado</span>
            </span>
          </div>
        </div>
      </div>

      <footer>
        <div className="f-logo">
          xenni<span>.</span>
        </div>
        <div className="f-text">© 2025 xenni. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
};

export default Home;
