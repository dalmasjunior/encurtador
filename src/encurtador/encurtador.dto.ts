import { IsString } from 'class-validator';

class CreateShortUrlDto {
  @IsString()
  public url: string;
}

export default CreateShortUrlDto;
