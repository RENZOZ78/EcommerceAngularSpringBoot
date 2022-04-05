export class Product {
    id: string;
  sku: string= '';
  name: string='';
  description: string='';
  unitPrice: string='';
  imageUrl: string='';
  active!: boolean;
  unitsInStock!: number;
  dateCreated!: Date;
  lastUpdated!: Date;

}
