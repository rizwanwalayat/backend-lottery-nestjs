import { IsNotEmpty, MinLength } from "class-validator";

export class TodoDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    readonly description: string;

    readonly completed: boolean;
}