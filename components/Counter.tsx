"use client";
import { useEffect, useState } from "react";
import anime from "animejs";

const AnimatedCounter = ({ finalValue }: { finalValue: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    anime({
      targets: { val: 0 },
      val: finalValue,
      round: 1, // Makes sure it's a whole number
      easing: "easeOutExpo", // Starts fast, slows down
      duration: 2000, // Adjust speed (2 seconds)
      update: (anim) => setDisplayValue(Number(anim.animations[0].currentValue)),
    });
  }, [finalValue]);

  return <h1 className="text-3xl font-bold">{displayValue}</h1>;
};

export default function Anime() {
  return <AnimatedCounter finalValue={5000} />;
}
