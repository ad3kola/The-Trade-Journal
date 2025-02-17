import { TrendingDown, TrendingUp, WineIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const WeekSummary = () => {
  const content = [
    {
      title: "Realized PnL",
      value: 5787.54,
      status: "profit",
    },
    {
      title: "Realized PnL",
      value: 765,
      status: "loss",
    },
    {
      title: "Realized PnL",
      value: 23,
      status: "loss",
    },
    {
      title: "Realized PnL",
      value: 6.68,
      status: "profit",
    },
  ];
  return (
    <section>
      <div className="w-full grid gap-4 grid-cols-2">
        {content.map((data, indx) => (
          <Card key={indx}>
            <CardHeader className="py-3 lg:py-4">
              <div className="flex w-full items-center gap-2">
              <WineIcon className="w-5 h-5" />
              <span className="text-sm">{data.title}</span>
              </div>
            </CardHeader>
            <CardContent className="py-3 lg:py-4">
              <div className="flex items-center w-full justify-between">
                <h3 className="text-2xl md:text-3xl lg:text-4xl tracking-wide font-extrabold">{`$ ${data.value.toFixed(
                  2
                )}`}</h3>
              
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WeekSummary;
