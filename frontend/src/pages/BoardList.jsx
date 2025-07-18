"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getPosts } from "../api/board"
import axios from "axios"
import "./BoardList.css"

export default function BoardList() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasmore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const observer = useRef()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userId = Number.parseInt(localStorage.getItem("userId"), 10)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await getPosts(page, 10)
        if (data.length === 0) {
          setHasmore(false)
        } else {
          setPosts((prev) => {
            const merged = [...prev, ...data]
            const unique = Array.from(new Map(merged.map((p) => [p.id, p])).values())
            return unique
          })
        }
      } finally {
        setLoading(false)
      }
    }
    if (hasMore) load()
  }, [page, hasMore])

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      alert("삭제되었습니다.")
      setPosts((prev) => prev.filter((p) => p.id !== id))
      setSelectedPost(null)
    } catch (err) {
      alert("삭제에 실패했습니다.")
    }
  }

  const handleEdit = (postId) => {
    navigate(`/board/write?id=${postId}`)
  }

  return (
    <div className="board-container">
      <div className="board-content">
        {/* 헤더 섹션 */}
        <div className="board-header">
          <h2 className="board-title">게시판</h2>
          <button className="write-button" onClick={() => navigate("/board/write")}>
            글쓰기
          </button>
        </div>

        {/* 게시글 목록 */}
        {posts.length === 0 && !loading ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p className="empty-state-text">아직 게시글이 없습니다.</p>
          </div>
        ) : (
          <ul className="posts-list">
            {posts.map((post, idx) => (
              <li
                key={`post-${post.id}`}
                ref={idx === posts.length - 1 ? lastPostRef : null}
                className="post-item"
                onClick={() => setSelectedPost(post)}
              >
                <h3 className="post-title">{post.title}</h3>
                <div className="post-meta">
                  <span className="post-author">{post.writerName}</span>
                  <span className="post-date">{new Date(post.createdAt).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* 로딩 인디케이터 */}
        {loading && (
          <div className="loading-indicator">
            <div className="loading-spinner"></div>
            게시글을 불러오는 중...
          </div>
        )}

        {/* 모달 */}
        {selectedPost && (
          <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">{selectedPost.title}</h3>
                <div className="modal-meta">
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">작성자:</span>
                    <span>{selectedPost.writerName}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="modal-meta-label">작성일:</span>
                    <span>{new Date(selectedPost.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="modal-body">
                <p className="modal-content-text">{selectedPost.content}</p>
              </div>

              <div className="modal-actions">
                {Number(userId) === Number(selectedPost.writerId) && (
                  <>
                    <button className="modal-button edit-button" onClick={() => handleEdit(selectedPost.id)}>
                      수정
                    </button>
                    <button className="modal-button delete-button" onClick={() => handleDelete(selectedPost.id)}>
                      삭제
                    </button>
                  </>
                )}
                <button className="modal-button close-button" onClick={() => setSelectedPost(null)}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
