import { API_URL, CURRENT_USER_ID } from './config';

// Small helper so every call handles errors the same way.
async function request(path, options) {
  const res = await fetch(`${API_URL}${path}`, options);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

// Images are stored as "/images/..." paths in the database.
export const imageUrl = (path) => `${API_URL}${path}`;

export const fetchPosts = () => request('/posts');

// Returns { currentUser, users, requestedIds }
export const fetchUsers = () => request(`/users?currentUserId=${CURRENT_USER_ID}`);

export const sendConnectRequest = (toUserId) =>
  request('/connect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: CURRENT_USER_ID, to: toUserId }),
  });
