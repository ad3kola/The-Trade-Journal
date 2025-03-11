import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const MostWonCoins = ({coin}: {coin: string}) => {
  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="flex items-center gap-3">
          <Image
            className="object-cover rounded-full"
            src={`/assets/${coin}`}
            alt="logo"
            width={35}
            height={35}
          />
          <div className="flex flex-col gap-1">
            <h2 className="text">AAPL</h2>
            <p className="tracking-wide font-normal text-[10px] text-muted-foreground">
              Apple, Inc
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="font-bold tracking-wider p-2 px-6 text-lg">
        $ 167.96
      </CardContent>
    </Card>
  );
};

export default MostWonCoins;
