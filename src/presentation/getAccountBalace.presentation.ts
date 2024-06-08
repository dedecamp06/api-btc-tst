import {
  successResponse,
  errorResponse,
  forbiddenResponse,
} from "./shared/https";
import { accountRepository } from "../infra/mongodb/repositories/account.repositores";

class GetAccountBalancePresentation {
  constructor() {}

  async index(accountId: string) {
    try {
      if (!accountId) {
        return errorResponse("Account ID is required");
      }

      const account = await accountRepository.findOne(accountId);

      if (!account) {
        return forbiddenResponse("Account not found");
      }

      return successResponse({
        accountId: account.id,
        balance: account.balance,
      });
    } catch (error) {
      return errorResponse(
        "An error occurred while retrieving account balance"
      );
    }
  }
}

export const getAccountBalancePresentation =
  new GetAccountBalancePresentation();
