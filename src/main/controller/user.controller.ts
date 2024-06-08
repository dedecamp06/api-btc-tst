import { Request, Response } from "express";
import { getAccountBalancePresentation } from "../../presentation/getAccountBalace.presentation";
import { postCreateDepositPresentation } from "../../presentation/createDeposit.presentation";
import { getBitcoinQuotePresentation } from "../../presentation/currentPriceBitcoint.presentation"

export class UserController {
  async get(req: Request, res: Response) {
    const body = req.body;
    const result = await getAccountBalancePresentation.index(body);
    return res.status(result.status).json(result);
  }

  async post(req: Request, res: Response) {
    const body = req.body;
    const result = await postCreateDepositPresentation.index(body);
    return res.status(result.status).json(result);
  }

  async getBitcoin(req: Request, res: Response) {
    const result = await getBitcoinQuotePresentation.index();
    return res.status(result.status).json(result);
  }
}
