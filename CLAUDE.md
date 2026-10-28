# withwhom.github.io

류승환의 개인 수학 스크랩북. Jekyll로 만들고 GitHub Pages가 `main` 브랜치에서 빌드한다.
사이트 언어는 영어, 시간대는 Asia/Seoul.

## 구조

```
_config.yml              사이트 설정, 퍼머링크(/scraps/:title/), kramdown 수식 엔진
_data/navigation.yml     사이드바 탭 목록 (순서대로 표시)
_data/open_questions.yml Open questions 페이지 데이터
_includes/
  head.html              <head>: 메타, 테마 초기화 스크립트, KaTeX CSS, main.css, feed_meta
  sidebar.html           헤더 역할의 사이드바: 이름, 탭 메뉴, Now, 연락처
  theme-toggle.html      다크모드 토글 버튼과 스크립트
  footer.html            푸터
  katex.html             KaTeX + auto-render 스크립트
_layouts/
  default.html           모든 페이지의 뼈대 (위 include들을 조립)
  page.html              탭 페이지용: 제목(h2) + 본문
  scrap.html             스크랩(포스트) 한 편
  redirect.html          옛 주소 → 새 주소 리다이렉트 (meta refresh, 플러그인 없음)
_posts/                  스크랩. YYYY-MM-DD-slug.md
index.html               Scraps 탭 (메인, /)
questions.html           Open questions 탭 (/questions/)
pomodoro.html            타이머 (/pomodoro/). 메뉴에는 없지만 계속 쓰는 페이지이므로 삭제하지 말 것
redirects/               옛 주소용 리다이렉트 페이지
assets/css/main.css      전체 스타일 (색상 변수는 :root와 [data-theme="dark"])
assets/js/pomodoro.js    타이머 스크립트
.claude/skills/math-scrap/SKILL.md  스크랩 작성 규격 (아래 참고)
```

## 반드시 지킬 규칙

- **스크랩 규격**: 포스트를 쓰거나 고칠 때는 `.claude/skills/math-scrap/SKILL.md`를 그대로 따른다.
  front matter는 `layout`, `title`, `date`, `tags`, 선택 필드 `source`만 쓴다. 파일명은
  `_posts/YYYY-MM-DD-slug.md`이고 슬러그는 영어 소문자, 하이픈으로 3~6단어. 본문은 소제목 없이
  출발점 → 핵심 → 남은 질문 순서로 쓴다. 수식은 `$$…$$`만 쓰고, 맨 `|` 대신 `\lvert…\rvert`,
  도함수는 라이프니츠 표기로 쓴다.
- **디자인 유지**: 밝은 테마가 기본이고 다크모드는 수동 토글로만 바뀐다(`localStorage`의 `theme` 키에
  방문자 선택을 저장). 세리프 서체(Charter 계열), 포인트 색은 버건디 `--accent`, 보조 색은 앤티크 골드
  `--accent2`(타이머의 긴 휴식에만 슬레이트 블루 `--accent3`). 시스템 다크모드를 자동으로
  따라가게 바꾸지 않는다.
- **탭**: 현재 Scraps(`/`)와 Open questions(`/questions/`) 두 개.
- **연락처**: GitHub 링크만 둔다. 이메일 주소는 어디에도 넣지 않는다(설정, 피드, 페이지 모두).
- **플러그인**: GitHub Pages 기본 지원 플러그인만 쓴다. 지금은 `jekyll-feed` 하나뿐이다.
  새 플러그인이 필요하면 먼저 사용자에게 묻는다.
- **주소 변경 시 리다이렉트**: 페이지나 스크랩 주소가 바뀌면 `redirects/`에 아래처럼 파일을 추가한다.
  포스트 front matter에 `redirect_from`을 넣지 않는다(스크랩 규격 위반).
  ```yaml
  ---
  layout: redirect
  permalink: /old/path/
  redirect_to: /new/path/
  ---
  ```
  `/#questions`(옛 Open questions 위치)는 `index.html` 맨 위 스크립트가 `/questions/`로 보낸다.
- **브랜치**: `main`에 직접 푸시하지 않는다. 브랜치에서 작업하고 PR로 올린다(사용자가 달리 말하면 그에 따른다).

## 탭 추가하는 법

1. 루트에 페이지 파일을 만든다 (예: `reading.html` 또는 `.md`):
   ```yaml
   ---
   layout: page
   title: Reading
   permalink: /reading/
   ---
   ```
2. `_data/navigation.yml`에 같은 `url`로 항목을 추가한다. 현재 페이지 탭에는 `aria-current="page"`가 붙는다.
   타이머를 메뉴에 다시 넣을 때도 `- title: Timer` / `url: /pomodoro/`를 추가하면 된다.

## 수식 (KaTeX)

kramdown의 `math_engine: mathjax`가 Markdown 안의 `$$…$$`를 `\(…\)`(문단 안) 또는 `\[…\]`(단독 블록)로
바꾸고, `_includes/katex.html`의 auto-render가 브라우저에서 렌더링한다. raw HTML 블록 안에서
수식을 쓰려면 `<div class="thm" markdown="1">`처럼 `markdown="1"`을 붙이고 `$$…$$`로 쓴다.
정리/증명 클래스: `thm`, `thm-head`, `thm-body`, `proof`, `proof-head`, `qed`.

## 로컬 빌드와 확인

```bash
bundle config set --local path vendor/bundle
bundle install
LANG=C.UTF-8 bundle exec jekyll build    # 또는 jekyll serve
```

`LANG`이 UTF-8이 아니면 github-pages 기본 테마의 SCSS에서 인코딩 에러가 난다.
수식을 고쳤다면 빌드한 페이지를 브라우저로 열어 `.katex-error`가 없는지, 렌더링되지 않은 `$$`나 `\(`가
본문에 남지 않았는지 확인한다.
