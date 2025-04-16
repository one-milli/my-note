import NoteViewer from "@/app/components/NoteViewer";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function NotePage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const { note } = await res.json();

  return <NoteViewer title={note.title} content={note.content} />;
}
