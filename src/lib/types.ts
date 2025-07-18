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

export interface BlogComment {
  id: string;
  author: string;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  content: string[];
  category: string;
  date: string;
  image: string;
  dataAiHint: string;
  comments?: BlogComment[];
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: ForumReply[];
}
