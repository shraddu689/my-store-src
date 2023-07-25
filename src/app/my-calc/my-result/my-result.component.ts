import { Component, Input, Output, OnChanges, OnInit, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-result',
  templateUrl: './my-result.component.html',
  styleUrls: ['./my-result.component.css']
})
export class MyResultComponent implements OnChanges, OnInit {
  //@Input indicates that the variable will get the 
  //value from the parent component
  @Input()
  num1!:number;
  @Input()
  num2!:number;

  @Output()
  resultEmit = new EventEmitter<string>(); 
  //this is link we are creating a gun which can emit the button
  //we are declaring this bullet emitted from the gun will be the output
  //this output variable will become the event of the child which 
  //we will need to handle in the parent component
  result = 0;

  @Output()
  sample = new EventEmitter<number>();

  //this hook method will be called automatically whenever the
  //value of the input property is changed
  //this is first lifecycle hook to be called
  //this method is called everytime the value of input variable is changed
  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngonchange is called');
      this.result = this.num1 + this.num2;
  }

  //this method is called after ngOnChanges
  //this method is called only once when the component is created
  ngOnInit(): void {
      console.log('ngoninit is called');
      this.result = 0;
  }

  sendResult(){
    console.log("button clicked");

    //child component emit the value for the parent component
    //on the button click event the gun is triggered
    //using emit method the gun will emit the bullet
    this.resultEmit.emit("Result = " + this.result); //Result = 10

    this.sample.emit(10);
  }
}
