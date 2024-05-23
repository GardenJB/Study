import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()  // PartialType 사용 확장 때는 제거하기 
  @ApiProperty({
    description: '이름',
    required: true,
    example: 'abc',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '내용',
    required: true,
    example: 'aa',
  })
  content: string;
}
