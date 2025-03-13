"use client";

import { Accordion } from "@/components/ui/accordion";
import Strategy from "./Strategy";

function StrategyAccordion() {
  const strategies = [
    {
      name: "Elliott Wave Theory - 35A",
      overview:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, provident ipsa! Quidem ab nam cumque eligendi, magnam voluptatibus culpa, velit, reiciendis distinctio saepe eum necessitatibus nonomnis. Accusamus rem ratione architecto, quis ab repellat distinctio?",
      image: "/assets/35a.png",
      metrics: [
        "15Min Order Block",
        "1Min CHoCH",
        "Fib Key Levels",
        "Divergence",
        "Aligns with 15min Trend Bias",
      ],
    },
    {
      name: "15Min Order Block Entry",
      overview:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem tenetur earum sint! Vel voluptates sed numquam fuga soluta, obcaecati esse! Eos aspernatur rem tempore reiciendis earum dolore nesciunt, ratione ipsa odio, necessitatibus ducimus exercitationem, accusantium eveniet distinctio iste provident commodi!",
      image: "/assets/strat2.png",
      metrics: [
        "30Min BOS",
        "Fib Key Levels",
        "Divergence",
        "Pro TrendLine Retest",
      ],
    },
  ];
  return (
    <Accordion type="single" collapsible>
      <div className="grid grid-cols-1 gap-4">
        {strategies.map((strategy, indx) => (
          <Strategy key={indx} strategy={strategy} />
        ))}
      </div>
    </Accordion>
  );
}

export default StrategyAccordion;
