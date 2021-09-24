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


def format_func(option):
    return modeOptions[option]

def create_text_file(data):
    f = open("tag.txt","w")
    f.write(data)
    f.close()


st.markdown(""" <style> .font {
font-size:50px ; font-family: 'Cooper Black'; color: #FF9633;} 
</style> """, unsafe_allow_html=True)
st.markdown('<p class="font">Guess the object Names</p>', unsafe_allow_html=True)


st.title("Tag")
prevJobId = ""

modeOptions = {1: "dataset a", 2: "dataset b", 3: "dataset c"}

left,right = st.columns(2)

jobId = left.text_input("Job ID")
createTagButton = left.button("Create Tag")
option = st.selectbox("Select option", options=list(modeOptions.keys()), format_func=format_func)
st.write(option)

if jobId != prevJobId:
    prevJobId = jobId
    st.write(jobId)
    response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/job/"+jobId)
    if response.status_code==200:
        jobDetails = response.json().get('data')
        t = st.text_area("Enter multiline text",jobDetails['product_code'])
        st.write(jobDetails)


if createTagButton:
    filedata = "N\n"
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