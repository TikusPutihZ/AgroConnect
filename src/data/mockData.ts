export interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number | null;
  category: string;
  distance: string;
  postedAt: string;
  user: {
    name: string;
    avatar: string;
  };
  quantity: string;
  soldOut?: boolean;
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar: string;
  stats: {
    givenAway: number;
    sold: number;
    followers: number;
  };
}

export const categories = [
  { id: "fruits", label: "🍅 Fruits", emoji: "🍅" },
  { id: "vegetables", label: "🥬 Vegetables", emoji: "🥬" },
  { id: "herbs", label: "🌿 Herbs", emoji: "🌿" },
  { id: "seeds", label: "🌱 Seeds", emoji: "🌱" },
  { id: "flowers", label: "🌸 Flowers", emoji: "🌸" },
  { id: "others", label: "🌾 Others", emoji: "🌾" },
];

export const posts: Post[] = [
  {
    id: "1",
    title: "Cherry Tomatoes",
    description: "Freshly picked cherry tomatoes from my backyard garden! Sweet and juicy, perfect for salads. Organically grown with no pesticides. Come pick them up anytime this weekend.",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
    price: null,
    category: "fruits",
    distance: "0.3 km",
    postedAt: "2 hours ago",
    user: { name: "Aisha Binti Rahman", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    quantity: "2 kg",
  },
  {
    id: "2",
    title: "Fresh Basil Bunch",
    description: "Fragrant Thai basil, freshly cut this morning. Great for cooking tom yam or stir fry. I have way too much growing in my garden!",
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?w=400&h=400&fit=crop",
    price: 3,
    category: "herbs",
    distance: "0.5 km",
    postedAt: "5 hours ago",
    user: { name: "Raj Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
    quantity: "3 bunches",
  },
  {
    id: "3",
    title: "Ripe Mangoes",
    description: "Harum manis mangoes from my tree. Super sweet and fragrant. Tree produced too many this season, so sharing with neighbors!",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    price: 5,
    category: "fruits",
    distance: "1.2 km",
    postedAt: "1 day ago",
    user: { name: "Siti Nurhaliza", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
    quantity: "5 pieces",
    soldOut: true,
  },
  {
    id: "4",
    title: "Kangkung (Water Spinach)",
    description: "Fresh kangkung harvested this morning. Perfect for belacan stir-fry. Grown in my home garden with clean water.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    price: null,
    category: "vegetables",
    distance: "0.8 km",
    postedAt: "3 hours ago",
    user: { name: "Ahmad Faizal", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
    quantity: "1 kg",
  },
  {
    id: "5",
    title: "Chili Padi Seeds",
    description: "Seeds from my prolific chili padi plant. Easy to grow in pots. Perfect for beginners! Comes with simple planting instructions.",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400&h=400&fit=crop",
    price: 2,
    category: "seeds",
    distance: "2.0 km",
    postedAt: "6 hours ago",
    user: { name: "Lee Wei Ming", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
    quantity: "1 packet",
  },
  {
    id: "6",
    title: "Pandan Leaves",
    description: "Fresh pandan leaves from my garden. Makes your rice and desserts smell amazing. Cut fresh daily!",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=400&fit=crop",
    price: null,
    category: "herbs",
    distance: "0.4 km",
    postedAt: "1 hour ago",
    user: { name: "Nurul Izzah", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face" },
    quantity: "10 leaves",
  },
  {
    id: "7",
    title: "Papaya",
    description: "Sweet ripe papaya from my tree. It's producing faster than we can eat! Come grab some before they go bad.",
    image: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400&h=400&fit=crop",
    price: null,
    category: "fruits",
    distance: "1.5 km",
    postedAt: "4 hours ago",
    user: { name: "Muthu Samy", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
    quantity: "3 pieces",
  },
  {
    id: "8",
    title: "Rosemary Plant",
    description: "Healthy rosemary plant in a small pot. Low maintenance, great for cooking. Smells wonderful!",
    image: "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=400&h=400&fit=crop",
    price: 8,
    category: "herbs",
    distance: "3.0 km",
    postedAt: "2 days ago",
    user: { name: "Sarah Tan", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" },
    quantity: "1 pot",
  },
];

export const mapPins = [
  { id: "1", lat: 3.155, lng: 101.715, title: "Cherry Tomatoes", emoji: "🍅", price: null },
  { id: "2", lat: 3.158, lng: 101.720, title: "Fresh Basil", emoji: "🌿", price: 3 },
  { id: "3", lat: 3.150, lng: 101.710, title: "Ripe Mangoes", emoji: "🥭", price: 5 },
  { id: "4", lat: 3.162, lng: 101.718, title: "Kangkung", emoji: "🥬", price: null },
  { id: "5", lat: 3.148, lng: 101.725, title: "Chili Padi Seeds", emoji: "🌶️", price: 2 },
  { id: "6", lat: 3.160, lng: 101.712, title: "Pandan Leaves", emoji: "🌿", price: null },
];

export const currentUser: UserProfile = {
  name: "Ahmad Faizal",
  bio: "Avid tomato grower 🍅 | Sharing is caring | Taman Melawati",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  stats: {
    givenAway: 24,
    sold: 12,
    followers: 156,
  },
};