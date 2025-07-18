-- ============================
-- ✅ 테이블 생성 구문
-- ============================

-- 회원 테이블
CREATE TABLE member (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        username VARCHAR(100) NOT NULL UNIQUE,
                        password VARCHAR(255) NOT NULL,
                        name VARCHAR(100) NOT NULL
);

-- 게시글 테이블
CREATE TABLE post (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      title VARCHAR(200) NOT NULL,
                      content TEXT NOT NULL,
                      writer_id INT NOT NULL,
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      FOREIGN KEY (writer_id) REFERENCES member(id)
);

-- ============================
-- ✅ MyBatis 쿼리 정리 (참고용, 주석 처리)
-- ============================

-- ============================
-- 🔐 회원 기능
-- ============================

-- 회원가입
-- INSERT INTO member (username, password, name)
-- VALUES (#{username}, #{password}, #{name});

-- 사용자 이름으로 조회 (로그인 시)
-- SELECT * FROM member WHERE username = #{username};

-- 회원 정보 수정
-- UPDATE member
-- SET
--   <if test="password != null and password != ''">
--       password = #{password},
--   </if>
--   name = #{name}
-- WHERE id = #{id};

-- ============================
-- 📝 게시글 기능
-- ============================

-- 게시글 등록
-- INSERT INTO post (title, content, writer_id)
-- VALUES (#{title}, #{content}, #{writerId});

-- 게시글 목록 조회 (작성자 이름 포함 + 최신순)
-- SELECT p.*, m.name as writerName
-- FROM post p
-- JOIN member m ON p.writer_id = m.id
-- ORDER BY p.created_at DESC
-- LIMIT #{limit} OFFSET #{offset};

-- 게시글 단건 조회
-- SELECT p.*, m.name as writerName
-- FROM post p
-- JOIN member m ON p.writer_id = m.id
-- WHERE p.id = #{id};

-- 게시글 수정 (작성자 본인만)
-- UPDATE post
-- SET title = #{title}, content = #{content}
-- WHERE id = #{id} AND writer_id = #{writerId};

-- 게시글 삭제 (작성자 본인만)
-- DELETE FROM post
-- WHERE id = #{id} AND writer_id = #{userId};
