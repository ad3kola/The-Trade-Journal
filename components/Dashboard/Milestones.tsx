import { GemIcon, PlusIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import MilestonesForm from "./MilestonesForm";

const Milestones = () => {
  const goals = [
    { title: "Pass PropW Challenge Phase 1 ", current: 210.4, end: 400 },
    { title: "Pass PropW Challenge Phase 2 ", current: 120.25, end: 160 },
    { title: "Get 3 Funded Accounts ", current: 0, end: 3 },
  ];

  return (
    <Card className={cn("h-full w-full pt-2.5")}>
      <div className="pb-2 pt-1 px-4 font-semibold flex items-center justify-between text-lg">
        <p>Goals and Milestones</p>
        <Dialog>
          <DialogTrigger>
          <PlusIcon className="h-4 w-4" />
        </DialogTrigger>
        <DialogContent>
          <MilestonesForm />
        </DialogContent>
        </Dialog>
      </div>
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <div className="w-full flex items-center justify-between text-xs px-3">
            <p>Ongoing: 3</p>
            <p className="text-green-500">Completed: 0</p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {goals.map((goal, indx) => {
              const progressPercentage = Math.min(
                (goal.current / goal.end) * 100,
                100
              );
              return (
                <div
                  key={indx}
                  className="flex flex-col w-full justify-center gap-2 border border-input rounded-lg p-2 py-3"
                >
                  <div className="w-full flex items-center px-1 gap-3">
                    <GemIcon />
                    <div className="flex flex-col w-full gap-y-1">
                      <div className="flex items-center w-full justify-between text-sm font-medium tracking-wide">
                        {goal.title}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Achieve by June 30, 2025
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Progress value={progressPercentage} />
                    <div className="w-full flex items-center justify-between text-sm font-semibold">
                      <p>
                        Current: ${goal.current.toLocaleString()}
                      </p>
                      <p className="text-green-500">${goal.end}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Milestones;
