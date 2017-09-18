# pactravel

Devpost: https://devpost.com/software/hackmit2017

Activate virtual environment (Python 3)
. venv/bin/activate

Install python requirements
pip install -r requirements.txt

Install Typescript:
npm install -g tsc

Compile Typescript:
tsc -p ./public/src/tsconfig.json app.ts

Run flask server: 
export FLASK_APP=main.py
flask run

Open ./public/index.html in your favorite browser to experience the magic!


