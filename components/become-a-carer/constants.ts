"use client";

import {
    User,
    Briefcase,
    Award,
    FileText,
    CheckCircle2,
    Camera
} from "lucide-react";

export const CARER_STEPS = [
    {
        id: "basic",
        title: "About You",
        icon: User,
        description: "Personal details"
    },
    {
        id: "experience",
        title: "Experience",
        icon: Briefcase,
        description: "Work history"
    },
    {
        id: "qualifications",
        title: "Skills",
        icon: Award,
        description: "Certifications"
    },
    {
        id: "profile",
        title: "Profile",
        icon: Camera,
        description: "Bio & Photo"
    }
];

export const EXPERIENCE_LEVELS = [
    "Less than 1 year",
    "1-3 years",
    "3-5 years",
    "5-10 years",
    "10+ years"
];

export const SPECIALIZATIONS = [
    "Dementia Care",
    "Palliative Care",
    "Mobility Support",
    "Cancer Care",
    "Stroke Recovery",
    "Parkinson's",
    "Learning Disabilities",
    "Mental Health",
    "Companionship"
];

export const CERTIFICATIONS = [
    "NVQ Level 2 in Health and Social Care",
    "NVQ Level 3 in Health and Social Care",
    "Care Certificate",
    "First Aid / CPR",
    "Manual Handling",
    "Food Hygiene",
    "Medication Administration",
    "Safeguarding Adults"
];
