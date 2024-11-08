import { OrderItems } from "./order-items"

export interface Order {


  customerId: string
  paymentId: string,
  shipmentId: string,
  totalPrice: number,
  orderItems: OrderItems[]

}
