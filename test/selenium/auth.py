from common import *

def sign_in(driver, email, password):
    get(driver, "http://localhost:3000/signin")
    send_keys_by_id(driver, "email", email)
    send_keys_by_id(driver, "password", password)
    click_by_id(driver, "submit")

def sign_up(driver):
    """
    Creates a new account each time 
    """
    get(driver, "http://localhost:3000/signup")
    email = random_str(8)+"@gmail.com"
    password = random_str(8)
    nickName = random_str(4)

    send_keys_by_id(driver, "email", email)
    send_keys_by_id(driver, "nickName", nickName)
    send_keys_by_id(driver, "password", password)
    send_keys_by_id(driver, "password2", password)
    click_by_id(driver, "submit")

    if not get_elem_by_id(driver, "signout"):
        print("Requires retry")
        return sign_up(driver)

    print("Successfully created user {} with email {}".format(nickName, email))
    return {"nickName":nickName, "email":email, "password":password}


def sign_out(driver, forced=True):
    field = get_elem_by_id(driver, "signout", not forced)
    if forced or field:
        field.click()


if __name__ == '__main__':
    driver = get_driver()
    sign_out(driver, forced=False)

    # will create a new user each time
    # be careful when running this
    user = sign_up(driver)
    sign_out(driver)
    sign_in(driver, user['email'], user['password'])
    sign_out(driver)

    driver.close()