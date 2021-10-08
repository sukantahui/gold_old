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

#st.sidebar.markdown("## Controls")
#st.sidebar.markdown("You can **change** the values to change the *chart*.")
#st.sidebar.write("testing")



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
    os.system('print_tag.bat')

def createTag(jobDetails,customer,rawMaterials,setTagOption):
        #st.write(jobDetails)
        fineGold = ((jobDetails['gold_send'] - jobDetails['gold_returned']) + (jobDetails['pan_send'] - jobDetails['pan_returned'])*0.4 - (jobDetails['nitrick_returned']) + (jobDetails['p_loss'] * jobDetails['pieces']) +(jobDetails['markup_value'] * jobDetails['pieces']))

        tagLcValue = jobDetails['pieces'] * jobDetails['price'] * 3
        tagPrice = jobDetails['price'] * 3
        modelNumber = jobDetails['product_code'] + '-' + jobDetails['price_code']
        fileDataSet = ''

        filedata_0f= "N\n"
        filedata_0f+= "R110,0\n"
        filedata_0f+= "q831\n"
        filedata_0f+= "S2\D12\OEb\n"
        filedata_0f+= "A395,85,2,1,1,1,N,'" + customer['short_name'] + "'\n"
        filedata_0f+= "A245,85,2,1,1,1,N,'Of'\n"
        filedata_0f+= "B405,70,2,1,2,1,33,N,'"+ str(jobDetails['job_id'])+"'\n"
        filedata_0f+= "A405,33,2,2,1,1,N,'BB'\n"
        filedata_0f+= "A245,33,2,2,1,1,N,'"+ str(jobDetails['job_id']) +"'\n"
        filedata_0f+= "A680,80,2,1,1,1,N,'"+ str(modelNumber) +"'\n"
        filedata_0f+= "A602,80,2,1,1,1,N,'Size:'\n"
        filedata_0f+= "A549,80,2,1,1,1,N,'"+ str(jobDetails['product_size']) +"'\n"
        filedata_0f+= "A490,80,2,1,1,1,N,'Qty:'\n"
        filedata_0f+= "A450,80,2,1,1,1,N,'"+ str(jobDetails['pieces']) +"'\n"
        filedata_0f+= "A680,60,2,1,1,1,N,'Gold Weight:'\n"
        filedata_0f+= "A550,60,2,1,1,1,N,'" + str(round(fineGold,3)) + "'\n"
        filedata_0f+= "A480,60,2,1,1,1,N,'HM'\n"
        filedata_0f+= "A680,40,2,1,1,1,N,'Gross Weight:'\n"
        filedata_0f+= "A540,40,2,1,1,1,N,'"+str(round(jobDetails['product_wt'],3))+"'\n"
        filedata_0f+= "A680,20,2,1,1,1,N,'Charge:'\n"
        filedata_0f+= "A600,20,2,1,1,1,N,'"+ str(tagPrice) +"'\n"
        filedata_0f+= "A555,20,2,1,1,1,N,'X'\n"
        filedata_0f+= "A535,20,2,1,1,1,N,'"+ str(jobDetails['pieces']) +"'\n"
        filedata_0f+= "A515,20,2,1,1,1,N,'='\n"
        filedata_0f+= "A505,20,2,1,1,1,N,'"+ str(tagLcValue) +"'\n"
        filedata_0f+= "P1\n\n"

        filedata_100f= "N\n"
        filedata_100f+= "R110,0\n"
        filedata_100f+= "q831\n"
        filedata_100f+= "S2\D12\OEb\n"
        filedata_100f+= "A395,85,2,1,1,1,N,'" + customer['short_name'] + "'\n"
        filedata_100f+= "A245,85,2,1,1,1,N,'Of'\n"
        filedata_100f+= "B405,70,2,1,2,1,33,N,'"+ str(jobDetails['job_id'])+"'\n"
        filedata_100f+= "A405,33,2,2,1,1,N,'BB'\n"
        filedata_100f+= "A245,33,2,2,1,1,N,'"+ str(jobDetails['job_id']) +"'\n"
        filedata_100f+= "A680,80,2,1,1,1,N,'"+ str(modelNumber) +"'\n"
        filedata_100f+= "A602,80,2,1,1,1,N,'Size:'\n"
        filedata_100f+= "A549,80,2,1,1,1,N,'"+ str(jobDetails['product_size']) +"'\n"
        filedata_100f+= "A490,80,2,1,1,1,N,'Qty:'\n"
        filedata_100f+= "A450,80,2,1,1,1,N,'"+ str(jobDetails['pieces']) +"'\n"
        filedata_100f+= "A680,60,2,1,1,1,N,'Gold Weight:'\n"
        filedata_100f+= "A550,60,2,1,1,1,N,'" + str(round((fineGold + 0.100 * jobDetails['pieces']),3)) + "'\n"
        filedata_100f+= "A480,60,2,1,1,1,N,'HM'\n"
        filedata_100f+= "A680,40,2,1,1,1,N,'Gross Weight:'\n"
        filedata_100f+= "A540,40,2,1,1,1,N,'"+str(round(jobDetails['product_wt'],3))+"'\n"
        filedata_100f+= "A680,20,2,1,1,1,N,'Charge:'\n"
        filedata_100f+= "A600,20,2,1,1,1,N,'"+ str(tagPrice) +"'\n"
        filedata_100f+= "A555,20,2,1,1,1,N,'X'\n"
        filedata_100f+= "A535,20,2,1,1,1,N,'"+ str(jobDetails['pieces']) +"'\n"
        filedata_100f+= "A515,20,2,1,1,1,N,'='\n"
        filedata_100f+= "A505,20,2,1,1,1,N,'"+ str(tagLcValue) +"'\n"
        filedata_100f+= "P1\n\n"

        filedata_200f= "N\n"
        filedata_200f+= "R110,0\n"
        filedata_200f+= "q831\n"
        filedata_200f+= "S2\D12\OEb\n"
        filedata_200f+= "A395,85,2,1,1,1,N,'" + customer['short_name'] + "'\n"
        filedata_200f+= "A245,85,2,1,1,1,N,'Of'\n"
        filedata_200f+= "B405,70,2,1,2,1,33,N,'"+ str(jobDetails['job_id'])+"'\n"
        filedata_200f+= "A405,33,2,2,1,1,N,'BB'\n"
        filedata_200f+= "A245,33,2,2,1,1,N,'"+ str(jobDetails['job_id']) +"'\n"
        filedata_200f+= "A680,80,2,1,1,1,N,'"+ str(modelNumber) +"'\n"
        filedata_200f+= "A602,80,2,1,1,1,N,'Size:'\n"
        filedata_200f+= "A549,80,2,1,1,1,N,'"+ str(jobDetails['product_size']) +"'\n"
        filedata_200f+= "A490,80,2,1,1,1,N,'Qty:'\n"
        filedata_200f+= "A450,80,2,1,1,1,N,'"+ str(jobDetails['pieces']) +"'\n"
        filedata_200f+= "A680,60,2,1,1,1,N,'Gold Weight:'\n"
        filedata_200f+= "A550,60,2,1,1,1,N,'" + str(round((fineGold + 0.200 * jobDetails['pieces']),3)) + "'\n"
        filedata_200f+= "A480,60,2,1,1,1,N,'HM'\n"
        filedata_200f+= "A680,40,2,1,1,1,N,'Gross Weight:'\n"
        filedata_200f+= "A540,40,2,1,1,1,N,'"+str(round(jobDetails['product_wt'],3))+"'\n"
        filedata_200f+= "A680,20,2,1,1,1,N,'Charge:'\n"
        filedata_200f+= "A600,20,2,1,1,1,N,'"+ str(tagPrice) +"'\n"
        filedata_200f+= "A555,20,2,1,1,1,N,'X'\n"
        filedata_200f+= "A535,20,2,1,1,1,N,'"+ str(jobDetails['pieces']) +"'\n"
        filedata_200f+= "A515,20,2,1,1,1,N,'='\n"
        filedata_200f+= "A505,20,2,1,1,1,N,'"+ str(tagLcValue) +"'\n"
        filedata_200f+= "P1\n"

        if setTagOption =='All':
            fileDataSet = filedata_0f + '\n' + filedata_100f + '\n' + filedata_200f
        if setTagOption == '0F':
            fileDataSet = filedata_0f
        if setTagOption == '100F':
            fileDataSet = filedata_100f
        if setTagOption == '200F':
            fileDataSet = filedata_200f
        
        create_text_file(fileDataSet)



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


def createTagForm(jobDetails,customer,rawMaterials):
    modelNumber = jobDetails['product_code'] + '-' + jobDetails['price_code']
    tagLcValue = jobDetails['pieces'] * jobDetails['price'] * 3
    modelCol,sizeCol,qtyCol,tonchCol, = st.columns(4)
    model = modelCol.text_input("Model",modelNumber)
    size = sizeCol.text_input("Size",jobDetails['product_size'])
    qty = qtyCol.text_input("Qty",jobDetails['pieces'])
    tonch = tonchCol.text_input("Tonch")

    lcCol,tagLcCol,right1,right2 = st.columns(4)
    lc = lcCol.text_input("Lc",jobDetails['price'])
    tagLc = tagLcCol.text_input("TagLc",tagLcValue)
    st.sidebar.markdown(""" 
                <style> 
                    #job-details {
                                font-family: 'Cooper Black'; color: #FF9633;} 
                </style> 
                """, unsafe_allow_html=True)

 
    st.sidebar.markdown('<p id="job-details">Job Details:</p>', unsafe_allow_html=True)
    st.sidebar.write("Gold Send: ",jobDetails['gold_send'])
    st.sidebar.write("Gold Returned: ",jobDetails['gold_returned'])
    st.sidebar.write("Pan Send: ",jobDetails['pan_send'])
    st.sidebar.write("Pan Returened: ",jobDetails['pan_returned'])
    st.sidebar.write("Ntr Returened: ",jobDetails['nitrick_returned'])
    st.sidebar.write("P Loss: ",jobDetails['p_loss'])
    st.sidebar.write("MV: ",jobDetails['markup_value'])
    st.sidebar.write("Total: ",2.8862)
    st.sidebar.write("Fine: ",2.655)
    st.sidebar.write("Gross: ",23.8862)

    orderIdCol,customerIdCol,nameCol,shortNameCol, = st.columns(4)

    order = orderIdCol.text_input("Order",jobDetails['order_id'])
    customerId = customerIdCol.text_input("CustomerId",customer['cust_id'])
    name = nameCol.text_input("Name",customer['cust_name'])
    shortName = shortNameCol.text_input("Short Name",customer['short_name'])

    tagCol,customerCol = st.columns(2)
    setTagOption = tagCol.radio('Select: ',('All', '0F', '100F','200F'))
    mark = tagCol.radio("Select: : ", ('With Mark', 'Without Mark'))

    customerCol.markdown('<p id="order-id" class="customer">order ID: '+ jobDetails['order_id'] + ' </p>', unsafe_allow_html=True)
    customerCol.markdown('<p id="customer-id" class="customer">Customer ID: '+ customer['cust_id'] + ' </p>', unsafe_allow_html=True)
    customerCol.markdown('<p id="customer-name" class="customer">Customer name: '+ customer['cust_name'] + ' </p>', unsafe_allow_html=True)
    customerCol.markdown('<p id="customer-short-name" class="customer">Short name: '+ customer['short_name'] + ' </p>', unsafe_allow_html=True)

    if st.button("Create Tag"):
        createTag(jobDetails,customer,rawMaterials,setTagOption)  

#option = st.selectbox("Select option", options=list(modeOptions.keys()), format_func=format_func)
#st.write(option)

if jobId != prevJobId:
    prevJobId = jobId
    #st.write(jobId)
    response = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/job/"+jobId)
    if response.status_code==200:
        jobDetails = response.json().get('data')
        #st.write(jobDetails)
        response2 = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/customerByJob/"+jobId)
        if response2.status_code==200:
            customer = response2.json().get('data')
            #st.write(customer)
        response3 = requests.get("http://127.0.0.1/gold_old/gold_api/public/api/dev/rawMaterials/"+str(jobDetails['rm_id']))
        if response3.status_code == 200:
            rawMaterials = response3.json().get('data')
            #st.write(rawMaterials)
            createTagForm(jobDetails,customer,rawMaterials)

        



    
    
    
   
