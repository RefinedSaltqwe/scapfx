import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";

type DashboardCardProps = {
  title: string;
  description: string;
  content: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  content,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">{content}</p>
      </CardContent>
    </Card>
  );
};
export default DashboardCard;
