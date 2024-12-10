import api from './api';

export const login = (user) => api.post('users/login', user);
export const register = (user) => api.post('users/register', user);
export const getUserById = (id) => api.get(`/users/${id}`);
export const getAllUsers = () => api.get('/users/allusers');
export const searchUsersByName = (name) => api.get(`/users/search?name=${name}`);
export const followUser = (id, followerId) => api.post(`/users/${id}/follow?followerId=${followerId}`);
export const approveFollowRequest = (requestId) =>
  api.post(`/users/followapprove?requestId=${ requestId }`);
export const rejectFollowRequest = (id, followerId) =>
  api.post(`/users/${id}/followreject?follwerId=${ followerId }`);
export const findUser=(name)=> api.get(`users/user?name=${name}`)
export const getnotification=(id)=> api.get(`/follow/${id}/request`)
export const getfollowers=(id)=>api.get(`/follow/${id}/followers`)
export const getfollowing=(id)=>api.get(`/follow/${id}/following`)
export const createEvent=(eventData)=>api.post('/events/create',eventData)
export const searchEventsByTitle=(title)=>api.get(`events/title/${title}`)
export const searchEventsByLocation=(data)=>api.get(`events/nearby?latitude=${data.latitude}&longitude=${data.longitude}&radius=${data.radius}`)