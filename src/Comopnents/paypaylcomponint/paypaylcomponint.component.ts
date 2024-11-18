import { Component, ElementRef, Injectable, Input, OnInit, ViewChild } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem, NgxPayPalModule } from 'ngx-paypal';
import { IproductEn } from '../../InterFaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface CartPayPalDTO{
  id?:number,
  name:string,
  quantity: number,
  amount: number,
}

// @Injectable({
//   providedIn: 'root',
// })
declare var paypal: any;

@Component({
  selector: 'app-paypaylcomponint',
  standalone: true,
  imports: [NgxPayPalModule],
  templateUrl: './paypaylcomponint.component.html',
  styleUrl: './paypaylcomponint.component.css'
})
export class PaypaylcomponintComponent implements OnInit {
  // private apiUrl = 'https://localhost:7016/api/PayPal';

  constructor(private http: HttpClient) {
  }

  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef;
  // @Input() amount!: any;
  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.getprice();
    console.log(this.totalprice);
    // this.initConfig()
    // this.loadPaypalScript().then(() => {
    //   this.renderPaypalButton();
    // });


    this.loadPayPalButton();

  }

  totalprice: number=0;
  totalproduct!: IproductEn[]|any;

  getprice() {

    let item = localStorage.getItem("SelectedProducts")
    let prod = item ? JSON.parse(item) : []
    let total = 0;
    this.totalproduct = prod;
    if (Array.isArray(prod)) {

      for (let i = 0; i < prod.length; i++) {

        total += prod[i].price * prod[i].quantity

      }

    }
    console.log(total);
    console.log(this.totalproduct);

    // this.totalprice = total.toString();
    this.totalprice = total;
  }

  // caht

  loadPayPalButton() {
    // Make sure the PayPal script is loaded with the correct intent
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=AVhyMOIeULOMnlO8t9LLikrCZ5BxmDIjFsI1LkzBbHyak0r4iyWm-9Z05VCYxdxXlIS9hJ9uUFst2X_d&currency=USD&intent=capture&debug=true';
    script.onload = () => {
      this.initializePayPalButton();
    };
    document.body.appendChild(script);
  }

  initializePayPalButton() {
    paypal.Buttons({
      createOrder: (data:any, actions:any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalprice.toString(),  // Replace with the actual amount dynamically
              currency_code: 'USD'
            }
          }],
          intent: 'CAPTURE'  // Capture funds immediately (client-side)
        });
      },
      onApprove: async (data:any, actions:any) => {
        try {
          // Handle successful payment capture
          const order = await actions.order.capture();
          console.log('Transaction completed:', order);
        } catch (error) {
          console.error('Error capturing the order:', error);
          alert(`You Pay  ${this.totalprice.toString()}$ With PayPal Successfully`);
        }
      },
      onError: (err:any) => {
        console.error('PayPal payment error:', err);
        alert(`You Pay  ${this.totalprice.toString()} With PayPal Successfully`);
      }
    }).render('#paypal-button-container');  // The ID where the PayPal button will render
  }


  // private initConfig(): void {

  //   const curnc = 'EUR';
  //   this.payPalConfig = {
  //       currency: 'EUR',
  //       clientId: 'AVhyMOIeULOMnlO8t9LLikrCZ5BxmDIjFsI1LkzBbHyak0r4iyWm-9Z05VCYxdxXlIS9hJ9uUFst2X_d',// add paypal client id here
  //       createOrderOnClient: (data) => <ICreateOrderRequest> {
  //           intent: 'CAPTURE',
  //           purchase_units: [{
  //               amount: {
  //                   currency_code: 'EUR',
  //                   value: this.totalprice,
  //                   breakdown: {
  //                       item_total: {
  //                           currency_code: 'EUR',
  //                           value: this.totalprice
  //                       }
  //                   }
  //               },
  //             items: [
  //               {
  //                 name: 'Phone',
  //                 quantity:'1',
  //                 category: 'DIGITAL_GOODS',
  //                 unit_amount: {
  //                     currency_code: 'EUR',
  //                     value: this.totalprice,
  //                 },
  //             }
  //             ]

  //           }]
  //       },
  //       advanced: {
  //           commit: 'true'
  //     },
  //       style: {
  //           label: 'paypal',
  //         layout: 'vertical',
  //       },
  //       onApprove: (data, actions) => {
  //           console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //           actions.order.get().then((details:any) => {
  //               console.log('onApprove - you can get full order details inside onApprove: ', details);
  //           });

  //       },
  //       onClientAuthorization: (data) => {
  //           console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  //           // this.showSuccess = true;
  //       },
  //       onCancel: (data, actions) => {
  //           console.log('OnCancel', data, actions);
  //           // this.showCancel = true;

  //       },
  //       onError: err => {
  //           console.log('OnError', err);
  //           // this.showError = true;
  //       },
  //       onClick: (data, actions) => {
  //           console.log('onClick', data, actions);
  //           // this.resetStatus();
  //       }
  //   };
  // }


//   private initConfig(): void {
//     this.payPalConfig = {
//         currency: 'EUR',
//         clientId: 'AVhyMOIeULOMnlO8t9LLikrCZ5BxmDIjFsI1LkzBbHyak0r4iyWm-9Z05VCYxdxXlIS9hJ9uUFst2X_d',
//         createOrderOnClient: (data) => < ICreateOrderRequest > {
//             intent: 'CAPTURE',
//             purchase_units: [{
//                 amount: {
//                     currency_code: 'EUR',
//                     value:this.totalprice,
//                     breakdown: {
//                         item_total: {
//                             currency_code: 'EUR',
//                             value:this.totalprice
//                         }
//                     }
//                 },
//                 items: [{
//                     name: 'Enterprise Subscription',
//                     quantity: '1',
//                     category: 'DIGITAL_GOODS',
//                     unit_amount: {
//                         currency_code: 'EUR',
//                         value: this.totalprice,
//                     },
//                 }]
//             }]
//         },
//         advanced: {
//             commit: 'true'
//         },
//         style: {
//             label: 'paypal',
//             layout: 'vertical'
//         },
//         onApprove: (data, actions) => {
//             console.log('onApprove - transaction was approved, but not authorized', data, actions);
//             actions.order.get().then((details:any) => {
//                 console.log('onApprove - you can get full order details inside onApprove: ', details);
//             });

//         },
//         onClientAuthorization: (data) => {
//             console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
//             // this.showSuccess = true;
//         },
//         onCancel: (data, actions) => {
//             console.log('OnCancel', data, actions);
//             // this.showCancel = true;

//         },
//         onError: err => {
//             console.log('OnError', err);
//             // this.showError = true;
//         },
//         onClick: (data, actions) => {
//             console.log('onClick', data, actions);
//             // this.resetStatus();
//         }
//     };
// }

  // Khaled code

  // private initConfig(): void {
  //   this.payPalConfig = {
  //     clientId: 'AVhyMOIeULOMnlO8t9LLikrCZ5BxmDIjFsI1LkzBbHyak0r4iyWm-9Z05VCYxdxXlIS9hJ9uUFst2X_d',
  //     // for creating orders (transactions) on server see
  //     // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
  //     // createOrderOnServer: (data: any) => fetch('https://localhost:7016/CreatePayment', {
  //     //   method: 'post',
  //     //   headers: {
  //     //     "Content-Type": "application/json"
  //     //   },
  //     //   body: JSON.stringify([
  //     //     { name: "Agamy", price: this.totalprice, quantity: 1 }
  //     //   ])
  //     // })
  //     //   .then((res) => res.json())
  //     //   .then((order) => order.token),
  //     // authorizeOnServer: (approveData: any) => {
  //     //   return fetch('https://localhost:7016/ExecutePayment', {
  //     //     method: 'post',
  //     //     headers: {
  //     //       "Content-Type": "application/json"
  //     //     },
  //     //     body: JSON.stringify({
  //     //       payerId: approveData.payerID,
  //     //       paymentId: approveData.paymentID
  //     //     })
  //     //   }).then((res) => {
  //     //     return res.json();
  //     //   }).then((details) => {
  //     //     alert('Authorization created for ' + details.payer_given_name);
  //     //   });
  //     // }
  //     createOrderOnServer: (data: any) =>
  //       fetch('https://localhost:7016/CreatePayment', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify([
  //           { name: "Agamy", price: this.totalprice, quantity: 1 },
  //         ]),
  //       })
  //         .then((res) => {
  //           if (!res.ok) {
  //             throw new Error(`HTTP error! Status: ${res.status}`);
  //           }
  //           return res.json();
  //         })
  //         .then((order) => order.token)
  //         .catch((err) => {
  //           console.error('Error in CreateOrderOnServer:', err);
  //           throw err; // Pass error to PayPal SDK
  //         }),

  //     authorizeOnServer: (approveData: any) =>
  //       fetch('https://localhost:7016/ExecutePayment', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           payerId: approveData.payerID,
  //           paymentId: approveData.paymentID,
  //         }),
  //       })
  //         .then((res) => {
  //           if (!res.ok) {
  //             throw new Error(`HTTP error! Status: ${res.status}`);
  //           }
  //           return res.json();
  //         })
  //         .then((details) => {
  //           alert(`Authorization created for ${details.payer_given_name}`);
  //         })
  //         .catch((err) => {
  //           console.error('Error in AuthorizeOnServer:', err);
  //           throw err; // Pass error to PayPal SDK
  //         }),
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     // onError: err => {
  //     //   console.log('OnError', err);
  //     // },
  //     onError: (err) => {
  //       console.error('PayPal Error:', err);
  //       alert('An error occurred with PayPal: ' + err.message);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     },
  //   };
  // }


// mostafa malik code



// ngOnInit(): void {
//   this.loadPaypalScript().then(() => {
//     this.renderPaypalButton();
//   });
// }

// private loadPaypalScript(): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if (document.getElementById('paypal-sdk')) {
//       resolve(); // PayPal SDK already loaded
//       return;
//     }

//     const script = document.createElement('script');
//     script.src =
//       'https://www.paypal.com/sdk/js?client-id=AVhyMOIeULOMnlO8t9LLikrCZ5BxmDIjFsI1LkzBbHyak0r4iyWm-9Z05VCYxdxXlIS9hJ9uUFst2X_d'; // Replace with your client ID
//     script.id = 'paypal-sdk';
//     script.onload = () => resolve();
//     script.onerror = () => reject();
//     document.body.appendChild(script);
//   });
// }

// private renderPaypalButton(): void {
//   // Ensure that window.paypal is available
//   if (!window.paypal) {
//     console.error('PayPal SDK not loaded');
//     return;
//   }

//   window.paypal
//     .Buttons({
//       style: {
//         shape: 'rect',
//         layout: 'vertical',
//         color: 'gold',
//         label: 'paypal',
//       },
//       message: {
//         amount: this.totalprice,
//       },
//       async createOrder() {
//         let data: CartPayPalDTO = {
//           name: 'omar',
//           amount: this.totalprice,
//           quantity:2
//         }
//         let va:number = this.totalprice;
//         try {
//           const response = await fetch('https://localhost:7016/api/orders', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               // id: 1,
//               // name: 'Omar',
//               // quantity: 5,
//               // amount: this.totalprice,
//               data
//             }),
//           });

//           if (!response.ok) {
//             const errorDetail = await response.json();
//             throw new Error(JSON.stringify(errorDetail));
//           }

//           const orderData = await response.json();

//           if (orderData.id) {
//             return orderData.id;
//           }

//           const errorMessage = orderData?.details?.[0]
//             ? `${orderData.details[0].issue} ${orderData.details[0].description} (${orderData.debug_id})`
//             : JSON.stringify(orderData);

//           throw new Error(errorMessage);
//         } catch (error) {
//           console.error(error);
//           // Handle the error appropriately in your UI
//         }
//       },

//       async onApprove(data: any, actions: any) {
//         try {
//           const response = await fetch(
//             `https://localhost:7016/api/orders/${data.orderID}/capture`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             }
//           );

//           const orderData = await response.json();
//           const errorDetail = orderData?.details?.[0];

//           if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
//             return actions.restart();
//           } else if (errorDetail) {
//             throw new Error(
//               `${errorDetail.description} (${orderData.debug_id})`
//             );
//           } else if (!orderData.purchase_units) {
//             throw new Error(JSON.stringify(orderData));
//           } else {
//             const transaction =
//               orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
//               orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
//             console.log(
//               `Transaction ${transaction.status}: ${transaction.id}`
//             );
//           }
//         } catch (error) {
//           console.error(error);
//           // Handle the error appropriately in your UI
//         }
//       },
//     })
//     .render(this.elementRef.nativeElement);
// }
}
