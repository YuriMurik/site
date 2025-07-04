import openai
import requests
import json
import base64

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
    print(f"📥 Buscando arquivo: {path}")
    url = f"https://api.github.com/repos/{repo}/contents/{path}?ref={branch}"
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print("❌ Erro ao buscar o arquivo:", response.text)
        return None, None
    data = response.json()
    content = base64.b64decode(data['content']).decode('utf-8')
    sha = data['sha']
    return content, sha

def update_file(path, new_content, sha, commit_message):
    print(f"📤 Enviando nova versão para: {path}")
    encoded = base64.b64encode(new_content.encode('utf-8')).decode('utf-8')
    url = f"https://api.github.com/repos/{repo}/contents/{path}"
    data = {
        "message": commit_message,
        "content": encoded,
        "sha": sha,
        "branch": branch
    }
    response = requests.put(url, headers=headers, json=data)
    if response.status_code == 200 or response.status_code == 201:
        print("✅ Commit enviado com sucesso!")
        return True
    else:
        print("❌ Falha ao enviar commit:", response.text)
        return False

def run_ai_edit(path, instruction):
    original, sha = get_file_content(path)
    if not original:
        return

    prompt = f"""Você é um assistente de programação.
Edite o seguinte código conforme a instrução abaixo:

Instrução: {instruction}

Código original:
{original}

Código modificado:"""

    print("🤖 Chamando OpenAI para editar o código...")
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    edited_code = response["choices"][0]["message"]["content"]
    if not edited_code.strip():
        print("❌ Código retornado está vazio!")
        return

    success = update_file(path, edited_code, sha, f"AI edit: {instruction}")
    if success:
        print(f"✔ Alteração feita no arquivo {path}")
