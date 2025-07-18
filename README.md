# server-impl

20250718 시험 과제로 제작한 **Spring Boot + React 기반의 회원 & 게시판 서비스**입니다.  
프론트엔드와 백엔드를 분리하여 폴더별로 구성했습니다.

---

## 📌 개요

- 사용자는 회원가입 및 로그인 후 게시글을 작성/조회/수정/삭제할 수 있습니다.
- 프론트엔드는 React (Vite), 백엔드는 Spring Boot + MyBatis + JWT 인증 방식을 사용하였습니다.

---

## 🛠 기술 스택

### 백엔드
- Java 17
- Spring Boot 3.x
- MyBatis
- JWT
- MySQL

### 프론트엔드
- React + Vite
- Axios
- React Router DOM
- LocalStorage (토큰 저장)

---

## 🚀 실행 방법

### 🔧 백엔드 실행

1. `backend` 폴더로 이동
2. `application.properties` 설정
   - MySQL DB 접속 정보 입력
3. Gradle 빌드 및 실행

```bash
cd backend
./gradlew bootRun
````

### 💻 프론트엔드 실행

1. `frontend` 폴더로 이동
2. `.env` 파일 생성

```
VITE_API_BASE_URL=http://localhost:8080
```

3. 의존성 설치 및 실행

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ 주요 기능

* ✅ 회원가입 / 로그인 (JWT 인증)
* ✅ 내 정보 조회 / 수정
* ✅ 게시글 목록 조회 (페이지네이션)
* ✅ 게시글 작성 / 수정 / 삭제 (작성자 본인만 가능)
* ✅ 썸네일 이미지 표시
* ✅ 로그인 유지 (토큰 + userId localStorage 저장)

---

## 🗂 폴더 구조

```
server-impl/
├── backend/       # Spring Boot 백엔드
├── frontend/      # React 프론트엔드
└── README.md
```

---

## ⚠️ 주의사항

* `.env`, `application.properties`는 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다.
* MySQL 및 포트 설정은 로컬 환경에 맞게 조정해 주세요.

---

## 🙌 기여자

* **LeeHwon0217**
  GitHub: [https://github.com/LeeHwon0217](https://github.com/LeeHwon0217)

```
