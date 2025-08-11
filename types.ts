export type RootNavigationTypes = {
  home: undefined;
  Home: undefined;
  auth: undefined;
  Settings: undefined;
  Create: undefined;
  Tasks: undefined;
  taskList: undefined;
  taskDetails: { task: Task };
};

export type Task = {
  id: string;
  title: string;
  description: string;
  completionDate: string;
  status: string;
  category: string;
};
