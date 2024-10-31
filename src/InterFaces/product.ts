export interface IProduct {
    id:number;
    title_en:string;
    title_ar:string;
    description_en:string;
    description_ar:string;
    price:number;
    stock:number;
    imageUrls:string[];
    subCategoryIds: number[];
    subCategoryNames:string[];
    facilities: string[]
    facilities_Ar: string[];
    values:string[];
    values_Ar:string[];
    subCategoryNamesAr:string[];
}

