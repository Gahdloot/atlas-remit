import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase";
import type {
  PaymentRequest,
  VirtualAccount,
  PaymentVerification,
  CreatePaymentRequestData,
  EmailRequest,
  VirtualAccountRequest,
  PaymentVerificationRequest,
  PaginationParams,
  PaginatedResponse,
  ApiResponse
} from "@/types/payment";

export const schoolPaymentSlice = createApi({
  reducerPath: "schoolPaymentSlice",
  baseQuery: customFetchBase,
  tagTypes: ['PaymentRequest', 'VirtualAccount', 'PaymentVerification'],
  endpoints: (builder) => ({
    
    sendWelcomeEmail: builder.mutation<
      ApiResponse<{ email: string; sent_at: string }>,
      { email: string }
    >({
      query: (emailData) => ({
        url: `get-started/`,
        method: "POST",
        body: emailData,
      }),
    }),

    resendEmail: builder.mutation<
      ApiResponse<EmailRequest & { sent_at: string }>,
      EmailRequest
    >({
      query: (emailData) => ({
        url: `resend-email/`,
        method: "POST",
        body: emailData,
      }),
    }),

    getTestList: builder.query<
      ApiResponse<PaginatedResponse<PaymentRequest>>,
      PaginationParams
    >({
      query: (params = {}) => ({
        url: ``,
        method: "GET",
        params: params,
      }),
      providesTags: ['PaymentRequest'],
    }),



    // ============= PAYMENT REQUEST ENDPOINTS =============

    createPaymentRequest: builder.mutation<
      ApiResponse<PaymentRequest>,
      any
    >({
      query: (paymentData) => ({
        url: `payment-requests/`,
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ['PaymentRequest'],
    }),

    getPaymentRequestsList: builder.query<
      ApiResponse<PaginatedResponse<PaymentRequest>>,
      PaginationParams
    >({
      query: (params = {}) => ({
        url: `payment-requests/`,
        method: "GET",
        params: params,
      }),
      providesTags: ['PaymentRequest'],
    }),

    getPaymentRequestById: builder.query<
      ApiResponse<PaymentRequest>,
      string
    >({
      query: (requestId) => ({
        url: `payment-requests/${requestId}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'PaymentRequest', id }],
    }),

    updatePaymentRequest: builder.mutation<
      ApiResponse<PaymentRequest>,
      { id: string } & Partial<any>
    >({
      query: ({ id, ...paymentData }) => ({
        url: `payment-requests/${id}/`,
        method: "PUT",
        body: paymentData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'PaymentRequest', id },
        'PaymentRequest'
      ],
    }),

    deletePaymentRequest: builder.mutation<
      ApiResponse<void>,
      string
    >({
      query: (requestId) => ({
        url: `payment-requests/${requestId}/`,
        method: "DELETE",
      }),
      invalidatesTags: ['PaymentRequest'],
    }),

    // ============= VIRTUAL ACCOUNT ENDPOINTS =============

    getOneTimeVirtualAccount: builder.mutation<
      ApiResponse<VirtualAccount>,
      VirtualAccountRequest
    >({
      query: (accountData) => ({
        url: `get-one-time-account/`,
        method: "POST",
        body: accountData,
      }),
      invalidatesTags: ['VirtualAccount'],
    }),

    getVirtualAccountById: builder.query<
      ApiResponse<VirtualAccount>,
      string
    >({
      query: (accountId) => ({
        url: `virtual-accounts/${accountId}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'VirtualAccount', id }],
    }),

    getVirtualAccountsByPaymentRequest: builder.query<
      ApiResponse<VirtualAccount[]>,
      string
    >({
      query: (paymentRequestId) => ({
        url: `virtual-accounts/`,
        method: "GET",
        params: { payment_request_id: paymentRequestId },
      }),
      providesTags: ['VirtualAccount'],
    }),

    // ============= PAYMENT VERIFICATION ENDPOINTS =============

    verifyPayment: builder.mutation<
      ApiResponse<any>,
      PaymentVerificationRequest
    >({
      query: (verificationData) => ({
        url: `verify-payment/`,
        method: "POST",
        body: verificationData,
      }),
      invalidatesTags: ['PaymentVerification', 'PaymentRequest'],
    }),


    trackPayment: builder.mutation<
      ApiResponse<any>,
      PaymentVerificationRequest
    >({
      query: (verificationData) => ({
        url: `track-payment/`,
        method: "POST",
        body: verificationData,
      }),
      invalidatesTags: ['PaymentVerification', 'PaymentRequest'],
    }),

    getPaymentVerificationHistory: builder.query<
      ApiResponse<PaymentVerification[]>,
      { payment_request_id?: string; payment_reference?: string }
    >({
      query: (params = {}) => ({
        url: `payment-verifications/`,
        method: "GET",
        params: params,
      }),
      providesTags: ['PaymentVerification'],
    }),

    // ============= BULK OPERATIONS =============

    createBulkPaymentRequests: builder.mutation<
      ApiResponse<{ created: PaymentRequest[]; errors: any[] }>,
      CreatePaymentRequestData[]
    >({
      query: (paymentRequests) => ({
        url: `payment-requests/bulk/`,
        method: "POST",
        body: { requests: paymentRequests },
      }),
      invalidatesTags: ['PaymentRequest'],
    }),

    exportPaymentRequests: builder.mutation<
      Blob,
      { format: 'csv' | 'excel'; filters?: PaginationParams }
    >({
      query: ({ format, filters = {} }) => ({
        url: `payment-requests/export/`,
        method: "POST",
        body: { format, filters },
        responseHandler: (response) => response.blob(),
      }),
    }),

    // ============= ANALYTICS ENDPOINTS =============

    getPaymentAnalytics: builder.query<
      ApiResponse<{
        total_requests: number;
        completed_payments: number;
        pending_payments: number;
        failed_payments: number;
        total_amount: string;
        monthly_stats: Array<{
          month: string;
          count: number;
          amount: string;
        }>;
      }>,
      { start_date?: string; end_date?: string }
    >({
      query: (params = {}) => ({
        url: `analytics/payments/`,
        method: "GET",
        params: params,
      }),
    }),

    // ============= DOCUMENT MANAGEMENT =============

    uploadDocument: builder.mutation<
      ApiResponse<{ file_url: string; file_id: string }>,
      { file: File; document_type: 'student_document' | 'payer_id_document' | 'payment_receipt' }
    >({
      query: ({ file, document_type }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('document_type', document_type);
        
        return {
          url: `documents/upload/`,
          method: "POST",
          body: formData,
          headers: {
            // Don't set Content-Type, let the browser set it with boundary
          },
        };
      },
    }),

    deleteDocument: builder.mutation<
      ApiResponse<void>,
      string
    >({
      query: (documentId) => ({
        url: `documents/${documentId}/`,
        method: "DELETE",
      }),
    }),


  getCurrenciesWithRates: builder.query<
    ApiResponse<any[]>,
    { active_only?: boolean; base_currency?: string }
  >({
    query: (params = { base_currency: 'NGN' }) => ({
      url: `currencies/`,
      method: "GET",
      params: params,
    }),
  }),
  getExchangeRates: builder.query<
    ApiResponse<any[]>,
    { from_currency?: string; to_currency?: string }
  >({
    query: (params = {}) => ({
      url: `exchange-rates/`,
      method: "GET",
      params: params,
    }),
  }),


  refreshExchangeRates: builder.mutation<
    ApiResponse<{ updated_rates: number; last_updated: string }>,
    void
  >({
    query: () => ({
      url: `exchange-rates/refresh/`,
      method: "POST",
    }),
  }),

    // ============= NOTIFICATION ENDPOINTS =============

    getNotifications: builder.query<
      ApiResponse<Array<{
        id: string;
        title: string;
        message: string;
        type: 'success' | 'error' | 'warning' | 'info';
        read: boolean;
        created_at: string;
      }>>,
      { page?: number; unread_only?: boolean }
    >({
      query: (params = {}) => ({
        url: `notifications/`,
        method: "GET",
        params: params,
      }),
    }),

    markNotificationAsRead: builder.mutation<
      ApiResponse<void>,
      string
    >({
      query: (notificationId) => ({
        url: `notifications/${notificationId}/mark-read/`,
        method: "POST",
      }),
    }),

    // ============= WEBHOOK ENDPOINTS =============

    configureWebhook: builder.mutation<
      ApiResponse<{ webhook_url: string; secret: string }>,
      { url: string; events: string[] }
    >({
      query: (webhookData) => ({
        url: `webhooks/configure/`,
        method: "POST",
        body: webhookData,
      }),
    }),

    testWebhook: builder.mutation<
      ApiResponse<{ status: string; response: any }>,
      { webhook_url: string }
    >({
      query: (testData) => ({
        url: `webhooks/test/`,
        method: "POST",
        body: testData,
      }),
    }),
  }),
});

// ============= EXPORT HOOKS =============

export const {
  // Email hooks
  useSendWelcomeEmailMutation,
  useResendEmailMutation,
  useTrackPaymentMutation,

  // Payment request hooks
  useCreatePaymentRequestMutation,
  useGetPaymentRequestsListQuery,
  useGetTestListQuery,
  useGetPaymentRequestByIdQuery,
  useUpdatePaymentRequestMutation,
  useDeletePaymentRequestMutation,

  // Virtual account hooks
  useGetOneTimeVirtualAccountMutation,
  useGetVirtualAccountByIdQuery,
  useGetVirtualAccountsByPaymentRequestQuery,

  // Payment verification hooks
  useVerifyPaymentMutation,
  useGetPaymentVerificationHistoryQuery,

  // Bulk operations hooks
  useCreateBulkPaymentRequestsMutation,
  useExportPaymentRequestsMutation,

  // Analytics hooks
  useGetPaymentAnalyticsQuery,

  // Document management hooks
  useUploadDocumentMutation,
  useDeleteDocumentMutation,

  // Notification hooks
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,

  // Webhook hooks
  useConfigureWebhookMutation,
  useTestWebhookMutation,


  useGetCurrenciesWithRatesQuery,
  useGetExchangeRatesQuery,
  useRefreshExchangeRatesMutation,
} = schoolPaymentSlice;
