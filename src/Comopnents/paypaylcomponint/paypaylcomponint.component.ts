import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-paypaylcomponint',
  standalone: true,
  imports: [NgxPayPalModule],
  templateUrl: './paypaylcomponint.component.html',
  styleUrl: './paypaylcomponint.component.css'
})
export class PaypaylcomponintComponent implements OnInit {


  public payPalConfig?: IPayPalConfig;

  ngOnInit(): void {
    this.initConfig()
  }

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',// add paypal client id here
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
      },
        style: {
            label: 'paypal',
          layout: 'vertical',
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            // this.showSuccess = true;
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            // this.showCancel = true;

        },
        onError: err => {
            console.log('OnError', err);
            // this.showError = true;
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            // this.resetStatus();
        }
    };
}
}
