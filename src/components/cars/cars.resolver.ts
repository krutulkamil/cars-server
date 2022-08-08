import {Query, Resolver} from "@nestjs/graphql";
import {CarsService} from "./cars.service";
import {Car} from "./car.entity";

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
}