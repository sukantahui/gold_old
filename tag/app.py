import os
import json
from PIL import Image
import streamlit as st
import requests

# To make things easier later, we're also importing numpy and pandas for
# working with sample data.
import numpy as np
import pandas as pd
import requests

# pip3 install mysql-connector
import mysql.connector

st.sidebar.markdown("## Controls")
st.sidebar.markdown("You can **change** the values to change the *chart*.")
st.sidebar.write("testing")



m = st.markdown("""
<style>
div.stButton > button:first-child {
    background-color: rgb(165 104 104);
    margin-top: 30px;
}
</style>""", unsafe_allow_html=True)

def format_func(option):
    return modeOptions[option]

def create_text_file(data):
    f = open("tag.txt","w")
    f.write(data)
    f.close()

def createTag():
        filedata= "N\n"
        filedata+= "R110,0\n"
        filedata+= "q831\n"
        filedata+= "S2\D12\OEb\n"
        filedata+= "A395,85,2,1,1,1,N,'PJ'\n"
        filedata+= "A245,85,2,1,1,1,N,'Of'\n"
        filedata+= "B405,70,2,1,2,1,33,N,'2750'\n"
        filedata+= "A405,33,2,2,1,1,N,'BB'\n"
        filedata+= "A245,33,2,2,1,1,N,'2750'\n"
        filedata+= "A680,80,2,1,1,1,N,'C0277-H'\n"
        filedata+= "A602,80,2,1,1,1,N,'Size:'\n"
        filedata+= "A549,80,2,1,1,1,N,'2-3-0'\n"
        filedata+= "A490,80,2,1,1,1,N,'Qty:'\n"
        filedata+= "A450,80,2,1,1,1,N,'2'\n"
        filedata+= "A680,60,2,1,1,1,N,'Gold Weight:'\n"
        filedata+= "A550,60,2,1,1,1,N,'2.039'\n"
        filedata+= "A480,60,2,1,1,1,N,'HM'\n"
        filedata+= "A680,40,2,1,1,1,N,'Gross Weight:'\n"
        filedata+= "A540,40,2,1,1,1,N,'22.076'\n"
        filedata+= "A680,20,2,1,1,1,N,'Charge:'\n"
        filedata+= "A600,20,2,1,1,1,N,'1260'\n"
        filedata+= "A555,20,2,1,1,1,N,'X'\n"
        filedata+= "A535,20,2,1,1,1,N,'2'\n"
        filedata+= "A515,20,2,1,1,1,N,'='\n"
        filedata+= "A505,20,2,1,1,1,N,'2520'\n"
        filedata+= "P1\n"
        filedata+= "N\n"
        filedata+= "R110,0\n"
        filedata+= "q831\n"
        filedata+= "S2\n"
        filedata+= "D12\n"
        filedata+= "OEb\n"
        filedata+= "A395,85,2,1,1,1,N,'PJ'\n"
        filedata+= "A245,85,2,1,1,1,N,'100f'\n"
        filedata+= "B405,70,2,1,2,1,33,N,'2750'\n"
        filedata+= "A405,33,2,2,1,1,N,'BB'\n"
        filedata+= "A245,33,2,2,1,1,N,'2750'\n"
        filedata+= "A680,80,2,1,1,1,N,'C0277-H'\n"
        filedata+= "A602,80,2,1,1,1,N,'Size:'\n"
        filedata+= "A549,80,2,1,1,1,N,'2-3-0'\n"
        filedata+= "A490,80,2,1,1,1,N,'Qty:'\n"
        filedata+= "A450,80,2,1,1,1,N,'2'\n"
        filedata+= "A680,60,2,1,1,1,N,'Gold Weight:'\n"
        filedata+= "A550,60,2,1,1,1,N,'2.239'\n"
        filedata+= "A480,60,2,1,1,1,N,'HM'\n"
        filedata+= "A680,40,2,1,1,1,N,'Gross Weight:'\n"
        filedata+= "A540,40,2,1,1,1,N,'22.076'\n"
        filedata+= "A680,20,2,1,1,1,N,'Charge:'\n"
        filedata+= "A600,20,2,1,1,1,N,'1260'\n"
        filedata+= "A555,20,2,1,1,1,N,'X'\n"
        filedata+= "A535,20,2,1,1,1,N,'2'\n"
        filedata+= "A515,20,2,1,1,1,N,'='\n"
        filedata+= "A505,20,2,1,1,1,N,'2520'\n"
        filedata+= "P1\n"
        filedata+= "N\n"
        filedata+= "R110,0\n"
        filedata+= "q831\n"
        filedata+= "S2\n"
        filedata+= "D12\n"
        filedata+= "OEb\n"
        filedata+= "A395,85,2,1,1,1,N,'PJ'\n"
        filedata+= "A245,85,2,1,1,1,N,'200f'\n"
        filedata+= "B405,70,2,1,2,1,33,N,'2750'\n"
        filedata+= "A405,33,2,2,1,1,N,'BB'\n"
        filedata+= "A245,33,2,2,1,1,N,'2750'\n"
        filedata+= "A680,80,2,1,1,1,N,'C0277-H'\n"
        filedata+= "A602,80,2,1,1,1,N,'Size:'\n"
        filedata+= "A549,80,2,1,1,1,N,'2-3-0'\n"
        filedata+= "A490,80,2,1,1,1,N,'Qty:'\n"
        filedata+= "A450,80,2,1,1,1,N,'2'\n"
        filedata+= "A680,60,2,1,1,1,N,'Gold Weight:'\n"
        filedata+= "A550,60,2,1,1,1,N,'2.439'\n"
        filedata+= "A480,60,2,1,1,1,N,'HM'\n"
        filedata+= "A680,40,2,1,1,1,N,'Gross Weight:'\n"
        filedata+= "A540,40,2,1,1,1,N,'22.076'\n"
        filedata+= "A680,20,2,1,1,1,N,'Charge:'\n"
        filedata+= "A600,20,2,1,1,1,N,'1260'\n"
        filedata+= "A555,20,2,1,1,1,N,'X'\n"
        filedata+= "A535,20,2,1,1,1,N,'2'\n"
        filedata+= "A515,20,2,1,1,1,N,'='\n"
        filedata+= "A505,20,2,1,1,1,N,'2520'\n"
        filedata+= "P1\n"
        create_text_file(filedata)



st.markdown(""" <style> .font {
font-size:50px ; font-family: 'Cooper Black'; color: #FF9633;} 
</style> """, unsafe_allow_html=True)

st.markdown('<p class="font">Tag Printing Environment</p>', unsafe_allow_html=True)


st.title("Tag")
prevJobId = ""

modeOptions = {1: "dataset a", 2: "dataset b", 3: "dataset c"}

first,second,third = st.columns(3)

jobId = first.text_input("Job ID")
jobSearchButton = second.button("Search")
brandName = third.text_input("Brand","BB")


def createTagForm(jobDetails):
    modelCol,sizeCol,qtyCol,tonchCol, = st.columns(4)
    model = modelCol.text_input("Model","c00f")
    size = sizeCol.text_input("Size","2-3-0")
    qty = qtyCol.text_input("200")
    tonch = tonchCol.text_input("5")

    lcCol,tagLcCol = st.columns(2)
    lc = lcCol.text_input("Lc","380")
    tagLc = tagLcCol.text_input("TagLc","1140")
    st.sidebar.markdown(""" 
                <style> 
                    #job-details {
                                font-family: 'Cooper Black'; color: #FF9633;} 
                </style> 
                """, unsafe_allow_html=True)

    st.sidebar.markdown('<p id="job-details">Job Details:</p>', unsafe_allow_html=True)
    st.sidebar.write("Gold Send: ",3.323)
    st.sidebar.write("Gold Returned: ",-0.029)
    st.sidebar.write("Pan Send: ",0.0652)
    st.sidebar.write("Pan Returened: ",0)
    st.sidebar.write("Ntr Returened: ",-1.091)
    st.sidebar.write("P Loss: ",0.396)
    st.sidebar.write("MV: ",0.484)
    st.sidebar.write("Total: ",2.8862)
    st.sidebar.write("Fine: ",2.655)
    st.sidebar.write("Gross: ",23.8862)

    orderIdCol,customerIdCol,nameCol,shortNameCol, = st.columns(4)

    order = orderIdCol.text_input("Order","c00f")
    customerId = customerIdCol.text_input("CustomerId","2-3-0")
    name = nameCol.text_input("Name")
    shortName = shortNameCol.text_input("Short Name")

    setTagOption = st.radio('Select: ',('All', '0F', '100F','200F'))
    mark = st.radio("Select: : ", ('With Mark', 'Without Mark'))

    if st.button("Create Tag"):
        createTag()  

option = st.selectbox("Select option", options=list(modeOptions.keys()), format_func=format_func)
#st.write(option)

if jobId != prevJobId:
    prevJobId = jobId
    st.write(jobId)
    response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/job/"+jobId)
    if response.status_code==200:
        jobDetails = response.json().get('data')
        createTagForm(jobDetails)
    
    
    
   
