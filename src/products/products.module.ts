import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { productsService } from "./products.service";
import { productsProviders } from "./products.providers";

@Module({
    controllers: [ProductsController],
    providers: [productsService, ...productsProviders]
})
export class ProductsModule {

}