from flask import Flask, request, jsonify, send_from_directory, redirect
from flask_cors import CORS
import os
import sys
from urllib.parse import unquote
import json

# 保证任何目录下运行，工作目录都是项目根目录
# 获取源代码文件的绝对路径
source_file_path = os.path.abspath(sys.argv[0])

# 获取源代码文件所在目录的上两层目录
target_dir = os.path.dirname(os.path.dirname(os.path.dirname(source_file_path)))

# 改变当前工作目录
os.chdir(target_dir)

app = Flask(__name__)
CORS(app)

image_dir = './images' 
tag_dir = './tags'
paper_dir = './papers'
metadata_dir = './metadata'

@app.route('/images', methods=['GET'])
def get_images():
    images = []
    for name in sorted(os.listdir(image_dir)):
        file_exists = os.path.exists(os.path.join(tag_dir, f"{name}.txt"))
        tag_valid = False
        if file_exists:
            with open(os.path.join(tag_dir, f"{name}.txt")) as f:
                tag = f.read()
                if len(tag)>0:
                    tag_valid = True
        tagged = file_exists and tag_valid
        images.append({"name": name, "tagged": tagged})
    return jsonify(images)

@app.route('/images/<image_name>', methods=['GET'])
def get_image(image_name):
  image_name = unquote(image_name)
  return send_from_directory(os.path.join(target_dir, image_dir), f"{image_name}")

@app.route('/papers/from_image/<image_name>', methods=['GET'])
def get_paper_from_image(image_name):
  image_name = unquote(image_name)
  # 去除.pdf后面的内容
  paper_name = image_name.split(".pdf")[0]
  # 在metadata中找到对应文件
  with open(os.path.join(metadata_dir, f"{paper_name}.pdf.json")) as f:
    paper_data = json.load(f)
  # 找到data中对应的图片信息和页码
  image_metadata = next(filter(lambda x: x["filename"] == image_name, paper_data["images"]))
  page = image_metadata["page"]
  # 重定向到/paper/<paper_name>#page=<page>
  return redirect(f"/papers/{paper_name}#page={page+1}", code=302)

@app.route('/papers/<paper_name>', methods=['GET'])
def get_paper(paper_name):
  paper_name = unquote(paper_name)
  return send_from_directory(os.path.join(target_dir, paper_dir), f"{paper_name}.pdf")

@app.route('/tags/<image_name>', methods=['GET'])  
def get_tag(image_name):
    file_path = os.path.join(tag_dir, f"{image_name}.txt")
    if not os.path.exists(file_path):
        return jsonify({"tag": ""})
    
    with open(file_path) as f:
        tag = f.read()
    return jsonify({"tag": tag})

@app.route('/tags/<image_name>', methods=['POST']) 
def save_tag(image_name):
    data = request.get_json()
    tag = data['tag']
    file_path = os.path.join(tag_dir, f"{image_name}.txt")
    with open(file_path, 'w') as f:
        f.write(tag)
    return ""


if __name__ == '__main__':
    # 避免macOS上的端口冲突
    app.run(host='0.0.0.0', port=5001)