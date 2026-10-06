export async function onRequestGet({ env }) {
  const { results } = await env.DB
    .prepare("SELECT id,title,content,created_at FROM articles WHERE published=1 ORDER BY id DESC")
    .all();
  return Response.json(results);
}
