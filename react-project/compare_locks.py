"""Correctly extract all deps from pnpm-lock.yaml and compare."""
import json, re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('package-lock.json') as f:
    lock3 = json.load(f)

with open('pnpm-lock.yaml') as f:
    pnpm_content = f.read()

# --- Direct deps from package.json ---
pkg3_deps    = lock3.get('packages', {}).get('', {}).get('dependencies', {})
pkg3_devdeps = lock3.get('packages', {}).get('', {}).get('devDependencies', {})
pkg3_all     = {**pkg3_deps, **pkg3_devdeps}

# --- Parse ALL keys from pnpm-lock.yaml ---
# Pattern 1: Quoted keys (scoped packages): 'name@...': or 'name':
# Pattern 2: Unquoted keys (simple packages): name@...: or name:
pkg2_keys = set()
for line in pnpm_content.split('\n'):
    # Quoted:  'name: (any leading whitespace)
    m = re.match(r"^\s+'(.*?)':", line)
    if m:
        pkg2_keys.add(m.group(1))
        continue
    # Unquoted (non-scoped):  name: or name@version:
    m = re.match(r"^(\w[\w.-]*?):\s*$", line)
    if m and not line.startswith('  ') and not line.startswith('	'):
        pkg2_keys.add(m.group(1))

# Also parse the importers/. / dependencies section
pkg2_direct = {}  # name -> version
in_correct_section = False
current_dep = None
in_specifier = False
for line in pnpm_content.split('\n'):
    stripped = line.strip()
    if stripped == '.:':
        in_correct_section = True
        continue
    if in_correct_section:
        if stripped == 'dependencies:' or stripped == 'devDependencies:':
            continue
        if stripped and not stripped.startswith("'") and not stripped.endswith(':'):
            in_correct_section = False
            current_dep = None
            continue
        if stripped == "version:":
            in_specifier = True
            continue
        if in_specifier:
            in_specifier = False
            if current_dep:
                pkg2_direct[current_dep] = stripped.split('(')[0].strip()
            current_dep = None
            continue
        m = re.match(r"^'(.*?)':", stripped)
        if m:
            current_dep = m.group(1)
            continue

# Print importers direct deps found
print("pnpm-lock.yaml importers 'dependencies' section:")
for dep, ver in sorted(pkg2_direct.items()):
    print(f"  {dep} = {ver}")
print(f"\nTotal direct deps found in pnpm importers: {len(pkg2_direct)}")
print(f"Total unique keys in pnpm packages section: {len(pkg2_keys)}")
