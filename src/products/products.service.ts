import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model"
import { stringify } from "querystring";

@Injectable()
export class ProductService {
    private product: Product[] = [];
    insertProduct(title: string, desc: string, price: number) {
        const proId = Math.random().toString();
        const newProduct = new Product(proId, title, desc, price);
        this.product.push(newProduct);
        return proId;
    }
    private findProduct(id: string) : [Product, number]{
        const productIndex = this.product.findIndex((prod) => prod.id === id);
        const product = this.product[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
    getProduct() {
        return [...this.product];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }
    updateProduct(productId: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updateProduct = {...product};
        if(title){
            updateProduct.title = title;
        }
        if(desc){
            updateProduct.description = desc;
        }
        if(price){
            updateProduct.price = price
        }
        this.product[index] = updateProduct;
    }

    deleteProduct(productId: string){
        const index = this.findProduct(productId)[1];
        this.product.splice(index, 1);
    }
}