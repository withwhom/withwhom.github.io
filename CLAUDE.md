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
pomodoro.html            Timer 탭 (/pomodoro/). 계속 쓰는 페이지이므로 삭제하지 말 것
conjugle/                Conjugle 탭 (/conjugle/). 사이트 레이아웃 없는 독립 게임 페이지 (아래 참고)
scripts/check-conjugle.js  Conjugle 데이터 검증 (빌드에서 제외)
.github/workflows/conjugle.yml  PR마다 위 검증을 실행
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
- **탭**: Scraps(`/`), Open questions(`/questions/`), Timer(`/pomodoro/`), Conjugle(`/conjugle/`).
  콘텐츠 탭은 앞의 두 개이고, Timer는 도구 페이지라 `page` 레이아웃 대신 `default`를 직접 쓴다.
  Conjugle은 front matter 없는 정적 HTML로, 사이트 레이아웃 없이 게임 자체 디자인을 쓴다.
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

## 수식 (KaTeX)

kramdown의 `math_engine: mathjax`가 Markdown 안의 `$$…$$`를 `\(…\)`(문단 안) 또는 `\[…\]`(단독 블록)로
바꾸고, `_includes/katex.html`의 auto-render가 브라우저에서 렌더링한다. raw HTML 블록 안에서
수식을 쓰려면 `<div class="thm" markdown="1">`처럼 `markdown="1"`을 붙이고 `$$…$$`로 쓴다.
정리/증명 클래스: `thm`, `thm-head`, `thm-body`, `proof`, `proof-head`, `qed`.

## 로컬 빌드와 확인

Ruby **3.3**을 쓴다(GitHub Pages와 같은 버전). Ruby 3.4 이상(Homebrew 기본 `ruby`는 4.x)에서는
github-pages가 고정한 Jekyll 3.x가 `csv` 등을 찾지 못해 실행되지 않는다. macOS에서는
`brew install ruby@3.3` 후 `/opt/homebrew/opt/ruby@3.3/bin`(Intel은 `/usr/local/opt/ruby@3.3/bin`)을
PATH 앞에 둔다. 다른 Ruby로 설치한 적이 있으면 `rm -rf vendor Gemfile.lock` 후 다시 설치한다.

```bash
bundle config set --local path vendor/bundle
bundle install
LANG=C.UTF-8 bundle exec jekyll build    # 또는 jekyll serve
```

`LANG`이 UTF-8이 아니면 github-pages 기본 테마의 SCSS에서 인코딩 에러가 난다.
수식을 고쳤다면 빌드한 페이지를 브라우저로 열어 `.katex-error`가 없는지, 렌더링되지 않은 `$$`나 `\(`가
본문에 남지 않았는지 확인한다.

## Conjugle (프랑스어 동사 활용 게임)

`/conjugle/`. 하루 다섯 문장의 빈칸에 동사를 알맞게 활용해 넣는 게임이다. 문장마다 네 번까지 답할 수 있고,
틀릴 때마다 빈칸 아래에 힌트가 하나씩 열린다(시제 → 발음 `ipa` → 정답 모양: 단어마다 첫 글자와 글자 수).

- `conjugle/index.html`: 게임 페이지. front matter가 없어 Jekyll이 그대로 복사한다(Liquid 처리 없음).
  사이트와 같은 색 토큰을 쓰고, 테마는 사이트와 같은 `localStorage`의 `theme` 키로 맞춘다
  (밝은 테마 기본, `prefers-color-scheme`은 쓰지 않음). 페이지 안에 작은 토글이 있다.
  진행 상황과 통계는 `localStorage`의 `conjugle` 키에 저장한다.
- `conjugle/data.js`: 문제 은행 `bank`와 출제 일정 `releases`.
- `conjugle/daily.js`: 날짜별 문제 선정. 게임 페이지와 검증 스크립트가 함께 쓴다.
  이 파일을 바꾸면 지난 문제가 바뀔 수 있으므로 꼭 필요할 때만 고친다.
- `scripts/check-conjugle.js`: `node scripts/check-conjugle.js`로 실행한다. 데이터를 고친 뒤에는 반드시 돌린다.
  `--base <dir>`에 base 브랜치의 `data.js`(와 `daily.js`)를 두면, 출시일부터 오늘(서울)까지의
  문제가 그대로인지도 확인한다. CI(`.github/workflows/conjugle.yml`)가 PR마다 이렇게 실행한다.

### 데이터 형식

```js
{ id: 154, v: "aller", s: "Hier, elles ___ au marché.", a: ["sont allées"], t: "passe_compose",
  ipa: "sɔ̃‿ta.le", n: "hier가 …" }
```

- `id`: 고정 정수. 새 항목은 지금 최대 id + 1부터 차례로 붙인다. 번호를 다시 매기거나 다른 항목에
  다시 쓰지 않고, 항목을 지우지 않는다(틀린 내용은 그 자리에서 고친다).
- `v`: 부정사(대명동사는 `se lever`, `s'asseoir`처럼).
- `s`: 문장. 빈칸은 `___`(밑줄 세 개) 하나.
- `a`: 정답 배열, 소문자. 복합시제는 조동사 + 과거분사, 대명동사는 재귀대명사까지, 명령형은 붙임표까지
  넣는다(`s'est levée`, `lève-toi`).
- `t`: 시제 키. `present`, `passe_compose`, `imparfait`, `plus_que_parfait`, `futur_simple`,
  `conditionnel_present`, `conditionnel_passe`, `subjonctif_present`, `imperatif`.
- `ipa`: `a[0]`의 발음만. 괄호(`/ /`, `[ ]`) 없이, 음절 사이는 `.`, 단어 경계도 `.`로 잇고, 연음이
  일어나는 경계만 `.` 대신 `‿`를 쓴다. 연음 자음은 다음 음절 첫머리에 둔다(`sont allées` → `sɔ̃‿ta.le`).
  `r`는 `ʁ`, `g`는 `ɡ`.
- `n`: 한국어 해설 1~2문장. 그 시제를 고르게 하는 단서와 활용 포인트.
- 필드는 이 일곱 개만 쓴다.

### 문장 추가 절차

1. `bank` 끝에 새 id로 항목을 추가한다. 기존 항목의 내용과 순서는 바꾸지 않는다.
2. `releases` 끝에 `{ from: "<내일 이후 날짜>", maxId: <새 최대 id> }`를 추가한다. `from`이 오늘(서울)
   이전이면 지난 문제가 바뀌므로 검증이 실패한다. 새 문장은 `from` 날짜부터 출제된다.
3. `node scripts/check-conjugle.js`를 돌린다. 시제별 개수가 고르게 유지되는지 출력으로 확인한다.

### 작성 규칙

- 9개 시제가 고르게 나오게 하고, 불규칙 동사, 대명동사, être 조동사의 과거분사 일치를 충분히 섞는다.
- 시제를 숨겨도 문장 속 단서(다른 동사의 시제, 시간 표현, si절, 접속법을 요구하는 표현 등)만으로 답이
  하나로 정해져야 한다. 두 시제가 다 자연스러우면 그 문장은 빼거나 단서를 보강한다.
  특히 미래 의미의 현재형(`Demain, je pars`), 공손의 조건법(`je voudrais`), 구어에서 대과거 대신 쓰는
  복합과거처럼 다른 시제가 끼어들 여지를 확인한다.
- 빈칸은 한 곳, 연속된 한 덩어리. 부정문이 복합시제를 갈라놓는 문장(`n'a pas fini`)은 쓰지 않는다.
  단순시제의 부정(`on ne ___ pas`)은 괜찮다. `déjà`, `jamais`처럼 조동사와 분사 사이에 들어가는 부사도 피한다.
- 빈칸 바로 앞이 `je`(또는 `me`, `te`, `se`, `le`, `la`, `ne`, `de`, `que`, `ce`)이고 답이 모음이나 h로
  시작하면 축약이 생기므로 쓰지 않는다. 문장에 이미 축약형을 써 둔 경우(`j'___`, `m'___`)는 괜찮다.
- 정답이 여러 개 가능하면 `a`에 모두 넣는다(예: 성별을 알 수 없는 `je`/`nous`/`vous`의 être 조동사 과거분사).
  발음이 서로 다른 정답이 생기는 문장(`mis`/`mises`)은 단서로 하나를 정하거나 피한다.
- 문법이나 IPA가 조금이라도 확실하지 않으면 추측해서 넣지 않고, PR 설명에 목록으로 적어 검토를 받는다.
