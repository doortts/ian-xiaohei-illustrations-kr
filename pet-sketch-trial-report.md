# 이족 보행(의인화) 기본 규칙 반영 최종 시안 보고서

**일시**: 2026.11.25  
**핵심 변경**: 강아지(시안 D 캡슐형)와 고양이(솔리드 블랙) 모두 네 발 보행을 금지하고, **사람처럼 두 발로 걷고 두 팔(가는 막대 팔다리)을 쓰는 이족 보행 의인화**를 기본 자세로 지정했습니다.

---

## 1. 이족 보행 기준 시트 (`character-reference-sheet.png`)

- **파일 위치**: [character-reference-sheet.png](file:///Users/doortts/repos/design-explained/pet-sketch-illustrations/assets/character-reference-sheet.png) (1664×936, 16:9 PNG)
- **규칙 반영**:
  - **강아지**: 정면·옆모습 모두 두 발(막대 다리 2개)로 똑바로 서고, 양옆 막대 팔 2개를 갖춘 단순 흰 캡슐 몸체·먹물 귀·주둥이·꼬리 형태.
  - **고양이**: 정면·옆모습 모두 두 발(막대 다리 2개)로 서고 막대 팔 2개를 갖춘 솔리드 블랙 먹물 실루엣·삼각 귀·흰 점 눈·긴 꼬리 형태.

![이족 보행 캐릭터 기준 시트](/Users/doortts/.gemini/antigravity/brain/bee61b10-38b8-4a38-9d46-78456bb8344c/character_reference_sheet.png)

---

## 2. 이족 보행 기반 본문 삽화 2종 (`-v4`)

### 2.1 [1장] 강아지 단독 — `캐시` 크랭크와 `바로 전달`
- **파일 위치**: [01-cache-lookup-v4.png](file:///Users/doortts/repos/design-explained/assets/cache-illustrations/01-cache-lookup-v4.png) (1672×941, 16:9 PNG)
- **검수**: 캡슐 강아지가 두 다리로 서서 두 팔로 나무 `캐시`(파랑) 기계의 크랭크를 돌려 결과물을 `바로 전달`(주황)하며, 굽은 길 끝의 돌 창고 `먼 원본`(빨강)과 대비됩니다.

![1장: 이족 보행 캐시 조회](/Users/doortts/.gemini/antigravity/brain/bee61b10-38b8-4a38-9d46-78456bb8344c/01-cache-lookup-v4.png)

---

### 2.2 [2장] 강아지 + 고양이 협동 — `원본 변경`, `비우기`, `묵은 값`
- **파일 위치**: [02-cache-invalidation-v4.png](file:///Users/doortts/repos/design-explained/assets/cache-illustrations/02-cache-invalidation-v4.png) (1672×941, 16:9 PNG)
- **검수**:
  - **좌측**: 두 발로 선 캡슐 강아지가 두 팔로 도르래 줄을 당겨 `원본 변경`(파랑) 상자를 끌어올리고 `새 값`(주황)을 보냅니다.
  - **우측**: 두 발로 선 솔리드 블랙 고양이가 두 팔로 작업대 레버(`비우기`, 파랑)를 조작해 빨간 `X`가 그려진 `묵은 값`(빨강)을 해칭된 구덩이로 떨어뜨립니다.

![2장: 이족 보행 캐시 무효화](/Users/doortts/.gemini/antigravity/brain/bee61b10-38b8-4a38-9d46-78456bb8344c/02-cache-invalidation-v4.png)

---

## 3. 동기화 및 검증 완료
- `SKILL.md`, `pet-character-ip.md`, `prompt-template.md`, `qa-checklist.md` 및 `.agents/skills/`, `.claude/skills/` 동기화 완료.
- `npm test` 실행 결과: **`Skill validation passed.`**
