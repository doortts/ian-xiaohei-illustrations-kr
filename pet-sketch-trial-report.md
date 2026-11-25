# 시스템(강아지·고양이) + 사람(사용자·큐레이터) 역할 분리 업데이트 보고서

**일시**: 2026.11.25  
**핵심 변경**:
1. **역할 분리**: 시스템 내부 동작은 **강아지·고양이(이족 보행)**가 맡고, 사용자 경험·검토·큐레이션 같은 **인간 주체는 실제 사람(여성/남성)**이 등장하도록 규정했습니다.
2. **동물 조합 유연화**: 강아지와 고양이가 항상 같이 나올 필요 없이 장면에 따라 강아지 단독, 고양이 단독, 또는 조합을 선택합니다.
3. **사람 작화 문법 통일**: 원저자 스샷 스타일(거친 먹 칠 솔리드 블랙 긴팔 스웨터, 흰 바탕 검정 윤곽선 바지, 점 눈, 덤덤한 표정, 동물 대비 약 2배 키)을 적용했습니다.

---

## 1. 통합 캐릭터 기준 시트 (`character-reference-sheet.png`)

- **파일 위치**: [character-reference-sheet.png](file:///Users/doortts/repos/design-explained/pet-sketch-illustrations/assets/character-reference-sheet.png) (1664×936, 16:9 PNG, `#FFFFFF` 순백색 배경)
- **구성**: 좌측 `시스템 (강아지 · 고양이)` + 우측 `사람 (사용자 · 큐레이터)` 여성(번 헤어) 및 남성(짧은 머리), 가운데 `상대 크기` 비교선.

![시스템 + 사람 통합 캐릭터 기준 시트](/Users/doortts/.gemini/antigravity/brain/bee61b10-38b8-4a38-9d46-78456bb8344c/character_reference_sheet.png)

---

## 2. 역할 분리 검증 시범 삽화 (`03-cache-stale-user.png`)

- **파일 위치**: [03-cache-stale-user.png](file:///Users/doortts/repos/design-explained/assets/cache-illustrations/03-cache-stale-user.png) (1680×945, 16:9 PNG)
- **표현 개념**: *"원본이 바뀐 뒤에도 캐시에 예전 값이 남으면 사용자는 오래된 정보를 받는다."*
- **검수 결과**:
  - **동물 단독 + 사람 결합**: 강아지 없이 **이족 보행 솔리드 블랙 고양이 단독**이 `캐시` 크랭크를 돌리고, **약 2배 키의 사람(여성 사용자)**이 빨간 X 표시의 `예전 값` 카드를 받아 들고 `오래된 정보`를 의아하게 확인합니다.
  - **문법 준수**: 원저자 잉크 해칭·지면선·동작선·3색 주석 문법(`원본 변경`/`캐시` 파랑, 전달 주황, `예전 값`/`오래된 정보` 빨강) 완벽 일치.

![고양이 단독(시스템) + 사람 사용자 결합 시범 삽화](/Users/doortts/.gemini/antigravity/brain/bee61b10-38b8-4a38-9d46-78456bb8344c/03-cache-stale-user.png)

---

## 3. 동기화 및 검증 상태
- `SKILL.md`, `pet-character-ip.md`, `composition-patterns.md`, `prompt-template.md`, `qa-checklist.md` 및 `README.md` 업데이트 완료.
- `.agents/skills/pet-sketch-illustrations/` 및 `.claude/skills/pet-sketch-illustrations/` 동일 해시 동기화 완료.
- 정적 검사(`npm test`) 실행으로 최종 검증 완료 예정.
