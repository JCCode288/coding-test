# Inter Opera Coding Test

## Installation

### Install Python Packages

Installation for python packages can be done by running bash script `install.sh` from this directory

> Script is optimized for ubuntu. make sure path to venv is correct (default: `./.venv/bin/activate` for ubuntu).

Notes: Sometimes the app wont load perfectly for the first time because of vector and embedding modules being installed. please retry it or adjust it to your environtment

### Running apps

initialize source from venv by running following script:

-  **ubuntu** : `source ./.venv/bin/activate`
-  **windows** : `source ./.venv/bin/Scripts/Activate`

> NOTES:
> For other linux/unix or any other distributions to adjust accordingly

App can be run in:

-  **Development Env** : `fastapi dev`
-  **Production Env** : `fastapi start`

### Docs

app documentation OpenAPI can be seen at path `<Base URL>/docs` or if using default env you can see it at <a href="http://localhost:8000/docs">http://localhost:8000/docs</a>

## ERD

from current dummy data can be determined that the Entity Relation from the response is roughly like this.

<img src="InterOpera.svg" alt="ERD-InterOpera"/>

i do notice that in deals some company had different names. this might because the deals doesn't necessarily reflect sales representatives clients. so i made revision to separating the client relationship to the deals

## Architectural & Decisions

### Database

database used in this project will be SQLite3 as it was simple and easy implemented using SQLAlchemy for lightweight purpose. I am against to use this approach for bigger projects

### Separation per modules

easier to separate app logic and debugging if it was divided per modules

-  **Database**

   Database module for database data models and connections

-  **LLM**

   LLM Module for AI (LLM) related

-  **Use Cases**

   implementation of provided modules combined into one use cases for each routes
