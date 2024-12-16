import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { CountItem } from "@/types/dashboard";

interface CountListProps {
  title: string;
  items: CountItem[];
}

export function CountList({ title, items }: CountListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
            >
              <span className="font-medium">{item.label}</span>
              <div className="flex items-center space-x-2">
                <span>{item.value}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
