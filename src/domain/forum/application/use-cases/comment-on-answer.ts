import { Either, left, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswerRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  public async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const question = await this.answersRepository.findById(answerId)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}