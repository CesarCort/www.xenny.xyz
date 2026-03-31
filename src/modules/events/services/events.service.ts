import { supabase } from '@/lib/supabaseClient';
import { Event, UserEventRegistration } from '@/core/types/events.types';

export const eventsService = {
  // Obtener todos los eventos disponibles
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from<Event>('events')
      .select('*')
      .order('date', { ascending: true });
    if (error) throw new Error(error.message);
    return data || [];
  },

  // Obtener mis inscripciones
  async getMyEventRegistrations(user_id: string): Promise<UserEventRegistration[]> {
    const { data, error } = await supabase
      .from<UserEventRegistration>('user_event_registrations')
      .select('*')
      .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data || [];
  },

  // Inscribir usuario en un evento
  async registerToEvent(user_id: string, event_id: string): Promise<UserEventRegistration> {
    const { data, error } = await supabase
      .from<UserEventRegistration>('user_event_registrations')
      .insert([{ user_id, event_id }])
      .select()
      .single();
    if (error || !data) throw new Error(error?.message || 'No se pudo registrar al evento');
    return data;
  },

  // Cancelar inscripción de usuario a evento
  async unregisterFromEvent(user_id: string, event_id: string) {
    const { error } = await supabase
      .from<UserEventRegistration>('user_event_registrations')
      .delete()
      .eq('user_id', user_id)
      .eq('event_id', event_id);
    if (error) throw new Error(error.message);
    return true;
  },
};
