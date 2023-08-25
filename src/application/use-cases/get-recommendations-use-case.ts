import { GetRecommendationsBody } from '@/infra/dto/get-recommendations';
import { UsersRepository } from '../domain/users-repository';
export class GetRecommendationsUseCase {
  constructor(private personsRepository: UsersRepository) {}

  async execute({ cpf }: GetRecommendationsBody) {
    const userFriendships = await this.personsRepository.getPersonRelations(cpf);
    const recommendedFriends: { [cpf: string]: number } = {};

    for (const friendship of userFriendships) {
      const friendCpf = friendship.cpf1 === cpf ? friendship.cpf2 : friendship.cpf1;

      const friendFriendships = await this.personsRepository.getPersonRelations(friendCpf);

      for (const friendFriendship of friendFriendships) {
        const potentialFriend =
          friendFriendship.cpf1 === friendCpf ? friendFriendship.cpf2 : friendFriendship.cpf1;

        if (
          potentialFriend !== cpf &&
          !userFriendships.some(f => f.cpf1 === potentialFriend || f.cpf2 === potentialFriend)
        ) {
          if (recommendedFriends[potentialFriend]) {
            recommendedFriends[potentialFriend] += 1;
          } else {
            recommendedFriends[potentialFriend] = 1; 
          }
        }
      }
    }

    const sortedRecommendedFriends = Object.keys(recommendedFriends)
      .filter(cpf => recommendedFriends[cpf] > 0)
      .map(cpf => ({ cpf, relevance: recommendedFriends[cpf] }));

    sortedRecommendedFriends.sort((a, b) => b.relevance - a.relevance);

    return sortedRecommendedFriends.map(friend => friend.cpf);
  }
}
