import IPost from "../interface/post.interface";

 const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: IPost[] = await response.json();
  const data = posts.map((post, index) => {
    return { ...post, index };
  });
  console.log(data);
};

export default getPosts