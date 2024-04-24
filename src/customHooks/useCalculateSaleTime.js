import { useEffect, useState } from 'react';

const useInterval = (callback, delay) => {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);
    return () => clearInterval(intervalId);
  }, [callback, delay]);
};

const UseCalculateSaleTime = (product) => {
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTimeRemaining = (startDate, endDate) => {
    const currentTime = new Date();
    const endTime = new Date(endDate);
    const timeRemaining = endTime - currentTime;
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  useInterval(() => {
    if (product && product.startDate && product.endDate) {
      const timeRemaining = calculateTimeRemaining(product.startDate, product.endDate);
      setRemainingTime(timeRemaining);
    } else {
      setRemainingTime(null);
    }
  }, 1000);

  useEffect(() => {
    if (product && product.startDate && product.endDate) {
      const timeRemaining = calculateTimeRemaining(product.startDate, product.endDate);
      setRemainingTime(timeRemaining);
    } else {
      setRemainingTime(null);
    }
  }, [product]);

  return remainingTime;
};

export default UseCalculateSaleTime;