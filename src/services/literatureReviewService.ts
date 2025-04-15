import { LiteratureReviewItem } from "@/components/LiteratureReview";

// Mock data for different search queries
const mockLiteratureReviews: Record<string, LiteratureReviewItem[]> = {
  "machine learning": [
    {
      id: "lr1",
      title: "The Evolution of Machine Learning Algorithms",
      summary:
        "This review traces the development of machine learning algorithms from early statistical methods to modern deep learning approaches, highlighting key breakthroughs and their impact on various fields.",
      relevance: 95,
      source: "Journal of AI Research",
      year: 2022,
      keywords: [
        "machine learning",
        "deep learning",
        "neural networks",
        "history",
      ],
    },
    {
      id: "lr2",
      title: "Machine Learning Applications in Business Intelligence",
      summary:
        "A comprehensive review of how machine learning techniques are being applied to business intelligence, including predictive analytics, customer segmentation, and decision support systems.",
      relevance: 87,
      source: "Business Technology Review",
      year: 2023,
      keywords: [
        "business intelligence",
        "predictive analytics",
        "decision support",
      ],
    },
    {
      id: "lr3",
      title: "Ethical Considerations in Machine Learning Implementation",
      summary:
        "This paper reviews the ethical challenges and considerations when implementing machine learning systems, including bias, fairness, transparency, and accountability.",
      relevance: 78,
      source: "Ethics in Technology",
      year: 2021,
      keywords: ["ethics", "bias", "fairness", "transparency"],
    },
  ],
  "quantum computing": [
    {
      id: "lr4",
      title: "Quantum Computing: State of the Art and Future Prospects",
      summary:
        "A comprehensive review of the current state of quantum computing technology, including recent breakthroughs, challenges, and potential applications in various fields.",
      relevance: 92,
      source: "Quantum Information Processing",
      year: 2023,
      keywords: ["quantum computing", "qubits", "quantum supremacy"],
    },
    {
      id: "lr5",
      title: "Business Applications of Quantum Computing",
      summary:
        "This review examines potential business applications of quantum computing, focusing on optimization problems, financial modeling, and cryptography.",
      relevance: 85,
      source: "Journal of Business Technology",
      year: 2022,
      keywords: ["business applications", "optimization", "financial modeling"],
    },
  ],
  blockchain: [
    {
      id: "lr6",
      title: "Blockchain Technology: Beyond Cryptocurrencies",
      summary:
        "A review of blockchain applications beyond cryptocurrencies, including supply chain management, healthcare, voting systems, and digital identity verification.",
      relevance: 90,
      source: "Distributed Ledger Technologies",
      year: 2023,
      keywords: [
        "blockchain",
        "supply chain",
        "healthcare",
        "digital identity",
      ],
    },
  ],
};

// Default fallback reviews for when no specific match is found
const defaultReviews: LiteratureReviewItem[] = [
  {
    id: "lr-default-1",
    title: "Recent Trends in Technology Research",
    summary:
      "An overview of recent research trends across various technology domains, highlighting emerging patterns and potential future directions.",
    relevance: 65,
    source: "Technology Review Quarterly",
    year: 2023,
    keywords: ["technology trends", "research directions", "innovation"],
  },
  {
    id: "lr-default-2",
    title: "Interdisciplinary Approaches in Modern Research",
    summary:
      "This review examines how interdisciplinary approaches are increasingly important in addressing complex research questions across scientific and business domains.",
    relevance: 60,
    source: "Interdisciplinary Studies Journal",
    year: 2022,
    keywords: ["interdisciplinary", "research methodology", "collaboration"],
  },
];

// Function to get literature reviews based on search query
export const getLiteratureReviews = async (
  query: string,
  userId?: string,
  mode: "business" | "scientific" = "business",
): Promise<LiteratureReviewItem[]> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real implementation, this would make an API call to a backend service
  // that would retrieve literature reviews based on the query, user preferences, and mode

  // For now, we'll use mock data based on the query
  const normalizedQuery = query.toLowerCase().trim();

  // Check if we have mock data for this query
  for (const [key, reviews] of Object.entries(mockLiteratureReviews)) {
    if (normalizedQuery.includes(key)) {
      // Filter or modify reviews based on mode if needed
      return mode === "business"
        ? reviews.filter((review) => review.relevance > 70)
        : reviews;
    }
  }

  // If no specific match, return default reviews
  return defaultReviews;
};

// Function to save a user's interaction with a literature review item
export const saveUserLiteratureReviewInteraction = async (
  userId: string,
  reviewId: string,
  interactionType: "view" | "save" | "share",
): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real implementation, this would make an API call to a backend service
  // that would save the user's interaction with the literature review item

  console.log(
    `User ${userId} ${interactionType}ed literature review ${reviewId}`,
  );
  return true;
};
