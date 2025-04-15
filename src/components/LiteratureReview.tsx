import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export interface LiteratureReviewItem {
  id: string;
  title: string;
  summary: string;
  relevance: number; // 1-100
  source: string;
  year: number;
  keywords: string[];
}

interface LiteratureReviewProps {
  searchQuery: string;
  isLoading?: boolean;
  items?: LiteratureReviewItem[];
  mode?: "business" | "scientific";
}

const LiteratureReview: React.FC<LiteratureReviewProps> = ({
  searchQuery = "",
  isLoading = false,
  items = [],
  mode = "business",
}) => {
  // If no items and not loading, return null
  if (items.length === 0 && !isLoading && searchQuery === "") {
    return null;
  }

  const getRelevanceBadgeVariant = (relevance: number) => {
    if (relevance > 80) return "default";
    if (relevance > 50) return "secondary";
    return "outline";
  };

  return (
    <Card className="w-full bg-white mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Literature Review</h2>
          {searchQuery && (
            <span className="text-sm text-muted-foreground">
              Based on: "{searchQuery}"
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Loading state
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          // Items found
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge variant={getRelevanceBadgeVariant(item.relevance)}>
                    {item.relevance}% relevant
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.source}, {item.year}
                </div>
                <p className="text-sm">{item.summary}</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          // No items found for search query
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              No literature review available for "{searchQuery}"
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default LiteratureReview;
