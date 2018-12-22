from common import *
from blog import create_new_blog, delete_blog, go_to_author, like_blog
from auth import sign_in, sign_up, sign_out
from layout import switch_table_card, search
from comment import create_new_comment
from profile import show_favorite,subscribe, test_avatar, test_video_preference
from profile import locate_blog, locate_comment, get_uid, go_to_profile
from users import users, uid

if __name__ == '__main__':
    driver = get_driver()
    sign_out(driver, forced=False)
    assert(len(users) > 1)
    
    sign_in(driver, users[1]['email'], users[1]['password'])
    test_avatar(driver)

    show_favorite(driver)
    blog_id = create_new_blog(driver)
    sleep(1.5)
    like_blog(driver)
    subscribe(driver, uid)
    show_favorite(driver)

    driver.close()
