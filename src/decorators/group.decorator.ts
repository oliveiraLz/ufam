import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const Group = createParamDecorator((filter: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (request.group) {
    if (filter) {
      return request.group[filter];
    } else {
      return request.group;
    }
  } else {
    throw new NotFoundException("Usuário não tem um grupo cadastrado");
  }
});
