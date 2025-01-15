export interface ProductAmount {
  productName: string
  amount: number
}

export interface ProductPercentage {
  productName: string
  percentage: number
}

export interface YearlyProductData {
  year: number
  products: ProductAmount[]
}

export interface YearlyProductPercentage {
  year: number
  products: ProductPercentage[]
}

export interface ProductSettings {
  productName: string
  isVisible: boolean
  color: string
}
