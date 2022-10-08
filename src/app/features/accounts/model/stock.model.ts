export interface Stock {
  id: number,
  stockId: number
  name: string,
  ticker: string,
  price: number
  quantity: number,
  reservedQuantity: number,
  purchasedAt: Date
}
