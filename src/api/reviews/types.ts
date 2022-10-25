export interface Review {
  user: UserData;
  id: string;
  text: string;
  rating: number;
  time_created: string;
}

// Note this is the info needed to run the Google Vision API part
// specifically the image_url
export interface UserData {
  id: string;
  name: string;
  profile_url: string;
  image_url: string;
}
