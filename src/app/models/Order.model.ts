import { Injectable } from "@angular/core";
import { CartService } from "../services/cart.service";

@Injectable()
export class Order {
    name?: string | null;
    address?: string | null;
    city?: string | null;
    zip?: string | null;
    telephone?:number | null;
    // payement card data
    cardNumber?: string | null;
    nameCard?: string | null;
    expireDate?: string | null;

    constructor(public cart: CartService) { }
    clear() {
        this.name = this.address = this.city = this.zip = null;
        this.cardNumber = this.nameCard = this.expireDate = null;
        this.telephone = null;
        this.cart.clear();
    }
}