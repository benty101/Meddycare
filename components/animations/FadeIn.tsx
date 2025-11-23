"use client";
import { m } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
}) {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={cn(className)}
        >
            {children}
        </m.div>
    );
}
