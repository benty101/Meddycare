export interface QuestionOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'single-choice' | 'multiple-choice' | 'text' | 'contact';
  options?: QuestionOption[];
  placeholder?: string;
  required?: boolean;
}

export interface QuestionnaireData {
  [key: string]: string | string[];
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface QuestionnaireResponse {
  type: 'family' | 'carer';
  responses: QuestionnaireData;
  contactInfo?: ContactInfo;
  authMethod?: 'google' | 'email' | 'callback';
  status: 'pending' | 'contacted' | 'converted';
}