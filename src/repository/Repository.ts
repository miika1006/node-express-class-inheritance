/**
 * Using any
 * TODO: type
 */
export interface AppRepository {
  get: () => any[];
  getById: (id: number) => any;
  deleteById: (id: number) => void;
  create: (item: any) => any;
  update: (id: number, item: any) => any;
}
/**
 * just for this sample app
 * TODO:
 */
let data = [
  {
    id: 1,
    name: "test",
  },
];
/**
 * generate id
 * used just for sample
 * TODO:
 */
const generateId = () => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  return maxId + 1;
};
/**
 * Repository
 * Using any
 * TODO: type
 */
export default class Repository implements AppRepository {
  /**
   * get all
   */
  get = () => data;
  /**
   * get by id
   * @param id identifier
   */
  getById = (id: number) => data.find((i) => i.id === id);
  /**
   * delete by id
   * @param id identifier
   */
  deleteById = (id: number) => {
    data = data.filter((item) => item.id !== id);
  };
  /**
   * create
   * @param item any item
   */
  create = (item: any) => {
    item.id = generateId();
    data = data.concat(item);
    return item;
  };
  /**
   * update by id
   * @param id identifier
   * @param item to update
   */
  update = (id: number, item: any) => {
    data = data.map((i) => (i.id === id ? item : i));
    return item;
  };
}
export const repository = () => new Repository();
