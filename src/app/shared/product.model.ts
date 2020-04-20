export class Product {
    public title: String;
    public descp: String;
    public category: String;
    public price: number;
    public imgUrl: String;

    constructor(title: String,descp: String,category: String,price: number,imgUrl: String){
        this.title=title;
        this.category=category;
        this.descp=descp;
        this.price=price;
        this.imgUrl=imgUrl;
    }
}