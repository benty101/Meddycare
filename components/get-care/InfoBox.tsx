"use client";

import { Info } from "lucide-react";

interface InfoBoxProps {
    title: string;
    content: string;
    link?: {
        text: string;
        href: string;
    };
}

export default function InfoBox({ title, content, link }: InfoBoxProps) {
    return (
        <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-6 sticky top-8">
            <div className="flex items-start gap-3 mb-3">
                <Info className="text-brand-purple shrink-0 mt-1" size={20} />
                <h4 className="font-bold text-brand-purple font-heading">{title}</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {content}
            </p>
            {link && (
                <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-brand-pink hover:underline"
                >
                    {link.text} →
                </a>
            )}
        </div>
    );
}
