import { OrderItems } from "./order-items"

export interface Order {


  Id: number
  CustomerId?: string
  PaymentId?: number,
  ShipmentId?: number,
  TotalPrice: number,
  OrderItems: OrderItems[],
  Status: number

}
