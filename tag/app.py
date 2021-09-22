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

from streamlit_ace import st_ace



# max_width_str = f"max-width: 1500px;"
# st.markdown(
# 	f"""
# 		<style>
# 			.reportview-container .main .block-container {{{max_width_str}}}
# 		</style>    
# 	""",
# 	unsafe_allow_html=True
# )




st.set_page_config(layout="wide")

# Spawn a new Ace editor
content = st_ace()
st.markdown('---')


def my_widget(key):
    st.subheader('Hello there!')
    return st.button("Click me " + key)

# This works in the main area
clicked = my_widget("first")

# And within an expander
my_expander = st.expander("Expand", expanded=True)
with my_expander:
    clicked = my_widget("second")

# AND in st.sidebar!
with st.sidebar:
    clicked = my_widget("third")
    
