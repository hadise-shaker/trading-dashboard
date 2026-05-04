import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    );

    const data = await res.json();

    const mapped = data.map((c: any) => ({
      name: c.name.common,
      code: c.cca2,
    }));

    mapped.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );

    return NextResponse.json(mapped);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch countries" },
      { status: 500 }
    );
  }
}