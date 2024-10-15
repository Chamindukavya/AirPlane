import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  name: string;
  bioLink?: string;
}

export default function ProfileCard({ name, bioLink }: ProfileCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Hello,</span>
          <Button variant="ghost" size="sm">
            Edit Link
          </Button>
        </CardTitle>
        <p className="text-2xl font-semibold">{name}</p>
        {bioLink && (
          <a
            href={bioLink}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            {bioLink}
          </a>
        )}
      </CardHeader>
      {/* Additional profile details, image, etc. can go here */}
    </Card>
  );
}
