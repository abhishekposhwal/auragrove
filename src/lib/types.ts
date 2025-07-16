export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  greenScore: number;
  carbonFootprint: string;
  certifications: string[];
  brand: string;
  reviews: {
    rating: number;
    count: number;
    items: Review[];
  };
}

export interface AlternativeProduct {
  name: string;
  description:string;
  greenScore: number;
  carbonFootprint: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  dataAiHint: string;
}
