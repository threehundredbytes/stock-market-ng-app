export interface Stock {
  id: number,
  name: string,
  ticker: string,
  price: number
  quantity: number,
  reservedQuantity: number,
  purchasedAt: Date
}
