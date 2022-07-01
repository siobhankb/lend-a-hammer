from app import app

from flask import render_template, redirect, url_for, flash

@app.route('/')
def index():
    message = "<p>Hello World</p>"
    return "Howdy Doody"
    # render_template('index.html', message=message)