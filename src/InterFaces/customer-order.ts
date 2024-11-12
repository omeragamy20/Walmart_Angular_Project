export interface CustomerOrder 
{
    id: number,
    orderDate: Date,
    totalPrice: number,
    status: number,
    paymentId: number,
    payment_ar: string,
    payment_en: string,
    shipmentId: number,
    shipmentAddress: string,
    orderItems: [],
    orderItemsQuantity: []
}
