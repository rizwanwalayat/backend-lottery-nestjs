import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException } from "@nestjs/common";
import { productsService } from "./products.service";
import { Product as ProductEntity  } from "./product.entity";
import { v4 as uuid } from 'uuid';


@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: productsService) {}
    
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductEntity> {
        // find the post with this id
        const product = await this.productsService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!product) {
            throw new NotFoundException('This Product doesn\'t exist');
        }

        // if post exist, return the post
        return product;
    }
    
    @Post()
   async addProduct(@Body('title') title: string, @Body('description') description: string, @Body('price') price: string) {
//    async addProduct(@Body() body) {
     
   const id = uuid();
        return await this.productsService.create({id, title, description, price});
    }

    @Get()
    async findAll(){
        return await this.productsService.findAll();
    }

    // @Get()
    // async findAll() {
    //     // get all posts in the db
    //     return await this.productsService.findAll();
    // }

    // @Post()
    // addProduct(
    //     @Body('title') prodTitle: string, 
    //     @Body('description') prodDesc: string, 
    //     @Body('price') prodPrice: number,
    //     ) {
    //     const generatedId = this.productsService.create(prodTitle, prodDesc, prodPrice);
    //     return {id: generatedId };
    // }
    // @Get()
    // getAllProducts(){
    //     return this.productsService.getProducts();
    // }
    // @Get(':id')
    // getProduct(@Param('id') prodId: string){
    //     return this.productsService.getSingleProduct(prodId);
    // }
    // @Patch(':id')
    // updateProduct(
    //     @Param('id') prodId: string, 
    //     @Body('title') prodTitle: string, 
    //     @Body('description') prodDesc: string, 
    //     @Body('price') prodPrice: number
    //     ){
    //     this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    //     return null;
    // }
    // @Delete(':id')
    // removeProduct( @Param('id') prodId: string, ){
    //     this.productsService.deleteProduct(prodId);
    //     return null;
    // }

}