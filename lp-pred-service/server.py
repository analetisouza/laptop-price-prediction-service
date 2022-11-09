import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import os

app = Flask(__name__)
CORS(app)

model = pickle.load(open('model.pkl','rb'))
@app.route('/',methods=['POST'])
def predict():
    f = open("default_features.json")
    default_features = json.load(f)

    model_features = list(default_features.keys())

    default_features["brand_" + request.form['brand'].lower()] = 1
    default_features["screen_size"] = request.form['screen_size']
    default_features["memory"] = request.form['memory']
    default_features["os_" + request.form['os'].lower()] = 1
    default_features["weight"] = request.form['weight']
    default_features["cpu_brand_" + request.form['cpu_brand'].lower()] = 1
    default_features["cpu_model_" + request.form['cpu_model'].lower()] = 1
    default_features["cpu_clock"] = request.form['cpu_clock']
    default_features["gpu_brand_" + request.form['gpu_brand'].lower()] = 1
    default_features["gpu_model_" + request.form['gpu_model'].lower()] = 1
    default_features["disk_size"] = request.form['disk_size']
    default_features["disk_type_" + request.form['disk_type'].lower()] = 1

    for item in list(default_features.keys()):
        if item not in model_features:
            default_features.pop(item)

    features_list = np.float32(np.array(list(default_features.values())))
    processed_features = []
    temp = []

    for item in features_list:
        temp.append(item)
    processed_features.append(temp)

    prediction = model.predict(processed_features)

    predicted_value = float(np.format_float_positional(prediction[0], precision=2))

    return jsonify(predicted_value)

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT", 8080)),host='0.0.0.0',debug=True)