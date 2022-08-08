import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Car} from "./car.entity";
import {NewCarInput} from "./dto/new-car.input";

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

    public async addCar(newCarData: NewCarInput): Promise<Car> {
        const newCar = this.carRepository.create(newCarData);
        await this.carRepository.save(newCar).catch((err) => {
            new InternalServerErrorException();
        });

        return newCar;
    }
}