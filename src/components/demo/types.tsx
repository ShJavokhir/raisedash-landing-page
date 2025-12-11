export enum CompanySize {
  SMALL = "1-10 trucks",
  MEDIUM = "11-50 trucks",
  LARGE = "51-200 trucks",
  ENTERPRISE = "201+ trucks",
}

export interface DemoFormData {
  email: string;
  companyName: string;
  companySize: CompanySize | "";
  fullName: string;
  role: string;
  phone: string;
}

export type DemoFormField = keyof DemoFormData;

export interface FieldsCompleted {
  email: boolean;
  companyName: boolean;
  companySize: boolean;
  fullName: boolean;
  role: boolean;
  phone: boolean;
}

