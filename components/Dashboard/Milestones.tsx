import { GemIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

const Milestones = () => {
  const goals = [
    { title: "Married", goal: 1000, current: 800 },
  ];

  return (
    <Card className="h-full w-full py-2.5">
      <CardHeader className="pb-2 pt-1 px-4 font-semibold text-lg">My Goals</CardHeader>
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          {goals.map((goal, indx) => {
            const progressPercentage = Math.min((goal.current / goal.goal) * 100, 100);
            return (
              <div key={indx} className="flex flex-col w-full justify-center gap-3 border border-accent rounded-lg p-2 py-3">
                <div className="w-full flex items-center gap-2">
                  <Button variant="outline">
                    <GemIcon />
                  </Button>
                  <div className="flex flex-col w-full gap-y-1">
                    <div className="flex items-center w-full justify-between text-sm font-medium tracking-wide">
                      <span>{goal.title}</span>
                      <span>${goal.current.toLocaleString()}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Achieve by June 30, 2025
                    </p>
                  </div>
                </div>
                <Progress value={progressPercentage} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Milestones;
