from common import *
from layout import switch_table_card

def test_avatar(driver):
    img_path = "C:\\Users\\neowu\\Desktop\\CS 242\\fa18-cs242-final\\firebase-blog\\src\\components\\img\\"
    click_by_id(driver, 'profile', 1)
    click_by_id(driver, 'avatar', 1)
    for img in ['dislike.jpg', 'like.png']:
        send_keys_by_id(driver, 'select', img_path+img)
        click_by_id(driver, 'upload', 1)

def test_video_preference(driver):
    """
    pre-condition: driver is authenticated
    post-condition: a new video has bean set
    """
    # Create Blog
    profile = get_elem_by_id(driver, 'profile')
    highlight(profile)
    profile.click()
    click_by_id(driver, 'profile', 1)
    click_by_id(driver, 'settings', 1)

    video_id = random_str(len("KgEQNlR4A6o"))
    send_keys_by_id(driver, "content", video_id)
    click_by_id(driver, "submit1", 1)
    click_by_id(driver, "submit2", 1)

    click_by_id(driver, "submit1", 1)
    click_by_id(driver, "submit2", 1)

def show_favorite(driver):
    click_by_id(driver, 'favorite', 5)

def subscribe(driver, uid):
    go_to_profile(driver, uid)
    click_by_id(driver, 'subscribe')
    print('Subscribed to {}'.format(uid))

def get_uid(driver):
    """
    pre-condition : user already in the corresponding profile page
    """
    return driver.current_url.split('/')[-1]

def go_to_profile(driver, uid):
    print("Get", "http://localhost:3000/user/"+uid)
    get(driver, "http://localhost:3000/user/"+uid)


def locate_blog(driver, blog_id, view_profile, safe=False):
    """
    pre-condition: blog is already created by the specific user. 
    """
    print("Blog to find: ", blog_id)
    if view_profile:
        click_by_id(driver, 'profile', 1.5)
    click_by_id(driver, 'blogs', 2)
    elem = get_elem_by_id(driver, blog_id, True)
    if safe and not elem:
        print("Blog not found")
        return None
    highlight(elem)
    switch_table_card(driver, False)
    elem = driver.find_element_by_id(blog_id)
    highlight(elem)
    switch_table_card(driver, False)
    return elem

def locate_comment(driver, comment_content, view_profile, safe=False):
    """
    pre-condition : comment is already created by the specific user
    """
    print("Comment to find: ", comment_content)
    if view_profile:
        click_by_id(driver, 'profile', 1)
    click_by_id(driver, 'comments', 2)
    elem = get_elem_by_name(driver, comment_content, True)
    if safe and not elem:
        print("Comment not found")
        return None
    highlight(elem)
    return elem

