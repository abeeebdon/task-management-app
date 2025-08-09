export type RootNavigationTypes = {
  home: undefined;
  Home: undefined;
  auth: undefined;
  settings: undefined;
  taskList: undefined;
  taskDetails: { task: Task };
  taskEdit: { id: string };
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completionDate: string;
  status: string;
  category: string;
  priority: "Low" | "Medium" | "High";
};
