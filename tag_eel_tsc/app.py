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
    # Convert serialized string to dictionary
    data = dict(x.split("=") for x in jobdata.split("&"))

    with open("tag.txt", "w") as f:
        # ----- TSC SETUP -----
        f.write("SIZE 99 mm, 15 mm\n")
        f.write("GAP 2 mm, 0 mm\n")
        f.write("SPEED 3\n")
        f.write("DENSITY 15\n")
        f.write("SET RIBBON ON\n")
        f.write("DIRECTION 0,0\n")
        f.write("REFERENCE 0,0\n")
        f.write("OFFSET 0 mm\n")
        f.write("SET PEEL OFF\n")
        f.write("SET CUTTER OFF\n")
        f.write("SET PARTIAL_CUTTER OFF\n")
        f.write("SET TEAR ON\n")
        f.write("CLS\n")
        f.write("CODEPAGE 1252\n")

        # ----- TEXT FIELDS -----
        f.write(f'TEXT 779,101,"1",180,1,1,"{data["product_code"]}-{data["price_code"]}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{data["size"]}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{data["pieces"]}"\n')

        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {data["gold_used"]}"\n')
        f.write('TEXT 585,81,"1",180,1,1,"92%"\n')

        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {data["price"]} X {data["pieces"]} ={data["total_lc"]}"\n'
        )

        f.write(f'TEXT 518,101,"1",180,1,1,"{data["cust_short_name"]}"\n')

        # ----- BARCODE -----
        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{data["job_id"]}"\n')

        f.write('TEXT 518,47,"1",180,1,1,"SRIKRISHNA"\n')
        f.write('TEXT 382,101,"1",180,1,1,"ORIGINAL"\n')

        # ----- JOB ID (Large Font) -----
        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{data["job_id"]}"\n')

        # ----- PRINT -----
        f.write("PRINT 1,1\n")

    
        f.close()
        #comment out it for printing
        #os.system('print_tag.bat')
        
        # print(data)
    
# Start the index.html file
eel.start("index.html")