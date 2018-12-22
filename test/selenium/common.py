from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys
import string, random
from time import sleep

# Provides functionalities to help common tasks 


def random_str(length):
    return ''.join(random.choice(string.digits+string.ascii_letters) for _ in range(length))

def get_driver():
    ChromeOptions = webdriver.ChromeOptions()
    ChromeOptions.add_argument('--disable-browser-side-navigation')
    driver = webdriver.Chrome(chrome_options=ChromeOptions)
    get(driver, "http://localhost:3000")
    # print("Title: ", driver.title)
    return driver

def get(driver, url, sleep_time=1.5):
    driver.get(url)
    sleep(sleep_time)

def send_keys_by_id(driver, id, val):
    field = driver.find_element_by_id(id)
    field.send_keys(val)

def clear_by_id(driver, id):
    field = driver.find_element_by_id(id)
    field.clear()

def click_by_id(driver, id, sleep_time=2.5):
    button = driver.find_element_by_id(id)
    button.click()
    sleep(sleep_time)

def get_elem_by_id(driver, id, safe=True):
    if not safe:
        return driver.find_element_by_id(id)
    try:
        field = driver.find_element_by_id(id)
    except NoSuchElementException:
        field = None 
    return field

def get_elem_by_content(driver, content, safe=False):
    # print("Debug: ", "//*[contains(text(), '{}')]".format(content))
    if not safe:
        return driver.find_element_by_xpath("//*[contains(text(), '{}')]".format(content))
    try:
        elem = driver.find_element_by_xpath("//*[contains(text(), '{}')]".format(content))
    except NoSuchElementException:
        elem = None
    return elem

def get_elem_by_name(driver, name, safe=False):
    if not safe:
        return driver.find_element_by_name(name)
    try:
        elem = driver.find_element_by_name(name)
    except NoSuchElementException:
        elem = None
    return elem

def highlight(element, sleep_time=1):
    driver = element._parent
    def apply_style(s):
        driver.execute_script("arguments[0].setAttribute('style', arguments[1]);",
                              element, s)
    original_style = element.get_attribute('style')
    apply_style("background: yellow; border: 3px solid red;")
    sleep(sleep_time)
    apply_style(original_style)

def highlight_by_id(driver, id, sleep_time=1):
    elem = get_elem_by_id(driver, id)
    highlight(elem, sleep_time)