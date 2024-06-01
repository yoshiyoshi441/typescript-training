import { Log4jsConfig } from "./config/log4js.config";
import { ProductClient } from "./domain/productClient";
import { ProductClientImpl } from "./domain/productClientImpl";
import log4js from "log4js";

Log4jsConfig.config();

const logger: log4js.Logger = log4js.getLogger();

async function main() {
  logger.info("Hello World!!");
  const productClient: ProductClient = new ProductClientImpl();
  const products = await productClient.list();
  logger.info("products: ", products);
  const product = await productClient.get(products.products[0]?.id);
  logger.info("product: ", product);
}

main();
