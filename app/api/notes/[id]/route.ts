import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

type Props = {
  params: { id: string };
};

export async function GET(req: Request, { params }: Props) {
  const { id } = await params;
  const { data, error } = await supabase.from("notes").select("*").eq("id", id).single();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Not found" }, { status: 404 });
  }

  return NextResponse.json({ note: data });
}

export async function PUT(req: Request, { params }: Props) {
  const { title, content } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("notes")
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ note: data });
}
