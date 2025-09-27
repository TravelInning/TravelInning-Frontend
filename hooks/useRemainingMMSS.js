import { useEffect, useMemo, useState } from "react";
import { getRemainingMMSS } from "../utils/time";

/**
 * createdAt + limitTime(또는 enterableUntil)을 기반으로
 * tickMs마다 남은 시간을 다시 계산해 문자열을 돌려준다.
 *
 * @param {Object} opts
 * @param {string} [opts.createdAt] ISO
 * @param {string} [opts.limitTime] enum (MINUTES_30|HOURS_1...)
 * @param {string} [opts.enterableUntil] ISO (있으면 이게 더 정확. 우선 사용)
 * @param {number} [opts.tickMs] 기본 1000ms
 * @returns {string|null} 예: "12:07 후" | null(마감)
 */
export default function useRemainingMMSS({
  createdAt,
  limitTime,
  enterableUntil,
  tickMs = 1000,
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), tickMs);
    return () => clearInterval(t);
  }, [tickMs]);

  const label = useMemo(() => {
    return getRemainingMMSS(createdAt, limitTime);
  }, [createdAt, limitTime, tick]);

  return label;
}
