export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  greenScore: number;
  carbonFootprint: string;
  certifications: string[];
  brand: string;
  reviews: {
    rating: number;
    count: number;
  };
}

export interface AlternativeProduct {
  name: string;
  description:string;
  greenScore: number;
  carbonFootprint: string;
}
