import { CartsRepository } from '../_repository/carts-repository'

interface FetchCartUseCaseRequest {
  sessionId: string
}

export class FetchCartUseCase {
  constructor(private cartsRepository: CartsRepository) {}
  async execute({ sessionId }: FetchCartUseCaseRequest) {
    const cartWithSessionId =
      await this.cartsRepository.findBySessionId(sessionId)

    return { cart: cartWithSessionId }
  }
}
