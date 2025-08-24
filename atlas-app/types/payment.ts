
export type PaymentData = {
  countryFrom: string
  studentInstitution: any
  studentDateOfBirth: string
  studentExpectedYearOfCompletion: string 
  studentEmail: string
  studentPhoneNumber: string
  studentPersonalEmail: string
  paymentType: string 
  studentProgramStudied: string 
  payerPhoneNumber: string 
  payerZipCode: string 
  payerCity: string 
  payerState: string 
  payerAddress: string 
  payerLastName: string 
  payerFirstName: string 
  payerType: string 
  amountNGN: string
  amountCAD: string
  studentFirstName: string
  studentLastName: string
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaymentRequest {
  id: string;
  name: string;
  student_id: string;
  amount: string;
  description?: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'processing';
  created_at: string;
  updated_at: string;
  student_document?: string;
  payer_id_document?: string;
  payment_receipt?: string;
}

export interface VirtualAccount {
  account_number: string;
  account_name: string;
  bank_name: string;
  amount: number;
  payment_request_id: string;
  expires_at: string;
  status: 'active' | 'expired' | 'used';
}

export interface PaymentVerification {
  payment_reference: string;
  transaction_id?: string;
  amount?: number;
  status: 'verified' | 'pending' | 'failed';
  verified_at?: string;
  payment_method?: string;
  reason?: string;
}

export interface CreatePaymentRequestData {
  name: string;
  amount: string;
  description?: string;
  student_document?: string;
  payer_id_document?: string;
  payment_receipt?: string;
}

export interface EmailRequest {
  email: string;
  type?: 'welcome' | 'notification' | 'reminder';
}

export interface VirtualAccountRequest {
  payment_request_id: string;
  amount: string;
}

export interface PaymentVerificationRequest {
  payment_reference?: string;
  transaction_id?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next?: string;
  previous?: string;
}
