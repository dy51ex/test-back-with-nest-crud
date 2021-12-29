import { Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Crud, CrudController } from '@nestjsx/crud';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrUpdateProductDto, ProductDto } from './product.dto';

@Crud({
  model: {
    type: ProductDto,
  },
  dto: {
    create: CreateOrUpdateProductDto,
    update: CreateOrUpdateProductDto,
  },
  query: {
    alwaysPaginate: true,
    cache: 60_000,
  },
  routes: {
    only: ['getOneBase', 'getManyBase', 'createOneBase', 'updateOneBase'],
    createOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        Post(),
        ApiBearerAuth('access-token'),
      ],
    },
    updateOneBase: {
      decorators: [
        UseGuards(JwtAuthGuard),
        Patch(),
        ApiBearerAuth('access-token'),
      ],
    },
  },
})
@ApiTags('products')
@Controller('products')
export class ProductsController implements CrudController<Product> {
  constructor(public service: ProductsService) {}
}
