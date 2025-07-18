# 📝 server-impl

> **2025.07.18 시험 과제**  
> Spring Boot + React 기반의 **회원 & 게시판 서비스**

프론트엔드와 백엔드를 분리하여 `frontend/`, `backend/` 폴더로 구성된 풀스택 프로젝트입니다.

---

## 📌 개요

- 사용자는 **회원가입 및 로그인 후**, 게시글을 **작성 / 조회 / 수정 / 삭제**할 수 있습니다.
- **JWT 인증 기반**으로 로그인 유지가 가능하며,
- 프론트는 React(Vite), 백엔드는 Spring Boot(MyBatis)로 구현되었습니다.

---

## 🛠 기술 스택

### 🖥️ 백엔드
- Java 17
- Spring Boot 3.x
- MyBatis
- JWT(Json Web Token)
- MySQL

### 🌐 프론트엔드
- React + Vite
- Axios
- React Router DOM
- LocalStorage (토큰 및 userId 저장)

---

## 🚀 실행 방법

### 🔧 백엔드 실행

```bash
cd backend

# 🔸 application.properties 설정 필요
# (MySQL 접속 정보 등 작성)

./gradlew bootRun
````

### 💻 프론트엔드 실행

```bash
cd frontend

# 🔸 .env 파일 생성
# VITE_API_BASE_URL=http://localhost:8080

npm install
npm run dev
```

---

## ✨ 주요 기능

* ✅ 회원가입 / 로그인 (JWT 인증)
* ✅ 내 정보 조회 / 수정
* ✅ 게시글 목록 조회 (최신순 + 페이지네이션)
* ✅ 게시글 작성 / 수정 / 삭제 (작성자 본인만 가능)
* ✅ 게시글 클릭 시 모달로 상세 보기
* ✅ 썸네일 이미지 표시 (이미지 없는 경우 생략)
* ✅ 로그인 유지 (localStorage 활용)

---

## 🗂 폴더 구조

```
server-impl/
├── backend/       # Spring Boot 백엔드
│   └── src/
│   └── build.gradle
│   └── application.properties (git 제외됨)
│   └── database.sql
├── frontend/      # React 프론트엔드
│   └── src/
│   └── .env (git 제외됨)
└── README.md
```

---

## ⚠️ 주의사항

* `application.properties` 및 `.env`는 **`.gitignore`에 포함**되어 있어 GitHub에 업로드되지 않습니다.
* MySQL 접속 정보 및 포트 설정은 **본인의 개발 환경에 맞게 수정**해야 합니다.
* 게시글 수정/삭제는 반드시 **작성자 본인일 때만 허용**됩니다.

---

## 🙌 기여자

| 이름              | GitHub 링크                                                        |
| --------------- | ---------------------------------------------------------------- |
| **LeeHwon0217** | [https://github.com/LeeHwon0217](https://github.com/LeeHwon0217) |

---

## 🧠 참고 파일

* 📄 `database.sql` : DB 테이블 생성 및 주요 MyBatis 쿼리 정리
* 📂 `.gitignore` : 보안/빌드 파일은 Git에서 제외

---

## ✅ 사용 방법

1. `server-impl/README.md` 파일 열기
2. 위 내용 전체 복사해서 붙여넣기
3. 저장 후 커밋:

```bash
git add README.md
git commit -m "Update README with project overview and instructions"
git push origin main
````
