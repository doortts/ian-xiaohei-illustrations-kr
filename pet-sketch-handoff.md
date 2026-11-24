# 한국어 본문 삽화 Skill 인수인계

2026.11.24 · `pet-sketch-illustrations` (가칭)

한국어 기술 글에서 그림으로 설명할 대목을 골라 강아지·고양이 손그림 삽화를 만드는 Skill이다. 사용자는 Codex, Claude, Antigravity에서 쓸 수 있기를 원한다. 작업 순서와 품질 기준은 [개발 계획서 1.1](pet-sketch-development-plan.md)에 있다. 계획서는 Codex를 기준으로 작성했다. 세 환경을 지원할 범위는 아래 제안대로 시범 실행한 뒤 확정한다.

## 현재 상태

- 개발 계획의 1단계(기준선과 시범 실행) 및 2단계(Skill 적용)를 성공적으로 완료했다.
- 영어판 `0.1.1` 기준 커밋(`18280fc475fbda00efc0da6608860d69028deb6a`)에서 `npm test` 통과를 확인했다.
- 임시 캐릭터 기준 시트([character-reference-sheet.png](pet-sketch-illustrations/assets/character-reference-sheet.png))를 제작하고 공통 `SKILL.md` 및 참조 문서를 `.agents/skills/` 및 `.claude/skills/`에 배포했다.
- Codex와 Antigravity에서 구상(`plan_only`), 2장 생성(`generate`), 부분 편집(`edit`), 원본 보존 및 `-v2` 중복 회피 저장(`save`) 실동작 검증을 마쳤다.
- 한국어 검사기(`scripts/validate-skill.mjs`) 및 fixture(`evals/behavior-cases.json`)를 구축해 `npm test` 통과를 확인했다.
- 상세 실행 결과는 [시범 실행 보고서](pet-sketch-trial-report.md)에 정리되어 있다.

## 첫 출시 제안

`SKILL.md`, 캐릭터 기준 이미지, 구도·한국어 주석·검수 규칙은 한 벌만 관리한다. 공통 지침에는 `plan_only`, `generate`, `edit`, `save`의 동작을 적고 환경별 도구 이름과 설치 위치는 README에 둔다. 이미지 도구가 없는 환경에서는 장면별 명세와 프롬프트를 제공한다. 파일을 실제로 쓴 경우에만 저장 완료로 기록한다. [Agent Skills 명세](https://agentskills.io/specification)

| 환경 | 프로젝트 설치 | 처음 확인할 동작 |
|---|---|---|
| Codex | `.agents/skills/pet-sketch-illustrations/` | 구상, 내장 도구로 생성·편집, 작업 폴더에 PNG 저장. [Skill 설치](https://learn.chatgpt.com/docs/build-skills) · [이미지 도구](https://learn.chatgpt.com/docs/image-generation) |
| Google Antigravity | `.agents/skills/pet-sketch-illustrations/` | 구상, 내장 Nano Banana로 생성·편집, 대화에서 나온 이미지의 작업 폴더 저장. [Skill 설치](https://antigravity.google/docs/skills) · [이미지 도구](https://antigravity.google/docs/models) |
| Claude Code | `.claude/skills/pet-sketch-illustrations/` | 한국어 구상과 장면별 프롬프트. 자동 생성·편집이 필요해지면 이미지 API나 MCP 도구 하나를 연결한다. [Skill 설치](https://code.claude.com/docs/en/skills) · [MCP 연결](https://code.claude.com/docs/en/mcp) |
| Claude 웹 | 같은 폴더를 ZIP으로 올리는 선택지 | 구상과 업로드한 이미지 검수. 결과 파일은 다운로드 방식으로 다룬다. [Skill 업로드](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills) · [이미지 기능](https://support.claude.com/en/articles/9002504-can-claude-produce-images) |

Claude의 첫 검증 대상은 Claude Code로 잡는다. 세 환경에서 같은 그림체를 내야 한다면 시범 결과를 비교한 뒤 공통 이미지 모델을 쓸지 결정한다.

## 시범 실행 완료 내역 (2026.11.24 완료)

1. **영어판 기준선 및 기준 시트**: 기준 커밋(`18280fc475fbda00efc0da6608860d69028deb6a`)에서 `npm test` 통과 확인. 강아지·고양이의 귀, 주둥이, 꼬리 및 상대 크기 임시 기준 시트(`assets/character-reference-sheet.png`) 16:9 PNG 준비 완료.
2. **공통 SKILL.md 및 구상 검증**: 설치 경로(`.agents/skills/`, `.claude/skills/`)에 배치 후 Codex에서 스킬명 없이 시범 구상 요청 실행. 자동 선택(`allow_implicit_invocation`), 한국어 2장 구상, 이미지 도구 호출 0회 확인.
3. **이미지 생성 및 부분 편집 검증**:
   - Codex: 기준 시트(`-i`)를 입력하여 2장 생성(`01-cache-lookup.png`, `02-cache-invalidation.png`). 강아지 외형 일관성, 고양이 묘사, 한국어 주석 정확도 및 16:9 비율(1672×941) 확인.
   - 부분 편집: 주석 '빠른 응답'을 '즉시 반환'으로 수정 후 저장 시 원본 파일 보존 및 `01-cache-lookup-v2.png`로 저장 완료.
   - Antigravity: `image-generator`를 통해 동일 시트 기준 삽화 생성(`assets/antigravity-illustrations/01-cache-fast-response.png`) 완료.
4. **품질 및 기록**: 환경별 지원 범위, 생성 파일 절대 경로, 픽셀 비율, QA 매니페스트를 [pet-sketch-trial-report.md](pet-sketch-trial-report.md)에 기록 완료.

## 다음 세션에서 할 일 (3단계: 설치 및 배포)

1. 검사기(`scripts/validate-skill.mjs`)에 시범 실행에서 생성된 정식 예제 이미지 2장(`01-cache-lookup.png`, `02-cache-invalidation.png`) 검증 로직 연결.
2. 깨끗한 독립 환경에서 Skill 자동 검색 및 실행 최종 확인.
3. `v0.1.0` Git 태그 및 배포 준비.

## 공통 시범 요청

> 다음 글에 들어갈 손그림 삽화 두 장을 구상해 줘. 각 장에 들어갈 위치, 설명할 개념, 캐릭터의 행동, 짧은 한국어 주석을 적어 줘. 이미지는 아직 만들지 마.
>
> 캐시는 자주 읽는 값을 가까운 곳에 두어 응답을 빠르게 한다. 원본이 바뀐 뒤에도 캐시에 예전 값이 남으면 사용자는 오래된 정보를 받는다. 원본이 바뀔 때 캐시 항목을 지우면 다음 요청에서 최신 값을 가져올 수 있다.

이미지 시범을 이어갈 때는 “기준 시트를 써서 방금 구상한 두 장을 만들어 줘. 첫 장에는 강아지 한 마리를 넣어 줘. 둘째 장에는 강아지와 고양이가 함께 나오게 해 줘”라고 요청한다. 부분 편집에서는 기존 주석 하나와 바꿀 문구를 정확히 지정한다.

## 배포 전에 챙길 사항

출시 예제에는 새로 만든 이미지를 쓴다. 가져온 코드와 지침의 `LICENSE`와 저작권 고지를 포함하고 README와 `NOTICE.md`에 원작과 영어판의 출처를 적는다. 공개 Fork를 택한다면 Git 이력에 들어 있는 기존 이미지까지 배포 범위를 확인한다. [영어판 LICENSE](https://github.com/tojileon/ian-xiaohei-illustrations-en/blob/18280fc475fbda00efc0da6608860d69028deb6a/LICENSE) · [영어판 NOTICE](https://github.com/tojileon/ian-xiaohei-illustrations-en/blob/18280fc475fbda00efc0da6608860d69028deb6a/NOTICE.md)
