import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export abstract class AnswerCommentsRepository {
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract findManyByAnswerId(
    questionId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract create(questionComment: AnswerComment): Promise<void>
  abstract delete(questionComment: AnswerComment): Promise<void>
}
