class CartItem {
  quantity: number;
  productPrice: number;
  productTitle: string;
  pushToken: string;
  sum: number;

  constructor(
    quantity: number,
    productPrice: number,
    productTitle: string,
    pushToken: string,
    sum: number
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.pushToken = pushToken;
    this.sum = sum;
  }
}

export default CartItem;
