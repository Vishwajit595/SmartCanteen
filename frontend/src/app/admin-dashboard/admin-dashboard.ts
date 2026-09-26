import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  imports: [FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  // ===============================
  // STAFF DATA
  // ===============================

  name = '';
  email = '';
  password = '';

  staffList: any[] = [];

  private authApiUrl =
    'https://smartcanteen-c012.onrender.com/api/auth';

  // ===============================
  // MENU DATA
  // ===============================

  menuItems: any[] = [];

  menuName = '';
  menuDescription = '';
  menuPrice: number | null = null;
  menuCategory = '';
  menuImage = '';
  menuAvailable = true;

  editingMenuId: string | null = null;

  private menuApiUrl =
    'https://smartcanteen-c012.onrender.com/api/menu';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadStaff();
    this.loadMenuItems();
  }

  // ===============================
  // CREATE STAFF
  // ===============================

  createStaff() {

    const token =
      localStorage.getItem('token');

    const staffData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post(
      `${this.authApiUrl}/create-staff`,
      staffData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (response: any) => {

        alert(
          'Staff account created successfully!'
        );

        this.name = '';
        this.email = '';
        this.password = '';

        this.loadStaff();
      },

      error: (error) => {

        console.error(
          'Staff creation failed:',
          error
        );

        alert(
          error.error?.message ||
          'Staff creation failed'
        );
      }

    });
  }

  // ===============================
  // LOAD ALL STAFF
  // ===============================

  loadStaff() {

    const token =
      localStorage.getItem('token');

    this.http.get(
      `${this.authApiUrl}/staff`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

      next: (response: any) => {

        this.staffList =
          response.staff;
      },

      error: (error) => {

        console.error(
          'Failed to load staff:',
          error
        );
      }

    });
  }

  // ===============================
  // LOAD MENU ITEMS
  // ===============================

  loadMenuItems() {

    this.http.get<any[]>(
      this.menuApiUrl
    ).subscribe({

      next: (data) => {

        this.menuItems = data;
      },

      error: (error) => {

        console.error(
          'Failed to load menu:',
          error
        );
      }

    });
  }

  // ===============================
  // ADD MENU ITEM
  // ===============================

  addMenuItem() {

    const token =
      localStorage.getItem('token');

    const menuData = {

      name: this.menuName,

      description:
        this.menuDescription,

      price:
        this.menuPrice,

      category:
        this.menuCategory,

      image:
        this.menuImage,

      available:
        this.menuAvailable
    };

    this.http.post(
      this.menuApiUrl,
      menuData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    ).subscribe({

      next: () => {

        alert(
          'Menu item added successfully!'
        );

        this.clearMenuForm();
        this.loadMenuItems();
      },

      error: (error) => {

        console.error(
          'Failed to add menu item:',
          error
        );

        alert(
          error.error?.message ||
          'Failed to add menu item'
        );
      }

    });
  }

  // ===============================
  // START EDIT
  // ===============================

  editMenuItem(item: any) {

    this.editingMenuId =
      item._id;

    this.menuName =
      item.name;

    this.menuDescription =
      item.description;

    this.menuPrice =
      item.price;

    this.menuCategory =
      item.category;

    this.menuImage =
      item.image;

    this.menuAvailable =
      item.available;
  }

  // ===============================
  // UPDATE MENU ITEM
  // ===============================

  updateMenuItem() {

    if (!this.editingMenuId) {
      return;
    }

    const token =
      localStorage.getItem('token');

    const menuData = {

      name: this.menuName,

      description:
        this.menuDescription,

      price:
        this.menuPrice,

      category:
        this.menuCategory,

      image:
        this.menuImage,

      available:
        this.menuAvailable
    };

    this.http.put(
      `${this.menuApiUrl}/${this.editingMenuId}`,
      menuData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    ).subscribe({

      next: () => {

        alert(
          'Menu item updated successfully!'
        );

        this.clearMenuForm();
        this.loadMenuItems();
      },

      error: (error) => {

        console.error(
          'Failed to update menu item:',
          error
        );

        alert(
          error.error?.message ||
          'Failed to update menu item'
        );
      }

    });
  }

  // ===============================
  // DELETE MENU ITEM
  // ===============================

  deleteMenuItem(id: string) {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this menu item?'
      );

    if (!confirmDelete) {
      return;
    }

    const token =
      localStorage.getItem('token');

    this.http.delete(
      `${this.menuApiUrl}/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    ).subscribe({

      next: () => {

        alert(
          'Menu item deleted successfully!'
        );

        this.loadMenuItems();
      },

      error: (error) => {

        console.error(
          'Failed to delete menu item:',
          error
        );

        alert(
          error.error?.message ||
          'Failed to delete menu item'
        );
      }

    });
  }

  // ===============================
  // TOGGLE AVAILABILITY
  // ===============================

  toggleAvailability(item: any) {

    const token =
      localStorage.getItem('token');

    const updatedData = {

      name: item.name,

      description:
        item.description,

      price:
        item.price,

      category:
        item.category,

      image:
        item.image,

      available:
        !item.available
    };

    this.http.put(
      `${this.menuApiUrl}/${item._id}`,
      updatedData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    ).subscribe({

      next: () => {

        this.loadMenuItems();
      },

      error: (error) => {

        console.error(
          'Failed to update availability:',
          error
        );
      }

    });
  }

  // ===============================
  // CLEAR MENU FORM
  // ===============================

  clearMenuForm() {

    this.editingMenuId = null;

    this.menuName = '';

    this.menuDescription = '';

    this.menuPrice = null;

    this.menuCategory = '';

    this.menuImage = '';

    this.menuAvailable = true;
  }

}