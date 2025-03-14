"use client";

import { Accordion } from "@/components/ui/accordion";
import Strategy from "./Strategy";
import { z } from "zod";
import { strategySchema } from "@/config/zod";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { usersCollection } from "@/config/firebase";

function StrategyAccordion({ docID }: { docID: string | null }) {
  const [allStrategies, setAllStrategies] = useState<
    z.infer<typeof strategySchema>[]
  >([]);

  useEffect(() => {
    if (!docID) return;

    const fetchData = async () => {
      try {
        const q = query(collection(usersCollection, docID, "strategy"));
        const queryResponse = await getDocs(q);

        const data = queryResponse.docs.map((doc) => ({
          id: doc.id, // Corrected from `docID` to `doc.id`
          ...(doc.data() as z.infer<typeof strategySchema>),
        }));

        setAllStrategies(data);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    fetchData();
  }, [docID]); // Removed `allStrategies` from dependencies

  return (
    <Accordion type="single" collapsible>
      <div className="grid grid-cols-1 gap-4">
        {allStrategies.length > 0 ? (
          allStrategies.map((strategy, indx) => (
            <Strategy key={strategy.name.toLowerCase() || indx} strategy={strategy} />
          ))
        ) : (
          <p>No strategies found</p>
        )}
      </div>
    </Accordion>
  );
}

export default StrategyAccordion;
