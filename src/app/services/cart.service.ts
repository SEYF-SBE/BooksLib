import { Injectable } from "@angular/core";
import { Book } from "../models/book.model";

@Injectable()
export class CartService {

	public lines: CartLine[] = [];
	public itemCount: number = 0;
	public cartPrice: number = 0;

	addLine(book: Book, quantity: number = 1) {

		let line = this.lines.find(line => line.book.key == book.key);

		if (line != undefined) {
			line.quantity += quantity;
		} else {
			this.lines.push(new CartLine(book, quantity));
		}
		this.recalculate();
	}

	updateQuantity(book: Book, event: Event) {

		const target = event.target as HTMLButtonElement;

		const quantity = target.value;

		let line = this.lines.find(line => line.book.key == book.key);

		if (line != undefined) {
			line.quantity = Number(quantity);
		}
		this.recalculate();
	}

	removeLine(key: string) {

		let index = this.lines.findIndex(line => line.book.key == key);
		this.lines.splice(index, 1);
		this.recalculate();
	}

	clear() {
		this.lines = [];
		this.itemCount = 0;
		this.cartPrice = 0;
	}

	private recalculate() {

		this.itemCount = 0;
		this.cartPrice = 0;
		this.lines.forEach(l => {
			this.itemCount += l.quantity;
			this.cartPrice += (l.quantity * l.book.price!);
		})
	}
}

export class CartLine {

	constructor(public book: Book, public quantity: number) { }

	get lineTotal() {
		return this.quantity * this.book.price!;
	}
}