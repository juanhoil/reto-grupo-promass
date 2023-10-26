import { create } from "zustand";

interface PostsState {
  posts: IPost[];
}

export const usePostsStore = create<PostsState>(() => ({
  posts: [],
}));

export const setPosts = (posts: IPost[]) =>
  usePostsStore.setState({ posts });
