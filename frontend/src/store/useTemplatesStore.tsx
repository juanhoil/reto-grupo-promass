import { create } from "zustand";

interface TemplatesState {
  templates: Template[];
}

export const useTemplatesStore = create<TemplatesState>(() => ({
  templates: [],
}));

export const setTemplates = (templates: Template[]) =>
  useTemplatesStore.setState({ templates });
