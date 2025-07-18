"use client"

import React, { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import "./BoardWrite.css"
import "./globals.css"

export default function BoardWrite() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchParams] = useSearchParams()
  const postId = searchParams.get("id")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const isEditMode = Boolean(postId)
  const titleLength = title.length
  const contentLength = content.length
  const maxTitleLength = 100
  const maxContentLength = 2000

  // 수정 모드일 경우 기존 게시글 로딩
  useEffect(() => {
    if (!postId) return

    const fetchPost = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setTitle(res.data.title)
        setContent(res.data.content)
      } catch (err) {
        setMessage("❌ 게시글을 불러오지 못했습니다.")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [postId, token])

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage("❌ 제목과 내용을 모두 입력하세요.")
      return
    }

    if (titleLength > maxTitleLength) {
      setMessage(`❌ 제목은 ${maxTitleLength}자 이내로 입력하세요.`)
      return
    }

    if (contentLength > maxContentLength) {
      setMessage(`❌ 내용은 ${maxContentLength}자 이내로 입력하세요.`)
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      if (postId) {
        // 수정 모드
        await axios.put(
          `/api/posts/${postId}`,
          { title: title.trim(), content: content.trim() },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        alert("✅ 게시글이 수정되었습니다.")
      } else {
        // 작성 모드
        await axios.post(
          "/api/posts",
          { title: title.trim(), content: content.trim() },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )
        alert("✅ 게시글이 등록되었습니다.")
      }
      navigate("/board")
    } catch (e) {
      setMessage(postId ? "❌ 수정 실패" : "❌ 등록 실패")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (window.confirm("작성 중인 내용이 있습니다. 정말 취소하시겠습니까?")) {
        navigate("/board")
      }
    } else {
      navigate("/board")
    }
  }

  return (
    <div className="board-write-container">
      <div className="board-write-content">
        <div className="board-write-card">
          {loading && (
            <div className="loading-overlay">
              <div className="loading-content">
                <div className="loading-spinner"></div>
                게시글을 불러오는 중...
              </div>
            </div>
          )}

          {/* 헤더 섹션 */}
          <div className="board-write-header">
            <h2 className={`board-write-title ${isEditMode ? "edit" : "create"}`}>
              {isEditMode ? "게시글 수정" : "새 글 작성"}
            </h2>
            <p className="board-write-subtitle">
              {isEditMode ? "게시글을 수정해주세요" : "새로운 게시글을 작성해주세요"}
            </p>
          </div>

          {/* 폼 섹션 */}
          <div className="board-write-form">
            <div className="form-group">
              <label className="form-label title">제목</label>
              <input
                className={`form-input ${titleLength > maxTitleLength ? "invalid" : titleLength > 0 ? "valid" : ""}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="게시글 제목을 입력하세요"
                maxLength={maxTitleLength + 10} // 약간의 여유를 두어 경고 표시
              />
              <div
                className={`character-counter ${
                  titleLength > maxTitleLength ? "error" : titleLength > maxTitleLength * 0.8 ? "warning" : ""
                }`}
              >
                {titleLength}/{maxTitleLength}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label content">내용</label>
              <textarea
                className={`form-textarea ${
                  contentLength > maxContentLength ? "invalid" : contentLength > 0 ? "valid" : ""
                }`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="게시글 내용을 입력하세요"
                rows={8}
              />
              <div
                className={`character-counter ${
                  contentLength > maxContentLength ? "error" : contentLength > maxContentLength * 0.8 ? "warning" : ""
                }`}
              >
                {contentLength}/{maxContentLength}
              </div>
            </div>
          </div>

          {/* 메시지 */}
          {message && <div className={`message ${message.includes("❌") ? "error" : "success"}`}>{message}</div>}

          {/* 액션 버튼들 */}
          <div className="form-actions">
            <button className="action-button cancel-button" onClick={handleCancel} disabled={isSubmitting}>
              취소
            </button>
            <button
              className={`action-button submit-button ${isEditMode ? "edit" : "create"}`}
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim()}
            >
              {isSubmitting ? "처리 중..." : isEditMode ? "수정" : "등록"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
