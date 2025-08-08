export const data = [
  {
    id: 1,
    name: "Task One",
    category: "Work",
    icon: "briefcase",
    status: "in progress",
  },
  {
    id: 2,
    name: "Task Two",
    category: "Personal",
    icon: "user",
    status: "pending",
  },
  {
    id: 3,
    name: "Task Three",
    category: "Shopping",
    icon: "shopping-cart",
    status: "completed",
  },
  {
    id: 4,
    name: "Task Four",
    category: "Fitness",
    icon: "activity",
    status: "archived",
  },
  {
    id: 5,
    name: "Task Five",
    category: "Travel",
    icon: "map",
    status: "in progress",
  },
];

export type Item = {
  id: number;
  name: string;
  category: string;
  icon: string;
};
export const categories = ["Work", "Personal", "Shopping", "Fitness", "Travel"];
