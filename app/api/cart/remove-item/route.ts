import { createServerClient } from "@cocartheadless/sdk/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "";

async function getClient() {
  const h = await headers();
  return createServerClient(STORE_URL, h);
}

export async function DELETE(req: NextRequest) {
  try {
    const { item_key } = await req.json();
    const client = await getClient();
    const response = await client.cart().removeItem(item_key);
    const data = response.toObject();
    return NextResponse.json(data, {
      headers: { "Cart-Key": response.getCartKey() ?? "" },
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
