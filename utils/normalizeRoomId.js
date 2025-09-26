export const normalizeRoomId = (displayId) => {
  if (!displayId) return displayId;
  const m = String(displayId).match(/^(?:CR|SR)-([0-9a-fA-F-]{36})$/);
  return m ? m[1] : displayId;
};
