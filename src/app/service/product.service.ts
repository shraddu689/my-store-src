import { Injectable } from '@angular/core';
import { Product } from '../product';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, count, delay, filter, from, interval, map, of, range, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
  //specifies that this service can be injected anywhere
  //in the project

  // providedIn: AppModule
  //specifies that this service can be injected in the components
  //of the AppModule

  // providedIn: ProductListComponent
  //specifies that this service can be injected in the ProductListComponent
})
export class ProductService {

  //injecting HttpClient service here
  constructor(private http: HttpClient){}

  productCount!:number;

  getProducts():Observable<Product[]>{
    console.log("getProducts called");
    //get function will place a call to the json-server using url specified
    //it will return an Observable to which we need to subscribe to get the value

    return this.http.get<Product[]>("http://localhost:3000/products") 
                    .pipe(catchError(this.handleError));               
  }

  getProductById(id:number):Observable<Product>{
    return this.http.get<Product>
          ("http://localhost:3000/products/"+id);
  }

  //catchError operator will call handleError to which it will pass
  //all the error relating information using the parameter of type 
  //HttpErrorResponse
  handleError(error:HttpErrorResponse){
    let errorMessage = "Status Code: " + error.status + 
                       " Message: " + error.message
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }

  //this variable is my shared resource whose value
  //can be updated in one component here product-list button click
  //and be read in another component here app badge
  
  private cartCount = 0;

  cartCountSubject$ = new BehaviorSubject<number>(0);


  //observable
  // values$ = of(1,2,3,4,5,'hello',true,[45,545,45]);
  // values$ = range(1,10);

  colors = ["red","blue","green","yellow"];
  // values$ = of(this.colors);
  values$ = from(this.colors);

  //custom observable
  myObservable$ = new Observable(observer => {
    observer.next(10);
    throw new Error('Some error occured');
    observer.next(20);
    observer.complete(); //observable will stop giving the values to the subscriber
    observer.next(30);
  });

  myNumbers$ = of(1,2,4,6,7,3,8,5);

  myInterval$ = interval(3000);

  subscription$! : Subscription;

  mySubject$ = new Subject<number>();

  // constructor() {
    // console.log(this.values$);
    //within subscribe we need to create a callback function
    //which will get call of individual value of the observable data stream
    // this.values$.subscribe(val => console.log("Val : " + val));
    // console.log(this.myObservable$);
    // this.myObservable$.subscribe(val => console.log("Sub A: " + val));
    // this.myObservable$.subscribe(val => console.log("Sub B: " + val));
    // this.myObservable$.subscribe({
    //   next: val => console.log("Next: " + val),
    //   complete: () => console.log('Observable Complete'),
    //   error: err => console.log("After Subscription -> " + err)
    // });

    // this.myNumbers$
    //               .pipe(
    //                 filter(val => val%2==0),
    //                 map(val => val * val),
    //                 delay(3000)
    //               )
    //               .subscribe(val => console.log(val));

    // this.subscription$ = 
    //       this.myInterval$.subscribe(val => console.log('A -> ' + val));
    // this.myInterval$.subscribe(val => console.log('B -> ' + val));


    //this function is built-in function of the javascript
    //which will call a callback function after the defined 
    //time period
    // setTimeout(() => {
    //   this.subscription$.unsubscribe();
    // },10000);

  //   this.mySubject$.next(1);
  //   this.mySubject$.subscribe(val => console.log('A ' + val));
  //   this.mySubject$.next(2);
  //   this.mySubject$.subscribe(val => console.log('B ' + val));
  //   this.mySubject$.next(3);
  // }

  increment(): void{
    // this.sample();
    // console.log('increment function called');
    this.cartCount++; //increment the cartCount by 1
    console.log(this.cartCount);
    this.cartCountSubject$.next(this.cartCount);
  }

  sample():void{
    console.log('sample function called');
  }

//   products:Product[]=[
//     {
//       id:1,
//       name:"One plus nord",
//       price: 28000.75876,
//       image: "/assets/oneplusnord.jpg",
//       code:"M-001",
//       rating: 3.5,
//       publishedDate: "Mon Jun 19 2023 11:35:22 GMT+0530 (India Standard Time)",
//       description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur explicabo id rem modi corporis reiciendis architecto. Saepe ad itaque quam voluptate optio sapiente eos qui, alias deserunt! Quis, similique."
//     },
//     {
//       id:2,
//       name:"IPhone 13",
//       price: 120000.487584,
//       code:"M-002",
//       rating:4,
//       publishedDate: "Mon Jun 19 2023 11:35:22 GMT+0530 (India Standard Time)",
//       image: "/assets/iphone13.jpg"
//     },
//     {
//       id:3,
//       name:"LG TV",
//       price: 40000.45,
//       image: "/assets/lgtv.jpg",
//       code:"T-001",
//       rating:5,
//       publishedDate: "Mon Jun 19 2023 11:35:22 GMT+0530 (India Standard Time)",
//       description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur explicabo id rem modi corporis reiciendis architecto. Saepe ad itaque quam voluptate optio sapiente eos qui, alias deserunt! Quis, similique."
//     },
//     {
//       id:4,
//       name:"Samsung Washing Machine",
//       price: 27000.4,
//       code:"W-001",
//       rating:3,
//       publishedDate: "Mon Jun 19 2023 11:35:22 GMT+0530 (India Standard Time)",
//       image: "/assets/samsungwashingmachine.jpg"
//     },
//     {
//       id:5,
//       name:"Apple Watch",
//       price: 60000.3646,
//       image: "/assets/applewatch.jpg",
//       code:"WT-001",
//       rating:4.5,
//       publishedDate: "Mon Jun 19 2023 11:35:22 GMT+0530 (India Standard Time)",
//       description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur explicabo id rem modi corporis reiciendis architecto. Saepe ad itaque quam voluptate optio sapiente eos qui, alias deserunt! Quis, similique."
//     },
//     {
//       id:6,
//       name:"Samsung Galaxy S22",
//       price: 108000.3454,
//       image: "/assets/samsunggalaxys22.jpg",
//       code:"M-003",
//       rating:3,
//       publishedDate: "Mon Jun 19 2023 11:35:22 GMT+0530 (India Standard Time)",
//       description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde tenetur explicabo id rem modi corporis reiciendis architecto. Saepe ad itaque quam voluptate optio sapiente eos qui, alias deserunt! Quis, similique."
//     }
// ]
}
