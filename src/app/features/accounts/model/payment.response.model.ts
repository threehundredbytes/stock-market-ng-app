import { PaymentStatus } from './payment-status.model';

export interface PaymentResponse {
  accountId: number,
  amount: number,
  paymentStatus: PaymentStatus
}
