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
