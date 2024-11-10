import { OrderItems } from "./order-items"

export interface Order {


  id: number
  customerId?: string
  paymentId?: number,
  shipmentId?: number,
  totalPrice: number,
  orderItems: OrderItems[],
  status: number

}
