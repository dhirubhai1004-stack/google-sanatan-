
export enum PoojaType {
  SATYANARAYAN = "Satyanarayan Puja",
  GRIHA_PRAVESH = "Griha Pravesh Puja",
  VAHANA = "Vahana Puja",
  HAVAN = "Havan / Yagna",
  SHRADDHA = "Shraddha Karma",
  NAVAGRAHA = "Navagraha Shanti",
  VASTU = "Vastu Shanti",
  SPECIAL = "Special Custom Puja"
}

export interface BookingDetails {
  name: string;
  phone: string;
  poojaType: PoojaType;
  date: string;
  specialRequests: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  avatarUrl: string;
}
