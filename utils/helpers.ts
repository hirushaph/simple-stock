export function formatTimestamp(isoTimestamp: string) {
  if (!isoTimestamp) return "n/a";
  const date = new Date(isoTimestamp);

  // Format date as YYYY/MM/DD
  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "/");

  // Format time as HH.MM AM/PM
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedTime = date
    .toLocaleTimeString("en-US", options)
    .replace(":", ".");

  return `${formattedDate}, ${formattedTime}`;
}
