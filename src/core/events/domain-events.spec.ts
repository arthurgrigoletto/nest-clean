import { vi } from 'vitest'

import { AggregateRoot } from '../entities/aggregate-root'
import { UniqueEntityID } from '../entities/unique-entity-id'
import { DomainEvent } from './domain-event'
import { DomainEvents } from './domain-events'

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date
  // eslint-disable-next-line no-use-before-define
  private aggregate: CustomAggregate

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain Events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Subscribe Cadastrado
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Cirando uma resposta sem salvar no banco
    const aggregate = CustomAggregate.create()

    // Assegurando que o evento foi criado porém não foi disparado
    expect(aggregate.domainEvents).toHaveLength(1)

    // Salvando a resposta no banco de dados e disparando o evento
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // O Subscribe ouve o evento e faz o que precisa ser feito com o dado
    expect(callbackSpy).toHaveBeenCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
