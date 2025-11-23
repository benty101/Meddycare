import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Care Jobs Board - MeddyCare",
    description: "Find your next live-in care placement. Browse hundreds of jobs across the UK. Direct contracts, better pay.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
