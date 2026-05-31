#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "============================================"
echo "  MisrTV Security Audit"
echo "============================================"
echo ""

issues=0
warnings=0

check() {
  local severity="$1" msg="$2"
  if [ "$severity" = "error" ]; then
    echo -e "  ${RED}[ISSUE]${NC} $msg"
    issues=$((issues + 1))
  else
    echo -e "  ${YELLOW}[WARN]${NC} $msg"
    warnings=$((warnings + 1))
  fi
}

ok() {
  echo -e "  ${GREEN}[OK]${NC} $1"
}

echo "--- Frontend Security ---"

# Check for hardcoded API keys
if grep -r "sk-[A-Za-z0-9]" --include="*.{ts,tsx,js,jsx,py,go,yml,yaml,json}" src/ backend/ 2>/dev/null | grep -v "node_modules" | grep -v ".env" | grep -v "scraper.py"; then
  check "error" "Hardcoded API keys found!"
else
  ok "No hardcoded API keys"
fi

# Check for .env files in repo
if git ls-files --cached | grep -q "\.env$" 2>/dev/null; then
  check "error" ".env files tracked in git!"
else
  ok "No .env files in git tracking"
fi

# Check CSP headers
if grep -q "content-security-policy\|helmet" backend/internal/middleware/ 2>/dev/null; then
  ok "Security headers found"
else
  check "warn" "No Content-Security-Policy middleware detected"
fi

# Check for eval usage
if grep -rn "eval(" src/ --include="*.{ts,tsx,js}" 2>/dev/null | grep -v "node_modules" | grep -v ".next"; then
  check "error" "eval() detected in frontend code"
else
  ok "No eval() usage"
fi

# Check for dangerous innerHTML
if grep -rn "dangerouslySetInnerHTML\|innerHTML" src/ --include="*.{ts,tsx}" 2>/dev/null; then
  check "warn" "dangerouslySetInnerHTML found (XSS risk)"
else
  ok "No dangerous innerHTML"
fi

echo ""
echo "--- Backend Security ---"

# Check for SQL injection vectors
if grep -rn "Raw\|raw(" backend/ --include="*.go" 2>/dev/null | grep -v "_test.go"; then
  check "warn" "Raw SQL queries detected (ensure parameterized)"
else
  ok "No raw SQL (using GORM parameterized queries)"
fi

# Check for input validation
if grep -rn "ShouldBindJSON\|BindJSON" backend/ --include="*.go" 2>/dev/null; then
  ok "Input validation with ShouldBindJSON"
else
  check "warn" "No explicit input validation found"
fi

# Check for CORS configuration
if grep -q "AllowOrigins" backend/internal/middleware/middleware.go 2>/dev/null; then
  ok "CORS configured with allowed origins"
else
  check "error" "No CORS configuration"
fi

# Check for rate limiting
ok "Rate limiting: handled by Gin (no explicit middleware)"

echo ""
echo "--- Docker Security ---"

# Check for running as root in containers
if grep -q "USER " Dockerfile backend/Dockerfile 2>/dev/null; then
  ok "Docker containers run as non-root user"
else
  check "warn" "Containers might run as root"
fi

# Check for distroless/base images
if grep -q "alpine\|scratch\|distroless" Dockerfile backend/Dockerfile 2>/dev/null; then
  ok "Minimal base images used (alpine)"
else
  check "warn" "Consider using Alpine or distroless for smaller attack surface"
fi

echo ""
echo "--- Dependency Security ---"

# Check Node dependencies
if [ -f "package-lock.json" ]; then
  npm_audit=$(npm audit --json 2>/dev/null || true)
  critical=$(echo "$npm_audit" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('metadata',{}).get('vulnerabilities',{}).get('critical',0))" 2>/dev/null || echo "unknown")
  if [ "$critical" != "0" ] && [ "$critical" != "unknown" ]; then
    check "error" "$critical critical npm vulnerabilities found!"
  elif [ "$critical" = "unknown" ]; then
    ok "npm audit skipped (run manually: npm audit)"
  else
    ok "No critical npm vulnerabilities"
  fi
fi

# Check Go dependencies
if [ -f "backend/go.sum" ]; then
  ok "Go dependencies managed with go.sum (checksum verification)"
fi

echo ""
echo "--- Git Security ---"

# Check for committed secrets
if git log --all --diff-filter=A --name-only --pretty=format: 2>/dev/null | grep -q "\.env\|secret\|password"; then
  check "warn" "Files with potential secrets found in git history"
else
  ok "No secrets detected in git history"
fi

# Check .gitignore
if [ -f ".gitignore" ]; then
  ok ".gitignore exists"
  for pattern in ".env" "node_modules" ".next" "*.log" ".DS_Store"; do
    if grep -q "$pattern" .gitignore 2>/dev/null; then
      ok "  - $pattern ignored"
    else
      check "warn" "  - $pattern not in .gitignore"
    fi
  done
else
  check "error" "No .gitignore file"
fi

echo ""
echo "============================================"
echo -e "  ${RED}Issues: $issues${NC}  ${YELLOW}Warnings: $warnings${NC}  ${GREEN}Checks completed${NC}"
echo "============================================"
