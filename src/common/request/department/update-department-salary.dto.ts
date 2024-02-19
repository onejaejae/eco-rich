import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateDepartmentSalaryDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'increaseRate는 0 이상이어야 합니다.' })
  @Max(1, { message: 'increaseRate는 1 이하여야 합니다.' })
  increaseRate: number;
}
