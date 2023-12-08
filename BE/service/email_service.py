from email.message import EmailMessage
import ssl
import smtplib
import os
import re
from bs4 import BeautifulSoup
import base64
from configuration.configuration_manager import ConfigurationManager

configuration = ConfigurationManager.get_instance()

password = configuration.get_config_by_key('smtp.password')
email = configuration.get_config_by_key('smtp.email')

def send_activation_mail(reciver:str):
 try:
    directory = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(directory, os.pardir))
    file_path = os.path.join(directory, 'resources', 'templates', 'activation', 'index.html')
    with open(file_path, "r", encoding='utf-8') as f:
        body= f.read()
    body = setUrl(body)
    print(body)
    em = EmailMessage()
    em['From'] = email
    em['To'] = reciver
    em['Subject'] = 'Aktywuj swoje konto w portalu Bet With Friends'
    em.add_alternative(body, subtype='html')

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com',465, context=context) as smtp:
        smtp.login(email,password)
        smtp.sendmail(email,reciver,em.as_string())
 except Exception as e:
    print(e)


def extract_image_names_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    image_tags = soup.find_all('img')  # Znajdź wszystkie tagi <img>

    image_names = []
    for img_tag in image_tags:
        src = img_tag.get('src')  # Pobierz wartość atrybutu 'src' (ścieżka do obrazka)
        if src:
            image_name = src.split('/')[-1]  # Pobierz nazwę pliku obrazka z URL-a
            image_names.append(image_name)
    return image_names

def image_to_base64(image_name):
    directory = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(directory, os.pardir))
    file_path = os.path.join(directory, 'resources', 'images',image_name)
    with open(file_path, 'rb') as img_file:
        base64_encoded_image = base64.b64encode(img_file.read()).decode('utf-8')
    return base64_encoded_image

def setUrl(body:str):
    images = extract_image_names_from_html(body)
    for image in images:
        template = re.compile(image)
        new_url = f'data:image/png;base64,{image_to_base64(image)}'
        body = template.sub(new_url, body)
    return body