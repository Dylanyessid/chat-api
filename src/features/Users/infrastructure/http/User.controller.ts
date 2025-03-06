import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/User";
import { IUserRepository } from "../../domain/IUserRepository";
import { RegisterUseCase } from "../../../Auth/application/RegisterUserUseCase";
import { ApiResponseFormatter } from "./../../../../infrastructure/formatters/ApiResponseFormatter";
import { CreateUserDTO } from "../../../Auth/infrastructure/dto/CreateUserDTO";
import  GetUsersByCriteriaUseCase  from "../../application/GetUserByCriteriaUseCase";
import { GetUsersByPaginationUseCase } from "./../../application/GetUsersByPagination";
import { formatPaginatedData } from "../../../../infrastructure/formatters/PaginationResponseFormatter";

export class UserController {
  constructor(
    private getUserByCriteriaUserCase: GetUsersByCriteriaUseCase,
    private getUsersByPaginationUseCase: GetUsersByPaginationUseCase,
    private apiResponseFormatter: ApiResponseFormatter
  ) {}

  async getOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const user = await this.getUserByCriteriaUserCase.execute({ _id: id });
    if (!user) {
      const response = this.apiResponseFormatter.error("Not found", 404);
      res.status(404).json(response);
      return;
    }
    const response = this.apiResponseFormatter.success(user, "", 200);
    res.status(200).json(response);
    return;
  }

  async getPaginated(req: Request, res: Response, next: NextFunction) {
    const { limit = "30", page = "1" } = req.query;
    const { count, users } = await this.getUsersByPaginationUseCase.execute(
      Number(page),
      Number(limit),
    );
    if (!users.length) {
      const response = this.apiResponseFormatter.error(
        "Invalid chat message",
        404
      );
      res.status(500).json(response);
      return;
    }
    const response = formatPaginatedData({
      data: users,
      limit,
      page,
      status: 200,
      total: count,
    });

    res.status(200).json(response);
    return;
  }
}
