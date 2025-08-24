// import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
// import { paymentService } from '../services/paymentService';
// import { PaymentRequest, CreatePaymentRequestData, VirtualAccount } from '../types/api';

// export function useCreatePaymentRequest(
//   options?: UseMutationOptions<PaymentRequest, Error, CreatePaymentRequestData>
// ) {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: paymentService.createPaymentRequest,
//     onSuccess: (data) => {
//       // Invalidate and refetch payment requests
//       queryClient.invalidateQueries({ queryKey: ['paymentRequests'] });
//       options?.onSuccess?.(data, {} as CreatePaymentRequestData, undefined);
//     },
//     ...options,
//   });
// }

// export function useVirtualAccount(
//   paymentRequestId: string | undefined,
//   amount: number | undefined,
//   options?: UseQueryOptions<VirtualAccount, Error>
// ) {
//   return useQuery({
//     queryKey: ['virtualAccount', paymentRequestId, amount],
//     queryFn: () => paymentService.getVirtualAccount(paymentRequestId!, amount!),
//     enabled: !!paymentRequestId && !!amount,
//     ...options,
//   });
// }
