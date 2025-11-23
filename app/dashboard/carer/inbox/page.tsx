"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Send, Loader2, User, Search } from "lucide-react";

export default function CarerInboxPage() {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState<any[]>([]);
    const [activeConversation, setActiveConversation] = useState<any>(null);
    const [newMessage, setNewMessage] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch('/api/messages', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                    if (data.length > 0) {
                        setActiveConversation(data[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to load messages", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation) return;

        setSending(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    recipientId: activeConversation.recipientId,
                    content: newMessage,
                    matchId: activeConversation.matchId
                })
            });

            if (res.ok) {
                const sentMsg = await res.json();
                setMessages(prev => [...prev, sentMsg]);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Failed to send message", error);
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-fraunces text-slate-900 mb-2">Messages</h1>
                    <p className="text-slate-600">Communicate with families</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="grid md:grid-cols-3 h-[600px]">
                        {/* Conversations List */}
                        <div className="border-r border-slate-100 overflow-y-auto">
                            <div className="p-4 border-b border-slate-100">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search messages..."
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div className="divide-y divide-slate-50">
                                {messages.length > 0 ? (
                                    messages.map((conv: any, idx: number) => (
                                        <div
                                            key={idx}
                                            onClick={() => setActiveConversation(conv)}
                                            className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${activeConversation?.id === conv.id ? 'bg-purple-50' : ''
                                                }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <User className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-bold text-slate-900 text-sm truncate">
                                                            {conv.senderName || 'Family Member'}
                                                        </h4>
                                                        <span className="text-xs text-slate-400">
                                                            {new Date(conv.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-600 truncate">{conv.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center">
                                        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <p className="text-sm text-slate-500">No messages yet</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Active Conversation */}
                        <div className="md:col-span-2 flex flex-col">
                            {activeConversation ? (
                                <>
                                    {/* Header */}
                                    <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <User className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">
                                                {activeConversation.senderName || 'Family Member'}
                                            </h3>
                                            <p className="text-xs text-slate-500">Active</p>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        <div className="flex justify-start">
                                            <div className="max-w-[70%] bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3">
                                                <p className="text-sm text-slate-900">{activeConversation.content}</p>
                                                <span className="text-xs text-slate-400 mt-1 block">
                                                    {new Date(activeConversation.createdAt).toLocaleTimeString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Input */}
                                    <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type your message..."
                                                className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                            <button
                                                type="submit"
                                                disabled={sending || !newMessage.trim()}
                                                className="btn-primary px-6 py-3 flex items-center gap-2 disabled:opacity-50"
                                            >
                                                {sending ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Send className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-fraunces text-slate-900 mb-2">
                                            Select a conversation
                                        </h3>
                                        <p className="text-slate-500">Choose a message to start chatting</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
