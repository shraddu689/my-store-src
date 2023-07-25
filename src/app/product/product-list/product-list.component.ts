import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../product';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  //here we are injecting ProductService in the component
  //this is dependency injection
  //we declare this injection variable as private
  //so that it is created for the class
  //otherwise it will be created as local variable of the constructor
  constructor(private ps: ProductService){}  

  // products = this.ps.products;
  products!: Product[];

  errorMessage = null;

  ngOnInit(): void {
      console.log('ngOnInit called');
      this.ps.getProducts().subscribe({
        //next will be executed if there is no error in api call
        next: val => {
          this.products = val;
          this.filteredProducts = this.products;
      },
        //error will be executed if there is error in api call
        error: err => {
          this.errorMessage = err;
          console.log("In Product List => " + err);
        }
    });
  }

  storename:string="glitter store"

  //colors:string[] = ["red","blue","yellow"]

  imgStyles = {
    'width.px':150,
    'height.px':150
  }

  titleStyles = {
    'color':'#b26464',
    'fontSize.em':2.5
  } 

  // p:Product = {
  //   id:1,
  //   name:"",
  //   price: 28000,
  //   image: "/assets/oneplusnord.jpg",
  //   description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur explicabo id rem modi corporis reiciendis architecto. Saepe ad itaque quam voluptate optio sapiente eos qui, alias deserunt! Quis, similique."
  // }

  

  addToCart(event:MouseEvent,product:any,message?:string){
    // console.log("add to cart: " + product.name + 
    //             " with the price " + product.price);
    // console.log("Message is " + message);
    // console.log(event.x + " " + event.y) ;
    this.ps.increment();
    // console.log(this.ps.cartCount);
  }

  inputValue = '';

  showImages = true

  // filterBy = '';

  private _filterBy = ''; //_ is convention for identifying private field

  //if we read just the getter method the variable will be read only
  get filterBy(): string{
    // this._filterBy = "hello getter method";
    // console.log('getter called');
    return this._filterBy;
  }

  set filterBy(fb: string){
    // console.log('setter called');
    // console.log(fb);
    this._filterBy = fb;
    this.filterProducts(this._filterBy);
  }

  //copy of original array
  filteredProducts!: Product[];

  filterProducts(searchValue:string){
    //logic for filtering the product
    //on original array we will apply the filter
    //but the result of the filter will be assigned to the copy of original array
    this.filteredProducts = this.products   
                                .filter(product => product.name.toLowerCase().includes(searchValue));
  }
}
