"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Briefcase,
    Calendar,
    FileText,
    Wallet,
    Settings,
    LogOut,
    UserCircle,
    MessageSquare
} from "lucide-react";

const NAV_ITEMS = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/carer" },
    { icon: Briefcase, label: "Find Jobs", href: "/dashboard/carer/jobs" },
    { icon: FileText, label: "My Applications", href: "/dashboard/carer/applications" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/carer/inbox" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/carer/schedule" },
    { icon: Wallet, label: "Earnings", href: "/dashboard/carer/earnings" },
];

export default function CarerDashboardLayout({
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
                        <span className="text-xl font-bold text-brand-purple font-heading">MeddyCare Pro</span>
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
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account</p>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/dashboard/carer/profile"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-brand-purple transition-all duration-200 group"
                                >
                                    <UserCircle size={20} className="text-gray-400 group-hover:text-brand-purple" />
                                    <span className="font-medium">My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/carer/settings"
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
                        <div className="w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center font-bold overflow-hidden">
                            <Image src="/images/avatars/carer-1.jpg" alt="Me" width={40} height={40} className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">Sarah Mitchell</p>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <p className="text-xs text-gray-500 truncate">Available</p>
                            </div>
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
                        <span className="text-lg font-bold text-brand-purple">MeddyCare Pro</span>
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
