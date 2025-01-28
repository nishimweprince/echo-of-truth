import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Poem } from './poem.entity';
import { AppDataSource } from '../data-source';
import { validateCreatePoem } from './poem.validations';
import { UUID } from '../types';
import { AppError, NotFoundError } from '../helpers/errors.helper';
import {
  getPagination,
  getPagingData,
  Pagination,
} from '../helpers/pagination.helper';
import { PoemStatus } from './peom.constants';

export class PoemService {
  private poemRepository: Repository<Poem>;
  constructor() {
    this.poemRepository = AppDataSource.getRepository(Poem);
  }

  // CREATE POEM
  async createPoem(poem: Partial<Poem>): Promise<Poem> {
    const { error, value } = validateCreatePoem(poem);
    if (error) {
      throw new Error(error.message);
    }
    return this.poemRepository.save(value);
  }

  // FETCH POEMS
  async fetchPoems({
    page,
    size,
    condition,
  }: {
    page: number;
    size: number;
    condition: FindOptionsWhere<Poem>;
  }): Promise<Pagination> {
    const { take, skip } = getPagination({ page, size });

    const poems = await this.poemRepository.findAndCount({
      where: condition,
      skip,
      take,
      order: {
        updatedAt: 'DESC',
      },
    });

    return getPagingData({ data: poems, size, page });
  }

  // GET POEM BY MESSAGE ID
  async getPoemByMessageId(messageId: UUID): Promise<Poem> {
    const poem = await this.poemRepository.findOne({ where: { messageId } });
    if (!poem) {
      throw new NotFoundError('Poem not found', {
        referenceId: messageId,
      });
    }
    return poem;
  }

  // UPDATE POEM STATUS
  async updatePoemStatus(messageId: UUID, status: PoemStatus): Promise<Poem> {
    const poem = await this.getPoemByMessageId(messageId);
    poem.status = status;
    return this.poemRepository.save(poem);
  }

  // DELETE POEM
  async deletePoem(condition: FindOptionsWhere<Poem>): Promise<void> {
    await this.poemRepository.delete(condition);
  }

  // UPDATE MULTIPLE POEMS
  async updateMultiplePoems(poems: Poem[], condition?: FindOptionsWhere<Poem>): Promise<number> {
    const poemsList = await this.poemRepository.find({
      where: condition,
    });
    if (!poemsList.length) {
      throw new NotFoundError('Poems not found');
    }

    const updatedPoems = await Promise.all(
      poems.map((poem: Poem) => this.poemRepository.update(poem.id, poem))
    );
    return updatedPoems.length;
  }

  // UPDATE POEM
  async updatePoem(messageId: UUID, poem: Partial<Poem>): Promise<Poem> {
    const condition: FindOptionsWhere<Poem> = {};
    if (messageId) condition.messageId = messageId;

    // CHECK IF POEM EXISTS
    const poemExists = await this.poemRepository.findOne({ where: condition });
    if (!poemExists) {
      throw new NotFoundError('Poem not found', { referenceId: messageId });
    }

    // UPDATE POEM
    return this.poemRepository.save({
      ...poemExists,
      ...poem,
    });
  }
}

