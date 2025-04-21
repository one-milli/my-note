"use client";

import React, { useCallback } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useParams } from "next/navigation";

type Props = {
  content: PartialBlock[];
};

export default function NoteViewer({ content }: Props) {
  const params = useParams();
  const noteId = params.id as string;
  const editor = BlockNoteEditor.create({ initialContent: content });

  const handleSave = useCallback(async () => {
    const content = editor.document;
    const firstBlock = content[0];

    let newTitle = "無題のノート";

    if (Array.isArray(firstBlock?.content)) {
      const firstContent = firstBlock.content[0];
      if (firstContent && typeof firstContent === "object" && "text" in firstContent) {
        newTitle = firstContent.text.trim() || "無題のノート";
      }
    }

    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content: content }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("更新エラー:", text);
      alert("更新に失敗しました");
      return;
    }
    if (res.ok) {
    }

    const result = await res.json();
    console.log("更新成功:", result);
  }, [editor, noteId]);

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          更新
        </button>
      </div>
      <div className="bg-[#1f1f1f] rounded-xl py-4">
        <BlockNoteView editor={editor} />
      </div>
    </>
  );
}
