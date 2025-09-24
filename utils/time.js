export const ymdw = (date) => {
  const weekMap = ["일", "월", "화", "수", "목", "금", "토"];
  const newDate = new Date(date);
  const year = String(newDate.getFullYear()).slice(2);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const week = weekMap[newDate.getDay()];

  return `${year}.${month}.${day}(${week})`;
};

export const ymd = (date) => {
  const newDate = new Date(date);
  const year = String(newDate.getFullYear()).slice(2);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const mmdd = (date) => {
  const d = date ? new Date(date) : new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
};

export const hhmm = (date) => {
  const d = date ? new Date(date) : new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
};

export const sameMinute = (t1, t2) => t1 === t2;

export const timeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now - time;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return "방금 전";
  } else if (diffMin < 60) {
    return `${diffMin}분 전`;
  } else if (diffHour < 24) {
    return `${diffHour}시간 전`;
  } else {
    return `${diffDay}일 전`;
  }
};

const LIMIT_TIME_TO_MS = {
  MINUTES_30: 30 * 60 * 1000,
  HOURS_1: 60 * 60 * 1000,
  HOURS_2: 2 * 60 * 60 * 1000,
  HOURS_3: 3 * 60 * 60 * 1000,
};

/**
 * createdAt + limitTime 을 마감시각으로 보고, 현재 시각 기준 남은 "분:초" 문자열을 반환.
 * 화면 진입 시 한 번만 계산해서 쓰는 용도.
 *
 * @param {string} createdAt ISO 문자열
 * @param {"MINUTES_30"|"HOURS_1"|"HOURS_2"|"HOURS_3"} limitTime
 * @returns {string|null} 예: "12:07" (만료 시 null)
 */
export function getRemainingMMSS(createdAt, limitTime) {
  try {
    const base = new Date(createdAt).getTime();
    const duration = LIMIT_TIME_TO_MS[limitTime] ?? 0;
    const deadline = base + duration;
    const diff = deadline - Date.now();
    if (diff <= 0) return null;

    const totalSec = Math.floor(diff / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${String(sec).padStart(2, "0")} 후`;
  } catch (e) {
    console.log("getRemainingMMSS error:", e);
    return null;
  }
}
