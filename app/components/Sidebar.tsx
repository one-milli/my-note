"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [notes, setNotes] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data.notes);
    };
    fetchNotes();
  }, []);

  return (
    <aside className="w-64 bg-gray-800 p-4 border-r overflow-auto">
      <h2 className="font-bold mb-4">ノート一覧</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="mb-2">
            <Link href={`/note/${note.id}`} className="text-blue-200 hover:underline">
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
