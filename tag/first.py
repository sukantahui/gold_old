import os
import json
from PIL import Image
import streamlit as st

# To make things easier later, we're also importing numpy and pandas for
# working with sample data.
import numpy as np
import pandas as pd
import requests

# pip3 install mysql-connector
import mysql.connector

# useful links
# https://www.nylas.com/blog/use-python-requests-module-rest-apis/


st.title('My first app')

# running dos command
os.system('dir')

new_candidates = []
submit = st.button('submit new letters')
save_product = st.button('save product')
if submit:
    response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories/visible")
    st.write(response.status_code)
    st.write(response.json().get('data'))


response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/customerCategories/visible")
json_data = json.loads(response.text)
st.write(json_data['data'])
st.write(type(json_data['data']))


user_input = st.text_input("label goes here", 12)
st.write(user_input)
option = st.slider("How many days of data would you like to see?",1,60,1)
st.write(option)




# Initialize connection.
# Uses st.cache to only run once.
@st.cache(allow_output_mutation=True, hash_funcs={"_thread.RLock": lambda _: None})
def init_connection():
    return mysql.connector.connect(**st.secrets["mysql"])

conn = init_connection()


# Perform query.
# Uses st.cache to only rerun when the query changes or after 10 min.
@st.cache(ttl=600)

def run_query(query):
    with conn.cursor() as cur:
        cur.execute(query)
        return cur.fetchall()

rows = run_query("SELECT * from employees;")

# Print results.
for row in rows:
    st.write(f"{row[0]} has a :{row[1]}:")
    
    
col1,col2 = st.beta_columns(2) 
col1.success("First Column")
col1.button("Hello")
col2.success("Second COlumn")
col2.button("Hello From Col2") 

for row in rows:
    col2.write(f"{row[0]} has a :{row[1]}:")
    
    
    
    
    
with col1:
    st.success("From Col1")
    mytext = st.text_area("Enter Text Here")

with col2:
   st.info("From Col2")
   my_year = st.number_input("Year",1995,2040)
   st.write(my_year)
   
uploaded_file = st.file_uploader("Choose an image...", type="jpg")
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image.', use_column_width=True)
    st.write("")
    st.write("Classifying...")
     
# Creating a text file
f= open("default","w+")
for i in range(10):
     f.write("This is line %d\r\n" % (i+1))
f.close()         
# df = pd.read_sql("select * from gold_price;", conn)

# st.write(df)

if save_product:
    cursor = conn.cursor()
    save_response = cursor.execute("insert into product_master (`product_code` ,`product_description`,`product_category`,`price_code`,`user_id`,`details`,`product_markuped`,`product_markup_value`) VALUES ('Y0008' ,'nupur',19,'Y' ,'NULL','NULL',0,0)")
    print("affected rows = {}".format(cursor.rowcount))

conn.commit()

