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
            <CardHeader>
              <div className="flex w-full items-center gap-2">
                <WineIcon className="w-5 h-5" />
                <span className="text-sm">{data.title}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center w-full justify-between">
                <h3 className="text-3xl md:text-4xl tracking-wide font-extrabold">{`$ ${data.value.toFixed(
                  2
                )}`}</h3>
                {data.status == "profit" ? (
                  <span className="bg-green-200 px-2 py-1 rounded-md text-[10px] md:text-[12px] text-green-700 font-bold flex items-center absolute top-5 right-2 lg:right-10">
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1 inline" />
                    {7}%
                  </span>
                ) : (
                  <span className="bg-red-200 px-2 py-1 rounded-md text-[10px] md:text-[12px] text-red-700 font-bold flex items-center absolute top-5 right-2 lg:right-10">
                    <TrendingDown className="w-3 h-3 md:w-4 md:h-4 mr-1 inline" />
                    {7}%
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WeekSummary;
