import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem, NgxPayPalModule } from 'ngx-paypal';
import { IproductEn } from '../../InterFaces/product';

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

  totalprice!: string;
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

    this.totalprice = total.toString();


  }

  private initConfig(): void {
    this.getprice();
    console.log(this.totalprice);

    const curnc = 'EUR';
    this.payPalConfig = {
        currency: curnc,
        clientId: 'ATSGazDqxdtxPV7W1ypo089220_aejTObv7rTIqcWq5Am2RvmJfuALf_WhN8aKewRkpTcIppyXoZjDJY',// add paypal client id here
        createOrderOnClient: (data) => <ICreateOrderRequest> {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: curnc,
                    value: this.totalprice,
                    breakdown: {
                        item_total: {
                            currency_code: curnc,
                            value: this.totalprice
                        }
                    }
                },
              items: this.totalproduct.map( (p:IproductEn[]| any) => <ITransactionItem>
                {
                  name: p.title_en,
                  quantity:p.quantity.toString(),
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: curnc,
                      value: p.price.toString(),
                  },
              }
              )

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
