import { AmazonProduct } from "@/src/domain/entities";

export class LocalContentGenerator {
    static generate(product: AmazonProduct): any {
        const title = product.title || "Amazing Product";
        const shortTitle = title.length > 50 ? title.substring(0, 50) + "..." : title;
        const rating = product.rating || "4.5";
        const reviews = product.reviews || "100+";
        const features = product.features || ["High Performance", "Great Value", "Durable Build", "User Friendly"];

        // Helper to get random feature or fallback
        const getFeature = (index: number) => features[index] || "innovative design";

        const articleBody = `
Introduction

If you are in the market for a new ${shortTitle}, you might have noticed the overwhelming number of options available. However, the **${title}** stands out for several reasons. In this comprehensive review, we'll dive deep into what makes this product a top contender in its category.

Why We Chose This Product

With a stellar rating of ${rating} stars from over ${reviews} satisfied customers, this product has proven its reliability. We selected it for review because it strikes a perfect balance between price and performance, making it an attractive option for both casual users and enthusiasts.

In-Depth Features Analysis

One of the most striking aspects of this model is its **${getFeature(0)}**. This feature alone sets it apart from many competitors. Additionally, the **${getFeature(1)}** ensures that you get consistent results every time you use it. We were also impressed by the **${getFeature(2)}**, which adds a layer of convenience that is often missing in this price range.

Performance & Real-World Testing

In our testing, the ${shortTitle} performed exceptionally well. Whether you are using it for daily tasks or more demanding applications, it handles everything with ease. The integration of **${getFeature(3)}** contributes significantly to its smooth operation. Users have reported that even after months of use, the performance remains consistent, which is a testament to its build quality.

Design & Build Quality

Aesthetically, the ${shortTitle} is a winner. It features a modern, sleek design that will fit well in any setting. But it's not just about looks; the build quality is robust. The materials used feel premium to the touch, and the construction is solid, promising longevity. The **${getFeature(4) || "ergonomic design"}** is a nice touch, ensuring comfort during prolonged use.

User Experience & Reviews Summary

Going through user feedback, the consensus is overwhelmingly positive. Users love the **${getFeature(0)}** and the value for money it offers. While no product is perfect, the complaints are minor and mostly subjective. Most users agree that for the price, it's hard to find a better alternative.

Who Should Buy This?

This product is ideal for anyone looking for a reliable, high-performance solution without breaking the bank. If you prioritize **${getFeature(1)}** and **${getFeature(2)}**, then the ${shortTitle} is definitely worth considering. It's also a great gift option due to its premium packaging and universal appeal.

Final Conclusion

In conclusion, the **${title}** is a powerhouse that delivers on its promises. It combines innovative features like **${getFeature(0)}** with a durable design and excellent performance. Verify the price and availability below, but we highly recommend this product for anyone serious about quality.
`;

        return {
            title: `Review: Is the ${shortTitle} Worth It in 2026?`,
            verdict: `With a ${rating}-star rating and features like ${getFeature(0)}, this is a top-tier choice for savvy buyers.`,
            features: features.slice(0, 6),
            description: `We tested the ${shortTitle} and were impressed by its ${getFeature(0)} and ${getFeature(1)}. Read our full in-depth review to see why it's a market leader.`,
            articleBody: articleBody.trim()
        };
    }
}
