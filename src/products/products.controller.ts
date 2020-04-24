import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @Post()
    addProdcut(
        @Body('title') proTitle: string,
        @Body('description') proDesc: string,
        @Body('price') proPrice: number,
    ) {
        const genaratedId = this.productService.insertProduct(
            proTitle,
            proDesc,
            proPrice
        );
        return { id: genaratedId };
    }
    @Get()
    getAllProducts() {
        return this.productService.getProduct();
    }
    @Get(':id')
    getProduct(@Param('id') proId: string ){
        return this.productService.getSingleProduct(proId);
    }
    @Patch(':id')
    updateProduct(
        @Param('id') proId: string,
        @Body('title') proTitle: string,
        @Body('description') proDesc: string,
        @Body('price') proPrice: number,
    ){
        this.productService.updateProduct(proId, proTitle, proDesc, proPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') proId: string){
        this.productService.deleteProduct(proId);
        return null;
    }
}
