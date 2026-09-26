import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from './menu-service';
import { CartService } from '../cart/cart-service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-menu',
  imports: [Navbar],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {

  menuItems: any[] = [];

  constructor(
    private menuService: MenuService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('MENU COMPONENT LOADED');

    this.menuService.getMenuItems().subscribe({

      next: (items) => {

        console.log('API DATA RECEIVED:', items);

        this.menuItems = items;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('API ERROR:', error);

      }

    });
  }

  addToCart(item: any) {

    if (!item.available) {

      alert(
        item.name + ' is currently unavailable.'
      );

      return;
    }

    this.cartService.addToCart(item);

    alert(
      item.name + ' added to cart!'
    );
  }
}