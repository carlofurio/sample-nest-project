import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose'
import { Model } from "mongoose";

import { Product } from "./product.model";

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private productModel: Model<Product>) {

    }

    async addProduct(name: string, description: string, price: number, user: string): Promise<string> {
        const newProduct = new this.productModel({ name, description, price, user })
        const result = await newProduct.save();
        return result.id;
    }

    async getProducts() {
        const products = await this.productModel.find()
        return products.map((product) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            price: product.price,
            user: product.user
        }));
    }

    async getProduct(productId: string) {
        const product = await this.findProduct(productId)
        return { ...product };
    }

    async updateProduct(
        productId: string,
        name?: string,
        description?: string,
        price?: number,
        user?: string,
    ) {
        const product = await this.findProduct(productId);
        const updatedProduct = {
            name: name ? name : product.name,
            description: description ? description : product.description,
            price: price ? price : product.price,
            user: user ? user : product.user
        }
        await this.productModel.updateOne({ _id: productId }, { merge: updatedProduct })
    }

    removeProduct(productId?: string) {
        productId && this.productModel.deleteOne({ _id: productId }).exec()
    }

    private async findProduct(id: string) {
        const product = await this.productModel.findOne({ _id: id }).lean().exec();
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return { ...product };
    }

}