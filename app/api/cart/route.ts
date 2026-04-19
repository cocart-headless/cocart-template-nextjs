import { createServerClient } from "@cocartheadless/sdk/nextjs";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "";

async function getClient() {
  const h = await headers();
  return createServerClient(STORE_URL, h);
}

export async function GET() {
  try {
    const client = await getClient();
    const response = await client.cart().get();
    const data = response.toObject();
    return NextResponse.json(data, {
      headers: { "Cart-Key": response.getCartKey() ?? "" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
