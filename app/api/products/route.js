// app/api/products/route.js
export async function GET() {
    const res = await fetch("https://dummyjson.com/products?&limit=200");
    const data = await res.json();
    return Response.json(data.products);
  }
  