"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    MessageSquare,
    Calendar,
    FileText,
    CreditCard,
    Settings,
    LogOut,
    Heart,
    User
} from "lucide-react";

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/family" },
    { icon: User, label: "My Carers", href: "/dashboard/family/carers" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/family/inbox" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/family/schedule" },
    { icon: FileText, label: "Care Plan", href: "/dashboard/family/care-plan" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/family/payments" },
];

export default function FamilyDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-30 hidden lg:flex flex-col">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-gray-100">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="MeddyCare"
                            width={30}
                            height={40}
                            className="object-contain"
                        />
                        <span className="text-xl font-bold text-brand-purple font-heading">MeddyCare</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                    <div className="mb-8 px-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                                                    : "text-gray-600 hover:bg-purple-50 hover:text-brand-purple"
                                                }`}
                                        >
                                            <item.icon
                                                size={20}
                                                className={isActive ? "text-white" : "text-gray-400 group-hover:text-brand-purple"}
                                            />
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="px-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Support</p>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/dashboard/family/settings"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-brand-purple transition-all duration-200 group"
                                >
                                    <Settings size={20} className="text-gray-400 group-hover:text-brand-purple" />
                                    <span className="font-medium">Settings</span>
                                </Link>
                            </li>
                            <li>
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200">
                                    <LogOut size={20} />
                                    <span className="font-medium">Log Out</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* User Profile Snippet */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-100">
                        <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold">
                            JD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">Family Member</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                {/* Mobile Header */}
                <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="MeddyCare" width={24} height={32} />
                        <span className="text-lg font-bold text-brand-purple">MeddyCare</span>
                    </Link>
                    <button className="p-2 text-gray-600">
                        <LayoutDashboard size={24} />
                    </button>
                </div>

                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
