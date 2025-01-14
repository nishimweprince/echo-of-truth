import { FindOptionsWhere, Repository } from 'typeorm';
import { Poem } from './poem.entity';
import { AppDataSource } from '../data-source';
import { validateCreatePoem } from './poem.validations';
import { UUID } from '../types';
import { NotFoundError } from '../helpers/errors.helper';
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
}
