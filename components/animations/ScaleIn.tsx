"use client";
import { m } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function ScaleIn({
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={cn(className)}
        >
            {children}
        </m.div>
    );
}
