import { useEffect, useRef, useState } from 'react';

import type { Statistics } from '@/types';

interface StatsSectionProps {
  statistics: Statistics;
}

// Custom hook for counting animation
function useCountAnimation(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

// Animated number component
function AnimatedNumber({
  value,
  suffix = '',
  duration = 2000,
  shouldStart = false,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  shouldStart: boolean;
}) {
  const animatedValue = useCountAnimation(value, duration, shouldStart);

  return (
    <span>
      {animatedValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection({ statistics }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              <AnimatedNumber value={statistics.totalCourses} suffix="+" shouldStart={isVisible} />
            </div>
            <div className="text-gray-600">Khóa học</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              <AnimatedNumber value={statistics.totalStudents} suffix="+" shouldStart={isVisible} />
            </div>
            <div className="text-gray-600">Học viên</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              <AnimatedNumber
                value={statistics.uniqueInstructors}
                suffix="+"
                shouldStart={isVisible}
              />
            </div>
            <div className="text-gray-600">Giảng viên</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              <AnimatedNumber
                value={parseFloat(statistics.averageRating)}
                shouldStart={isVisible}
              />
            </div>
            <div className="text-gray-600">Đánh giá trung bình</div>
          </div>
        </div>
      </div>
    </section>
  );
}
