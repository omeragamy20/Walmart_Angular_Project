import { AfterContentChecked, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubcategoryService } from '../../Services/SubCategory/subcategory.service';
import { ISubcategoryAr, ISubcategoryEn } from '../../InterFaces/sub-category';
import { LanguageService } from '../../Services/Language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-deatailscatogiry',
  standalone: true,
  imports: [RouterLink, CommonModule , NgFor,TranslateModule],
  templateUrl: './deatailscatogiry.component.html',
  styleUrls: ['./deatailscatogiry.component.css']
})




export class DeatailscatogiryComponent implements OnInit  {
  url = `${environment.url}`;
  SubCatinCatEn!: ISubcategoryEn[];
  SubCatinCatAr!: ISubcategoryAr[];
  @Input() id: number = 0;
  lang:string=''
  constructor(private _ActivatedRoute: ActivatedRoute,private subcatserviceapi:SubcategoryService,
    private _languageSer:LanguageService,private router: Router)
{


}

ngOnInit(): void {
  this._languageSer.getLangugae().subscribe({
    next: (res) => {
      this.lang = res
    }
  })
  this._ActivatedRoute.params.subscribe(params => {
    this.id = +params['id'];
    this.GetallSubcat(this.id);;
    });


  }


  GetallSubcat(catid: number) {

    if(this.lang=='en'){
        this.subcatserviceapi.GetAllSubCAtbyCatid(catid).subscribe({
          next: value => {
            this.SubCatinCatEn = value;
            console.log( this.SubCatinCatEn)
          },
          error: err => {
            console.log(err);

          }
        });
    } else if(this.lang=='ar') {
      this.subcatserviceapi.GetAllSubCAtbyCatid_Ar(catid).subscribe({
        next: value => {
          this.SubCatinCatAr = value;
          console.log(this.SubCatinCatAr)
        },
        error: err => {
          console.log(err);

        }
      });
  }

  }
products(id:number){
  this.router.navigate(['allproduct', id]);
}
 // صور دائرية
  circularImages = [
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-c740/k2-_49c2b8ed-576f-4883-9b85-c731050b3cde.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'ًwomens' },
     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-7b71/k2-_dabe399b-edc2-4213-ab39-0ec6ee662940.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'womens plus' },
     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-8685/k2-_814c74ab-6049-40cb-a598-5652ba07d847.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'mens' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-a4ef/k2-_80bf60b4-7259-4d11-959a-b0791b955b5a.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'young adylt' },
   { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2ecb/k2-_d9bd550b-7a8a-4a4f-96c1-7f691907e7b1.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'girls' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-4d52/k2-_e53ee8d4-7c89-4c43-b74a-f66096bb5d82.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'boyes' },
     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2eef/k2-_ac29d4e9-e041-4998-a313-db0cd15136e0.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'baby % tollder' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-f5e9/k2-_9966f2cf-edfa-48d3-bd78-1cfa14e4baa4.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'shoes' },
     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-8d2e/k2-_c7aa356f-9d44-4d52-8311-b915b8668d4c.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'gewellary' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2306/k2-_8ddb1fe4-8867-42d0-8807-8f5074bc2d70.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'bages' },
     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-1022/k2-_0cf651ea-0ed1-4fbe-a6fe-f0740f197878.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'saving' },
     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-f449/k2-_110ed0b3-187a-43ee-8081-faeb93ce36ca.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'editors picks' },
  ];

  // صور مربعة
  squareImages = [
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-8ba6/k2-_cb7c0cb1-a48e-4d2f-9cff-bdf82b9234d0.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'teara sky' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-cc0a/k2-_8a4d2bc2-b338-4bb6-a9eb-85846b3a6901.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'no bounders' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-c970/k2-_d2ed1584-b049-4fad-b27b-67d25c97d935.v1.png?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'sofia geans' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-391e/k2-_4d7f1c2f-7e92-44a3-98dc-d5e1968a6c88.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'time true' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-17f9/k2-_12de3895-76bc-4f42-b809-05c29cb008eb.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Scoop' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-7da0/k2-_e8dc6555-e6ff-4061-934e-59277364fce9.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'joyspun' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-c246/k2-_83cdfaf7-6d91-4bad-88d8-ddfe07136fa8.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'jessa simpson' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-f973/k2-_224a77bf-f76b-4159-a02d-8ea0aa864a19.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'meddan sys' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-6f8a/k2-_899728ea-2729-4ef3-b336-ca8bd82d2713.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'celepirty pink' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-5d5a/k2-_ca23e2f7-3019-49d1-95fe-3add02d2f4b2.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'love sportis' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-4e11/k2-_bee3b0b5-b343-4302-a57d-0440ee8dfddd.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'reebok mady' },
    { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-28b0/k2-_fbb7b44d-8f89-4799-ad33-27e2aec62e18.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: 'Square fashion' },

  ];
}
























// export class DeatailscatogiryComponent{
//   images = [
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-c740/k2-_49c2b8ed-576f-4883-9b85-c731050b3cde.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-7b71/k2-_dabe399b-edc2-4213-ab39-0ec6ee662940.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-8685/k2-_814c74ab-6049-40cb-a598-5652ba07d847.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-a4ef/k2-_80bf60b4-7259-4d11-959a-b0791b955b5a.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2ecb/k2-_d9bd550b-7a8a-4a4f-96c1-7f691907e7b1.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-4d52/k2-_e53ee8d4-7c89-4c43-b74a-f66096bb5d82.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2eef/k2-_ac29d4e9-e041-4998-a313-db0cd15136e0.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-f5e9/k2-_9966f2cf-edfa-48d3-bd78-1cfa14e4baa4.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-8d2e/k2-_c7aa356f-9d44-4d52-8311-b915b8668d4c.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-2306/k2-_8ddb1fe4-8867-42d0-8807-8f5074bc2d70.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-1022/k2-_0cf651ea-0ed1-4fbe-a6fe-f0740f197878.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//     { url: 'https://i5.walmartimages.com/dfw/4ff9c6c9-f449/k2-_110ed0b3-187a-43ee-8081-faeb93ce36ca.v1.jpg?odnHeight=290&odnWidth=290&odnBg=FFFFFF', name: '' },
//   ];



// }










// import { Component } from '@angular/core';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-home-section-one',
//   standalone: true,
//   imports: [RouterLink],
//   templateUrl: './home-section-one.component.html',
//   styleUrl: './home-section-one.component.css'
// })
// export class HomeSectionOneComponent {

// }
// export class CategoryComponent {

// }
