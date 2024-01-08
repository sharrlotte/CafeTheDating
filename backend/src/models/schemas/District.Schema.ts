import Ward from "@/models/schemas/Wards.schema"

export default interface District {
  name: string
  code: number
  codename: string
  division_type: string
  phone_code: number
  wards: Ward[]
}
