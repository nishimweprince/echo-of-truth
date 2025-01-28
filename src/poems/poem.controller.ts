import { NextFunction, Request, Response } from 'express';
import { PoemService } from './poem.service';
import {
  Between,
  FindOptionsWhere,
  In,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
} from 'typeorm';
import { Poem } from './poem.entity';
import { PoemStatus } from './peom.constants';
import { UUID } from '../types';
import logger from '../helpers/logger.helper';

// INIT POEM SERVICE
const poemService = new PoemService();

export const PoemController = {
  // CREATE POEM
  async createPoem(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId, wallet, text } = req.body;
      const poem = await poemService.createPoem({ messageId, wallet, text });
      return res.status(201).json({
        message: 'Poem created successfully',
        data: poem,
      });
    } catch (error) {
      next(error);
    }
  },

  // FETCH POEMS
  async fetchPoems(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = 0,
        size = 10,
        wallet,
        status,
        messageId,
        startDate,
        endDate,
      } = req.query;

      // INITIALIZE CONDITION
      const condition: FindOptionsWhere<Poem> = {};

      // ADD CONDITION
      if (wallet) condition.wallet = wallet as string;
      if (status) condition.status = status as PoemStatus;
      if (messageId) condition.messageId = messageId as UUID;

      // ADD DATE RANGE CONDITION
      if (startDate)
        condition.createdAt = MoreThanOrEqual(
          startDate as string
        ) as unknown as Date;
      if (endDate)
        condition.createdAt = LessThanOrEqual(
          endDate as string
        ) as unknown as Date;

      // FETCH POEMS
      const poems = await poemService.fetchPoems({
        page: Number(page),
        size: Number(size),
        condition,
      });
      return res.status(200).json({
        message: 'Poems fetched successfully',
        data: poems,
      });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE POEM STATUS
  async updatePoemStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId, status } = req.body;
      const poem = await poemService.updatePoemStatus(messageId, status);

      return res.status(200).json({
        message: 'Poem status updated successfully',
        data: poem,
      });
    } catch (error) {
      next(error);
    }
  },

  // DELETE POEM
  async deletePoem(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId, wallet } = req.body;
      const condition: FindOptionsWhere<Poem> = { messageId };
      if (wallet) condition.wallet = wallet as string;
      const poem = await poemService.deletePoem(condition);

      return res.status(204).json({
        message: 'Poem deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  // GET POEM BY MESSAGE ID
  async getPoemByMessageId(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const poem = await poemService.getPoemByMessageId(messageId as UUID);

      return res.status(200).json({
        message: 'Poem fetched successfully',
        data: poem,
      });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE MULTIPLE POEMS
  async updateMultiplePoems(req: Request, res: Response, next: NextFunction) {
    try {
      const { poems, startDate, endDate, status } = req.body;

      // INITIALIZE CONDITION
      let condition: FindOptionsWhere<Poem> = {};

      // ADD DATE RANGE CONDITION
      if (startDate && endDate) {
        condition.createdAt = Between(
          startDate as string,
          endDate as string
        ) as unknown as Date;
      }
      if (status) condition.status = status as PoemStatus;

      // UPDATE MULTIPLE POEMS
      await poemService.updateMultiplePoems(poems, condition);

      // RETURN RESPONSE
      return res.status(200).json({
        message: 'Poems updated successfully',
      });
    } catch (error) {
      next(error);
    }
  },

  // UPDATE POEM
  async updatePoem(req: Request, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.params;
      const { ...poem } = req.body;
      const updatedPoem = await poemService.updatePoem(messageId as UUID, {
        ...poem,
      });

      return res.status(200).json({
        message: 'Poem updated successfully',
        data: updatedPoem,
      });
    } catch (error) {
      next(error);
    }
  },
};
