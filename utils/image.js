export const normalizeImageUrl = (u) => {
  if (!u) return null;
  let url = u.trim();
  if (url.startsWith("tps://")) url = "h" + url;
  if (url.startsWith("//")) url = "https:" + url;
  url = url.replace("/./", "/");
  return url;
};
