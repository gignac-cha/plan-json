모든 작업은 정확한 정보를 위해 웹 검색을 통해 먼저 정보를 수집하고 작업합니다.
독립적으로 수행할 수 있는 작업은 반드시 최대한 병렬적으로 작업합니다.

# ./schema.json
JSON Schema 스펙을 이용해서 PLAN.jsonmd 의 구조를 정의합니다.
* http://json-schema.org/draft-07/schema#

아래는 PLAN.jsonmd 의 예시입니다.
```json
{
  "$schema": "https://www.example.com/plan-json/schema.json",
  "state": {
    "currentPhaseIndex": 2,
    "lastedUpdatedAt": "2025-12-23T22:14:36+09:00"
  },
  "overview": {
    "project": {
      "name": "My Project",
      "description": "This is my project."
    },
    "markdown": [
      {
        "type": "heading",
        "depth": 1,
        "children": [
          { "type": "text", "value": "프로젝트: 자가 치유형 멀티 클라우드 CI/CD 시스템 구축" }
        ]
      },
      {
        "type": "heading",
        "depth": 2,
        "children": [
          { "type": "text", "value": "🎯 프로젝트 개요" }
        ]
      },
      {
        "type": "list",
        "ordered": false,
        "start": null,
        "spread": false,
        "children": [
          {
            "type": "listItem",
            "spread": false,
            "checked": null,
            "children": [
              {
                "type": "paragraph",
                "children": [
                  { "type": "strong", "children": [{ "type": "text", "value": "목표:" }] },
                  { "type": "text", "value": " GitHub Actions 에러 발생 시 AI 에이전트가 자동으로 로그를 분석하고 수정 PR을 생성하는 시스템 구축" }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "spread": false,
            "checked": null,
            "children": [
              {
                "type": "paragraph",
                "children": [
                  { "type": "strong", "children": [{ "type": "text", "value": "핵심 지표:" }] },
                  { "type": "text", "value": " 배포 성공률 98% 달성, 장애 복구 시간(MTTR) 50% 단축" }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "phases": [
    {
      "index": 0,
      "status": "COMPLETED",
      "markdown": [
        {
          "type": "heading",
          "depth": 2,
          "children": [
            { "type": "text", "value": "Phase 1: 기반 인프라 설정 (Completed)" }
          ]
        },
        {
          "type": "list",
          "ordered": false,
          "start": null,
          "spread": false,
          "children": [
            {
              "type": "listItem",
              "spread": false,
              "checked": true,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "테라폼을 이용한 AWS/GCP 멀티 클라우드 프로비저닝" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": true,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "중앙 집중형 로깅 시스템(Vector + Axiom) 구축" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": true,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "기본 GitHub Actions 워크플로우 템플릿 작성" }] }
              ]
            }
          ]
        }
      ]
    },
    {
      "index": 1,
      "status": "IN_PROGRESS",
      "markdown": [
        {
          "type": "heading",
          "depth": 2,
          "children": [
            { "type": "text", "value": "Phase 2: AI 진단 레이어 개발 (In-Progress)" }
          ]
        },
        {
          "type": "list",
          "ordered": false,
          "start": null,
          "spread": false,
          "children": [
            {
              "type": "listItem",
              "spread": false,
              "checked": null,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "[/] GitHub Webhook 이벤트 리스너 서버 구축 (Cloudflare Workers)" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": false,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "에러 로그 벡터 임베딩 및 검색 로직 구현" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": false,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "LLM 기반 Root Cause Analysis(RCA) 프롬프트 엔지니어링" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": false,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "코드 수정 자동 제안을 위한 Git Patch 생성 모듈" }] }
              ]
            }
          ]
        }
      ]
    },
    {
      "index": 2,
      "status": "NOT_STARTED",
      "markdown": [
        {
          "type": "heading",
          "depth": 2,
          "children": [
            { "type": "text", "value": "Phase 3: 자가 치유 루프 통합" }
          ]
        },
        {
          "type": "list",
          "ordered": false,
          "start": null,
          "spread": false,
          "children": [
            {
              "type": "listItem",
              "spread": false,
              "checked": false,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "자동 PR 생성 및 테스트 자동화 연동" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": false,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "슬랙 알림 봇 및 인간 승인 워크플로우(Human-in-the-loop) 추가" }] }
              ]
            },
            {
              "type": "listItem",
              "spread": false,
              "checked": false,
              "children": [
                { "type": "paragraph", "children": [{ "type": "text", "value": "부하 테스트 및 비정상 케이스 시뮬레이션" }] }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

# ./packages/plan-json-to-markdown
plan.jsonmd 의 overview.markdown 과 phases[].markdown 을 추출하여 다음과 같이 markdown 포맷으로 변환해야 합니다.
md 파일을 생성하는 것이 아니라 markdown 포맷으로 출력하는 것입니다.
```md
# 프로젝트: 자가 치유형 멀티 클라우드 CI/CD 시스템 구축

## 🎯 프로젝트 개요
- **목표:** GitHub Actions 에러 발생 시 AI 에이전트가 자동으로 로그를 분석하고 수정 PR을 생성하는 시스템 구축
- **핵심 지표:** 배포 성공률 98% 달성, 장애 복구 시간(MTTR) 50% 단축

---

# Phases

## Phase 1: 기반 인프라 설정 (Completed)
- [x] 테라폼을 이용한 AWS/GCP 멀티 클라우드 프로비저닝
- [x] 중앙 집중형 로깅 시스템(Vector + Axiom) 구축
- [x] 기본 GitHub Actions 워크플로우 템플릿 작성

## Phase 2: AI 진단 레이어 개발 (In-Progress)
- [/] GitHub Webhook 이벤트 리스너 서버 구축 (Cloudflare Workers)
- [ ] 에러 로그 벡터 임베딩 및 검색 로직 구현
- [ ] LLM 기반 Root Cause Analysis(RCA) 프롬프트 엔지니어링
- [ ] 코드 수정 자동 제안을 위한 Git Patch 생성 모듈

## Phase 3: 자가 치유 루프 통합
- [ ] 자동 PR 생성 및 테스트 자동화 연동
- [ ] 슬랙 알림 봇 및 인간 승인 워크플로우(Human-in-the-loop) 추가
- [ ] 부하 테스트 및 비정상 케이스 시뮬레이션
```

# ./extensions/preview-plan-json
plan.jsonmd 파일을 VSCode에서 실시간으로 렌더링된 markdown 미리보기로 확인할 수 있도록 VSCode 확장 프로그램을 구현해야 합니다.
VSCode 확장 프로그램은 plan.jsonmd 파일이 저장된 폴더를 Watcher로 사용하여 파일이 변경되면 자동으로 plan.jsonmd 파일을 파싱하여 markdown 미리보기로 변환하여 VSCode에서 확인할 수 있도록 구현해야 합니다.
plan-json-to-markdown 패키지를 사용합니다.

# ./pnpm-workspace.yaml
plan-json-to-markdown 패키지와 extensions/preview-plan-json 확장 프로그램이 포함된 monorepo 구조를 구현해야 합니다.

# ./skills/plan-json
* SKILL.md
기본적으로 jq 를 사용하여 plan.jsonmd 파일을 관리합니다.
절대 plan.jsonmd 파일을 전체적으로 읽어 컨텍스트와 토큰을 낭비하지 않습니다.
jq 가 설치되어 있지 않다면 AskUserQuestion 를 사용하여 jq 설치 여부를 확인합니다.
jq 를 설치하지 않는다면 node, python, go, rust, ruby, perl, zig 등 json 을 파싱하고 오브젝트를 수정할 수 있는 언어를 사용하여 plan.jsonmd 파일을 부분적으로 관리합니다.
jq 또는 여러 언어를 이용하여 plan.jsonmd 파일을 부분적으로 읽습니다.
주로 state.currentPhase 를 통해 phases[currentPhase].status 를 확인하고 phases[currentPhase].markdown[type="listItem"].checked 를 확인합니다.
그 결과를 통해 마지막까지 작업된 목록을 확인하고 다음 작업을 알립니다.
jq 또는 여러 언어를 이용하여 plan.jsonmd 파일을 부분적으로 수정합니다.
주로 state.currentPhase 또는 phases[].status, phases[]..markdown[type="listItem"].checked 를 업데이트합니다.

# Miscellaneous
node 25, pnpm 10 (최신 버전 확인) 을 사용합니다.
