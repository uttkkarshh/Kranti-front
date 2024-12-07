import api from './api';

/**
 * Create a new comment.
 * @param {Object} commentData - The data for the new comment (content, postId, authorId, etc.).
 * @returns {Promise<Object>} - The created comment.
 */
export const createComment = (commentDto) => api.post('/comments', commentDto);

/**
 * Fetch all comments for a specific post.
 * @param {number} postId - The ID of the post.
 * @returns {Promise<Array>} - A list of comments for the specified post.
 */
export const getCommentsByPostId = (postId) => api.get(`/comments/post/${postId}`);

/**
 * Fetch all comments by a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - A list of comments by the specified user.
 */
export const getCommentsByUserId = (userId) => api.get(`/comments/user/${userId}`);

/**
 * Update a comment by its ID.
 * @param {number} commentId - The ID of the comment to update.
 * @param {Object} updatedCommentData - The updated comment data (e.g., content).
 * @returns {Promise<Object>} - The updated comment.
 */
export const updateComment = (commentId, updatedCommentData) =>
  api.put(`/comments/${commentId}`, updatedCommentData);

/**
 * Delete a comment by its ID.
 * @param {number} commentId - The ID of the comment to delete.
 * @returns {Promise<string>} - A success message.
 */
export const deleteComment = (commentId) => api.delete(`/comments/${commentId}`);
