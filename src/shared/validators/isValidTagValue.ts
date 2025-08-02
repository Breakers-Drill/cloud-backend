import { Global, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'nestjs-prisma';

@Global()
@Injectable()
@ValidatorConstraint({ name: 'isValidTagValue', async: true })
export class IsValidTagValueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: number, args: any) {
    const tag = args.object.tag;

    const tagData = await this.prisma.tagsData.findUnique({
      where: { tag },
      select: { minValue: true, maxValue: true },
    });

    if (!tagData) return false;

    return value >= tagData.minValue && value <= tagData.maxValue;
  }

  defaultMessage() {
    return 'value выходит за допустимые пределы для данного тега или тег не существует';
  }
}

export function IsValidTagValue(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTagValueConstraint,
    });
  };
}
