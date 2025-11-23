"use client";

import { useEffect, useState } from 'react';
import { Sparkles, Search, UserCheck, BrainCircuit } from 'lucide-react';

const steps = [
    { icon: BrainCircuit, text: "Analyzing your care needs..." },
    { icon: Search, text: "Scanning carer database..." },
    { icon: UserCheck, text: "Verifying availability..." },
    { icon: Sparkles, text: "Finalizing best matches..." }
];

export function MatchingLoader({ onComplete }: { onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        if (currentStep < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStep(prev => prev + 1);
            }, 1500); // 1.5s per step
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentStep, onComplete]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="relative w-24 h-24 mb-12">
                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
                </div>
            </div>

            <div className="space-y-6 max-w-md w-full">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;

                    return (
                        <div
                            key={index}
                            className={`flex items-center gap-4 transition-all duration-500 ${isActive || isCompleted ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4'
                                }`}
                        >
                            <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500
                ${isActive ? 'bg-purple-600 text-white scale-110 shadow-lg shadow-purple-200' :
                                    isCompleted ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}
              `}>
                                <Icon className="w-5 h-5" />
                            </div>
                            <span className={`text-lg font-urbanist font-medium transition-colors duration-500 ${isActive ? 'text-purple-900 font-bold' :
                                    isCompleted ? 'text-slate-900' : 'text-slate-400'
                                }`}>
                                {step.text}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
