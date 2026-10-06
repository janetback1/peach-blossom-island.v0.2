export async function onRequestGet({ env }) {
  const { results } = await env.DB
    .prepare("SELECT * FROM articles ORDER BY id DESC")
    .all();
  return Response.json(results);
}

export async function onRequestPost({ request, env }) {
  const { title, content, published } = await request.json();
  const r = await env.DB
    .prepare("INSERT INTO articles (title,content,published) VALUES (?,?,?)")
    .bind(title, content, published ? 1 : 0)
    .run();
  return Response.json({ id: r.meta.last_row_id });
}
