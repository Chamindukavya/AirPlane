import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"; 

interface BookingCardProps {
    passengerName: string;
    flight: string; 
    date: string; 
    time: string;
}

export default function BookingCard({ passengerName, flight, date, time }: BookingCardProps) {
    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>{passengerName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Flight: {flight}</p>
                <p>Date: {date}</p>
                <p>Time: {time}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Completed</Button>
                <Button variant="outline" size="sm">Decline</Button>
            </CardFooter>
        </Card>
    );
}
