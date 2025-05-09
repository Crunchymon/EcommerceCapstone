// app/api/products/[id]/route.js
export async function GET(_, { params }) {
    const res = await fetch(`https://dummyjson.com/products/${params.id}`);
    if (!res.ok) return Response.json({ error: "Not found" }, { status: 404 });
    const data = await res.json();
    return Response.json(data);
  }
  