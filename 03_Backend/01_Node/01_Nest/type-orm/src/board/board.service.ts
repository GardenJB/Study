import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { Board } from '../entity/Board';

@Injectable()
export class BoardService {

  constructor(
    @InjectRepository(User)
    private userRespository: Repository<User>,
    @INjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {}

  findAll() {
    return this.boardRepository.find();
  }

  async find(id: number) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    return board;

    // return this.boardRepository.findOne({ 
    //   where: {
    //     id
    //   },
    //   relations: {
    //     user: true
    //   }
    // })
  }

  async create(data: CreateBoardDto) {
    return this.boardRepository.save(data); // 실제 db에 입력까지
    // const board = this.boardRepository.create(data); 
    // instance만 생성, 실제 db 입력 x
    // board.content = 'abc';
    // await this.boardRepository.save(board);
  }


  async update(id: number, data: UpdateBoardDto) {
    // const board = await this.boardRepository.findOneBy({ id });
    const board = await this.getBoardByID(id);
    if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    
    return this.boardRepository.update(id, { ...data });
  }

  async delete(id: number) {
    // const board = await this.boardRepository.findOneBy({ id });
    // if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    // return this.boardRepository.delete({ id });
    const board = await this.getBoardByID(id);
    if (!board) throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    return this.boardRepository.remove(board);
  }

  async getBoardByID(id: number) {
    return this.boardRepository.findBy({ id });
   
  }
}
