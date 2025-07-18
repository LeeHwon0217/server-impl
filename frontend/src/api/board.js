import axios from "axios";

const BASE_URL = '/api/posts';

// 게시글 등록
export const createPost = async (post, token) => {
  const res = await axios.post(BASE_URL, post, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
  return res.data;
};

// 게시글 목록 조회 (페이징)
export const getPosts = async (page = 1, size = 10) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true
  });
  return res.data;
};

// ✅ 게시글 단건 조회
export const getPostById = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  });
  return res.data;
};

// ✅ 게시글 수정
export const updatePost = async (id, post, token) => {
  const res = await axios.put(`${BASE_URL}/${id}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
  return res.data;
};

// ✅ 게시글 삭제
export const deletePost = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true
  });
  return res.data;
};
