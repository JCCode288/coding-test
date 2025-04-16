from dotenv import load_dotenv
load_dotenv() # loading env before importing to ensure package config from env loaded to app

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.api_route import api_router
from context import lifespan
import uvicorn
import os

app = FastAPI(
    docs_url="/docs", 
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware, 
    allow_origins=[
        os.environ.get("WHITELIST") # assumed only one origin that whitelisted
    ],
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "*"
    ]
)

app.include_router(api_router) # main app will be in this router

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
