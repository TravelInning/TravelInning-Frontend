export const ymdw = (date) => {
  const weekMap = ["일", "월", "화", "수", "목", "금", "토"];
  const newDate = new Date(date);
  const year = String(newDate.getFullYear()).slice(2);
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const week = weekMap[newDate.getDay()];

  return `${year}.${month}.${day}(${week})`;
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
