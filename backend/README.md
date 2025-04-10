# Inter Opera Coding Test

## Installation

### Install Python Packages

Installation for python packages can be done by running bash script `install.sh` from this directory

> Script is optimized for ubuntu. make sure path to venv is correct (default: `./.venv/bin/activate` for ubuntu).

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

from current dummy data can be determined that the Entity Relation from the response is roughly like this

<img src="InterOpera.svg" alt="ERD-InterOpera"/>
