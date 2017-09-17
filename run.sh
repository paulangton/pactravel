tsc -p public/src/tsconfig.json
export FLASK_APP=main.py
flask run
firefox public/src/index.html
