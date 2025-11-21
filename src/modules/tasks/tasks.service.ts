import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      description: createTaskDto.description,
      dueDate: new Date(createTaskDto.dueDate),
    });

    if (createTaskDto.assigneeId) {
      const assignee = await this.userRepository.findOne({
        where: { id: createTaskDto.assigneeId },
      });
      if (!assignee) {
        throw new NotFoundException('Assignee not found');
      }
      task.assignee = assignee;
    }

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['assignee'] });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }

    if (updateTaskDto.dueDate !== undefined) {
      task.dueDate = new Date(updateTaskDto.dueDate);
    }

    if (updateTaskDto.assigneeId !== undefined) {
      if (updateTaskDto.assigneeId) {
        const assignee = await this.userRepository.findOne({
          where: { id: updateTaskDto.assigneeId },
        });
        if (!assignee) {
          throw new NotFoundException('Assignee not found');
        }
        task.assignee = assignee;
      } else {
        task.assignee = null as any;
      }
    }

    if (updateTaskDto.status !== undefined) {
      task.status = updateTaskDto.status;
    }

    return this.taskRepository.save(task);
  }
}
