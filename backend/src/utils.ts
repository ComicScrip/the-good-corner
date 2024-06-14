import { InputType, Field, Int, ArgsType } from "type-graphql";
import { GraphQLError } from "graphql";

@InputType()
export class ObjectId {
  @Field(() => Int)
  id!: number;
}

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, {nullable: true})
  skip?: number = 0;

  @Field((type) => Int, {nullable: true})
  take?: number = 10;
}

export function unauthenticatedError() {
  return new GraphQLError(
    "You need to be authenticated to perform this action",
    {
      extensions: { code: "UNAUTHENTICATED" },
    }
  );
}

export function unauthaurizedError() {
  return new GraphQLError(
    "You don't have the permission to perform this action",
    {
      extensions: { code: "UNAUTHORIZED" },
    }
  );
}

export function notFoundError() {
  return new GraphQLError("The requested resource was not found", {
    extensions: { code: "NOT_FOUND" },
  });
}

export function invalidDataError(errors: any) {
  return new GraphQLError("Invalid data was provided", {
    extensions: { code: "INVALID_DATA", errors },
  });
}
