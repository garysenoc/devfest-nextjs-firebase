import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  getFirestore,
  deleteDoc,
} from 'firebase/firestore';
import { useCallback } from 'react';
import { db } from '../firebase/firebase';

export type PostModelObject = {
  id?: string;
  title: string;
  description: string;
  image: string;
};

type TPostModel = {
  fetchPosts: () => Promise<Array<PostModelObject>>;
  addPost: (post: PostModelObject) => Promise<string>;
  deletePost: (id: string) => Promise<void>;
  updatePost: (id: string, post: PostModelObject) => Promise<void>;
};

const PostModel = (): TPostModel => {
  //retrieve Post
  const fetchPosts = useCallback(async (): Promise<Array<PostModelObject>> => {
    const snapshot = await getDocs(collection(db, 'post'));
    const data: Array<any> = [];

    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data as Array<PostModelObject>;
  }, []);

  //CRUD: create
  const addPost = useCallback(
    async (post: PostModelObject): Promise<string> => {
      const response = await addDoc(collection(db, 'post'), post);

      return response.id;
    },
    [],
  );

  //CRUD: delete
  const deletePost = useCallback(async (id: string): Promise<void> => {
    //alert('deleted');

    const fieldToDelete = doc(db, 'post', id);

    return await deleteDoc(fieldToDelete);
  }, []);

  //CRUD: update
  const updatePost = useCallback(
    async (id: string, post: PostModelObject): Promise<void> => {
      const fieldRef = doc(db, 'post', id);

      const response = await updateDoc(fieldRef, post);

      return response;

      // alert("Admin Posted with ID: " + response.id);
    },
    [],
  );

  return {
    fetchPosts,
    addPost,
    deletePost,
    updatePost,
  };
};

export default PostModel;

