import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Sparkles, CheckCircle2, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface LipstickCardProps {
  name: string;
  brand: string;
  price: string;
  matchPercentage?: number;
  imageUrl: string;
  shade: string;
  availability: "in-stock" | "online" | "limited";
  finish?: string;
  undertone?: "warm" | "cool" | "neutral";
  isBestMatch?: boolean;
}

export function LipstickCard({ 
  name, 
  brand, 
  price, 
  matchPercentage, 
  imageUrl, 
  shade,
  availability,
  finish,
  undertone,
  isBestMatch = false 
}: LipstickCardProps) {
  const getUndertoneBadge = () => {
    if (!undertone) return null;
    const colors = {
      warm: "bg-orange-50 text-orange-700 border-orange-200",
      cool: "bg-blue-50 text-blue-700 border-blue-200",
      neutral: "bg-gray-50 text-gray-700 border-gray-200"
    };
    return (
      <Badge variant="outline" className={colors[undertone]}>
        {undertone}
      </Badge>
    );
  };
  const getAvailabilityBadge = () => {
    switch (availability) {
      case "in-stock":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            In Stock
          </Badge>
        );
      case "online":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Globe className="w-3 h-3 mr-1" />
            Online
          </Badge>
        );
      case "limited":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Limited
          </Badge>
        );
    }
  };

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${isBestMatch ? 'ring-2 ring-primary' : ''}`}>
      <div className="aspect-square overflow-hidden bg-muted">
        <ImageWithFallback 
          src={imageUrl} 
          alt={`${brand} ${name}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <p className="text-muted-foreground">{brand}</p>
            <h3 className="line-clamp-1">{name}</h3>
            <p className="text-muted-foreground">{shade}</p>
            {finish && (
              <p className="text-muted-foreground mt-1">{finish}</p>
            )}
          </div>
          {isBestMatch && (
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 ml-2" />
          )}
        </div>
        <div className="space-y-2 mt-3">
          <div className="flex items-center justify-between">
            <p>{price}</p>
            {matchPercentage !== undefined && (
              <Badge variant={matchPercentage >= 90 ? "default" : "secondary"}>
                {matchPercentage}% match
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {getAvailabilityBadge()}
            {getUndertoneBadge()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
