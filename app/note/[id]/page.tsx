"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PartialBlock } from "@blocknote/core";
import NoteViewer from "@/app/components/NoteViewer";

interface Note {
  content: PartialBlock[];
}

export default function NotePage() {
  const params = useParams();
  const noteId = params.id as string;

  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${noteId}`);
      if (res.ok) {
        const { note } = await res.json();
        setNote(note);
      } else {
        alert("ノートが見つかりませんでした");
      }
    };
    fetchNote();
  }, [noteId]);

  if (!note) return <div>読み込み中...</div>;

  return (
    <div className="p-4 w-full">
      <NoteViewer content={note.content} />
    </div>
  );
}
