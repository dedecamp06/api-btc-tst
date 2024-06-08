import NodeCache from "node-cache";
import axios from "axios";
import { successResponse, errorResponse } from "./shared/https";
import { bitcoinQuoteRepository } from "../infra/mongodb/repositories/bitcoinQuote.repositores";

const quoteCache = new NodeCache({ stdTTL: 300 });

class GetBitcoinQuotePresentation {
  async index() {
    try {
      let quote = quoteCache.get("latestQuote");
      if (!quote) {
        const response = await axios.get(
          "https://www.mercadobitcoin.net/api/BTC/ticker/"
        );
        if (!response.data || !response.data.ticker) {
          return errorResponse("No Bitcoin quotes available");
        }
        await bitcoinQuoteRepository.create(response);
        const { buy: buyPrice, sell: sellPrice } = response.data.ticker;
        quote = { buyPrice, sellPrice };
        quoteCache.set("latestQuote", quote);
      }

      return successResponse({
        buyPrice: quote.buyPrice,
        sellPrice: quote.sellData,
        message: "Current Bitcoin buy and sell prices retrieved successfully.",
      });
    } catch (error) {
      console.error("Error retrieving Bitcoin prices:", error);
      return errorResponse("Failed to retrieve Bitcoin prices");
    }
  }
}

export const getBitcoinQuotePresentation = new GetBitcoinQuotePresentation();
