# PLAN.json Skill

AI 에이전트가 PLAN.jsonmd 파일을 효율적으로 관리하기 위한 가이드입니다.

## Prerequisites

**jq 설치 확인:**
```bash
jq --version
```

jq가 설치되어 있지 않다면 사용자에게 설치 여부를 확인합니다.
대안으로 Node.js, Python, Go, Rust, Ruby, Perl, Zig 등 JSON 처리가 가능한 언어를 사용합니다.

---

## Core Principles

1. **절대 전체 파일을 읽지 않습니다** - 필요한 부분만 추출합니다
2. **부분 업데이트만 수행합니다** - 전체 파일을 다시 쓰지 않습니다
3. **O(1) 접근을 목표로 합니다** - 키 경로로 직접 접근합니다

---

## Read Operations

### 현재 Phase 인덱스 확인
```bash
jq '.state.currentPhaseIndex' plan.jsonmd
```

### 현재 Phase 상태 확인
```bash
jq '.phases[.state.currentPhaseIndex].status' plan.jsonmd
```

### 마지막 업데이트 시간 확인
```bash
jq '.state.lastedUpdatedAt' plan.jsonmd
```

### 특정 Phase의 체크리스트 상태 확인
```bash
# Phase 1의 모든 listItem의 checked 상태
jq '.phases[1].markdown[] | select(.type == "list") | .children[] | select(.type == "listItem") | .checked' plan.jsonmd
```

### 진행 중인 작업(in_progress) 찾기
```bash
jq -r '.phases[] | .markdown[] | select(.type == "list") | .children[] | select(.checked == "in_progress") | .children[0].children[0].value' plan.jsonmd
```

### 완료되지 않은 작업 찾기
```bash
jq -r '.phases[] | .markdown[] | select(.type == "list") | .children[] | select(.checked == false) | .children[0].children[0].value' plan.jsonmd
```

---

## Write Operations

### Phase 상태 업데이트
```bash
# Phase 0을 COMPLETED로 변경
jq '.phases[0].status = "COMPLETED"' plan.jsonmd > tmp.jsonmd && mv tmp.jsonmd plan.jsonmd
```

### currentPhaseIndex 업데이트
```bash
jq '.state.currentPhaseIndex = 2' plan.jsonmd > tmp.jsonmd && mv tmp.jsonmd plan.jsonmd
```

### lastedUpdatedAt 업데이트
```bash
jq --arg now "$(date -Iseconds)" '.state.lastedUpdatedAt = $now' plan.jsonmd > tmp.jsonmd && mv tmp.jsonmd plan.jsonmd
```

### 특정 작업을 완료로 표시
```bash
# Phase 1의 첫 번째 list의 두 번째 item을 완료로 표시
jq '.phases[1].markdown[1].children[1].checked = true' plan.jsonmd > tmp.jsonmd && mv tmp.jsonmd plan.jsonmd
```

### 특정 작업을 진행 중으로 표시
```bash
jq '.phases[1].markdown[1].children[0].checked = "in_progress"' plan.jsonmd > tmp.jsonmd && mv tmp.jsonmd plan.jsonmd
```

---

## Alternative Languages

### Node.js
```typescript
import { readFileSync, writeFileSync } from 'node:fs';

const plan = JSON.parse(readFileSync('plan.jsonmd', 'utf-8'));
const currentPhase = plan.phases[plan.state.currentPhaseIndex];
console.log(`Current Phase: ${currentPhase.status}`);

// Update
plan.state.lastedUpdatedAt = new Date().toISOString();
writeFileSync('plan.jsonmd', JSON.stringify(plan, null, 2));
```

### Python
```python
import json
from datetime import datetime

with open('plan.jsonmd', 'r') as f:
    plan = json.load(f)

current_phase = plan['phases'][plan['state']['currentPhaseIndex']]
print(f"Current Phase: {current_phase['status']}")

# Update
plan['state']['lastedUpdatedAt'] = datetime.now().isoformat()
with open('plan.jsonmd', 'w') as f:
    json.dump(plan, f, indent=2, ensure_ascii=False)
```

---

## Workflow

1. **상태 확인**: `jq '.state'`로 현재 상태 파악
2. **작업 식별**: 현재 Phase에서 `checked: false` 또는 `checked: "in_progress"`인 작업 찾기
3. **작업 시작**: 해당 작업을 `"in_progress"`로 업데이트
4. **작업 완료**: 해당 작업을 `true`로 업데이트, 필요시 다음 작업을 `"in_progress"`로 설정
5. **Phase 전환**: 모든 작업 완료 시 Phase status를 `COMPLETED`로, `currentPhaseIndex` 증가
