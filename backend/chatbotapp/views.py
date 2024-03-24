from django.shortcuts import render
from transformers import AutoModelForQuestionAnswering, BertTokenizer
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import torch
import json

def home(request):
    return render(request, 'home.html')

model_name = 'bert-large-uncased-whole-word-masking-finetuned-squad'
model = AutoModelForQuestionAnswering.from_pretrained(model_name)

# Get the answer from the model
def reply(question):
    tokenizer = BertTokenizer.from_pretrained(model_name)
    context = '''
    I'm Yuka. I live in Canada.
    I'm a software developer.
    I'm interested in AI/ML and web development.
    I like travelling and reading.
    '''
    inputs = tokenizer.encode_plus(question, context, add_special_tokens=True, return_tensors="pt")
    input_ids = inputs["input_ids"].tolist()[0]
    output = model(**inputs)
    answer_start = torch.argmax(output.start_logits)
    answer_end = torch.argmax(output.end_logits) + 1
    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))
    answer = answer.replace('[CLS]', '')
    answer = answer.replace('[SEP]', '')
    return answer

@csrf_exempt # disable CSRF protection
# Make the bot respond to the user input
def bot_response(request):
    if request.method == 'POST':
        try:
            # get the input message
            data = json.loads(request.body)
            input_text = data.get('message')
            if not input_text:
                return HttpResponseBadRequest('No message found') # StatusCode: 400

            # get the bot response
            bot_response = reply(input_text)

            # return the bot response as a JSON
            return JsonResponse({'reply': bot_response})

        except json.JSONDecodeError:
            return HttpResponseBadRequest('Invalid JSON') # StatusCode: 400

    else:
        return HttpResponseBadRequest('Invalid request method') # StatusCode: 400
