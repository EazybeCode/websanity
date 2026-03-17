export enum CRMType {
  HUBSPOT = 'HubSpot',
  SALESFORCE = 'Salesforce',
  ZOHO = 'Zoho CRM',
  LEADSQUARED = 'Leadsquared',
  BITRIX = 'Bitrix',
  INHOUSE = 'In-house CRM',
  OTHER = 'Other',
  NONE = "I don't use any CRM"
}

export interface TrialFormData {
  workEmail: string
  phoneNumber: string
  crmProvider: CRMType
}
