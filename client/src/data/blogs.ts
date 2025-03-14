// src/data/blogs.ts
export interface Blog {
    id: number;
    title: string;
    author: string;
    date: string;
    category: string;
    imageUrl: string;
    description: string;
    authorImageUrl?: string; // Optional field for author's image URL
  }

// src/data/blogs.ts
export const blogsArray: Blog[] = [
    {
      id: 1,
      title: "Train Or Bus Journey? Which one suits?",
      author: "John Dohsas",
      date: "13 March 2023",
      category: "Travel",
      imageUrl: "/blog3.jpeg",
      description: "The choice between a train or bus journey depends on various factors such as distance, time, cost, and personal preference...",
      authorImageUrl: "/avatar1.png", // Example author image URL
    },
    {
      id: 2,
      title: "The Future of Electric Vehicles",
      author: "Sarah Lee",
      date: "20 April 2023",
      category: "Technology",
      imageUrl: "/blog1.jpeg",
      description: "Electric vehicles are revolutionizing the automotive industry with advancements in battery technology and charging infrastructure...",
      authorImageUrl: "/avatar2.svg", // Example author image URL
    },
    {
      id: 3,
      title: "Mastering Home Gardening",
      author: "Emma Watson",
      date: "5 May 2023",
      category: "Lifestyle",
      imageUrl: "/blog2.jpeg",
      description: "Learn essential tips for creating a thriving home garden, from soil preparation to plant selection and maintenance...",
      authorImageUrl: "/avatar3.svg", // Example author image URL
    },
    {
      id: 4,
      title: "AI in Modern Healthcare",
      author: "Dr. Michael Chen",
      date: "18 June 2023",
      category: "Health",
      imageUrl: "/blog4.jpeg",
      description: "Artificial Intelligence is transforming healthcare through predictive diagnostics, personalized treatment plans, and medical research...",
      authorImageUrl: "/avatar4.svg", // Example author image URL
    }
  ];
