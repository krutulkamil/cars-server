import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Car} from "./car.entity";

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>
    ) {
    }

    public async getAllCars(): Promise<Car[]> {
        return await this.carRepository.find({})
            .catch((err) => {
                throw new InternalServerErrorException()
            });
    }
}