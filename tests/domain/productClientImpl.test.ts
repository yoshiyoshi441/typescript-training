import { ProductClient } from "../../src/domain/productClient";
import { ProductClientImpl } from "../../src/domain/productClientImpl";

describe("ProductClientImplのテスト", () => {
  test("プロダクトリストの取得で正常なレスポンスを受け取る", () => {
    const client: ProductClient = new ProductClientImpl();
    const productClientMock = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          new Promise((response) =>
            response({
              products: [
                {
                  id: 1,
                },
              ],
            })
          ),
      });
    global.fetch = jest.fn().mockImplementation(productClientMock);
    return expect(client.list()).resolves.toStrictEqual({
      products: [{ id: 1 }],
    });
  });

  test("プロダクトリストの取得で404が返る", () => {
    const client: ProductClient = new ProductClientImpl();
    const productClientMock = () =>
      Promise.resolve({
        ok: false,
        status: 404,
      });
    global.fetch = jest.fn().mockImplementation(productClientMock);
    return expect(client.list()).rejects.toThrow(Error);
  });

  test("プロダクトリストの取得で例外が発生する", () => {
    const client: ProductClient = new ProductClientImpl();
    global.fetch = jest.fn().mockRejectedValue(new TypeError());
    return expect(client.list()).rejects.toThrow(Error);
  });

  test("プロダクト情報の取得で正常なレスポンスを受け取る", () => {
    const id: number = 1;
    const client: ProductClient = new ProductClientImpl();
    const productClientMock = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () =>
          new Promise((response) =>
            response({
              id: 1,
            })
          ),
      });
    global.fetch = jest.fn().mockImplementation(productClientMock);
    return expect(client.get(id)).resolves.toStrictEqual({ id: 1 });
  });

  test("プロダクト情報の取得で404が返る", () => {
    const id: number = 1;
    const client: ProductClient = new ProductClientImpl();
    const productClientMock = () =>
      Promise.resolve({
        ok: false,
        status: 404,
      });
    global.fetch = jest.fn().mockImplementation(productClientMock);
    return expect(client.get(id)).rejects.toThrow(Error);
  });

  test("プロダクト情報の取得で例外が発生する", () => {
    const id: number = 1;
    const client: ProductClient = new ProductClientImpl();
    global.fetch = jest.fn().mockRejectedValue(new TypeError());
    return expect(client.get(id)).rejects.toThrow(Error);
  });
});
