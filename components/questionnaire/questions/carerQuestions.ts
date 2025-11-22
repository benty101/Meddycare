import type { Question } from '../types';

export const carerQuestions: Question[] = [
  {
    id: 'careType',
    question: 'What type of care work are you interested in?',
    type: 'single-choice',
    required: true,
    options: [
      {
        id: 'live-in',
        label: 'Live-in care',
        description: 'Stay with clients 24/7'
      },
      {
        id: 'visiting',
        label: 'Visiting care',
        description: 'Flexible hourly visits'
      },
      {
        id: 'both',
        label: 'Both',
        description: 'Open to all opportunities'
      }
    ]
  },
  {
    id: 'experience',
    question: 'How many years of care experience do you have?',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'less-than-1', label: 'Less than 1 year' },
      { id: '1-3', label: '1-3 years' },
      { id: '3-5', label: '3-5 years' },
      { id: '5-10', label: '5-10 years' },
      { id: '10-plus', label: '10+ years' }
    ]
  },
  {
    id: 'specializations',
    question: 'What are your areas of expertise?',
    type: 'multiple-choice',
    required: true,
    options: [
      { id: 'dementia', label: 'Dementia care', description: 'Alzheimer\'s and memory care' },
      { id: 'mobility', label: 'Mobility support', description: 'Physical assistance' },
      { id: 'palliative', label: 'Palliative care', description: 'End-of-life care' },
      { id: 'stroke', label: 'Stroke recovery', description: 'Post-stroke rehabilitation' },
      { id: 'diabetes', label: 'Diabetes management' },
      { id: 'general', label: 'General care', description: 'Companionship and daily living' }
    ]
  },
  {
    id: 'dbsCheck',
    question: 'Do you have a current DBS check?',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'current', label: 'Yes, current DBS', description: 'Valid enhanced DBS certificate' },
      { id: 'expired', label: 'Expired DBS', description: 'Need to renew' },
      { id: 'none', label: 'No DBS check', description: 'Will need to obtain one' }
    ]
  },
  {
    id: 'availability',
    question: 'When can you start working?',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'immediate', label: 'Immediately', description: 'Ready to start now' },
      { id: 'within-2-weeks', label: 'Within 2 weeks' },
      { id: 'within-month', label: 'Within a month' },
      { id: 'flexible', label: 'Flexible', description: 'Looking for the right opportunity' }
    ]
  },
  {
    id: 'contact',
    question: 'How can we reach you?',
    type: 'contact',
    required: true
  }
];