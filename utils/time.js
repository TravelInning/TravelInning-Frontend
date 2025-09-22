export const hhmm = (date) => {
  const d = date ? new Date(date) : new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

export const sameMinute = (t1, t2) => t1 === t2;
