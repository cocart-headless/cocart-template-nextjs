import { createServerClient } from "@cocartheadless/sdk/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "";

async function getClient() {
  const h = await headers();
  return createServerClient(STORE_URL, h);
}

export async function POST(req: NextRequest) {
  try {
    const { item_key, quantity } = await req.json();
    const client = await getClient();
    const response = await client.cart().updateItem(item_key, Number(quantity));
    const data = response.toObject();
    return NextResponse.json(data, {
      headers: { "Cart-Key": response.getCartKey() ?? "" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
