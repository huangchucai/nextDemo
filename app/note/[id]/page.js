import Note from "@/components/Note";
import { getNote } from "@/lib/prisma";
import { sleep } from "@/lib/utils";

// 不缓存
// export const revalidate = 0

export default async function page({ params }) {
  // 动态路由 获取笔记 id
  const noteId = params.id;
  const note = await getNote(noteId);

  // 为了让 Suspense 的效果更明显
  await sleep(5000);

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    );
  }

  return <Note note={note} noteId={noteId} />;
}
