import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../../entities/team.entity';
import { User } from '../../entities/user.entity';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const team = this.teamRepository.create({ name: createTeamDto.name });
    const savedTeam = await this.teamRepository.save(team);

    const users = createTeamDto.members.map((member) =>
      this.userRepository.create({
        name: member.name,
        email: member.email,
        team: savedTeam,
      }),
    );
    await this.userRepository.save(users);

    return savedTeam;
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['members'] });
  }
}
