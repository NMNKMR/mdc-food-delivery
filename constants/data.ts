import { Ionicons } from "@expo/vector-icons";
import { ImageSourcePropType } from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

export type Category = {
  id: string;
  name: string;
  icon?: IconName;
};

export type Restaurant = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  cuisine: string;
  rating: number;
  reviews: number;
  distance: string;
  deliveryTime: string;
  priceRange?: string;
  tags?: string[];
};

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "salads", name: "Salads", icon: "leaf-outline" },
  { id: "bowls", name: "Bowls", icon: "restaurant-outline" },
  { id: "smoothies", name: "Smoothies", icon: "wine-outline" },
  { id: "wraps", name: "Wraps", icon: "fast-food-outline" },
  { id: "grains", name: "Grains", icon: "nutrition-outline" },
  { id: "protein", name: "Protein", icon: "barbell-outline" },
  { id: "soups", name: "Soups", icon: "cafe-outline" },
  { id: "juices", name: "Juices", icon: "water-outline" },
];

export const topRated: Restaurant[] = [
  {
    id: "r1",
    name: "Green Bowl Kitchen",
    image: require("../assets/images/items/menu-item1-resize.png"),
    cuisine: "Bowls & Salads",
    rating: 4.8,
    reviews: 1240,
    distance: "1.2 km",
    deliveryTime: "20-25 min",
  },
  {
    id: "r2",
    name: "Sprout & Spoon",
    image: require("../assets/images/items/menu-item2-resize.png"),
    cuisine: "Vegan",
    rating: 4.7,
    reviews: 980,
    distance: "0.8 km",
    deliveryTime: "15-20 min",
  },
  {
    id: "r3",
    name: "The Verdant Plate",
    image: require("../assets/images/items/menu-item3-resize.png"),
    cuisine: "Mediterranean",
    rating: 4.6,
    reviews: 720,
    distance: "2.1 km",
    deliveryTime: "25-30 min",
  },
  {
    id: "r4",
    name: "Harvest Table",
    image: require("../assets/images/items/menu-item4-resize.png"),
    cuisine: "Farm to Table",
    rating: 4.9,
    reviews: 2100,
    distance: "1.6 km",
    deliveryTime: "20-25 min",
  },
  {
    id: "r5",
    name: "Wholesome Eats",
    image: require("../assets/images/items/menu-item5-resize.png"),
    cuisine: "Grain Bowls",
    rating: 4.5,
    reviews: 560,
    distance: "1.0 km",
    deliveryTime: "15-20 min",
  },
  {
    id: "r6",
    name: "Quinoa Quarters",
    image: require("../assets/images/items/menu-item6-resize.png"),
    cuisine: "Power Bowls",
    rating: 4.7,
    reviews: 870,
    distance: "2.4 km",
    deliveryTime: "25-30 min",
  },
  {
    id: "r7",
    name: "Avocado Avenue",
    image: require("../assets/images/items/menu-item7-resize.png"),
    cuisine: "Brunch & Toasts",
    rating: 4.6,
    reviews: 1150,
    distance: "0.6 km",
    deliveryTime: "15-20 min",
  },
  {
    id: "r8",
    name: "Leaf & Grain",
    image: require("../assets/images/items/menu-item8-resize.png"),
    cuisine: "Salads & Wraps",
    rating: 4.8,
    reviews: 1420,
    distance: "1.8 km",
    deliveryTime: "20-25 min",
  },
];

export const featured: Restaurant[] = [
  {
    id: "f1",
    name: "Bloom Bistro",
    image: require("../assets/images/items/menu-item9-resize.png"),
    cuisine: "Seasonal · Plant Forward",
    rating: 4.9,
    reviews: 2680,
    distance: "1.4 km",
    deliveryTime: "20-25 min",
    tags: ["New", "Eco-friendly"],
  },
  {
    id: "f2",
    name: "Pure Plates",
    image: require("../assets/images/items/menu-item10-resize.png"),
    cuisine: "Clean Eating",
    rating: 4.8,
    reviews: 1950,
    distance: "2.0 km",
    deliveryTime: "25-30 min",
    tags: ["Bestseller"],
  },
  {
    id: "f3",
    name: "Fresh Press Co.",
    image: require("../assets/images/items/menu-item11-resize.png"),
    cuisine: "Cold Pressed Juices",
    rating: 4.7,
    reviews: 1320,
    distance: "0.9 km",
    deliveryTime: "15-20 min",
    tags: ["Free delivery"],
  },
  {
    id: "f4",
    name: "Garden Gourmet",
    image: require("../assets/images/items/menu-item12-resize.png"),
    cuisine: "Vegetarian Fine Dining",
    rating: 4.9,
    reviews: 3100,
    distance: "2.6 km",
    deliveryTime: "30-35 min",
    tags: ["Chef's pick"],
  },
];

export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
  category: string;
};

export const menuCategories: MenuCategory[] = [
  { id: "popular", name: "Popular" },
  { id: "bowls", name: "Bowls" },
  { id: "salads", name: "Salads" },
  { id: "wraps", name: "Wraps" },
  { id: "smoothies", name: "Smoothies" },
];

export type OrderStatus = "placed" | "preparing" | "on-the-way" | "delivered";

export type ActiveOrder = {
  id: string;
  orderNumber: string;
  restaurantName: string;
  image: ImageSourcePropType;
  itemCount: number;
  status: Exclude<OrderStatus, "delivered">;
  etaMinutes: number;
  rider?: { name: string };
};

export type PastOrder = {
  id: string;
  restaurantName: string;
  image: ImageSourcePropType;
  date: string;
  total: number;
  status: "delivered" | "cancelled";
};

export const activeOrders: ActiveOrder[] = [
  {
    id: "o1",
    orderNumber: "88219",
    restaurantName: "Green Bowl Kitchen",
    image: require("../assets/images/items/menu-item1-resize.png"),
    itemCount: 3,
    status: "preparing",
    etaMinutes: 15,
    rider: { name: "Shivam" },
  },
];

export const pastOrders: PastOrder[] = [
  {
    id: "p1",
    restaurantName: "Avocado Avenue",
    image: require("../assets/images/items/menu-item7-resize.png"),
    date: "Oct 24",
    total: 325,
    status: "delivered",
  },
  {
    id: "p2",
    restaurantName: "Sprout & Spoon",
    image: require("../assets/images/items/menu-item2-resize.png"),
    date: "Oct 21",
    total: 450,
    status: "delivered",
  },
  {
    id: "p3",
    restaurantName: "The Verdant Plate",
    image: require("../assets/images/items/menu-item5-resize.png"),
    date: "Oct 18",
    total: 285,
    status: "delivered",
  },
];

export const menu: MenuItem[] = [
  {
    id: "m1",
    name: "Buddha Power Bowl",
    description:
      "Quinoa, roasted veggies, chickpeas, avocado and tahini dressing.",
    price: 399,
    image: require("../assets/images/items/menu-item1-resize.png"),
    category: "popular",
  },
  {
    id: "m2",
    name: "Salmon Quinoa Bowl",
    description:
      "Grilled salmon over fluffy quinoa with kale and citrus vinaigrette.",
    price: 549,
    image: require("../assets/images/items/menu-item2-resize.png"),
    category: "popular",
  },
  {
    id: "m3",
    name: "Avocado Toast",
    description:
      "Toasted sourdough, smashed avocado, hemp seeds and microgreens.",
    price: 319,
    image: require("../assets/images/items/menu-item3-resize.png"),
    category: "popular",
  },
  {
    id: "m4",
    name: "Acai Power Bowl",
    description:
      "Acai blend topped with granola, berries, banana and a drizzle of honey.",
    price: 449,
    image: require("../assets/images/items/menu-item4-resize.png"),
    category: "popular",
  },
  {
    id: "m5",
    name: "Mediterranean Bowl",
    description:
      "Couscous, feta, kalamata olives, falafel and tzatziki sauce.",
    price: 459,
    image: require("../assets/images/items/menu-item5-resize.png"),
    category: "bowls",
  },
  {
    id: "m6",
    name: "Asian Sesame Bowl",
    description:
      "Brown rice, edamame, sesame seeds and ginger-soy glaze.",
    price: 399,
    image: require("../assets/images/items/menu-item6-resize.png"),
    category: "bowls",
  },
  {
    id: "m7",
    name: "Burrito Bowl",
    description:
      "Black beans, brown rice, salsa, guacamole and cilantro lime crema.",
    price: 429,
    image: require("../assets/images/items/menu-item7-resize.png"),
    category: "bowls",
  },
  {
    id: "m8",
    name: "Caesar Kale Salad",
    description:
      "Crisp kale tossed with shaved parmesan, croutons and lemon dressing.",
    price: 349,
    image: require("../assets/images/items/menu-item8-resize.png"),
    category: "salads",
  },
  {
    id: "m9",
    name: "Rainbow Salad",
    description:
      "Mixed greens, beets, carrots, sprouts with citrus vinaigrette.",
    price: 329,
    image: require("../assets/images/items/menu-item9-resize.png"),
    category: "salads",
  },
  {
    id: "m10",
    name: "Veggie Hummus Wrap",
    description:
      "Whole grain wrap with hummus, roasted veggies and sprouts.",
    price: 279,
    image: require("../assets/images/items/menu-item10-resize.png"),
    category: "wraps",
  },
  {
    id: "m11",
    name: "Green Goddess",
    description: "Spinach, mango, banana, coconut water and lime.",
    price: 249,
    image: require("../assets/images/items/menu-item11-resize.png"),
    category: "smoothies",
  },
  {
    id: "m12",
    name: "Berry Burst",
    description: "Strawberry, blueberry, almond milk and chia.",
    price: 269,
    image: require("../assets/images/items/menu-item12-resize.png"),
    category: "smoothies",
  },
];
