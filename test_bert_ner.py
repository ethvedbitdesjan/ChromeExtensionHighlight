from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline
from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse
import pickle
import numpy as np
import json
from flask_cors import CORS

# using flask_restful
from flask import Flask, jsonify, request
from flask_restful import Resource, Api

# creating the flask app
app = Flask(__name__)
cors = CORS(app)
# creating an API object
api = Api(app)
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.

class Hello(Resource):

    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self):

        return jsonify({'message': 'hello world'})

    # Corresponds to POST request
    def post(self):
        try:
            data = request.get_json()
            #print(type(request), type(data), "here0")
        except:
            try:
                data = request.json()
                #print(type(request), type(data), "here1")
            except:
                data = str(request)
                #print(type(data), data, "here3")
        #print(type(data), data)
        try:
            data = data['data']
        except:
            return data, 400
        answer = {}
        if len(data) > 256:
            print("here5", len(data))
            n = 256 # chunk length
            chunks = [data[i:min(i+n, len(data))] for i in range(0, len(data), n)]
            chunks = data.split('.')
            for chunk in chunks:
                ner_result = nlp(chunk)
                for result in ner_result:
                    if str(result['entity']) in answer:
                        word = str(result['word'])
                        word = word.replace('#', '')
                        if len(word) < 4:
                            continue
                        answer[str(result['entity'])].append(word)
                    else:
                        word = str(result['word'])
                        word = word.replace('#', '')
                        if len(word) < 4:
                            continue
                        answer[str(result['entity'])] = [word]
            return answer, 201

        ner_results = nlp(data)
           # status code
        print(ner_results)
        for result in ner_results:
            if str(result['entity']) in answer:
                word = str(result['word'])
                word = word.replace('#', '')
                if len(word) < 4:
                    continue
                answer[str(result['entity'])].append(word)
            else:
                word = str(result['word'])
                word = word.replace('#', '')
                if len(word) < 4:
                    continue
                answer[str(result['entity'])] = [word]
        print(answer)
        return answer, 201


# another resource to calculate the square of a number


# adding the defined resources along with their corresponding urls
api.add_resource(Hello, '/')


# driver function
if __name__ == '__main__':
    tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")
    model = AutoModelForTokenClassification.from_pretrained("dslim/bert-base-NER")

    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    app.run(debug = True)
