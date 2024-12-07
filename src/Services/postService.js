import api from './api';
export const getFeed = () => api.get('/posts/feed'); // Fetch posts for feed
export const createPost = (postData) =>  api.post('/posts/create', postData);

export const getAllPosts = () => api.get("/posts"); // Endpoint for fetching all posts
export const getPostById = (id) => api.get(`/posts/${id}`); // Endpoint for fetching a single post
export const deletePost = (id) => api.delete(`/posts/${id}`); // Endpoint for deleting a post
// Like a post
export const likePost = (postId) => api.post(`/posts/${postId}/like`);

// Unlike a post
export const unlikePost = (postId) => api.post(`/posts/${postId}/unlike`);
