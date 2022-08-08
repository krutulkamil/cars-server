import {Mutation, Query, Resolver, Args} from "@nestjs/graphql";
import {CarsService} from "./cars.service";
import {Car} from "./car.entity";
import {NewCarInput} from "./dto/new-car.input";

@Resolver()
export class CarsResolver {
    constructor(private readonly carsService: CarsService) {
    }

    @Query((returns) => [Car])
    public async cars(): Promise<Car[]> {
        return await this.carsService.getAllCars()
            .catch((err) => {
                throw err;
            })
    }

    @Mutation((returns) => Car)
    public async addNewCar(@Args("newCarData") newCarData: NewCarInput): Promise<Car> {
        return await this.carsService.addCar(newCarData).catch((err) => {
            throw err;
        })
    }
}