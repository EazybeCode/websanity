# Process CSV redirects and generate output files
import csv
import re

csv_path = r'C:\Users\VIKASH\Downloads\eazybe 301 redirection file - Sheet1.csv'
app_output_path = r'C:\Users\VIKASH\websanity\src\routes\redirect-routes.tsx'
nginx_output_path = r'C:\Users\VIKASH\websanity\nginx-redirects.conf'
redirects_output_path = r'C:\Users\VIKASH\websanity\public\_redirects'

# Read CSV file
with open(csv_path, 'r', encoding='utf-8') as f:
    csv_content = f.read()
    lines = csv_content.split('\n')

# Parse redirects
redirects = []
english = []
portuguese = []
spanish = []
turkish = []

for i, line in enumerate(lines):
    line = line.strip()
    if not line or line.startswith('Old URL'):
        continue

    parts = line.split(',')
    if len(parts) < 2:
        continue

    source = parts[0].replace('Old URL (Source)', '').strip()
    dest = parts[1].replace('New URL (Destination)', '').strip()
    status = parts[2].replace('Status', '').strip() if len(parts) > 2 else '301'

    # Clean source - remove trailing comma and slash
    source = re.sub(r',+$', '', source)
    source = re.sub(r'/$', '', source)

    # Skip if empty or status is not 301
    if not source or not dest or status != '301':
        continue

    redirects.append({'source': source, 'dest': dest, 'status': status})

print(f'Total redirects parsed: {len(redirects)}')

# Group by language prefix
for r in redirects:
    s = r['source']
    if s.startswith('/br/'):
        portuguese.append(r)
    elif s.startswith('/es/'):
        spanish.append(r)
    elif s.startswith('/tr/'):
        turkish.append(r)
    else:
        english.append(r)

# Generate App.tsx JSX routes
def generate_redirect_route(src, dest):
    src = re.sub(r'/$', '', src)
    dest = re.sub(r'/$', '', dest)

    has_lang_prefix = dest.startswith('/br/') or dest.startswith('/es/') or dest.startswith('/tr/')

    return f'      <Route path="{src}" element={{{<Navigate to="{dest}" replace />}}'

def generate_routes(arr, lang_prefix=''):
    return '\n'.join(generate_redirect_route(r['source'], r['dest']) for r in arr)

english_routes = generate_routes(english)
portuguese_routes = generate_routes(portuguese)
spanish_routes = generate_routes(spanish)
turkish_routes = generate_routes(turkish)

# Generate nginx rules
def generate_nginx_rule(src, lang_prefix=''):
    src = re.sub(r'/$', '', src)
    path = f'{lang_prefix}{src}' if lang_prefix else src

    return f'    rewrite ^{src}$ {path} permanent;'

english_nginx = '\n'.join(generate_nginx_rule(r['source'], r['dest']) for r in english)
portuguese_nginx = '\n'.join(generate_nginx_rule(r['source'], r['dest'], '/br/') for r in portuguese)
spanish_nginx = '\n'.join(generate_nginx_rule(r['source'], r['dest'], '/es/') for r in spanish)
turkish_nginx = '\n'.join(generate_nginx_rule(r['source'], r['dest'], '/tr/') for r in turkish)

# Generate _redirects format
all_redirects = '\n'.join(f'{r["source"].replace("/", "")} {r["dest"].replace("/", "")} 301' for r in redirects)

# Write outputs
app_routes_output = f'''{{/* 301 Redirects */}}

{{' * 8203; 301 Redirects - English */}}
{english_routes}

{{' * 8203; 301 Redirects - Portuguese (/br) */}}
{portuguese_routes}

{{' * 8203; 301 Redirects - Spanish (/es) */}}
{spanish_routes}

{{' * 8203; 301 Redirects - Turkish (/tr) */}}
{turkish_routes}}
'''

nginx_output = f'''# 301 Redirects from CSV
{english_nginx}

# Portuguese (/br) redirects
{portuguese_nginx}

# Spanish (/es) redirects
{spanish_nginx}

# Turkish (/tr) redirects
{turkish_nginx}
'''

# Write to files
with open(app_output_path, 'w', encoding='utf-8') as f:
    f.write(app_routes_output)

with open(nginx_output_path, 'w', encoding='utf-8') as f:
    f.write(nginx_output)

with open(redirects_output_path, 'w', encoding='utf-8') as f:
    f.write(all_redirects)

print(f'App routes written to: {app_output_path}')
print(f'Nginx rules written to: {nginx_output_path}')
print(f'_redirects file written to: {redirects_output_path}')
