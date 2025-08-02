// src/decorators/is-valid-tag.decorator.ts
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaService } from 'nestjs-prisma';

@ValidatorConstraint({ name: 'isValidTag', async: true })
export class IsValidTagConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: string) {
    const tag = await this.prisma.tagsData.findUnique({
      where: { tag: value },
      select: { id: true },
    });
    return !!tag;
  }

  defaultMessage() {
    return 'tag не существует';
  }
}

export function IsValidTag(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidTagConstraint,
    });
  };
}
