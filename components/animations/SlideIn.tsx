"use client";
import { m } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function SlideIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    direction = "left",
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "left" | "right" | "up" | "down";
}) {
    const variants = {
        hidden: {
            opacity: 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
        },
        visible: { opacity: 1, x: 0, y: 0 },
    };

    return (
        <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration, delay, ease: "easeOut" }}
            variants={variants}
            className={cn(className)}
        >
            {children}
        </m.div>
    );
}
