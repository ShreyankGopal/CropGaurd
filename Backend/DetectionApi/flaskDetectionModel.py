from flask import Flask, request, jsonify
import torch
from transformers import pipeline
from PIL import Image
import io

app = Flask(__name__)

# Load AI model (example: Hugging Face image classification)
model = pipeline("image-classification", model="linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification")

@app.route('/detectCropDiseaseHF', methods=['POST'])
def detect_crop_disease():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    # Read the image file
    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read()))

    # Perform AI computation
    result = model(image)
    print(result)
    return jsonify({"prediction": result})

if __name__ == '__main__':
    app.run(debug=True, port=5002)  # Running on port 5002
