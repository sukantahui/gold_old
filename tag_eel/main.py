import eel
import requests
import os
from random import randint

  
eel.init("web")  

def create_text_file(data):
    f = open("tag.txt","w")
    f.write(data)
    f.close()
    
  
# Exposing the random_python function to javascript
@eel.expose    
def random_python():
    return randint(1,100)

# using the eel.expose command  
@eel.expose  
# defining the function for addition of two numbers  
def add(data_1, data_2):  
    int1 = int(data_1)  
    int2 = int(data_2)  
    output = int1 + int2  
    return output  


@eel.expose
def fetchTagDetails(jobId):
    print(jobId)
    response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/tag/job/%s" % (jobId))
    if response.status_code==200:
        jobDetails = response.json().get('data')
        create_text_file("testing file")
        print(jobDetails)
    return jobDetails

@eel.expose
def runBatch():
    os.system('test.bat')

@eel.expose
def printTag(jobdata):
    #spliting serialize array to dictionary
    d = dict(x.split("=") for x in jobdata.split("&"))
    print(d)
  
# Start the index.html file
eel.start("index.html")