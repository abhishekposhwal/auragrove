export default function PoliciesPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 max-w-3xl">
            <div className="space-y-4 text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold">Our Policies</h1>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    Our commitment to transparency and a sustainable future.
                </p>
            </div>
            
            <div className="prose dark:prose-invert max-w-none space-y-8 text-lg">
                <section>
                    <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
                    <p>We are committed to carbon-neutral shipping for all orders. We partner with carriers that offset their carbon emissions to minimize our environmental impact. Please allow 3-5 business days for order processing before shipment. Once shipped, you will receive a tracking number via email.</p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Return Policy</h2>
                    <p>We want you to love your purchase. We accept returns within 30 days of purchase for a full refund or exchange. To be eligible for a return, your item must be unused and in the same condition that you received it.</p>
                    <p>To initiate an eco-friendly return, please contact our support team. We encourage reusing the original packaging to minimize waste. Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</p>
                </section>
                
                <section>
                    <h2 className="text-2xl font-bold mt-8 mb-4">Privacy Policy</h2>
                    <p>Your privacy is important to us. We only collect information necessary to process your orders, provide customer service, and improve your shopping experience. This may include your name, shipping address, email, and phone number.</p>
                    <p>We will never sell or share your personal data with third parties for marketing purposes. All payment information is processed securely through our payment gateway and is not stored on our servers.</p>
                </section>
            </div>
        </div>
    );
}
