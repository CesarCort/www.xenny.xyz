// Tipos de eventos y registro de usuario a eventos

export interface Event {
  id: string;
  title: string;
  description?: string;
  date?: string;
  created_by?: string;
}

export interface UserEventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  registered_at: string;
}
