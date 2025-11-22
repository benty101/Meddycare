import type { Question } from '../types';

export const familyQuestions: Question[] = [
  {
    id: 'careType',
    question: 'What type of care are you looking for?',
    type: 'single-choice',
    required: true,
    options: [
      {
        id: 'live-in',
        label: 'Live-in care',
        description: '24/7 support in your own home'
      },
      {
        id: 'respite',
        label: 'Respite care',
        description: 'Temporary cover for regular caregiver'
      },
      {
        id: 'visiting',
        label: 'Visiting care',
        description: 'Flexible home visits'
      },
      {
        id: 'specialist',
        label: 'Specialist Care',
        description: 'Specialized medical support'
      }
    ]
  },
  {
    id: 'relationship',
    question: 'Who needs care?',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'parent', label: 'My parent' },
      { id: 'spouse', label: 'My spouse/partner' },
      { id: 'self', label: 'Myself' },
      { id: 'grandparent', label: 'My grandparent' },
      { id: 'other', label: 'Someone else' }
    ]
  },
  {
    id: 'needs',
    question: 'What are the primary care needs?',
    type: 'multiple-choice',
    required: true,
    options: [
      { id: 'personal-care', label: 'Personal care', description: 'Bathing, dressing, grooming' },
      { id: 'companionship', label: 'Companionship', description: 'Social interaction and activities' },
      { id: 'medical', label: 'Medical support', description: 'Medication, health monitoring' },
      { id: 'dementia', label: 'Dementia care', description: 'Specialized dementia support' },
      { id: 'mobility', label: 'Mobility assistance', description: 'Help with movement' },
      { id: 'meal-prep', label: 'Meal preparation', description: 'Cooking and nutrition' }
    ]
  },
  {
    id: 'startDate',
    question: 'When do you need care to start?',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'immediately', label: 'Immediately', description: 'As soon as possible' },
      { id: 'within-2-weeks', label: 'Within 2 weeks' },
      { id: 'within-month', label: 'Within a month' },
      { id: 'exploring', label: 'Just exploring', description: 'Planning for the future' }
    ]
  },
  {
    id: 'postcode',
    question: 'What is your postcode?',
    type: 'text',
    required: true,
    placeholder: 'e.g., SW1A 1AA'
  },
  {
    id: 'contact',
    question: 'How can we reach you?',
    type: 'contact',
    required: true
  }
];