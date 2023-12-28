export const productTypes = ['drink', 'icescream', 'food', 'cafe', 'milk' ,'cake','cream'] as const
type ProductType = (typeof productTypes)[number]

export default ProductType
