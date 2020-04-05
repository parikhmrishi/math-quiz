import { Operator } from "src/enum/operator.enum";
export class ResponseModel {
  number1: number;
  operator: Operator;
  number2: number;
  correctAnswer: number;
  userResponse: number;

  constructor(number1, number2, operator, correctAnswer, userResponse) {
    this.number1 = number1;
    this.number2 = number2;
    this.correctAnswer = correctAnswer;
    this.userResponse = userResponse;
    this.operator = operator;
  }
}
