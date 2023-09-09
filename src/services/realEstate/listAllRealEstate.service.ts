import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const listAllRealEstateService = async (): Promise<RealEstate[]> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

    const realEstates: RealEstate[] = await realEstateRepository.find({
        relations:{
            address: true,
        },
    });

    return realEstates;
}

export default listAllRealEstateService;