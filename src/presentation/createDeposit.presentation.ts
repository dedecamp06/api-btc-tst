import {
  successResponse,
  errorResponse,
  badRequestResponse,
} from "./shared/https";
import { accountRepository } from "../infra/mongodb/repositories/account.repositores";
import { emailService } from "../infra/email/emailService";

class CreateDepositPresentation {
  constructor() {}

  async index(accountId: string, depositAmount: number) {
    try {
      if (!accountId) {
        return badRequestResponse("Account ID is required");
      }

      const account = await accountRepository.findOne(accountId);
      if (!account) {
        return badRequestResponse("Account not found");
      }

      account.balance += depositAmount;
      await accountRepository.update(accountId, { balance: account.balance });

      await emailService.sendToQueue({
        to: account.email,
        subject: "Deposit Confirmation",
        body: `Dear ${account.name}, your deposit of $${depositAmount} has been successfully processed. Your new balance is $${account.balance}.`,
      });

      return successResponse({
        accountId: account.id,
        balance: account.balance,
        message: "Deposit successful and email notification sent.",
      });
    } catch (error) {
      return errorResponse("An error occurred while processing the deposit");
    }
  }
}

export const postCreateDepositPresentation = new CreateDepositPresentation();
