import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from './product.model'

// localhost:3000/
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }
    @Post()
    async addProduct(@Body() body: Product): Promise<{ id: string }> {
        const generatedId = await this.productService.addProduct(
            body.name,
            body.description,
            body.price,
            body.user
        );
        return { id: generatedId }
    }

    @Get()
    getAllProducts(@Query() { name }) {
        return this.productService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        return this.productService.getProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body() body: Product
    ) {
        this.productService.updateProduct(prodId, body.name, body.description, body.price, body.user);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productService.removeProduct(prodId);
        return null
    }
}