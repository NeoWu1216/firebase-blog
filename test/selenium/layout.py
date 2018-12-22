from common import *


def switch_table_card(driver, back=True):
    """
    pre-condition: driver is at blog list
    demonstrate the other layout (can switch back)
    """
    # Create Blog
    # get(driver, "http://localhost:3000/create")
    click_by_id(driver, "switch", 1)
    if back:
        click_by_id(driver, "switch", 0)


def search(driver, field):
    """
    pre-condition: driver is at blog list
    search for a specific match
    """
    if not field:
        clear_by_id(driver, "search")
    else:
        send_keys_by_id(driver, "search", field)
    sleep(0.4)

def order(driver, category="Newest first"):
    """
    pre-condition: driver is at blog/comment list
    order based on a criteria
    """
    send_keys_by_id(driver, "order", category)
    send_keys_by_id(driver, "order", Keys.RETURN)