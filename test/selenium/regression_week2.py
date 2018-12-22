from common import *
from blog import *
from auth import *

if __name__ == '__main__':
    driver = get_driver()
    sign_out(driver, forced=False)

    user = sign_up(driver)
    blog_id = create_new_blog(driver)
    sign_out(driver)

    sign_in(driver, user['email'], user['password'])
    delete_blog(driver, blog_id)
    sign_out(driver)
    
    driver.close()
