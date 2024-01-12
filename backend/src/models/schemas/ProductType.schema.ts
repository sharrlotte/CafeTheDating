export const productTypes = ['cafe', 'milk', 'cake', 'cream'] as const
type ProductType = (typeof productTypes)[number]

export default ProductType
