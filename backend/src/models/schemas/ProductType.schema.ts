export const productTypes = ['drink', 'icescream', 'food'] as const
type ProductType = (typeof productTypes)[number]

export default ProductType
