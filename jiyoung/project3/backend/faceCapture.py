from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
from werkzeug.utils import secure_filename
import uuid  # uuid 모듈 추가

app = Flask(__name__)
CORS(app)

# 허용 가능한 파일 확장자 설정
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload-image', methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"})

    if file and allowed_file(file.filename):
        # uuid를 사용하여 파일 이름 생성
        unique_filename = str(uuid.uuid4()) + '-' + secure_filename(file.filename)
        file.save(os.path.join('c:/upload/', unique_filename))
        return jsonify({"success": True, "message": "File uploaded successfully", "filename": unique_filename})
    else:
        return jsonify({"error": "File type not allowed"})

if __name__ == '__main__':
    app.run(debug=True)
