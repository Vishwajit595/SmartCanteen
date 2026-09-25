import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CartService } from './cart-service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-cart',
  imports: [FormsModule, Navbar],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {

  cartItems: any[] = [];

  pickupTime = '';

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.cartItems = this.cartService.getCartItems();

    console.log('CART DATA:', this.cartItems);

    this.cdr.detectChanges();
  }

  increaseQuantity(id: string) {
    this.cartService.increaseQuantity(id);
    this.cartItems = this.cartService.getCartItems();
  }

  decreaseQuantity(id: string) {
    this.cartService.decreaseQuantity(id);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  placeOrder() {

    if (!this.pickupTime) {
      alert('Please select pickup time');
      return;
    }

    const user = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    const orderData = {
      user: user.id,
      items: this.cartItems.map(item => ({
        menuItem: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: this.getTotal(),
      pickupTime: this.pickupTime
    };

    console.log('ORDER DATA:', orderData);

    this.http.post(
      'http://localhost:5000/api/orders',
      orderData
    ).subscribe({

      next: (response) => {

        console.log('ORDER SUCCESS:', response);

        alert('Order placed successfully!');

        localStorage.removeItem('cart');

        this.cartItems = [];

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ORDER ERROR:', error);

        alert(
          error.error?.message || 'Failed to place order'
        );
      }

    });
  }
}