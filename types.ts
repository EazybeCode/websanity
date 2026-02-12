import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavLink {
  label: string;
  href: string;
}

export interface FeaturePoint {
  title: string;
  text?: string;
}

export interface Feature {
  id: string;
  badge: string;
  headline: string;
  description: string;
  points: string[];
  cta: string;
  imageComponent?: React.ReactNode;
  alignRight?: boolean;
}

export interface CardProps {
  title: string;
  text: string;
  icon?: LucideIcon;
}

export interface StatProps {
  value: string;
  label: string;
}

// Trial Modal Types
export enum CRMType {
  HUBSPOT = 'HubSpot',
  SALESFORCE = 'Salesforce',
  ZOHO = 'Zoho CRM',
  OTHER = 'Other',
  NONE = "I don't use any CRM"
}

export interface TrialFormData {
  workEmail: string;
  phoneNumber: string;
  crmProvider: CRMType;
}