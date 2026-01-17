import { useState, useEffect } from "react";

export default function AnimatedNumber({ value, suffix = '' }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime = Date.now();
        const duration = 1500;
        
        const animateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOutCubic * value);
            
            setDisplayValue(currentValue);
            
            if (progress < 1) {
                requestAnimationFrame(animateNumber);
            }
        };
        
        if (value > 0) {
            requestAnimationFrame(animateNumber);
        }
    }, [value]);

    return <span>{displayValue}{suffix}</span>;
}