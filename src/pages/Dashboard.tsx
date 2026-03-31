import { Link } from "react-router-dom";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { EventsWidget } from "@/modules/events/components/EventsWidget";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              DigitaliaForge
            </p>
            <h1 className="text-lg font-semibold text-slate-900">
              Panel principal
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="font-medium text-slate-900">{user?.firstName}</p>
              <p className="text-slate-500">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Bienvenido al Dashboard
          </h2>
          <p className="mt-2 text-slate-600">
            Este espacio está protegido con `ProtectedRoute`. Úsalo como base
            para tus vistas autenticadas y empieza a conectar módulos reales
            aquí.
          </p>
        </div>

        {/* Widget de eventos para usuarios */}
        <EventsWidget />

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Próximos pasos
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
              <li>Conecta tus endpoints reales</li>
              <li>Configura layouts y breadcrumbs específicos</li>
              <li>Añade widgets o gráficos según el negocio</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Atajos
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
              >
                Ir al Home
              </Link>
              <Link
                to="/login"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
              >
                Probar Login
              </Link>
              <Link
                to="/register"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
              >
                Probar Registro
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

