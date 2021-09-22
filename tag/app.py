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


st.title("Tag")
prevJobId = ""

left,right = st.columns(2)

jobId = left.text_input("Job ID")
searchJobId = left.button("Search")

if jobId != prevJobId:
    prevJobId = jobId
    st.write(jobId)
    
