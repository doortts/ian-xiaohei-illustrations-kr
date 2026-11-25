# Single-Image Prompt Template

Generate each image separately. Never combine multiple requested illustrations into a grid or collage.

## Pre-Generation Spec

Before calling the image tool, output this compact spec table/block:

```text
#: {순번}
본문 위치: {글에서 삽입될 위치}
설명할 개념: {핵심 개념 1개}
구도 유형: {워크플로 / 시스템 단편 / 전후 대비 / 캐릭터 상태 / 개념적 비유 / 계층 구조 / 경로도 / 소형 컷}
캐릭터 행동: {강아지/고양이가 로우테크 장치를 조작하는 물리적 행동}
한국어 주석: {주황(흐름) / 빨강(문제·경고) / 파랑(조작·상태) 2~5개}
저장 파일명: {NN-topic-slug.png}
```

## Image Prompt

```text
Generate one standalone 16:9 horizontal Korean technical article illustration in Ian's original ink-sketch explainer grammar.

Visual DNA & Ink Texture:
Pure white background (#FFFFFF) with at least 40% clean empty whitespace. Authentic hand-drawn black ink pen sketch on paper—slightly wobbly nib lines, fine parallel cross-hatching on wood/stone/machines, stipple dots, crisp black ground horizon lines, tiny pebbles/grass tufts, and motion lines (( )) or emphasis ticks.
High-contrast ink weight: use solid black ink fills on key anchors (the black cat, dog's black ears/spot, clips, rollers, dark crevices) so the sketch has strong tonal contrast on white.
NO hollow uniform-stroke coloring-book outlines. NO faint gray lines for background objects. NO color tints, pastel blush, or shading on animal bodies or furniture. NO paper texture, no gradients, no shadows, no PPT infographic, no children's picture book style, no cute chibi mascots, no plain modern office clipart.

Recurring Characters (follow attached character reference sheet — STRICTLY BIPEDAL & ROLE-SEPARATED):
- Role choice: Choose only the actors needed for this concept (Dog solo / Cat solo / Dog + Cat for internal system mechanics; add Human Woman or Man whenever the scene involves a user, developer, editor, or curator outside the system).
- 강아지 (Dog — System Worker): Minimalist white upright capsule/bean body with slightly wobbly black ink outline (ZERO fur hatching, ZERO realistic paws/mouth lines), solid-black chalky ink floppy ears, blunt snout with single black dot nose, simple black dot eyes, TWO thin black stick legs, TWO thin black stick arms, short black stick tail, deadpan worker attitude.
- 고양이 (Cat — System Worker): ~15-20% smaller solid-black chalky ink upright cat with white dot eyes, sharp triangular ears, thin whiskers, TWO thin black legs, TWO thin black arms, long curving tail, deadpan unimpressed expression.
- 사람 (Human — Woman or Man, ~2x taller than pets, include ONLY when representing a human user/developer/curator): Minimalist Ian-style person wearing a solid-black chalky ink sweater/shirt and white-outlined pants, solid-black ink hair (woman: bun/ponytail; man: short neat hair), clean white face with tiny black dot eyes and deadpan/thoughtful expression.
Characters must perform the core physical work inside or alongside a weird low-tech contraption—never stand decoratively.

Theme:
{글의 주제 또는 시스템 맥락}

Structure type:
{구도 유형}

Core concept:
{설명할 핵심 개념}

Weird Low-Tech Metaphor & Composition:
{구체적 로우테크 장치, 강아지/고양이의 물리적 행동, 지면선/장애물, 흐름 방향}

Suggested Elements:
{장치/사물 1} / {장치/사물 2} / {지면·장애물 요소}

Korean Handwritten Annotations & 3-Color Grammar:
- Orange (main flow / trajectory / arrows / outcome): {주황 주석}
- Red (problems / stale items / warnings / key focal point): {빨강 주석}
- Blue (operations / state changes / side notes): {파랑 주석}

Constraints:
Strictly 16:9 horizontal. Subject occupies 40%-60% of the canvas. Keep 2-5 short handwritten Korean labels (1-3 words each; keep technical terms like API/RAG/Cache if natural). NO top-left title. NO structure type name written on the image. Do not copy the exact layouts from assets/examples/; invent a fresh low-tech metaphor while matching their ink density, hatching, and 3-color restraint.
```

## Image Editing Prompt

### 1. Remove Top-Left Title
```text
Edit the provided image. Remove only the handwritten title "{제거할 제목}" and its underline from the top-left corner. Fill that area with clean pure white (#FFFFFF). Preserve all characters, ink hatching, Korean labels, 3-color arrows, line style, composition, and 16:9 aspect ratio exactly.
```

### 2. Edit Korean Annotation
```text
Edit the provided image. Replace only the handwritten annotation "{기존 주석}" with "{새 주석}". Match the exact handwritten ink pen style, color (orange/red/blue), and arrow placement. Keep all characters, contraptions, hatching, and other labels completely unchanged.
```

### 3. Increase Weirdness & Ink Contrast
```text
Regenerate this illustration with the same core concept, but replace plain office furniture with a strange low-tech contraption (crank machine, wooden crate, pulley, chasm, chute), add authentic Ian-style parallel ink hatching and ground lines, keep the dog/cat deadpan (not cute), and make the character physically drive the mechanism.
```

## Save Handoff

```text
총 {count}장의 삽화가 저장되었습니다.

QA 검수 결과:
| 이미지 | 비율 | 흰 배경 | 잉크 질감/대비 | 캐릭터 행동 | 한국어 주석·3색 문법 | 제목 없음 | 저장 경로 |
| {파일명} | 통과 (16:9) | 통과 | 통과 | 통과 | 통과 | 통과 | {절대 경로} |

저장된 파일:
- {절대경로/01-topic-name.png} : {목적}
```
