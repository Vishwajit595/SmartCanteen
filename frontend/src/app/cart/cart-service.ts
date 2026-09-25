import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(item: any) {

    const existingItem = this.cartItems.find(
      cartItem => cartItem._id === item._id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        ...item,
        quantity: 1
      });
    }

    this.saveCart();
  }

  getCartItems() {
    return this.cartItems;
  }

  increaseQuantity(id: string) {

    const item = this.cartItems.find(
      item => item._id === id
    );

    if (item) {
      item.quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(id: string) {

    const item = this.cartItems.find(
      item => item._id === id
    );

    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  getTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}