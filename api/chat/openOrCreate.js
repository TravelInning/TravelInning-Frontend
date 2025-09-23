import { loadChatList, createOneChat } from "./chat";

export async function openOrCreateOneOnOne(postId, preferSize = 100) {
  // 1) 방 찾기
  let cursor = undefined;
  while (true) {
    const page = await loadChatList(cursor, preferSize);
    const rooms = page?.rooms ?? [];

    const hit = rooms.find((r) => r.postId === postId && r.group === false);
    if (hit) {
      return { roomId: hit.roomId, peerName: hit.roomTitle ?? "상대" };
    }

    if (!page?.nextCursor) break;
    cursor = page.nextCursor;
  }

  // 2) 없으면 생성
  const created = await createOneChat(postId);
  return {
    roomId: created?.roomId,
  };
}
