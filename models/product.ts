class Product {
  id: string;
  ownerId: string;
  pushToken: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(
    id: string,
    ownerId: string,
    ownerPushToken: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;
