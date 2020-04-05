import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResponseModel } from "src/model/response.model";
import { Operator } from "src/enum/operator.enum";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Math Quiz";
  quizForm: FormGroup;
  resultView: Boolean = false;
  correctAdditionResponse: number = 0;
  correctSubtractionResponse: number = 0;
  correctMultiplicationresponse: number = 0;
  correctDivisionResponse: number = 0;
  additionResponse: Array<ResponseModel>;
  subtractionResponse: Array<ResponseModel>;
  multiplicationResponse: Array<ResponseModel>;
  divisionResponse: Array<ResponseModel>;

  constructor(private fb: FormBuilder) {
    this.quizForm = this.fb.group({
      number1: ["num1", Validators.required],
      operator: ["0", Validators.required],
      number2: ["num2", Validators.required],
      userResponse: ["", Validators.required],
    });
    this.additionResponse = new Array<ResponseModel>();
    this.subtractionResponse = new Array<ResponseModel>();
    this.multiplicationResponse = new Array<ResponseModel>();
    this.divisionResponse = new Array<ResponseModel>();
  }

  ngOnInit() {
    this.generateRandomNumber(100, 1);
    this.quizForm
      .get(["operator"])
      .valueChanges.subscribe(() => this.generateRandomNumber(100, 1));
  }

  saveForm() {
    let number1 = this.number1;
    let number2 = this.number2;
    let operator = this.operator;
    let correctAnswer = this.calculate(number1, operator, number2);
    let userResponse = this.userResponse;

    const response = new ResponseModel(
      number1,
      number2,
      operator,
      correctAnswer,
      userResponse
    );
    switch (operator) {
      case "+":
        this.additionResponse.push(response);
        break;
      case "-":
        this.subtractionResponse.push(response);
        break;
      case "x":
        this.multiplicationResponse.push(response);
        break;
      case "/":
        this.divisionResponse.push(response);
        break;
    }
    this.generateRandomNumber(100, 1);
    console.log(this.multiplicationResponse);
    
  }

  generateRandomNumber(from: number, to: number) {
    // Formulae: Math.floor(Math.random()*(b-a+1))+a
    const number1 = Math.floor(Math.random() * (from - to + 1)) + to;
    const number2 = Math.floor(Math.random() * (from - to + 1)) + to;
    // const operator = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    this.createQuestion(number1, number2);
  }

  calculate(num1, op, num2) {
    switch (op) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "x":
        return num1 * num2;
      case "/":
        return num1 / num2;
    }
  }

  createQuestion(number1, number2) {
    let [num1, num2] =
      number2 >= number1 ? [number2, number1] : [number1, number2];
    this.quizForm.patchValue({
      number1: num1,
      number2: num2,
      userResponse: "",
    });
  }

  showResult = (e) => {
    e.preventDefault();
    this.resultView = true;
    this.correctAdditionResponse = this.additionResponse.reduce(
      (count, response) =>
        count + (response.userResponse === response.correctAnswer ? 1 : 0),
      0
    );
    this.correctSubtractionResponse = this.subtractionResponse.reduce(
      (count, response) =>
        count + (response.userResponse === response.correctAnswer ? 1 : 0),
      0
    );
    this.correctMultiplicationresponse = this.multiplicationResponse.reduce(
      (count, response) =>
        count + (response.userResponse === response.correctAnswer ? 1 : 0),
      0
    );
    this.correctDivisionResponse = this.divisionResponse.reduce(
      (count, response) =>
        count + (response.userResponse === response.correctAnswer ? 1 : 0),
      0
    );
  };

  restart() {
    this.resultView = false;
  }

  get number1(): number {
    return this.quizForm.get(["number1"]).value as number;
  }

  get number2(): number {
    return this.quizForm.get(["number2"]).value as number;
  }

  get operator(): any {
    const value = this.quizForm.get(["operator"]).value;
    return Operator[value];
  }

  get userResponse(): number {
    return this.quizForm.get(["userResponse"]).value as number;
  }
}
