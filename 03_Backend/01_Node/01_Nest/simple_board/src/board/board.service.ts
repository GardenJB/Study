import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boards = [
    {
      id: 1,
      title: 'hello',
      content: 'aa',
    },
    {
      id: 4,
      title: 'hello',
      content: 'aa',
    },
    {
      id: 3,
      title: 'hello',
      content: 'aa',
    },
    {
      id: 2,
      title: 'hello',
      content: 'aa',
    },
  ];

  findAll() {
    return this.boards;
  }

  find(id: number) {
    const index = this.boards.findIndex((board) => board.id === id);
    return this.boards[index];
  }

  create(data) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }

  update(id: number, data) {
    const index = this.getBoardId(id);
    if (index > -1) {
      this.boards[index] = {
        ...this.boards[index],
        ...data,
      };
      return this.boards[index];
    }
    return null;
  }

  getBoardId(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }

  delete(id: number) {
    const index = this.getBoardId(id);
    if (index > -1) {
      this.boards.splice(index, 1);
      return this.boards;
    }
    return null;
  }
}
