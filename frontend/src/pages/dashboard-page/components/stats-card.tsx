import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  changeText?: string;
  changeIcon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  changeText,
  changeIcon,
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-2 rounded-full bg-muted">{icon}</div>
      </div>
      {changeText && (
        <div className="text-xs text-muted-foreground mt-2 flex items-center">
          {changeIcon}
          <span>{changeText}</span>
        </div>
      )}
    </CardContent>
  </Card>
);
