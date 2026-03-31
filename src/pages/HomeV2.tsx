import { useState } from "react";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import "./HomeV2.css";

const copy = {
  en: {
    kicker: "AI operations co-pilot",
    title: ["Small team.", "Heavy operation."],
    sub: "Xeni deploys specialized agent teams that operate as one unit, giving your company more capacity across data, content, sales ops, and operations from day one.",
    cta: "Book a demo →",
    note: "30 min · with a real human · no commitment",
    trust: "Trusted by founders across +12 industries",
    howKicker: "How it works",
    howTitle: "Simple. In three steps.",
    steps: [
      { n: "01", title: "We plug into your operation", body: "We map your workflows and goals in a short working session with your team." },
      { n: "02", title: "We activate AI teams", body: "Data, content, sales ops, and operations start executing real work." },
      { n: "03", title: "Humans stay in the loop", body: "We track results, refine flows, and expand capacity without adding friction." },
    ],
    teamsKicker: "Specialized teams, working as one",
    teams: ["Content", "Data", "Ops", "Dev", "Customer Support", "Enterprise"],
  },
  es: {
    kicker: "AI operations co-pilot",
    title: ["Equipo pequeño.", "Capacidad enorme."],
    sub: "Xeni te entrega equipos de agentes especializados que trabajan como una unidad para ampliar la capacidad de tu empresa en data, content, sales ops y operaciones desde el día uno.",
    cta: "Agenda una demo →",
    note: "30 min · con un humano real · sin compromiso",
    trust: "Usado por founders en +12 industrias",
    howKicker: "Cómo funciona",
    howTitle: "Simple, en 3 pasos.",
    steps: [
      { n: "01", title: "Conectamos tu operación", body: "Mapeamos tus procesos y objetivos en una sesión corta con tu equipo." },
      { n: "02", title: "Activamos los equipos AI", body: "Datos, contenido, sales ops y operaciones empiezan a ejecutar tareas reales." },
      { n: "03", title: "Humanos siempre en el loop", body: "Monitoreamos resultados, ajustamos flujos y escalamos capacidad sin fricción." },
    ],
    teamsKicker: "Equipos especializados, trabajando como uno",
    teams: ["Content", "Data", "Ops", "Dev", "Customer Support", "Enterprise"],
  },
};

export default function HomeV2() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const t = copy[lang];
  const demoLink = createWhatsAppUrl(
    lang === "en"
      ? "Hi Xenni, I want to book a demo for my company. I came from the homepage and want to see how your AI teams could support our operation."
      : "Hola Xenni, quiero agendar una demo para mi empresa. Vengo desde la home y quiero ver como sus equipos AI podrian apoyar nuestra operacion."
  );

  return (
    <div className="v2-page">
      <section className="v2-hero">
        <div className="v2-ambient" aria-hidden="true" />
        <nav className="v2-nav">
          <span className="v2-brand">xenni.</span>
          <div className="v2-nav-right">
            <button
              className="v2-lang-toggle"
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              aria-label="Toggle language"
            >
              <span className={lang === "en" ? "v2-lang-active" : ""}>EN</span>
              <span className="v2-lang-sep">·</span>
              <span className={lang === "es" ? "v2-lang-active" : ""}>ES</span>
            </button>
          </div>
        </nav>

        <main className="v2-main">
          <p className="v2-kicker">{t.kicker}</p>
          <h1 className="v2-title">
            {t.title[0]}
            <br />
            {t.title[1]}
          </h1>
          <p className="v2-sub">{t.sub}</p>

          <div className="v2-actions">
            <a href={demoLink} className="v2-cta" target="_blank" rel="noreferrer">
              {t.cta}
            </a>
            <span className="v2-note">{t.note}</span>
          </div>
        </main>

        <div className="v2-trust">
          <span className="v2-trust-label">{t.trust}</span>
          <div className="v2-trust-dots">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="v2-trust-dot" />
            ))}
          </div>
        </div>
      </section>

      <section className="v2-how">
        <div className="v2-how-wrap">
          <p className="v2-how-kicker">{t.howKicker}</p>
          <h2 className="v2-how-title">{t.howTitle}</h2>
          <div className="v2-how-grid">
            {t.steps.map((s) => (
              <article key={s.n} className="v2-step">
                <span className="v2-step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-teams">
        <div className="v2-teams-wrap">
          <p className="v2-teams-kicker">{t.teamsKicker}</p>
          <div className="v2-teams-row">
            {t.teams.map((team) => (
              <div key={team} className="v2-team-chip">
                <span className="v2-team-dot" />
                {team}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
