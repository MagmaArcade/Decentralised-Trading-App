from pydantic import BaseModel
import os
import json

from fastapi import FastAPI # fastAPI modules
import _mysql_connector # Python MySQL database connector
from web3 import Web3 # Web3.js (smart contract interactor)
from solcx import compile_standard, install_solc # Solcx (solidity intepreter for smart contracts)


app = FastAPI()


class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

# for section 3


@app.get("/")
async def funcTest1():
    return "Hello, this is fastAPI data"


@app.get("/getAboutData")
async def funcTest2():
    return "Hello, this is about us data"


@app.get("/getHomeData")
async def funcTest3():
    return "Hello, this is home data"


@app.get("/jsonData")
async def funcTest():
    jsonResult = {
        "name": "Your name",
        "Uni-year": 2,
        "isStudent": True,
        "hobbies": ["reading", "swimming"]
    }
    return jsonResult


@app.get("/student/{student_id}")
async def getStudentId(student_id: int):
    return {"student_id": student_id}


@app.post("/items/", response_model=Item)
def create_item(item: Item):
    return item


"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/data")
async def get_data():
    return {"message": "Hello from FastAPI"}

"""