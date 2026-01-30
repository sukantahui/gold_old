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
def fetch_tag():  
    with open('project.json', 'r') as f:
        global project_data
        project_data = json.load(f)
    global current_tag
    current_tag = project_data['current_tag']      
    return current_tag 

@eel.expose  
# defining the function for addition of two numbers  
def update_ip(new_ip):  
    global tag_value
    print("updating ip")
    with open('project.json', 'r') as f:
        data = json.load(f)   
    data['ip']=new_ip     
    with open("project.json", "w") as jsonFile:
        json.dump(data, jsonFile)   
    tag_value=new_ip    


@eel.expose
def fetchTagDetails(jobId):
    response = requests.get("http://%s/gold_old/gold_api/public/api/dev/tag/job/%s" % (tag_value,jobId))
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
    print(data)
    tag_id = f'{data.get("tag_prefix","")}{data.get("tag","")}'
    with open("tag.txt", "w") as f:
        # First Tag, Original
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

        f.write(f'TEXT 779,101,"1",180,1,1,"{data.get("product_code","")}-{data.get("price_code","")}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{data.get("size","")}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{data.get("pieces","")}"\n')

        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {data.get("gold_used","")}"\n')
        f.write(f'TEXT 585,81,"1",180,1,1,"({data.get("tonch","92")}%)" \n')

        #Gross Weight
        f.write(f'TEXT 779,58,"1",180,1,1,"Gross Weight: {data.get("gross_weight","")}"\n')

        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {data.get("lc","0")} X {data.get("pieces","0")} ={data.get("total_lc","0")}"\n'
        )

        f.write(f'TEXT 518,101,"1",180,1,1,"{data.get("cust_short_name","")}"\n')

        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{tag_id}"\n')

        f.write('TEXT 518,47,"1",180,1,1,"Gold Covered"\n')
        f.write('TEXT 382,101,"1",180,1,1,"ORIGINAL"\n')

        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{tag_id}"\n')

        f.write("PRINT 1,1\n")

        # ***************************** End of First Tag *******************************************

        # Second Tag, price 1750, gold 0.100 x pcs
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

        f.write(f'TEXT 779,101,"1",180,1,1,"{data.get("product_code","")}-{data.get("price_code","")}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{data.get("size","")}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{data.get("pieces","")}"\n')
        # -------- WEIGHTS --------
        try:
           base_gold = float(data.get("gold_used", 0) or 0)
        except:
            base_gold = 0.0

        try:
            pcs = int(data.get("pieces", 0) or 0)
        except:
            pcs = 0
        print("pcs are:",pcs)
        final_gold = base_gold + (pcs * 0.100)

        # keep 3 decimals like sample
        final_gold = round(final_gold, 3)
        
        
        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {final_gold}"\n')
        f.write(f'TEXT 585,81,"1",180,1,1,"({data.get("tonch","92")}%)" \n')

        #Gross Weight
        f.write(f'TEXT 779,58,"1",180,1,1,"Gross Weight: {data.get("gross_weight","")}"\n')

        # -------- MAKING CHARGE --------
        # Fixed making charge per piece
        PRICE_PER_PIECE = 1750

        

        total = PRICE_PER_PIECE * pcs

        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {PRICE_PER_PIECE} X {data.get("pieces","0")} ={total}"\n'
        )

        f.write(f'TEXT 518,101,"1",180,1,1,"{data.get("cust_short_name","")}"\n')

        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{tag_id}"\n')

        f.write('TEXT 518,47,"1",180,1,1,"Gold Covered"\n')
        f.write('TEXT 382,101,"1",180,1,1,"1ff"\n')

        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{tag_id}"\n')

        f.write("PRINT 1,1\n")

        # ***************************** End of Second Tag *******************************************

        # third Tag, price 1750, weight 0.200 x pcs
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

        f.write(f'TEXT 779,101,"1",180,1,1,"{data.get("product_code","")}-{data.get("price_code","")}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{data.get("size","")}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{data.get("pieces","")}"\n')
        # -------- WEIGHTS --------
        try:
           base_gold = float(data.get("gold_used", 0) or 0)
        except:
            base_gold = 0.0

        try:
            pcs = int(data.get("pieces", 0) or 0)
        except:
            pcs = 0
        print("pcs are:",pcs)
        final_gold = base_gold + (pcs * 0.200)

        # keep 3 decimals like sample
        final_gold = round(final_gold, 3)
        
        
        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {final_gold}"\n')
        f.write(f'TEXT 585,81,"1",180,1,1,"({data.get("tonch","92")}%)" \n')

        #Gross Weight
        f.write(f'TEXT 779,58,"1",180,1,1,"Gross Weight: {data.get("gross_weight","")}"\n')

        # -------- MAKING CHARGE --------
        # Fixed making charge per piece
        PRICE_PER_PIECE = 1750

        

        total = PRICE_PER_PIECE * pcs

        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {PRICE_PER_PIECE} X {data.get("pieces","0")} ={total}"\n'
        )

        f.write(f'TEXT 518,101,"1",180,1,1,"{data.get("cust_short_name","")}"\n')

        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{tag_id}"\n')

        f.write('TEXT 518,47,"1",180,1,1,"Gold Covered"\n')
        f.write('TEXT 382,101,"1",180,1,1,"2ff"\n')

        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{tag_id}"\n')

        f.write("PRINT 1,1\n")
    #os.system('print_tag.bat')
    file_path="tag.txt"
    os.system(f'TOUSB.exe {file_path}')
    print("Printed successfully")
    
    
        # print(data)




# for readymade
@eel.expose
def get_price_ploss(price_code):
    with open('project.json', 'r') as f:
        data = json.load(f)   
    price_list=data['price_list']  
    return price_list[price_code]

@eel.expose
def new_tag(tag_number):
    print(tag_number)
    with open('project.json', 'r') as f:
        data = json.load(f)
    current_tag= data['current_tag']   
    current_tag['tag_number']= tag_number+1   
    data['current_tag'] = current_tag
    with open("project.json", "w") as jsonFile:
        json.dump(data, jsonFile)   
    return data['current_tag']

@eel.expose
def increase_tag(tag_number):
    with open('project.json', 'r') as f:
        data = json.load(f)
    current_tag= data['current_tag']   
    current_tag['tag_number']= tag_number+1   
    data['current_tag'] = current_tag
    with open("project.json", "w") as jsonFile:
        json.dump(data, jsonFile)   
    return data['current_tag']    

    
# Start the index.html file
eel.start("index.html")





