import { useEvents, useMyEventRegistrations, useRegisterToEvent, useUnregisterFromEvent } from "@/modules/events/hooks/useEvents";

export const EventsWidget = () => {
  const { data: events, isLoading: loadingEvents } = useEvents();
  const { data: myRegs, isLoading: loadingRegs } = useMyEventRegistrations();
  const register = useRegisterToEvent();
  const unregister = useUnregisterFromEvent();

  if (loadingEvents || loadingRegs) return <p>Cargando eventos...</p>;

  // IDs de eventos en los que el usuario ya está inscrito
  const myEventIds = new Set(myRegs?.map(r => r.event_id));

  return (
    <section className="rounded-2xl border border-indigo-200 bg-white p-6 mt-2">
      <h3 className="text-lg font-bold mb-3 text-indigo-700">Eventos Disponibles</h3>
      {events && events.length > 0 ? (
        <ul className="space-y-3">
          {events.map(event => {
            const isRegistered = myEventIds.has(event.id);
            return (
              <li key={event.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-b pb-3 last:border-b-0">
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs text-gray-500">{event.date ? new Date(event.date).toLocaleString() : "Sin fecha"}</div>
                  {event.description && <div className="text-sm text-gray-600">{event.description}</div>}
                </div>
                <div>
                  {isRegistered ? (
                    <button
                      className="rounded-md bg-red-50 text-red-700 px-4 py-1 text-sm font-semibold border border-red-200 hover:bg-red-100 ml-auto"
                      disabled={unregister.isPending}
                      onClick={() => unregister.mutate(event.id)}
                    >
                      Cancelar inscripción
                    </button>
                  ) : (
                    <button
                      className="rounded-md bg-indigo-600 text-white px-4 py-1 text-sm font-semibold hover:bg-indigo-700 ml-auto"
                      disabled={register.isPending}
                      onClick={() => register.mutate(event.id)}
                    >
                      Inscribirse
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">No hay eventos disponibles.</p>
      )}
    </section>
  );
};
