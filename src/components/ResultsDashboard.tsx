import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaperCard from "./PaperCard";
import LiteratureReview from "./LiteratureReview";
import { getLiteratureReviews } from "@/services/literatureReviewService";
import { ChevronDown, SortAsc, SortDesc } from "lucide-react";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publicationDate: string;
  abstract: string;
  citations: number;
  downloads: number;
  url: string;
}

interface ResultsDashboardProps {
  papers?: Paper[];
  isLoading?: boolean;
  mode?: "business" | "scientific";
  totalResults?: number;
  searchQuery?: string;
  userId?: string;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  papers = [
    {
      id: "1",
      title: "Advances in Quantum Computing for Business Applications",
      authors: ["Jane Smith", "John Doe", "Robert Johnson"],
      journal: "Journal of Business Technology",
      publicationDate: "2023-05-15",
      abstract:
        "This paper explores the potential applications of quantum computing in modern business environments, focusing on optimization problems, financial modeling, and supply chain management.",
      citations: 45,
      downloads: 230,
      url: "#",
    },
    {
      id: "2",
      title: "Machine Learning Approaches to Market Prediction",
      authors: ["Michael Chen", "Sarah Williams"],
      journal: "International Business Review",
      publicationDate: "2022-11-03",
      abstract:
        "A comprehensive analysis of various machine learning algorithms applied to market prediction and trading strategy optimization with comparative performance metrics.",
      citations: 78,
      downloads: 412,
      url: "#",
    },
    {
      id: "3",
      title: "Sustainable Business Models in Renewable Energy Sector",
      authors: ["Emma Johnson", "David Miller", "Lisa Wong"],
      journal: "Sustainability Business Journal",
      publicationDate: "2023-02-22",
      abstract:
        "This research examines emerging sustainable business models in the renewable energy sector, with case studies from solar, wind, and hydroelectric industries.",
      citations: 32,
      downloads: 189,
      url: "#",
    },
    {
      id: "4",
      title: "Neural Networks for Predicting Consumer Behavior",
      authors: ["Thomas Anderson", "Julia Martinez"],
      journal: "Journal of Marketing Analytics",
      publicationDate: "2022-08-17",
      abstract:
        "An exploration of deep learning neural network architectures designed to predict consumer behavior based on multi-dimensional data inputs from various digital touchpoints.",
      citations: 56,
      downloads: 278,
      url: "#",
    },
    {
      id: "5",
      title: "Blockchain Technology in Supply Chain Management",
      authors: ["Alex Turner", "Priya Patel", "James Wilson"],
      journal: "Supply Chain Technology Review",
      publicationDate: "2023-01-09",
      abstract:
        "This paper presents a framework for implementing blockchain technology in supply chain management to enhance transparency, traceability, and security.",
      citations: 41,
      downloads: 203,
      url: "#",
    },
    {
      id: "6",
      title: "Impact of Artificial Intelligence on Business Strategy",
      authors: ["Rebecca Clark", "Daniel Lee"],
      journal: "Strategic Management Journal",
      publicationDate: "2022-12-05",
      abstract:
        "A critical analysis of how artificial intelligence is reshaping business strategy formulation and implementation across various industry sectors.",
      citations: 89,
      downloads: 356,
      url: "#",
    },
  ],
  isLoading = false,
  mode = "business",
  totalResults = 243,
  searchQuery = "",
  userId = "user-1",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState("10");
  const [sortBy, setSortBy] = useState("relevance");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [literatureReviews, setLiteratureReviews] = useState([]);
  const [isLoadingLiterature, setIsLoadingLiterature] = useState(false);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Fetch literature reviews when search query changes
  useEffect(() => {
    const fetchLiteratureReviews = async () => {
      if (!searchQuery) return;

      setIsLoadingLiterature(true);
      try {
        const reviews = await getLiteratureReviews(searchQuery, userId, mode);
        setLiteratureReviews(reviews);
      } catch (error) {
        console.error("Error fetching literature reviews:", error);
        setLiteratureReviews([]);
      } finally {
        setIsLoadingLiterature(false);
      }
    };

    fetchLiteratureReviews();
  }, [searchQuery, userId, mode]);

  return (
    <div className="w-full bg-background p-4">
      {/* Literature Review Section */}
      {searchQuery && (
        <LiteratureReview
          searchQuery={searchQuery}
          isLoading={isLoadingLiterature}
          items={literatureReviews}
          mode={mode}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{papers.length}</span> of{" "}
          <span className="font-medium">{totalResults}</span> results
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Relevance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Publication Date</SelectItem>
                <SelectItem value="citations">Citations</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" onClick={toggleSortOrder}>
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Show:</span>
            <Select value={resultsPerPage} onValueChange={setResultsPerPage}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-[280px] animate-pulse bg-muted">
              <CardContent className="p-6">
                <div className="h-6 w-3/4 bg-muted-foreground/20 rounded mb-4"></div>
                <div className="h-4 w-1/2 bg-muted-foreground/20 rounded mb-6"></div>
                <div className="h-24 w-full bg-muted-foreground/20 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="h-8 w-20 bg-muted-foreground/20 rounded"></div>
                  <div className="h-8 w-20 bg-muted-foreground/20 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : papers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <PaperCard
              key={paper.id}
              title={paper.title}
              authors={paper.authors.map((author, index) => ({
                name: author,
                id: `${paper.id}-author-${index}`,
              }))}
              journal={paper.journal}
              year={new Date(paper.publicationDate).getFullYear()}
              abstract={paper.abstract}
              citations={paper.citations}
              mode={mode}
              onView={() => window.open(paper.url, "_blank")}
            />
          ))}
        </div>
      ) : (
        <Card className="w-full p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="text-4xl">📚</div>
            <h3 className="text-xl font-semibold">No results found</h3>
            <p className="text-muted-foreground max-w-md">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
          </div>
        </Card>
      )}

      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of{" "}
          {Math.ceil(totalResults / parseInt(resultsPerPage))}
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {Array.from(
              {
                length: Math.min(
                  5,
                  Math.ceil(totalResults / parseInt(resultsPerPage)),
                ),
              },
              (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            {Math.ceil(totalResults / parseInt(resultsPerPage)) > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (
                    currentPage <
                    Math.ceil(totalResults / parseInt(resultsPerPage))
                  ) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                className={
                  currentPage ===
                  Math.ceil(totalResults / parseInt(resultsPerPage))
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ResultsDashboard;
