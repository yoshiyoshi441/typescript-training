import { Product } from "./product";
import { Products } from "./products";

export interface ProductClient {
  list(): Promise<Products>;
  get(id: number): Promise<Product>;
}
