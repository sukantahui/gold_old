import eel
import requests
import os
import json
from random import randint

eel.init("web")


def create_text_file(data):
    with open("tag.txt", "w") as f:
        f.write(data)


# Exposing random function
@eel.expose
def random_python():
    return randint(1, 100)


@eel.expose
def fetch_ip():
    with open('project.json', 'r') as f:
        data = json.load(f)

    global current_ip
    current_ip = data['ip']
    return data['ip']


@eel.expose
def update_ip(new_ip):
    print("updating ip")

    with open('project.json', 'r') as f:
        data = json.load(f)

    data['ip'] = new_ip

    with open("project.json", "w") as jsonFile:
        json.dump(data, jsonFile)

    global current_ip
    current_ip = new_ip


@eel.expose
def fetchTagDetails(jobId):
    response = requests.get(
        "http://%s/gold_old/gold_api/public/api/dev/tag/job/%s" % (current_ip, jobId)
    )

    if response.status_code == 200:
        jobDetails = response.json().get('data')
        return jobDetails

    return None


@eel.expose
def runBatch():
    os.system('test.bat')


@eel.expose
def printTag(jobdata):

    # Convert serialized string to dictionary
    data = dict(x.split("=") for x in jobdata.split("&"))

    # Safety defaults (prevents crashes if API misses fields)
    def g(key, default=""):
        return data.get(key, default)

    with open("tag.txt", "w") as f:

        #tag 1, all original
        # -------- PRINTER SETUP --------
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

        # -------- TOP ROW --------
        f.write(f'TEXT 779,101,"1",180,1,1,"{g("product_code")}-{g("price_code")}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{g("size")}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{g("pieces")}"\n')
        f.write(f'TEXT 518,101,"1",180,1,1,"{g("cust_short_name")}"\n')
        f.write('TEXT 382,101,"1",180,1,1,"ORIGINAL"\n')

        # -------- WEIGHTS --------
        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {float(g("gold_used")):.3f}"\n')
        f.write('TEXT 585,81,"1",180,1,1,"92%"\n')
        f.write(f'TEXT 779,58,"1",180,1,1,"Gross Weight: {float(g("product_wt")):.3f}"\n')

        # -------- MAKING CHARGE --------
        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {g("price")} X {g("pieces")} ={g("total_lc")}"\n'
        )

        # -------- BARCODE --------
        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{g("job_id")}"\n')

        # -------- BOTTOM TEXT --------
        f.write('TEXT 518,47,"1",180,1,1,"Gold Covered"\n')
        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{g("job_id")}"\n')

        # -------- PRINT --------
        f.write("PRINT 1,1\n")

        # ---------------------------------------------------------------------------------

        #tag 2, Price 1750, ploss extra 0.100, sign 1f
        # -------- PRINTER SETUP --------
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

        # -------- TOP ROW --------
        f.write(f'TEXT 779,101,"1",180,1,1,"{g("product_code")}-{g("price_code")}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{g("size")}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{g("pieces")}"\n')
        f.write(f'TEXT 518,101,"1",180,1,1,"{g("cust_short_name")}"\n')
        f.write('TEXT 382,101,"1",180,1,1,"1ff"\n')

        # -------- WEIGHTS --------
        try:
            base_gold = float(g("gold_used"))
        except:
            base_gold = 0.0

        try:
            pcs = int(g("pieces"))
        except:
            pcs = 0
        
        final_gold = base_gold + (pcs * 0.100)

        # keep 3 decimals like sample
        final_gold = round(final_gold, 3)
             
        
        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {final_gold:.3f}"\n')
        f.write('TEXT 585,81,"1",180,1,1,"92%"\n')
        f.write(f'TEXT 779,58,"1",180,1,1,"Gross Weight: {float(g("product_wt")):.3f}"\n')

        # -------- MAKING CHARGE --------
        # Fixed making charge per piece
        PRICE_PER_PIECE = 1750

        

        total = PRICE_PER_PIECE * pcs

        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {PRICE_PER_PIECE} X {pcs} ={total}"\n'
        )

        # -------- BARCODE --------
        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{g("job_id")}"\n')

        # -------- BOTTOM TEXT --------
        f.write('TEXT 518,47,"1",180,1,1,"Gold Covered"\n')
        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{g("job_id")}"\n')

        # -------- PRINT --------
        f.write("PRINT 1,1\n")

        # -----------------------------------------------------------------------------
        # ---------------------------------------------------------------------------------

        #tag 2, Price 1750, ploss extra 0.100, sign 1f
        # -------- PRINTER SETUP --------
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

        # -------- TOP ROW --------
        f.write(f'TEXT 779,101,"1",180,1,1,"{g("product_code")}-{g("price_code")}"\n')
        f.write(f'TEXT 691,101,"1",180,1,1,"Size:{g("size")}"\n')
        f.write(f'TEXT 585,101,"1",180,1,1,"Qty:{g("pieces")}"\n')
        f.write(f'TEXT 518,101,"1",180,1,1,"{g("cust_short_name")}"\n')
        f.write('TEXT 382,101,"1",180,1,1,"2ff"\n')

        # -------- WEIGHTS --------
        try:
            base_gold = float(g("gold_used"))
        except:
            base_gold = 0.0

        try:
            pcs = int(g("pieces"))
        except:
            pcs = 0
        
        final_gold = base_gold + (pcs * 0.200)

        # keep 3 decimals like sample
        final_gold = round(final_gold, 3)
             
        
        f.write(f'TEXT 779,81,"1",180,1,1,"Gold Weight: {final_gold:.3f}"\n')
        f.write('TEXT 585,81,"1",180,1,1,"92%"\n')
        f.write(f'TEXT 779,58,"1",180,1,1,"Gross Weight: {float(g("product_wt")):.3f}"\n')
        # -------- MAKING CHARGE --------
        # Fixed making charge per piece
        PRICE_PER_PIECE = 1750

        

        total = PRICE_PER_PIECE * pcs

        f.write(
            f'TEXT 779,35,"1",180,1,1,'
            f'"M.Charge {PRICE_PER_PIECE} X {pcs} ={total}"\n'
        )

        # -------- BARCODE --------
        f.write(f'BARCODE 519,85,"128",33,0,180,2,4,"{g("job_id")}"\n')

        # -------- BOTTOM TEXT --------
        f.write('TEXT 518,47,"1",180,1,1,"Gold Covered"\n')
        f.write(f'TEXT 370,49,"ROMAN.TTF",180,1,7,"{g("job_id")}"\n')

        # -------- PRINT --------
        f.write("PRINT 1,1\n")

        # -----------------------------------------------------------------------------

        # Uncomment when ready for real printing
        #os.system('print_tag.bat')
    file_path="tag.txt"
    os.system(f'TOUSB.exe {file_path}')


# Start UI
eel.start("index.html")
