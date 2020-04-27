export class Product {
  id: number;
  title: String;
  descp: String;
  category: String;
  price: number;
  imgUrl: String;
  pId?: any;
  quantity: number;

  constructor(
    id: number,
    title: String,
    descp: String,
    category: String,
    price: number,
    imgUrl: String,
    quantity: number
  ) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.descp = descp;
    this.price = price;
    this.imgUrl = imgUrl;
    this.quantity = quantity;
  }
}
