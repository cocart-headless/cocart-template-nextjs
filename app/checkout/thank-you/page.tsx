import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Order confirmed" };

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl font-bold">Order confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
