import eel
import requests
import os
import json
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
def fetch_ip():  
    with open('project.json', 'r') as f:
        data = json.load(f)
    global current_ip
    current_ip = data['ip']      
    return data['ip'] 

@eel.expose  
# defining the function for addition of two numbers  
def update_ip(new_ip):  
    print("updating ip")
    with open('project.json', 'r') as f:
        data = json.load(f)   
    data['ip']=new_ip     
    with open("project.json", "w") as jsonFile:
        json.dump(data, jsonFile)   
    current_ip=new_ip    


@eel.expose
def fetchTagDetails(jobId):
    response = requests.get("http://%s/gold_old/gold_api/public/api/dev/tag/job/%s" % (current_ip,jobId))
    if response.status_code==200:
        jobDetails = response.json().get('data')
        # create_text_file("testing file")
    return jobDetails

@eel.expose
def runBatch():
    os.system('test.bat')

@eel.expose
def printTag(jobdata):
    #spliting serialize array to dictionary
    data = dict(x.split("=") for x in jobdata.split("&"))
    f = open("tag.txt","w")
    # first tag
    f.write("N")
    f.write("\n")
    f.write("R110,0")
    f.write("\n")
    f.write("q831")
    f.write("\n")
    f.write("S2")
    f.write("\n")
    f.write("D12")
    f.write("\n")
    f.write("OEb")
    f.write("\n")
    f.write("A395,85,2,1,1,1,N,")
    f.write('"'+data['cust_short_name']+'"')
    f.write("\n")
    f.write('A245,85,2,1,1,1,N,"Original"')
    f.write("\n")
    f.write("B405,70,2,1,2,1,33,N,")
    f.write('"'+data['job_id']+'"')
    f.write("\n")
    f.write("A405,33,2,2,1,1,N,")
    # f.write('"'+data['brand']+'"')
    f.write('"'+"9836444999"+'"')
    f.write("\n")
    
    f.write("A245,33,2,2,1,1,N,")
    f.write('"'+data['job_id']+'"')
    f.write("\n")
    
    f.write("A680,80,2,1,1,1,N,")
    f.write('"'+data['product_code']+'-')
    f.write(data['price_code']+'"')
    f.write("\n")
    
    f.write('A602,80,2,1,1,1,N,"Size:"')
    f.write("\n")
    
    f.write("A549,80,2,1,1,1,N,")
    f.write('"'+data['size']+'"')
    f.write("\n")
    
    f.write('A490,80,2,1,1,1,N,"Qty:"')
    f.write("\n")
    
    f.write("A450,80,2,1,1,1,N,")
    f.write('"'+data['pieces']+'"')
    f.write("\n")
    
    f.write('A680,60,2,1,1,1,N,"Gold Weight:"')
    f.write("\n")
    
    f.write("A550,60,2,1,1,1,N,")
    f.write('"'+data['gold_used']+'"')
    f.write("\n")
    
    f.write('A480,60,2,1,1,1,N,"HM"')
    f.write("\n")
    f.write('A680,40,2,1,1,1,N,"Gross Weight:"')
    f.write("\n")
    
    f.write("A540,40,2,1,1,1,N,")
    f.write('"'+data['product_wt']+'"')
    f.write("\n")
    
    f.write("\n")
    f.write('A660,20,2,1,1,1,N,"M. Charge:"')
    f.write("\n")
    
    f.write("\n")
    f.write("A580,20,2,1,1,1,N,")
    f.write('"'+data['price']+'"')
    f.write("\n")
    f.write('A535,20,2,1,1,1,N,"X"')
    f.write("\n")
    
    f.write('A515,20,2,1,1,1,N,')
    f.write('"'+data['pieces']+'"')
    f.write("\n")

    f.write('A495,20,2,1,1,1,N,"="')
    f.write("\n")
    
    f.write("A485,20,2,1,1,1,N,")
    f.write('"'+data['total_lc']+'"')
    f.write("\n")
    
    f.write("P1")
    f.write("\n")
    
    # second tag
    f.write("N")
    f.write("\n")
    f.write("R110,0")
    f.write("\n")
    f.write("q831")
    f.write("\n")
    f.write("S2")
    f.write("\n")
    f.write("D12")
    f.write("\n")
    f.write("OEb")
    f.write("\n")
    f.write("A395,85,2,1,1,1,N,")
    f.write('"'+data['cust_short_name']+'"')
    f.write("\n")
    f.write('A245,85,2,1,1,1,N,"1ff"')
    f.write("\n")
    f.write("B405,70,2,1,2,1,33,N,")
    f.write('"'+data['job_id']+'"')
    f.write("\n")
    f.write("A405,33,2,2,1,1,N,")
    f.write('"'+data['brand']+'"')
    f.write("\n")
    
    f.write("A245,33,2,2,1,1,N,")
    f.write('"'+data['job_id']+'"')
    f.write("\n")
    
    f.write("A680,80,2,1,1,1,N,")
    f.write('"'+data['product_code']+'-')
    f.write(data['price_code']+'"')
    f.write("\n")
    
    f.write('A602,80,2,1,1,1,N,"Size:"')
    f.write("\n")
    
    f.write("A549,80,2,1,1,1,N,")
    f.write('"'+data['size']+'"')
    f.write("\n")
    
    f.write('A490,80,2,1,1,1,N,"Qty:"')
    f.write("\n")
    
    f.write("A450,80,2,1,1,1,N,")
    f.write('"'+data['pieces']+'"')
    f.write("\n")
    
    f.write('A680,60,2,1,1,1,N,"Gold Weight:"')
    f.write("\n")
    
    f.write("A550,60,2,1,1,1,N,")
    f.write('"'+str(round(float(data['gold_used'])+int(data['pieces'])*0.100,3))+'"')
    f.write("\n")
    
    f.write('A480,60,2,1,1,1,N,"HM"')
    f.write("\n")
    f.write('A680,40,2,1,1,1,N,"Gross Weight:"')
    f.write("\n")
    
    f.write("A540,40,2,1,1,1,N,")
    f.write('"'+data['product_wt']+'"')
    f.write("\n")
    
    f.write("\n")
    f.write('A660,20,2,1,1,1,N,"M. Charge:"')
    f.write("\n")
    
    f.write("\n")
    f.write("A580,20,2,1,1,1,N,")
    f.write('"'+str(int(data['price'])*2)+'"')
    f.write("\n")
    f.write('A535,20,2,1,1,1,N,"X"')
    f.write("\n")
    
    f.write('A515,20,2,1,1,1,N,')
    f.write('"'+data['pieces']+'"')
    f.write("\n")

    f.write('A495,20,2,1,1,1,N,"="')
    f.write("\n")
    
    f.write("A485,20,2,1,1,1,N,")
    f.write('"'+str(int(data['total_lc'])*2)+'"')
    f.write("\n")
    
    f.write("P1")
    f.write("\n")


    # third tag
    f.write("N")
    f.write("\n")
    f.write("R110,0")
    f.write("\n")
    f.write("q831")
    f.write("\n")
    f.write("S2")
    f.write("\n")
    f.write("D12")
    f.write("\n")
    f.write("OEb")
    f.write("\n")
    f.write("A395,85,2,1,1,1,N,")
    f.write('"'+data['cust_short_name']+'"')
    f.write("\n")
    f.write('A245,85,2,1,1,1,N,"2ff"')
    f.write("\n")
    f.write("B405,70,2,1,2,1,33,N,")
    f.write('"'+data['job_id']+'"')
    f.write("\n")
    f.write("A405,33,2,2,1,1,N,")
    f.write('"'+data['brand']+'"')
    f.write("\n")
    
    f.write("A245,33,2,2,1,1,N,")
    f.write('"'+data['job_id']+'"')
    f.write("\n")
    
    f.write("A680,80,2,1,1,1,N,")
    f.write('"'+data['product_code']+'-')
    f.write(data['price_code']+'"')
    f.write("\n")
    
    f.write('A602,80,2,1,1,1,N,"Size:"')
    f.write("\n")
    
    f.write("A549,80,2,1,1,1,N,")
    f.write('"'+data['size']+'"')
    f.write("\n")
    
    f.write('A490,80,2,1,1,1,N,"Qty:"')
    f.write("\n")
    
    f.write("A450,80,2,1,1,1,N,")
    f.write('"'+data['pieces']+'"')
    f.write("\n")
    
    f.write('A680,60,2,1,1,1,N,"Gold Weight:"')
    f.write("\n")
    
    f.write("A550,60,2,1,1,1,N,")
    f.write('"'+str(round(float(data['gold_used'])+int(data['pieces'])*0.200,3))+'"')
    f.write("\n")
    
    f.write('A480,60,2,1,1,1,N,"HM"')
    f.write("\n")
    f.write('A680,40,2,1,1,1,N,"Gross Weight:"')
    f.write("\n")
    
    f.write("A540,40,2,1,1,1,N,")
    f.write('"'+data['product_wt']+'"')
    f.write("\n")
    
    f.write("\n")
    f.write('A660,20,2,1,1,1,N,"M. Charge:"')
    f.write("\n")
    
    f.write("\n")
    f.write("A580,20,2,1,1,1,N,")
    f.write('"'+str(int(data['price'])*1.5)+'"')
    f.write("\n")
    f.write('A535,20,2,1,1,1,N,"X"')
    f.write("\n")
    
    f.write('A515,20,2,1,1,1,N,')
    f.write('"'+data['pieces']+'"')
    f.write("\n")

    f.write('A495,20,2,1,1,1,N,"="')
    f.write("\n")
    
    f.write("A485,20,2,1,1,1,N,")
    f.write('"'+str(int(data['total_lc'])*1.5)+'"')
    f.write("\n")
    
    f.write("P1")
    f.write("\n")
    
    
    f.close()
    os.system('print_tag.bat')
    
    # print(data)
    
# Start the index.html file
eel.start("index.html")