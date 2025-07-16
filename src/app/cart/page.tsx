import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex items-center justify-center gap-4 mb-8">
        <ShoppingCart className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold font-headline">Your Cart</h1>
      </div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cart is Empty</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You don't have any items in your cart yet. Start shopping to add some!</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
