import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { UserInterface } from './user-interface';
import { ProductInterface } from './product-interface';
import { CustomersInterface } from './customer-interface';
import { NewsInterface } from './news-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // lay 1 san pham
  async getProductDetail(url: string): Promise<ProductInterface> {
    const data = await fetch(url);
    return await data.json() ?? {};
  }

  // lay nhieu danh gia
  async getListCustomerCommet(url: string): Promise<CustomersInterface[]> {
    // thực hiện fetch dữ liệu
    const data = await fetch(url);
    // trả về dữ liệu dạng json nếu có, ngược lại thì trả về mảng rỗng
    return await data.json() ?? [];
  }

  // lay nhieu tin tuc
  async getListNews(url: string): Promise<NewsInterface[]> {
    // thực hiện fetch dữ liệu
    const data = await fetch(url);
    // trả về dữ liệu dạng json nếu có, ngược lại thì trả về mảng rỗng
    return await data.json() ?? [];
  }

  // lay 1 tin tuc
  async getNewsDetail(url: string): Promise<NewsInterface> {
    const data = await fetch(url);
    return await data.json() ?? {};
  }

  // lay nhieu san pham
  // tạo phương thức lấy dữ liệu từ json server về
  async getListProducts(url: string): Promise<ProductInterface[]> {
    // thực hiện fetch dữ liệu
    const data = await fetch(url);
    // trả về dữ liệu dạng json nếu có, ngược lại thì trả về mảng rỗng
    return await data.json() ?? [];
  }

  // lấy hết đánh giá
  async getListCustomer(url: string): Promise<CustomersInterface[]> {
    // thực hiện fetch dữ liệu
    const data = await fetch(url);
    // trả về dữ liệu dạng json nếu có, ngược lại thì trả về mảng rỗng
    return await data.json() ?? [];
  }

  private cart: any = [];
  // private user: any = [];
  private key: any = [];
  constructor() { }
  addCart(product: ProductInterface, quantity: number) {
    const index = this.cart.findIndex((item: ProductInterface) => item.id === product.id);
    if (index === -1) {
      this.cart.push({ ...product, quantity });
    } else {
      this.cart[index].quantity += quantity;
    }
  }
  getCart() {
    return this.cart;
  }

  // getUser(data: any) {
  //    this.user.push({...data});
  // }

  // getOneUSer() {
  //   return this.user;
  // }

  getPurchasedProducts(): ProductInterface[] {
    return this.cart.map((pr: ProductInterface) => ({
      name: pr.name,
      price: pr.price,
    }))
  }

  delete() {
    this.cart = [];
  }

  getCartLength() {
    let length = 0;
    // console.log(this.cart);
    for (let p of this.cart) {
      length += p.quantity;
    }
    return length;
  }
  deleteCart(id: string) {
    this.cart = this.cart.filter((item: ProductInterface) => item.id !== id)
  }
  deleteAllCart(id: string) {
    this.cart = this.cart.filter((item: ProductInterface) => item.id === id)
  }
  getSumMoney(): number {
    let total = 0;
    for (let p of this.cart) {
      total += p.sale * p.quantity;
    }
    return total;
  }
  
  //Tìm kiếm 
  private keyword: string = '';
  setKeyword(keyword: string) {
    this.keyword = keyword;
  }
  
  getKeyword() {
    return this.keyword;
  }

  filterProductsByType(products: ProductInterface[], type: string): ProductInterface[] {
    if (!type) {
      return products; // Trả về tất cả sản phẩm nếu không có loại được chọn
    } else {
      return products.filter(product => product.type === type);
    }
  }

}
