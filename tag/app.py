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

st.title("Tag")
prevJobId = ""

modeOptions = {1: "dataset a", 2: "dataset b", 3: "dataset c"}
st.write(modeOptions)

left,right = st.columns(2)

jobId = left.text_input("Job ID")
option = st.selectbox("Select option", options=list(modeOptions.keys()), format_func=format_func)
st.write(option)

if jobId != prevJobId:
    prevJobId = jobId
    st.write(jobId)
    response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/job/"+jobId)
    if response.status_code==200:
        jobDetails = response.json().get('data')
        st.write(jobDetails)


    
    
