import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();

test("homepage shell includes the core brand sections", () => {
  const htmlPath = join(root, "index.html");
  assert.equal(existsSync(htmlPath), true, "index.html should exist");

  const html = readFileSync(htmlPath, "utf8");
  for (const text of [
    "김보연",
    "따능AI",
    "AI아트",
    "AI리터러시",
    "AI영화",
    "저서",
    "출강기관",
    "기관 강의 문의하기",
  ]) {
    assert.match(html, new RegExp(text), `missing text: ${text}`);
  }
});

test("homepage references real local media assets", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const requiredAssets = [
    "assets/film-the-switch.jpg",
    "assets/film-the-last-lie.jpg",
    "assets/book-ai-literacy.jpg",
    "assets/art-we-feel-each-other.jpg",
    "assets/hero-film.mp4",
    "assets/qr-blog.png",
    "assets/qr-littly.png",
    "assets/qr-kakao-openchat.jpg",
    "assets/lecture-metro-workshop.jpeg",
    "assets/lecture-metro-session.jpg",
    "assets/lecture-smartcity.JPG",
    "assets/lecture-asan.JPG",
    "assets/lecture-donggu.JPG",
    "assets/lecture-koreatech.JPG",
    "assets/lecture-anyang-babyboomer.JPG",
    "assets/lecture-pod-guide.jpg",
    "assets/lecture-ai-movie-director.png",
    "assets/review-survey-01.png",
    "assets/review-survey-02.png",
    "assets/review-kakao-ai-class.png",
    "assets/review-blog-comment.png",
    "assets/review-kakao-video-class.jpg",
  ];

  for (const asset of requiredAssets) {
    assert.match(html, new RegExp(asset.replace(".", "\\.")), `missing asset reference: ${asset}`);
    assert.equal(existsSync(join(root, asset)), true, `asset should exist: ${asset}`);
  }

  assert.match(html, /카톡 오픈채팅방 문의/, "contact QR panel should include Kakao open chat inquiry caption");
});

test("homepage hero uses lecture field photos and removes old value cards", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  assert.match(html, /lecture-photo-grid/, "hero should use the lecture photo grid");
  assert.match(html, /메트로경제 임직원 대상 따능AI 활용 강의 현장/, "hero should describe lecture photos");
  assert.match(html, /안양시 베이비부머지원센터 생성형AI교육지도사 양성과정 강의/, "hero should include the added Anyang lecture photo");
  assert.match(html, /POD 출판 완벽 가이드 온라인 강의 이미지/, "hero should include the added POD lecture image");
  assert.match(html, /요양보호사에서 AI 영화감독으로 강의 썸네일/, "hero should include the added AI movie lecture thumbnail");
  assert.doesNotMatch(html, /<section class="section value-section"/, "old AI value card section should be removed");
  assert.doesNotMatch(html, />AI로 쓰다</, "old AI writing card should be removed");
  assert.doesNotMatch(html, />AI로 그리다</, "old AI drawing card should be removed");
  assert.doesNotMatch(html, />AI로 만들다</, "old AI making card should be removed");
  assert.match(css, /\.lecture-photo-grid/, "lecture photo grid should have dedicated styling");
  assert.match(css, /\.lecture-photo-grid[\s\S]*grid-template-columns:\s*repeat\(3,\s*1fr\)/, "lecture photo grid should use equal columns");
  assert.match(css, /\.lecture-photo-grid \.photo-feature[\s\S]*grid-row:\s*auto/, "lecture photo feature should not span rows");
});

test("homepage uses updated speaker wording and Korean line-breaking controls", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  assert.match(html, /AI출판작가/, "speaker intro should say AI출판작가");
  assert.match(html, /AI아트작가/, "speaker intro should include AI아트작가");
  assert.match(html, /ai-digital-tutor-badge\.png/, "speaker profile should display the digital tutor badge");
  assert.equal(existsSync(join(root, "assets", "ai-digital-tutor-badge.png")), true, "digital tutor badge should exist");
  assert.match(css, /\.digital-tutor-badge/, "digital tutor badge should have a bounded size");
  assert.doesNotMatch(html, /출판 작가/, "old speaker wording should be removed");
  assert.match(html, /공직 20년 5개월 · 요양보호사 10년 · AI로 시작한 인생 3막/, "career metric should be grouped clearly");
  assert.match(html, /경력[\s\S]*공직 20년 5개월[\s\S]*요양보호사 10년/, "about section should separate career evidence");
  assert.match(html, /자격[\s\S]*따능AI활용전문강사 1급[\s\S]*GOE마케팅컨설턴트[\s\S]*따능AI활용전문강사 2급/, "new qualifications should lead the list");
  assert.match(html, /2026 AI디지털튜터 양성과정 수료/, "digital tutor training should be listed");
  assert.match(html, /창작 성과[\s\S]*출간 도서 20권[\s\S]*AI아트 공모전 수상 3회/, "about section should separate creative results");
  assert.match(html, /국제AI영화제 37개 공식 선정·수상/, "film festival count should be current");
  assert.doesNotMatch(html, /30여 개/, "outdated film festival count should be removed");
  assert.doesNotMatch(html, /24\+/, "duplicated AI film count metric should be removed");
  assert.doesNotMatch(html, /AI영화 선정·수상/, "duplicated AI film metric label should be removed");
  assert.match(css, /word-break:\s*keep-all/, "Korean words should not break awkwardly");
  assert.match(css, /\.metric strong[\s\S]*white-space:\s*nowrap/, "metric number should stay on one line");
});

test("homepage includes all 20 published book covers and lecture institutions", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const bookAssets = [
    "book-forty.jpg",
    "book-second-life.jpg",
    "book-between-beyond.jpg",
    "book-self-growth.jpg",
    "book-different-life.jpg",
    "book-movie.jpg",
    "book-growth-school.jpg",
    "book-thunder.jpg",
    "book-living-well.jpg",
    "book-ai-literacy.jpg",
    "book-crunch.jpg",
    "book-coloring.jpg",
    "book-ai-agent.jpg",
    "book-author-debut.jpg",
    "book-genspark.jpg",
    "book-rainy-bookstore.jpg",
    "book-seaside-village-coloring.jpg",
    "book-everyday-happiness.png",
    "book-caregiver-ai-instructor.png",
    "book-senior-smartphone.png",
  ];

  for (const asset of bookAssets) {
    assert.match(html, new RegExp(asset.replace(".", "\\.")), `missing book asset: ${asset}`);
    assert.equal(existsSync(join(root, "assets", asset)), true, `book asset should exist: ${asset}`);
  }

  for (const institution of [
    "따능스쿨",
    "AI아티스트 클럽",
    "한국안광학산업진흥원",
    "안양시 베이비부머지원센터",
    "디지털융합교육원",
    "한국기술교육대학교 능력개발원",
    "스마트도시협회",
    "연암대학교",
    "상명대학교",
    "메트로경제",
    "부산관광공사",
    "아산시 평생학습관",
  ]) {
    assert.match(html, new RegExp(institution), `missing institution: ${institution}`);
  }

  assert.match(
    html,
    /공공기관·대학·평생학습기관에서 생성형 AI 실습과 콘텐츠 창작 강의를 진행했습니다\./,
    "institution section should explain lecture evidence",
  );
  for (const topic of [
    "생성형 AI 실습",
    "AI아트 창작",
    "업무효율화",
    "AI출판",
    "AI 영상콘텐츠",
  ]) {
    assert.match(html, new RegExp(topic), `missing institution topic: ${topic}`);
  }
});

test("homepage includes updated lecture details, icons, form CTA, and institution logo assets", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  for (const text of [
    "강의기간 : 원데이~8주",
    "주 대상: 성인·중장년",
    "기관 맞춤 가능: 공공기관·평생학습기관·기업",
    "업무효율화와 자동화",
    "소상공인 마케팅",
    "브랜드 이미지와 캐릭터, 로고",
    "그림책, 컬러링북, 자서전",
    "AI영화 제작 및 시나리오 창작",
    "기관 맞춤 가능 주제",
    "기관 강의 문의하기",
    "https://forms.gle/mHuHnCKQ2qnffuE79",
  ]) {
    assert.match(html, new RegExp(text), `missing lecture update: ${text}`);
  }

  assert.match(
    html,
    /<nav class="nav-links"[\s\S]*<a href="https:\/\/forms\.gle\/mHuHnCKQ2qnffuE79"[^>]*>기관 강의 문의하기<\/a>/,
    "header should include unified inquiry menu",
  );
  assert.match(
    html,
    /<div class="lecture-meta"[\s\S]*<a class="lecture-form-link" href="https:\/\/forms\.gle\/mHuHnCKQ2qnffuE79"[^>]*>기관 강의 문의하기<\/a>/,
    "lecture meta should include unified inquiry link",
  );
  assert.doesNotMatch(html, /구글폼문의|구글폼으로 문의하기|>강의 문의</, "mixed inquiry labels should be removed");

  for (const icon of ["⚡", "🤖", "📈", "🎨", "📚", "🎬"]) {
    assert.match(html, new RegExp(icon), `missing icon: ${icon}`);
  }

  for (const asset of [
    "institution-ttaneng.svg",
    "institution-aiac.svg",
    "institution-koia.svg",
    "institution-anyang.svg",
    "institution-dcon.svg",
    "institution-koreatech.svg",
    "institution-smartcity.svg",
    "institution-yonam.svg",
    "institution-sangmyung.svg",
    "institution-metro.svg",
    "institution-bto.svg",
    "institution-asan.svg",
  ]) {
    assert.match(html, new RegExp(`assets/${asset}`), `missing institution logo reference: ${asset}`);
    assert.equal(existsSync(join(root, "assets", asset)), true, `institution logo should exist: ${asset}`);
  }

  assert.match(css, /\.lecture-meta/, "lecture meta styles should exist");
  assert.match(css, /\.institution-logo/, "institution logo styles should exist");
});

test("homepage includes a collapsible representative lecture example", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");
  const js = readFileSync(join(root, "script.js"), "utf8");

  assert.match(
    html,
    /<button class="lecture-example-toggle" type="button" aria-expanded="false" aria-controls="lecture-example">대표강의 예시<\/button>[\s\S]*<span>🗓️ 원데이~8주<\/span>/,
    "representative lecture button should appear before one-day to eight-week chip",
  );
  assert.match(
    html,
    /<div class="lecture-example-panel" id="lecture-example" hidden>/,
    "representative lecture panel should start collapsed",
  );

  for (const text of [
    "보는 AI에서 만드는 AI로",
    "내 손으로 이미지·영상·책을 완성하다",
    "강의 안에서 이미지·짧은 영상·전자책 아이디어 중 하나를 완성하는 실습형 과정",
    "공공도서관·평생학습관",
    "2시간 특강",
    "4주 과정",
    "10년차 요양보호사에서 AI강사·창작가가 된 김보연",
    "AI 아트 공모전 3회 수상",
    "대상 인원·희망 일정·강의 목적을 알려주시면 기관 맞춤 구성으로 제안드립니다.",
  ]) {
    assert.match(html, new RegExp(text), `missing representative lecture text: ${text}`);
  }

  assert.match(css, /\.lecture-example-panel/, "lecture example panel styles should exist");
  assert.match(js, /lectureExampleToggle/, "lecture example toggle script should exist");
  assert.match(js, /aria-expanded/, "toggle script should update aria-expanded");
});

test("homepage hero focuses on the primary lecture offer", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  assert.match(html, /성인·중장년을 위한 실습형 생성형 AI 강의/, "hero should lead with primary lecture offer");
  assert.match(html, /이미지·영상·전자책 결과물까지 완성합니다/, "hero should state concrete outcomes");
  assert.match(html, /AI가 처음인 성인·중장년을 위한 생성형 AI 실습 강의입니다\./, "hero intro should be short first sentence");
  assert.match(html, /이미지·짧은 영상·전자책 아이디어 중 하나를 직접 완성합니다\./, "hero intro should be short second sentence");
  assert.match(html, /<a class="button primary hero-primary-cta" href="https:\/\/forms\.gle\/mHuHnCKQ2qnffuE79"[^>]*>기관 강의 문의하기<\/a>/, "hero primary CTA should link to form");
  assert.match(css, /\.hero-primary-cta/, "hero primary CTA should have distinct emphasis styles");
});

test("homepage expands AI art gallery and award history", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  for (const asset of [
    "art-we.jpg",
    "art-love.jpg",
    "art-fan.jpg",
    "art-present.jpg",
    "art-curiosity-window.jpg",
    "art-new-path.jpg",
  ]) {
    assert.match(html, new RegExp(`assets/${asset}`), `missing added art asset: ${asset}`);
    assert.equal(existsSync(join(root, "assets", asset)), true, `added art asset should exist: ${asset}`);
  }

  assert.doesNotMatch(html, /art-curiosity-window\.mp4/, "exhibition video should be replaced by the still image");
  assert.match(html, /Art Symphony Kawasaki 2026 · The Voice of Artists/, "Kawasaki exhibition should be listed");
  assert.match(html, /AI아트 수상 및 전시 이력/, "art history should cover awards and exhibitions");

  for (const text of [
    "2025.02 · 글로벌 AI아트 공모전",
    "은상 · Where am I",
    "2025.11 · 제20회 일본 대판(오사카) 공모전",
    "우수상 · Small Wind Big Hope",
    "2026.06 · 제25회 한국미술대전 입상",
    "우수상1: Harmony · 입선4: 어울림, Love, We, 완벽한 쉼",
    "김보_連(연, 잇닿다)",
    "dream &amp; DREAM",
    "AI 콘텐츠 페스티벌 2025",
    "제26회 올해의 작가 100인 초대전",
    "제25회 한국미술대전 입상자 전시회",
    "따능스쿨 AI아트 전문가 과정",
  ]) {
    assert.match(html, new RegExp(text.replace(/[()]/g, "\\$&")), `missing art award text: ${text}`);
  }

  assert.doesNotMatch(html, /한국-스웨덴 수교 60주년 명작 초대전/, "canceled exhibition should not be presented as completed");

  assert.match(css, /\.art-awards/, "art awards styles should exist");
  assert.match(
    css,
    /\.feature-art img[\s\S]*object-fit:\s*contain/,
    "We feel each other feature image should be fully visible",
  );
});

test("homepage includes compact clickable lecture reviews below institutions", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  assert.match(html, /<h3>강의후기<\/h3>/, "lecture review heading should exist");
  assert.match(html, /이미지를 클릭하면 크게 볼 수 있습니다\./, "review helper text should explain click-to-enlarge behavior");

  for (const asset of [
    "review-survey-01.png",
    "review-survey-02.png",
    "review-kakao-ai-class.png",
    "review-blog-comment.png",
    "review-kakao-video-class.jpg",
  ]) {
    assert.match(
      html,
      new RegExp(`<a href="assets/${asset.replace(".", "\\.")}"[^>]*>[\\s\\S]*<img src="assets/${asset.replace(".", "\\.")}"`),
      `review thumbnail should link to full image: ${asset}`,
    );
    assert.equal(existsSync(join(root, "assets", asset)), true, `review asset should exist: ${asset}`);
  }

  assert.match(css, /\.review-gallery[\s\S]*grid-template-columns:\s*repeat\(5,\s*1fr\)/, "review thumbnails should be compact and even");
  assert.match(css, /\.review-gallery img[\s\S]*aspect-ratio:\s*4 \/ 3/, "review thumbnails should have uniform dimensions");
});

test("homepage includes GEO metadata, crawl files, and external evidence links", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");
  const robots = readFileSync(join(root, "robots.txt"), "utf8");
  const llms = readFileSync(join(root, "llms.txt"), "utf8");

  for (const text of [
    '"@type": "FAQPage"',
    '"@type": "Service"',
    '"@type": "Offer"',
    '"dateModified": "2026-08-17"',
    "기사로 확인하는 강의와 창작 활동",
  ]) {
    assert.match(html, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `missing GEO metadata: ${text}`);
  }

  for (const bot of [
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "Bytespider",
  ]) {
    assert.match(robots, new RegExp(`User-agent: ${bot}`), `robots.txt should mention ${bot}`);
  }

  assert.match(llms, /# 김보연 이음/);
  assert.match(llms, /성인·중장년/);
  assert.match(css, /\.press-grid/, "external evidence cards should have styles");

  for (const articleId of ["382638", "381193", "383175", "377164"]) {
    assert.match(
      html,
      new RegExp(`https://www\\.fntoday\\.co\\.kr/news/articleView\\.html\\?idxno=${articleId}`),
      `missing external article link ${articleId}`,
    );
    assert.match(llms, new RegExp(`idxno=${articleId}`), `llms.txt should include article ${articleId}`);
  }

  for (const [date, title] of [
    ["2026-04-19", "AI영화감독 김보연 ‘The Last Lie’, 방콕 영화제 2026 수상작 선정"],
    ["2026-03-31", "디지털융합교육원 김보연 강사 초청 생성형 AI 시대 맞춘 'POD 출판' 실전 강의 진행"],
    ["2026-04-27", "[김진선 人터뷰] POD 출판 기획자며 전문 강사, AI강사사관학교 앰베서더 김보연 강사의 ‘기록하는 삶’이 전하는 울림"],
    ["2026-02-11", "AI강사사관학교, 강남 앙트레블서 '앰배서더 위촉식' 개최"],
  ]) {
    assert.match(html, new RegExp(`<time datetime="${date}">`), `article date ${date} should be visible`);
    assert.ok(html.includes(title), `article title should match its source: ${title}`);
  }
});
