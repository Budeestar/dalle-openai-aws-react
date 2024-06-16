from flask import Flask, request, jsonify
import openai
import requests
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins=["https://genuine-begonia-7bbfa7.netlify.app/"])

openai.api_key = 'your-openai-api-key'  # Replace with your actual API key

@app.route('/generate', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data['prompt']
    size = data['size']

    try:
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size=size
        )

        if response and 'data' in response and len(response['data']) > 0:
            image_url = response['data'][0]['url']
            image_response = requests.get(image_url)
            image_data = image_response.content
            image_base64 = base64.b64encode(image_data).decode('utf-8')
            return jsonify({'image_base64': image_base64})
        else:
            return jsonify({'error': 'Failed to generate image', 'details': response}), 500

    except Exception as e:
        return jsonify({'error': 'Exception occurred', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
