import { Injectable, Inject, NotFoundException } from "@nestjs/common";
//import { Product } from './product.model';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { PRODUCT_REPOSITORY } from '../core/constants';
import { v4 as uuid } from 'uuid';


@Injectable()
export class productsService {

    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product) { }

    async create(product: ProductDto): Promise<Product> {
        return await Product.create<Product>(product);
    }

    async findOneByTitle(title: string): Promise<Product> {
        return await this.productRepository.findOne<Product>({ where: { title } });
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOne<Product>({ where: { id } });
    }
    
    async findAll(): Promise<Product[]> {
        return await this.productRepository.findAll<any>();
    }
    
    // private products: Product[] = [];
    
    // insertProduct(title: string, desc: string, price: number){
    //     const id = uuid();
    //     const newProduct = new Product(id, title, desc, price);
    //     this.products.push(newProduct);
    //     return id;
    // }

    // getProducts(){
    //     return [...this.products];
    // }

    // getSingleProduct(productId: string){
    //    const product = this.findProduct(productId)[0];
    //     return {...product};
    // }

    // updateProduct(productId: string, title: string, desc: string, price: number){
    //     const [product, index] = this.findProduct(productId);
    //     const updateProduct = {...product};
    //     if(title){
    //         updateProduct.title = title;
    //     }
    //     if(desc){
    //         updateProduct.description = desc;
    //     }
    //     if(price){
    //         updateProduct.price = price;
    //     }
    //     this.products[index] = updateProduct;
    // }

    // deleteProduct(prodId: string){
    //     const index = this.findProduct(prodId)[1];
    //     this.products.splice(index, 1);
    // }


    // private findProduct(id: string): [Product, number]{
    //     const productIndex = this.products.findIndex((prod) => prod.id === id);
    //     const product = this.products[productIndex];
    //     if (!product){
    //         throw new NotFoundException('No Product Found');
    //     }
    //     return [product, productIndex];
    // }

}