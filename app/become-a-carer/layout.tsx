import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Become a Carer - MeddyCare",
    description: "Join the UK's #1 Carer Community. Earn up to £900/week with live-in care. Set your own rates and schedule.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
