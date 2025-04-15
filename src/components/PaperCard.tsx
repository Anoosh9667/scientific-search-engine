import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, BookmarkPlus, Download, Share2 } from "lucide-react";

interface Author {
  name: string;
  id: string;
}

interface PaperCardProps {
  title: string;
  authors: Author[];
  journal: string;
  year: number;
  abstract: string;
  citations: number;
  mode: "business" | "scientific";
  doi?: string;
  impactFactor?: number;
  onView?: () => void;
  onSave?: () => void;
  onExport?: () => void;
  onShare?: () => void;
}

const PaperCard = ({
  title = "Advancements in Machine Learning Applications for Sustainable Energy",
  authors = [
    { name: "Jane Smith", id: "1" },
    { name: "John Doe", id: "2" },
    { name: "Robert Johnson", id: "3" },
  ],
  journal = "Journal of Sustainable Computing",
  year = 2023,
  abstract = "This paper explores the application of machine learning techniques to optimize energy consumption in smart grid systems. We propose a novel approach that combines reinforcement learning with predictive analytics to balance load distribution and minimize waste.",
  citations = 42,
  mode = "scientific",
  doi = "10.1234/example.2023.001",
  impactFactor = 4.2,
  onView = () => console.log("View paper"),
  onSave = () => console.log("Save paper"),
  onExport = () => console.log("Export paper"),
  onShare = () => console.log("Share paper"),
}: PaperCardProps) => {
  // Truncate abstract if it's too long
  const truncatedAbstract =
    abstract.length > 150 ? `${abstract.substring(0, 150)}...` : abstract;

  // Format authors list with commas
  const authorsList = authors.map((author) => author.name).join(", ");

  // Determine citation badge color based on count
  const getCitationBadgeVariant = () => {
    if (citations > 100) return "destructive";
    if (citations > 50) return "default";
    return "secondary";
  };

  return (
    <Card className="w-full max-w-md h-full bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3
            className="text-lg font-semibold line-clamp-2 hover:text-blue-600 cursor-pointer"
            onClick={onView}
          >
            {title}
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  variant={getCitationBadgeVariant()}
                  className="ml-2 whitespace-nowrap"
                >
                  {citations} citations
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Citation count</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-sm text-muted-foreground line-clamp-1">
          {authorsList}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
          <span>
            {journal}, {year}
          </span>
          {mode === "scientific" && impactFactor && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs">
                    IF: {impactFactor.toFixed(1)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Impact Factor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{truncatedAbstract}</p>
        {mode === "business" && (
          <div className="mt-2">
            <Badge variant="outline" className="mr-1 text-xs">
              Business
            </Badge>
            <Badge variant="outline" className="mr-1 text-xs">
              Innovation
            </Badge>
            <Badge variant="outline" className="text-xs">
              Strategy
            </Badge>
          </div>
        )}
        {mode === "scientific" && doi && (
          <div className="mt-2 text-xs text-muted-foreground">
            DOI:{" "}
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {doi}
            </a>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <TooltipProvider>
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onView}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View paper</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onSave}>
                  <BookmarkPlus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save paper</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onExport}>
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export paper</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={onShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share paper</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default PaperCard;
