import getImage from "./images.js";
import { PLACE, FOOD, HOTEL, ALL } from "./utils.js";

let arr = []
export const populate = async () => {

  const response = await fetch('https://dummyjson.com/posts');
  const data = await response.json();

  const categories = [FOOD, PLACE, HOTEL];
  arr = data.posts.map(post => ({
    userId: post.userId,
    id: post.id,
    title: post.title,
    image: getImage(post.id, categories[post.id % 3]),
    body: post.body,
    tags: post.tags,
    category: categories[post.id % 3],
    name: "John Doe",
    email: "M2g5H@example.com",
    country: "India",
    city: "Delhi",
    views: post.views,
  }));

  return {
    allPosts: arr,
    count: arr.length,
  };
};

export const getFiltered = (category) => {
  if (category === ALL) return arr;
  
  return arr.filter((element) => element.category === category);
};

export const getDeepFiltered = (obj) => {
  if (obj.category === ALL) {
    return arr.filter((x) => x.country === obj.country && x.city === obj.city);
  } else {
    return arr.filter(
      (x) =>
        x.category === obj.category &&
        x.country === obj.country &&
        x.city === obj.city
    );
  }
};

export const addPost = (post) => {
  post.id = arr.length + 1;
  arr = [post, ...arr];

  let count = arr.length - 100;
  localStorage.setItem("count", count);
  localStorage.setItem(count, JSON.stringify(post));

  return arr;
};
