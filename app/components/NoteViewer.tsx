"use client";

import React, { useCallback } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import { useParams } from "next/navigation";

type Props = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[] | any;
};

export default function NoteViewer({ title, content }: Props) {
  const params = useParams();
  const noteId = params.id as string;
  const editor = BlockNoteEditor.create({ initialContent: content });

  const handleSave = useCallback(async () => {
    const content = editor.document;
    const newTitle = prompt("ノートのタイトルを入力してください", title) || title;

    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle, content }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("更新エラー:", text);
      alert("更新に失敗しました");
      return;
    }

    const result = await res.json();
    console.log("更新成功:", result);
  }, [editor]);

  return (
    <div className="p-4 w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          更新
        </button>
      </div>
      <BlockNoteView editor={editor} />
    </div>
  );
}
