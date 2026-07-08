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
    "강의 문의",
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
    "assets/main-watercolor.png",
    "assets/main-card.jpg",
    "assets/main-sunglasses.png",
    "assets/main-portrait.jpg",
  ];

  for (const asset of requiredAssets) {
    assert.match(html, new RegExp(asset.replace(".", "\\.")), `missing asset reference: ${asset}`);
    assert.equal(existsSync(join(root, asset)), true, `asset should exist: ${asset}`);
  }
});

test("homepage uses updated speaker wording and Korean line-breaking controls", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  assert.match(html, /AI출판작가/, "speaker intro should say AI출판작가");
  assert.doesNotMatch(html, /출판 작가/, "old speaker wording should be removed");
  assert.match(html, /요양보호사 10년/, "career metric should include care worker experience");
  assert.match(html, /AI를 통한 인생3막/, "career metric should include third-life AI message");
  assert.doesNotMatch(html, /24\+/, "duplicated AI film count metric should be removed");
  assert.doesNotMatch(html, /AI영화 선정·수상/, "duplicated AI film metric label should be removed");
  assert.match(css, /word-break:\s*keep-all/, "Korean words should not break awkwardly");
  assert.match(css, /\.metric strong[\s\S]*white-space:\s*nowrap/, "metric number should stay on one line");
});

test("homepage includes all 16 published book covers and lecture institutions", () => {
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
  ];

  for (const asset of bookAssets) {
    assert.match(html, new RegExp(asset.replace(".", "\\.")), `missing book asset: ${asset}`);
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
});

test("homepage includes updated lecture details, icons, form CTA, and institution logo assets", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  for (const text of [
    "강의기간 : 원데이~8주",
    "강의대상 : 공공기관 및 기업, 평생학습기관, 소상공인 등",
    "업무효율화와 자동화",
    "소상공인 마케팅",
    "브랜드 이미지와 캐릭터, 로고",
    "그림책, 컬러링북, 자서전",
    "AI영화 제작 및 시나리오 창작",
    "구글폼으로 문의하기",
    "구글폼문의",
    "https://forms.gle/mHuHnCKQ2qnffuE79",
  ]) {
    assert.match(html, new RegExp(text), `missing lecture update: ${text}`);
  }

  assert.match(
    html,
    /<nav class="nav-links"[\s\S]*<a href="https:\/\/forms\.gle\/mHuHnCKQ2qnffuE79"[^>]*>구글폼문의<\/a>/,
    "header should include Google Form inquiry menu",
  );
  assert.match(
    html,
    /<div class="lecture-meta"[\s\S]*<a class="lecture-form-link" href="https:\/\/forms\.gle\/mHuHnCKQ2qnffuE79"[^>]*>구글폼문의<\/a>/,
    "lecture meta should include Google Form inquiry link",
  );

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
    "우리 청중에게 맞을지 궁금하시면",
    "공공도서관·평생학습관",
    "2시간 특강",
    "4주 과정",
    "10년차 요양보호사에서 AI강사·창작가가 된 김보연",
    "AI 아트 공모전 3회 수상",
    "우리 청중에게 딱 맞는 AI 창작 강의",
  ]) {
    assert.match(html, new RegExp(text), `missing representative lecture text: ${text}`);
  }

  assert.match(css, /\.lecture-example-panel/, "lecture example panel styles should exist");
  assert.match(js, /lectureExampleToggle/, "lecture example toggle script should exist");
  assert.match(js, /aria-expanded/, "toggle script should update aria-expanded");
});

test("homepage expands AI art gallery and award history", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  const css = readFileSync(join(root, "styles.css"), "utf8");

  for (const asset of [
    "art-we.jpg",
    "art-love.jpg",
    "art-fan.jpg",
    "art-present.jpg",
  ]) {
    assert.match(html, new RegExp(`assets/${asset}`), `missing added art asset: ${asset}`);
    assert.equal(existsSync(join(root, "assets", asset)), true, `added art asset should exist: ${asset}`);
  }

  for (const text of [
    "2025년 글로벌 AI아트 공모전",
    "은상",
    "2025년 제20회 일본 대판(오사카) 공모전",
    "우수상",
    "2026년 제25회 한국미술대전 입상",
    "우수상1, 입선4",
  ]) {
    assert.match(html, new RegExp(text.replace(/[()]/g, "\\$&")), `missing art award text: ${text}`);
  }

  assert.match(css, /\.art-awards/, "art awards styles should exist");
  assert.match(
    css,
    /\.feature-art img[\s\S]*object-fit:\s*contain/,
    "We feel each other feature image should be fully visible",
  );
});
