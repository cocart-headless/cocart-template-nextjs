import { NextRequest, NextResponse } from "next/server";
import { CoCart, MemoryStorage } from "@cocartheadless/sdk";
import type { Customer } from "@/lib/auth.d";

const STORE_URL = process.env.NEXT_PUBLIC_COCART_STORE_URL ?? "";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json() as { username?: string; password?: string };

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
  }

  const client = new CoCart(STORE_URL, { storage: new MemoryStorage() });
  client.setAuth(username, password);

  try {
    const response = await client.post("login");
    const data = response.toObject() as Record<string, unknown>;

    const customer: Customer = {
      id: (data["id"] as number) ?? 0,
      username: (data["username"] as string) ?? username,
      email: (data["email"] as string) ?? "",
      first_name: (data["first_name"] as string) ?? "",
      last_name: (data["last_name"] as string) ?? "",
      display_name: (data["display_name"] as string) ?? username,
      avatar_url: (data["avatar_url"] as string) ?? "",
    };

    // Pass through JWT extras if present so the client can store them
    const extras = data["extras"] as Record<string, unknown> | undefined;

    return NextResponse.json({ customer, extras: extras ?? null });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed.";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
