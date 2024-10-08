@Controller('api/v1/pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.create(createPetDto);
  }
}
