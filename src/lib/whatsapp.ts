const WHATSAPP_NUMBER = "51975963255";

export function createWhatsAppUrl(message: string) {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}
