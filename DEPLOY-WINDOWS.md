# Windows에서 SEHYUN ICT 홈페이지 배포 가이드

Windows 환경에서 운영 서버로 코드를 배포하는 전체 절차를 정리한다.
서버의 `.env.production`과 `data/*.json`(어드민 콘텐츠)은 **절대 덮어쓰지 않도록** 설계되어 있다.

---

## 0. 사전 준비

### 0-1. 필요한 도구

Windows에서 다음 중 하나가 설치되어 있어야 한다.

| 도구 | 비고 |
|---|---|
| **Git for Windows** (권장) | Git Bash + `ssh`, `scp`, `rsync` 모두 포함 |
| WSL (Windows Subsystem for Linux) | `wsl --install` 로 설치 |
| OpenSSH for Windows | Windows 10/11 기본 탑재. `rsync`는 별도 |

설치 확인 (Git Bash 또는 PowerShell):

```bash
ssh -V
scp -V
rsync --version    # 없으면 옵션 B(scp) 사용
```

### 0-2. 서버 접속 정보

다음 정보를 미리 준비한다.

- **서버 IP**: `<서버IP>`
- **sudo 가능한 운영자 계정**: `<sudo계정>` (예: 운영자 본인 계정)
- **앱 디렉터리**: `/var/www/sehyunict`
- **앱 실행 계정**: `sehyunict`

### 0-3. SSH 키 등록 (선택, 추천)

매번 비밀번호 치는 게 귀찮으면 SSH 키를 등록한다.

```bash
# Git Bash 또는 PowerShell
ssh-keygen -t ed25519 -C "windows-deploy"
ssh-copy-id <sudo계정>@<서버IP>
```

`ssh-copy-id`가 없으면:

```bash
type %USERPROFILE%\.ssh\id_ed25519.pub | ssh <sudo계정>@<서버IP> "cat >> ~/.ssh/authorized_keys"
```

---

## 1. Windows에서 빌드 검증

먼저 로컬에서 빌드가 통과하는지 확인한다.
빌드 산출물(`.next/`)은 **서버로 보내지 않는다**. macOS/Windows에서 만든 native binding은 Linux에서 동작하지 않기 때문이다. 빌드는 어디까지나 "에러 없이 통과하는지" 검증용이고, 실제 운영 빌드는 서버에서 다시 만든다.

```bash
# Git Bash 또는 PowerShell
cd C:/Users/<유저>/Desktop/apps/sehyunict-renewal
# Git Bash 스타일: /c/Users/<유저>/Desktop/apps/sehyunict-renewal

npm install
npm run build
```

빌드가 실패하면 여기서 멈추고 에러부터 수정한다.

---

## 2. 소스 전송

서버의 `/tmp/sehyunict-src/` 경로로 코드를 보낸다. 다음 두 옵션 중 하나를 선택한다.

### 옵션 A — rsync 사용 (권장, Git Bash에서)

```bash
cd /c/Users/<유저>/Desktop/apps/sehyunict-renewal

rsync -avz --delete \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env*' \
  --exclude='.git' \
  --exclude='.claude' \
  --exclude='.DS_Store' \
  --exclude='data/' \
  ./ <sudo계정>@<서버IP>:/tmp/sehyunict-src/
```

#### 핵심 exclude 항목

| 항목 | 이유 |
|---|---|
| `node_modules` | 서버에서 새로 설치 (OS 종속 native binding) |
| `.next` | 서버에서 새로 빌드 |
| `.env*` | **서버의 운영 시크릿 보존** (덮어쓰면 운영 다운) |
| `data/` | **어드민에서 작성한 콘텐츠 보존** |
| `.git` `.claude` `.DS_Store` | 불필요 |

### 옵션 B — PowerShell + scp (rsync 미설치 시)

```powershell
# PowerShell
cd C:\Users\<유저>\Desktop\apps\sehyunict-renewal

# 1) 임시로 깨끗한 복사본 만들기 (제외할 파일 빼고)
$tmpDir = "$env:TEMP\sehyunict-src"
Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $tmpDir | Out-Null

$exclude = @('node_modules', '.next', '.env', '.env.local', '.env.production',
             '.git', '.claude', '.DS_Store', 'data')

Get-ChildItem -Path . -Force | Where-Object {
  $name = $_.Name
  -not ($exclude -contains $name)
} | Copy-Item -Destination $tmpDir -Recurse -Force

# 2) tar.gz 압축 (Windows 10/11 기본 tar 사용)
cd $env:TEMP
tar -czf sehyunict-src.tar.gz -C sehyunict-src .

# 3) 서버로 전송
scp sehyunict-src.tar.gz <sudo계정>@<서버IP>:/tmp/

# 4) 로컬 정리
Remove-Item sehyunict-src.tar.gz
Remove-Item -Recurse -Force sehyunict-src
```

`tar`가 없으면 7-Zip이나 Compress-Archive로 zip 압축 후 scp로 전송한다.

---

## 3. 서버에서 자리잡기 (sudo 본인 계정)

```bash
ssh <sudo계정>@<서버IP>
```

### 옵션 A로 보낸 경우

```bash
# /tmp/sehyunict-src/ → /var/www/sehyunict/ 동기화
# 핵심: 서버에만 있어야 할 것들(node_modules, .next, .env*, data/)을 exclude
sudo rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env*' \
  --exclude='data/' \
  /tmp/sehyunict-src/ /var/www/sehyunict/

# 소유권 복구
sudo chown -R sehyunict:sehyunict /var/www/sehyunict

# 임시 파일 정리
rm -rf /tmp/sehyunict-src
```

### 옵션 B로 보낸 경우

```bash
# 1) 압축 해제
sudo mkdir -p /tmp/sehyunict-src
sudo tar -xzf /tmp/sehyunict-src.tar.gz -C /tmp/sehyunict-src

# 2) rsync로 동기화 (옵션 A와 동일 exclude)
sudo rsync -av --delete \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env*' \
  --exclude='data/' \
  /tmp/sehyunict-src/ /var/www/sehyunict/

sudo chown -R sehyunict:sehyunict /var/www/sehyunict
rm -rf /tmp/sehyunict-src /tmp/sehyunict-src.tar.gz
```

### 보존 확인 (필수)

`.env.production`과 `data/*.json`이 살아있는지 반드시 확인한다.

```bash
ls -la /var/www/sehyunict/.env.production
ls /var/www/sehyunict/data/
```

`.env.production`이 사라졌거나 `data/` 안에 파일이 없으면 **여기서 멈추고** 백업이나 이전 상태에서 복구해야 한다.

---

## 4. 빌드 + 무중단 reload (sehyunict 계정)

운영 계정(`sehyunict`)으로 전환해서 의존성 동기화, 빌드, pm2 reload를 수행한다.

```bash
sudo -iu sehyunict bash -lc '
  cd /var/www/sehyunict &&

  echo "▶ env 보존 확인" &&
  cat .env.production | grep -E "^(ADMIN_USER|COOKIE_SECURE|NODE_ENV)" &&

  echo "" &&
  echo "▶ data 보존 확인" &&
  ls data/ &&

  echo "" &&
  echo "▶ 의존성 동기화 (package-lock 기준)" &&
  npm ci &&

  echo "" &&
  echo "▶ 빌드 캐시 삭제 + 재빌드" &&
  rm -rf .next &&
  npm run build &&

  echo "" &&
  echo "▶ pm2 무중단 reload" &&
  pm2 reload sehyunict &&

  echo "" &&
  echo "▶ 상태 확인" &&
  pm2 status
'
```

### 각 명령의 의미

| 명령 | 설명 |
|---|---|
| `npm ci` | `package-lock.json` 기준으로 정확한 의존성 설치. 결정적이고 빠름. |
| `rm -rf .next` | 빌드 캐시 잔재 제거 (옛 코드가 살아남는 사고 방지) |
| `npm run build` | 운영 빌드 (`NODE_ENV=production`, `.env.production` 자동 로드) |
| `pm2 reload sehyunict` | 무중단 graceful 재시작 (다운타임 거의 0) |

---

## 5. 검증

```bash
echo "===== 1) Node 로컬 응답 ====="
curl -I http://127.0.0.1:3000

echo ""
echo "===== 2) Apache 경유 HTTPS ====="
curl -skI https://sehyunict.com/ | head -10

echo ""
echo "===== 3) Next.js 응답인지 ====="
curl -skI https://sehyunict.com/ | grep -iE "x-powered-by|x-nextjs"

echo ""
echo "===== 4) pm2 상태 ====="
sudo -iu sehyunict pm2 status

echo ""
echo "===== 5) 환경변수 ====="
sudo -iu sehyunict pm2 env 0 | grep -E "COOKIE_SECURE|NODE_ENV"
```

### 정상 출력

| 항목 | 기대값 |
|---|---|
| 1번 | `HTTP/1.1 200 OK` |
| 2번 | `HTTP/2 200` |
| 3번 | `x-powered-by: Next.js` |
| 4번 | `sehyunict` `online` |
| 5번 | `COOKIE_SECURE=true`, `NODE_ENV=production` |

### 브라우저 최종 확인

1. 시크릿 창 또는 쿠키 삭제 후 `https://sehyunict.com/` 접속
2. `/admin/login`에서 로그인
3. 어드민 메뉴 이동 → 세션 유지 확인
4. 어드민에서 콘텐츠 수정 후 저장 → 새 탭에서 일반 페이지 새로고침 → 즉시 반영 확인

---

## 한 페이지 치트시트

### Windows (Git Bash)

```bash
cd /c/Users/<유저>/Desktop/apps/sehyunict-renewal
npm run build

rsync -avz --delete \
  --exclude='node_modules' --exclude='.next' --exclude='.env*' \
  --exclude='.git' --exclude='.claude' --exclude='.DS_Store' \
  --exclude='data/' \
  ./ <sudo계정>@<서버IP>:/tmp/sehyunict-src/
```

### 서버 (sudo 본인 계정)

```bash
ssh <sudo계정>@<서버IP>

sudo rsync -av --delete \
  --exclude='node_modules' --exclude='.next' --exclude='.env*' --exclude='data/' \
  /tmp/sehyunict-src/ /var/www/sehyunict/
sudo chown -R sehyunict:sehyunict /var/www/sehyunict
rm -rf /tmp/sehyunict-src
```

### 서버 (sehyunict 계정)

```bash
sudo -iu sehyunict bash -lc '
  cd /var/www/sehyunict &&
  npm ci &&
  rm -rf .next &&
  npm run build &&
  pm2 reload sehyunict &&
  pm2 status
'
```

### 검증

```bash
curl -skI https://sehyunict.com/ | head -10
```

---

## 자주 일어나는 사고 — 사전 차단 체크

배포 전에 반드시 점검한다.

- [ ] **`.env*` exclude 포함 여부**
  Windows의 `.env.local`(개발용)로 서버의 `.env.production`(운영)을 덮어쓰면 운영 시크릿이 날아간다.
- [ ] **`data/` exclude 포함 여부**
  어드민에서 작성한 콘텐츠 JSON이 로컬 파일로 덮어써져 사라진다.
- [ ] **서버 측 rsync에도 `--exclude='node_modules'`**
  빼먹으면 `--delete` 옵션으로 서버의 `node_modules`가 삭제된다.
- [ ] **로컬 `npm run build` 통과 확인 후 배포**
  서버에서 처음 발견되는 빌드 에러는 다운타임으로 직결된다.
- [ ] **`pm2 reload` 후 `pm2 status`로 online 확인**
  reload 실패 시 옛 인스턴스가 죽고 새 인스턴스가 안 뜨는 경우가 있다.

---

## Windows 환경에서 자주 만나는 함정

### 1. 줄 끝 문자 (CRLF vs LF)

Windows는 기본 CRLF, Linux는 LF를 사용한다. rsync는 바이너리로 옮기므로 보통 문제 없지만, 셸 스크립트(`.sh`)를 직접 만들어 보내면 깨질 수 있다.

해결:
```bash
git config --global core.autocrlf input
```

### 2. rsync 권한 에러

Git Bash의 rsync가 가끔 권한 매핑 문제로 중단된다. 그럴 땐 권한 무시 옵션을 사용한다.

```bash
rsync -rltDvz --no-perms --delete \
  --exclude='...' \
  ./ <서버>:/tmp/sehyunict-src/
```

### 3. 경로 슬래시

Windows는 `\`, Unix는 `/`를 쓴다. Git Bash, scp, ssh 모두 `/`만 인식하므로 경로는 전부 `/`로 작성한다.

### 4. OneDrive / Dropbox 안의 프로젝트

OneDrive나 Dropbox 같은 클라우드 동기화 폴더 안에 프로젝트가 있으면, rsync 중에 클라우드가 파일을 동시에 잠궈서 멈출 수 있다.

가능하면 동기화 폴더 밖(예: `C:\dev\sehyunict-renewal`)으로 옮기는 것을 권장한다.

### 5. SSH 키 위치

- Git Bash: `C:\Users\<유저>\.ssh\`
- WSL: WSL 안의 `~/.ssh/` (별도 영역)
- OpenSSH for Windows: `C:\Users\<유저>\.ssh\`

SSH 키가 인식 안 되면 위 위치에 `id_ed25519`, `id_ed25519.pub` 파일이 있는지 확인한다.

---

## 트러블슈팅

### `next: command not found`

서버에 `node_modules`가 없거나 깨진 상태다. `npm ci`를 다시 실행한다.

```bash
sudo -iu sehyunict bash -lc 'cd /var/www/sehyunict && rm -rf node_modules && npm ci'
```

### `pm2 list`가 비어있는데 3000 포트는 떠 있음

다른 유저의 pm2 데몬이 띄운 것이거나, 떠돌이 Node 프로세스다. 정리 후 sehyunict 단일 등록으로 통일한다.

```bash
sudo lsof -i :3000          # 또는 sudo ss -tlnp | grep :3000
sudo ps -ef | grep -E "PM2|node" | grep -v grep
sudo pkill -9 -u sehyunict
sudo -iu sehyunict bash -lc '
  cd /var/www/sehyunict &&
  pm2 start npm --name sehyunict -- run start &&
  pm2 save
'
```

### `[auth] ADMIN_SECRET, ADMIN_USER, ADMIN_PASSWORD must be set`

`.env.production`이 사라졌거나 비어있다. rsync에서 `.env*` exclude가 빠진 채로 배포되어 덮어쓴 상태일 가능성이 높다.

복구: 백업에서 `.env.production` 복원 후 pm2 재시작.

```bash
# .env.production 복원 (백업 또는 시크릿 매니저에서)
sudo -iu sehyunict bash -lc '
  pm2 delete sehyunict;
  cd /var/www/sehyunict &&
  pm2 start npm --name sehyunict -- run start &&
  pm2 save
'
```

### 어드민에서 저장했는데 사이트에 반영 안 됨

각 어드민 action 파일에 `revalidatePath("/", "layout")`이 포함되어 있어야 한다. 누락된 경우 저장 후에도 캐시된 빌드 결과만 보인다.

확인:
```bash
grep -l "revalidatePath" /var/www/sehyunict/app/admin/\(protected\)/*/actions.ts
```

10개 파일 모두 보여야 한다.

---

## 부속 정보

### 디렉터리 구조 (서버)

```
/var/www/sehyunict/
├── app/                       ← 소스 (배포 시 덮어씀)
├── components/                ← 소스 (배포 시 덮어씀)
├── lib/                       ← 소스 (배포 시 덮어씀)
├── public/                    ← 정적 자원 (배포 시 덮어씀)
├── data/                      ← CMS 콘텐츠 (★ 배포 시 보존)
│   ├── home.json
│   ├── nav.json
│   ├── ... (기타 JSON)
├── package.json
├── package-lock.json
├── next.config.ts
├── .env.production            ← 운영 시크릿 (★ 배포 시 보존)
├── node_modules/              ← 서버에서 생성 (배포 시 보존)
└── .next/                     ← 서버에서 생성 (배포 시 새로 빌드)
```

### 운영 명령 치트시트

```bash
# pm2 상태
sudo -iu sehyunict pm2 status
sudo -iu sehyunict pm2 logs sehyunict --lines 50

# 무중단 reload (코드 변경 후)
sudo -iu sehyunict pm2 reload sehyunict

# 완전 재시작 (env 변경 시 — restart는 env 새로 안 읽으므로 delete + start)
sudo -iu sehyunict bash -lc '
  pm2 delete sehyunict;
  cd /var/www/sehyunict &&
  pm2 start npm --name sehyunict -- run start &&
  pm2 save
'

# Apache 설정 검증 + reload
sudo httpd -t
sudo systemctl reload httpd

# 실시간 로그 모니터
sudo tail -f /var/log/httpd/sehyunict_ssl_access.log /var/log/httpd/sehyunict_ssl_error.log
sudo -iu sehyunict pm2 logs sehyunict
```
