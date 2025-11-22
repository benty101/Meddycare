"use client";

import {
    User,
    Calendar,
    Heart,
    Home,
    Clock,
    CheckCircle2,
    Info
} from "lucide-react";

export const STEPS = [
    {
        id: "recipient",
        title: "Who needs care?",
        icon: User,
        description: "Tell us about your loved one"
    },
    {
        id: "needs",
        title: "Care Needs",
        icon: Heart,
        description: "Medical & mobility support"
    },
    {
        id: "schedule",
        title: "Schedule",
        icon: Calendar,
        description: "When do you need help?"
    },
    {
        id: "environment",
        title: "Home & Living",
        icon: Home,
        description: "Living arrangements"
    }
];

export const CARE_TYPES = [
    {
        id: "live-in",
        title: "Live-in Care",
        description: "24/7 support and companionship in your own home.",
        icon: Home
    },
    {
        id: "hourly",
        title: "Hourly Care",
        description: "Flexible visits from a few hours a day to overnight.",
        icon: Clock
    },
    {
        id: "respite",
        title: "Respite Care",
        description: "Temporary cover for a regular caregiver.",
        icon: Heart
    }
];

export const MEDICAL_CONDITIONS = [
    "Dementia / Alzheimer's",
    "Mobility Issues",
    "Incontinence",
    "Stroke Recovery",
    "Parkinson's",
    "Cancer Care",
    "Palliative Care",
    "Diabetes",
    "None / Companionship only"
];
