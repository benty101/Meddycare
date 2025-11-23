"use client";

import { Check } from 'lucide-react';
import type { Question, QuestionOption } from './types';

interface QuestionCardProps {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export function QuestionCard({ question, value, onChange }: QuestionCardProps) {
  const handleSingleChoice = (optionId: string) => {
    onChange(optionId);
  };

  const handleMultipleChoice = (optionId: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(optionId)) {
      onChange(currentValues.filter(v => v !== optionId));
    } else {
      onChange([...currentValues, optionId]);
    }
  };

  const handleTextChange = (text: string) => {
    onChange(text);
  };

  const isSelected = (optionId: string) => {
    if (Array.isArray(value)) {
      return value.includes(optionId);
    }
    return value === optionId;
  };

  if (question.type === 'text') {
    return (
      <div className="space-y-4">
        <input
          type="text"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={question.placeholder}
          className="w-full px-8 py-5 text-xl rounded-2xl border-2 border-slate-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-100 outline-none transition-all font-urbanist text-slate-900 placeholder:text-slate-400"
        />
      </div>
    );
  }

  if (question.type === 'contact') {
    return null; // Will be handled separately in the main component
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {question.options?.map((option: QuestionOption) => (
        <button
          key={option.id}
          type="button"
          onClick={() =>
            question.type === 'single-choice'
              ? handleSingleChoice(option.id)
              : handleMultipleChoice(option.id)
          }
          className={`
            relative p-6 rounded-2xl border-2 text-left transition-all duration-300 group
            hover:scale-[1.02] active:scale-[0.98]
            ${isSelected(option.id)
              ? 'border-purple-600 bg-purple-50 shadow-lg shadow-purple-100'
              : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
            }
          `}
        >
          {isSelected(option.id) && (
            <div className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </div>
          )}
          <div className="pr-8">
            <div className={`text-xl font-fraunces mb-2 transition-colors ${isSelected(option.id) ? 'text-purple-900' : 'text-slate-900 group-hover:text-purple-700'
              }`}>
              {option.label}
            </div>
            {option.description && (
              <div className={`text-sm font-urbanist leading-relaxed ${isSelected(option.id) ? 'text-purple-700' : 'text-slate-500'
                }`}>
                {option.description}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}