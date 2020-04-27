import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product
  /*product = {
    "name":"",
    "price":null
  }*/
  

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) {  }

  ngOnInit():void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product=>{
      this.product = product;
      console.log("produto que veio"+product.name);
      console.log("produto passado"+this.product.name);
    });
  }

  updateProduct():void{
    this.productService.update(this.product).subscribe(()=>{
      this.productService.showMessage('Produto atualizado com sucesso!');
      this.router.navigate(['products']);
    })
  }

  cancel():void{
    this.router.navigate(['products']);
  }

}
