import District from "@/models/schemas/District.Schema"

export default interface Province {
  name: string
  code: number
  codename: string
  division_type: string
  phone_code: number
  districts: District[]
}
