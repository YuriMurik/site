import openai
import requests
import json

# Carregar configs
with open("ai-bot/config.json") as f:
    config = json.load(f)

openai.api_key = config["openai_api_key"]
github_token = config["github_token"]
repo = config["repo"]
branch = config["branch"]

headers = {
    "Authorization": f"token {github_token}",
    "Accept": "application/vnd.github.v3+json"
}

def get_file_content(path):
    url = f"https://api.github.com/repos/{repo}/contents/{path}?ref={branch}"
    response = requests.get(url, headers=headers)
    data = response.json()
    import base64
    return base64.b64decode(data['content']).decode('utf-8'), data['sha']

def update_file(path, new_content, sha, commit_message):
    import base64
    url = f"https://api.github.com/repos/{repo}/contents/{path}"
    encoded = base64.b64encode(new_content.encode('utf-8')).decode('utf-8')
    data = {
        "message": commit_message,
        "content": encoded,
        "sha": sha,
        "branch": branch
    }
    response = requests.put(url, headers=headers, json=data)
    return response.status_code == 200

def run_ai_edit(path, instruction):
    original, sha = get_file_content(path)
    prompt = f"""Você é um assistente de programação.
Edite o seguinte código conforme a instrução abaixo:

Instrução: {instruction}

Código original:
{original}

Código modificado:"""

    response = openai.ChatCompletion.create(
        model="gpt-4",  # ou gpt-3.5-turbo se for gratuito
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    edited_code = response["choices"][0]["message"]["content"]
    update_file(path, edited_code, sha, f"AI edit: {instruction}")
    print(f"✔ Alteração feita no arquivo {path}")

