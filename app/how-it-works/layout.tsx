import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How It Works - MeddyCare",
    description: "Simple, transparent, and fast. Find a match or start your first care placement in as little as 48 hours.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
