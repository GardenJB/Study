import { IsOptional, MaxLength, MinLength } from "class-validator";
import { CreateBoardDto } from "./create-board.dto";
import { OmitType, PartialType, PickType } from "@nestjs/swagger";

export class UpdateBoardDto {

  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  
  title?: string;

  @IsOptional()
  content?: string;
}


// export class UpdateBoardDto extends PartialType(CreateBoardDto) {

// // optional type 값들은 모두 삭제하고 가져와야 함

// };
// optional 적용 방식 고민
// export class UpdateBoardDto extends PickType(CreateBoardDto, [`title`]) {};
// export class UpdateBoardDto extends OmitType(CreateBoardDto, [`title`]) {};
