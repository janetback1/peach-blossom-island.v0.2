export async function onRequestPut({ request, env, params }) {
  const { title, content, published } = await request.json();
  await env.DB
    .prepare("UPDATE articles SET title=?,content=?,published=?,updated_at=datetime('now') WHERE id=?")
    .bind(title, content, published ? 1 : 0, params.id)
    .run();
  return Response.json({ ok: true });
}

export async function onRequestDelete({ env, params }) {
  await env.DB.prepare("DELETE FROM articles WHERE id=?").bind(params.id).run();
  return Response.json({ ok: true });
}
