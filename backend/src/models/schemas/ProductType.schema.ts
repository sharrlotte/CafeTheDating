export const productTypes = ['drink', 'icescream', 'food', 'cafe'] as const
type ProductType = (typeof productTypes)[number]

export default ProductType
