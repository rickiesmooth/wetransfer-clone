import { getFileSize } from "./size";
describe("util:size", () => {
  test("should never round down to 0KB", () => {
    expect(getFileSize(0)).toEqual("1KB");
  });
});
