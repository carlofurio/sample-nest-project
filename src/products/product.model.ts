import * as mongoose from 'mongoose'

export const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: String, required: true },
})

export interface Product {
    name: string;
    description: string;
    price: number;
    user: string;
}