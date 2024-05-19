import { Product } from "./product";
import { Products } from "./products";
import { ProductClient } from "./productClient";
import log4js from "log4js";

const logger: log4js.Logger = log4js.getLogger();
const baseUrl: string = "https://dummyjson.com/products";

/**
 * ProductClientImpl
 */
export class ProductClientImpl implements ProductClient {
  /**
   * list
   * @returns Products
   */
  list(): Promise<Products> {
    return fetch(`${baseUrl}`, {
      method: "GET",
    })
      .then((response: Response) => {
        if (!response.ok) {
          logger.error("fetch error", response);
          throw Error(`response error: ${response.status}`);
        }
        return response.json() as Promise<Products>;
      })
      .catch((reason) => {
        logger.error("fetch error", reason);
        throw Error(reason.message);
      });
  }

  /**
   * get
   * @param id id
   * @returns Product
   */
  get(id: number): Promise<Product> {
    return fetch(`${baseUrl}/${id}`, {
      method: "GET",
    })
      .then((response: Response) => {
        if (!response.ok) {
          logger.error("fetch error", response);
          throw Error(`response error: ${response.status}`);
        }
        return response.json() as Promise<Product>;
      })
      .catch((reason) => {
        logger.error("fetch error", reason);
        throw Error(reason.message);
      });
  }
}
