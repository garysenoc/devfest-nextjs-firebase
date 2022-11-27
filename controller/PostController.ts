import PostModel, { PostModelObject } from '../model/PostModel';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebase';
//export type PostModel = model.PostModel;
import { useCallback } from 'react';
import { v4 } from 'uuid';

export type ModelObject = PostModelObject;

type TPostController = {
  requestFetch: () => Promise<Array<PostModelObject>>;
  requestAdd: (post: PostModelObject) => Promise<string>;
  requestDelete: (id: any) => Promise<void>;
  requestUpdate: (id: string, post: PostModelObject) => Promise<void>;
};

const PostController = (): TPostController => {
  const model = PostModel();
  const { fetchPosts, addPost, deletePost, updatePost } = model;

  const requestFetch = useCallback(async (): Promise<
    Array<PostModelObject>
  > => {
    const response = await fetchPosts();
    console.log(response);

    return response as Array<PostModelObject>;
  }, [fetchPosts]);
  const requestAdd = useCallback(
    async (post: PostModelObject): Promise<string> => {
      const response = await addPost(post);

      return response;
    },
    [addPost],
  );
  const requestDelete = useCallback(
    async (id: any) => {
      return await deletePost(id);
    },
    [deletePost],
  );
  const requestUpdate = useCallback(
    async (id: string, post: PostModelObject) => {
      return await updatePost(id, post);
    },
    [updatePost],
  );

  return {
    requestFetch,
    requestAdd,
    requestDelete,
    requestUpdate,
  };
};

export default PostController;

