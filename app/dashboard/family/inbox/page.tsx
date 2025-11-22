"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Search,
    Filter,
    MoreVertical,
    Check,
    CheckCheck,
    Bell,
    User,
    Shield,
    MessageSquare
} from "lucide-react";

type TabType = "platform" | "carers" | "notifications";

export default function InboxPage() {
    const [activeTab, setActiveTab] = useState<TabType>("carers");
    const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
    const [messages, setMessages] = useState<any>({
        platform: [],
        carers: [],
        notifications: []
    });
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [conversation, setConversation] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const headers = { 'Authorization': `Bearer ${token}` };

                const [platformRes, carersRes, notificationsRes, profileRes] = await Promise.all([
                    fetch('/api/inbox/platform', { headers }),
                    fetch('/api/inbox/clients', { headers }),
                    fetch('/api/inbox/notifications', { headers }),
                    fetch('/api/user/profile', { headers })
                ]);

                const platformData = platformRes.ok ? await platformRes.json() : [];
                const carersData = carersRes.ok ? await carersRes.json() : [];
                const notificationsData = notificationsRes.ok ? await notificationsRes.json() : [];

                if (profileRes.ok) {
                    const profile = await profileRes.json();
                    setCurrentUserId(profile.userId);
                }

                setMessages({
                    platform: platformData.map((msg: any) => ({
                        id: msg.id,
                        senderId: msg.senderId,
                        sender: "MeddyCare Support", // Default for platform
                        avatar: "/logo.png",
                        preview: msg.content,
                        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        unread: !msg.read,
                        verified: true
                    })),
                    carers: carersData.map((msg: any) => ({
                        id: msg.id,
                        senderId: msg.senderId,
                        sender: msg.sender.carer ? `${msg.sender.carer.firstName} ${msg.sender.carer.lastName}` : "Carer",
                        avatar: msg.sender.carer?.profilePhoto || "/images/avatars/default.jpg",
                        preview: msg.content,
                        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        unread: !msg.read,
                        online: false // Real-time status not implemented yet
                    })),
                    notifications: notificationsData.map((notif: any) => ({
                        id: notif.id,
                        title: notif.title,
                        preview: notif.message,
                        time: new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        icon: notif.type,
                        unread: !notif.read
                    }))
                });

            } catch (error) {
                console.error("Failed to fetch inbox data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch conversation when selectedMessage changes
    useEffect(() => {
        if (!selectedMessage) return;
        const currentMsg = messages[activeTab].find((m: any) => m.id === selectedMessage);
        if (!currentMsg || !currentMsg.senderId) return;

        const fetchConversation = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`/api/inbox/messages/${currentMsg.senderId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setConversation(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch conversation", error);
            }
        };
        fetchConversation();
    }, [selectedMessage, messages, activeTab]);

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !selectedMessage) return;

        const currentMsg = messages[activeTab].find((m: any) => m.id === selectedMessage);
        if (!currentMsg || !currentMsg.senderId) return;

        setSending(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/inbox/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    recipientId: currentMsg.senderId,
                    content: newMessage
                })
            });

            if (res.ok) {
                const sentMsg = await res.json();
                setNewMessage("");
                setConversation(prev => [...prev, sentMsg]);
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setSending(false);
        }
    };

    const currentMessages = messages[activeTab] || [];

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex">
            {/* Left Sidebar - Message List */}
            <div className="w-full md:w-96 border-r border-gray-100 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 font-heading mb-6">Inbox</h1>

                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
                        <button
                            onClick={() => setActiveTab("platform")}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "platform"
                                ? "bg-white text-brand-purple shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            MeddyCare
                        </button>
                        <button
                            onClick={() => setActiveTab("carers")}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "carers"
                                ? "bg-white text-brand-purple shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Carers
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === "notifications"
                                ? "bg-white text-brand-purple shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Alerts
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-transparent focus:bg-white focus:border-brand-purple rounded-xl text-sm outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Message List */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center p-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-purple"></div>
                        </div>
                    ) : currentMessages.length > 0 ? (
                        currentMessages.map((msg: any) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg.id)}
                                className={`p-4 border-b border-gray-50 cursor-pointer transition-colors hover:bg-gray-50 ${selectedMessage === msg.id ? "bg-purple-50/50 border-l-4 border-l-brand-purple" : "border-l-4 border-l-transparent"
                                    }`}
                            >
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ${activeTab === 'notifications' ? 'bg-purple-100 text-brand-purple' : 'bg-gray-200'
                                            }`}>
                                            {activeTab === 'notifications' ? (
                                                <Bell size={20} />
                                            ) : (
                                                // Placeholder for avatar
                                                <div className="w-full h-full bg-gray-300" />
                                            )}
                                        </div>
                                        {'online' in msg && msg.online && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`text-sm font-bold truncate ${msg.unread ? "text-gray-900" : "text-gray-600"}`}>
                                                {'sender' in msg ? msg.sender : msg.title}
                                            </h3>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{msg.time}</span>
                                        </div>
                                        <p className={`text-sm truncate ${msg.unread ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                            {msg.preview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                            No messages found.
                        </div>
                    )}
                </div>
            </div>

            {/* Right Content - Chat View */}
            <div className="hidden md:flex flex-1 flex-col bg-gray-50/50">
                {selectedMessage ? (
                    <>
                        {/* Chat Header */}
                        <div className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                    {/* Placeholder */}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900">
                                        {currentMessages.find((m: any) => m.id === selectedMessage)?.sender || "Chat"}
                                    </h2>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        <span className="text-xs text-gray-500">Online now</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-brand-purple hover:bg-purple-50 rounded-lg transition-colors">
                                    <Search size={20} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-brand-purple hover:bg-purple-50 rounded-lg transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6">
                            {/* Date Divider */}
                            <div className="flex justify-center">
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-500 font-medium">
                                    Today
                                </span>
                            </div>

                            {conversation.map((msg: any) => {
                                const isMe = msg.senderId === currentUserId;
                                return (
                                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                        {!isMe && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 mt-1 overflow-hidden">
                                                {msg.sender?.carer?.profilePhoto ? (
                                                    <Image src={msg.sender.carer.profilePhoto} alt="Sender" width={32} height={32} className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-500"><User size={16} /></div>
                                                )}
                                            </div>
                                        )}
                                        <div className={`max-w-[70%] ${isMe ? 'items-end' : ''}`}>
                                            <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${isMe
                                                ? 'bg-brand-purple text-white rounded-tr-none'
                                                : 'bg-white text-gray-700 rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                            <span className={`text-xs text-gray-400 mt-1 block ${isMe ? 'text-right' : ''}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex gap-4 items-end bg-gray-50 p-2 rounded-2xl border border-gray-200 focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple transition-all">
                                <textarea
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-2.5 px-2 text-sm"
                                    rows={1}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={sending}
                                    className="p-2.5 bg-brand-purple text-white rounded-xl hover:bg-brand-purple-light transition-colors shadow-sm disabled:opacity-50"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                            <MessageSquare size={40} className="text-brand-purple" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Select a conversation</h2>
                        <p className="text-gray-500 max-w-sm">
                            Choose a message from the list to view the conversation or start a new one.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
