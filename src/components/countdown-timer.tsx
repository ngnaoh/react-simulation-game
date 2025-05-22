import { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialTimeInSeconds: number;
  onTimeUp?: () => void;
  className?: string;
}

export function CountdownTimer({
  initialTimeInSeconds,
  onTimeUp,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setTimeLeft(initialTimeInSeconds);
  }, [initialTimeInSeconds]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className={`bg-primary/10 px-3 py-1.5 rounded-lg ${className}`}>
      <p className="text-lg font-medium text-primary">{formattedTime}</p>
    </div>
  );
}
