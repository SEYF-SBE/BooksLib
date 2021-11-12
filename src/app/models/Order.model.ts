import { Injectable } from "@angular/core";
import { CartService } from "../services/cart.service";

@Injectable()
export class Order {
    id?: string | null;
    name?: string | null;
    address?: string | null;
    city?: string | null;
    zip?: string;
    shipped: boolean = false;

    constructor(public cart: CartService) { }
    clear() {
        this.id = null;
        this.name = this.address = this.city = null;
        this.shipped = false;
        this.cart.clear();
    }
}