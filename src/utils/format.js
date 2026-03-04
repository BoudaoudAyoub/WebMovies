export function formatDateLong(dateString) {
  if (!dateString) return "Date inconnue";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatYear(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).getFullYear();
}

export function truncateText(text, maxLength = 150) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function formatRuntime(minutes) {
  if (!minutes) return "Durée inconnue";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}

export function formatCurrency(amount) {
  if (!amount) return "Non disponible";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}