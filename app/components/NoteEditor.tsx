"use client";

import React, { useCallback } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

export default function NoteEditor() {
  const editor = useCreateBlockNote();

  const handleSave = useCallback(async () => {
    const content = editor.document;
    const title = prompt("ノートのタイトルを入力してください") || "無題";

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("保存エラー:", text);
      alert("保存に失敗しました");
      return;
    }

    const result = await res.json();
    console.log("保存成功:", result);
  }, [editor]);

  return (
    <div className="p-4 w-full max-w-3xl">
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          保存
        </button>
      </div>
      <BlockNoteView editor={editor} />
    </div>
  );
}
