"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Wand2 } from "lucide-react";
import { suggestJobKeywords } from "@/ai/flows/suggest-job-keywords";
import { useToast } from "@/hooks/use-toast";

interface KeywordSuggesterProps {
  jobTitle: string;
  jobDescription: string;
  onKeywordsAdd: (keywords: string[]) => void;
  currentKeywords: string[];
}

export function KeywordSuggester({
  jobTitle,
  jobDescription,
  onKeywordsAdd,
  currentKeywords
}: KeywordSuggesterProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggest = async () => {
    if (!jobTitle || !jobDescription) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please provide a job title and description first.",
        });
        return;
    }

    setIsLoading(true);
    try {
      const result = await suggestJobKeywords({ jobTitle, jobDescription });
      const newSuggestions = result.keywords.filter(kw => !currentKeywords.includes(kw));
      setSuggestions(newSuggestions);
      if (newSuggestions.length === 0) {
        toast({
            title: "No New Suggestions",
            description: "AI couldn't find any new keywords to suggest.",
        });
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "AI Suggestion Failed",
        description: "Could not fetch keyword suggestions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddKeyword = (keyword: string) => {
    onKeywordsAdd([keyword]);
    setSuggestions(suggestions.filter(s => s !== keyword));
  };


  return (
    <div className="space-y-4">
      <Button type="button" onClick={handleSuggest} disabled={isLoading} variant="outline">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Wand2 className="mr-2 h-4 w-4" />
        )}
        Suggest Keywords with AI
      </Button>
      {suggestions.length > 0 && (
        <div className="p-4 border rounded-md bg-secondary/50">
            <h4 className="text-sm font-medium mb-2">AI Suggestions (click to add):</h4>
            <div className="flex flex-wrap gap-2">
            {suggestions.map((keyword) => (
                <Badge
                key={keyword}
                variant="outline"
                onClick={() => handleAddKeyword(keyword)}
                className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                >
                {keyword}
                </Badge>
            ))}
            </div>
        </div>
      )}
    </div>
  );
}
