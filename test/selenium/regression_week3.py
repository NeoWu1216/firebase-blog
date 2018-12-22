from common import *
from blog import create_new_blog, delete_blog, go_to_author
from auth import sign_in, sign_up, sign_out
from layout import switch_table_card, search
from comment import create_new_comment
from profile import test_video_preference, locate_blog, locate_comment, get_uid, go_to_profile
from users import users


def assert_comment_not_found(comment_content, view_profile = False):
    assert(locate_comment(driver, comment_content, view_profile, safe=True) == None)

if __name__ == '__main__':
    driver = get_driver()
    sign_out(driver, forced=False)
    assert(len(users) > 1)
    # user = sign_up(driver)
    # Let's not flooding our database with new users per test

    # Check layout/search is good
    sleep(1)
    switch_table_card(driver)
    search(driver, "incog")
    sleep(0.5)
    search(driver, "")


    # Let users[1] be Alice, users[0] be Bob
    # Alice first signs in, create a blog and a comment underneath.
    # She then verifies the created blog and comment shows up in all possible locations
    sign_in(driver, users[1]['email'], users[1]['password'])
    blog_id = create_new_blog(driver)
    comment_content = create_new_comment(driver, blog_id)
    highlight(get_elem_by_name(driver, comment_content))
    go_to_author(driver)
    uid = get_uid(driver)
    print("Uid : {}".format(uid))
    test_video_preference(driver)
    locate_blog(driver, blog_id, False)
    locate_comment(driver, comment_content, False, safe=False)
    sign_out(driver)

    # Bob then signs in, checks Alice's blog and comment.
    # He commented under Alice's comment and checks it shows up in only the correct locations
    # (For instance, not Alice's comments)
    sign_in(driver, users[0]['email'], users[0]['password'])
    new_comment_content = create_new_comment(driver, blog_id)
    go_to_profile(driver, uid)
    locate_blog(driver, blog_id, False, safe=False)
    locate_comment(driver, comment_content, False, safe=False)
    # Shouldn't find other people's comment inside your post
    assert_comment_not_found(new_comment_content)
    locate_comment(driver, new_comment_content, True, safe=False)
    sign_out(driver)

    # Alice then signs in, deletes her original post
    # Then she checks the post is gone and her comment is gone
    sign_in(driver, users[1]['email'], users[1]['password'])
    delete_blog(driver, blog_id)
    # Make sure comments are deleted
    go_to_profile(driver, uid)
    assert(locate_blog(driver, blog_id, True, safe=True)==None)
    assert_comment_not_found(comment_content)
    sign_out(driver)

    # Bob finally verifies his comment is gone as well
    sign_in(driver, users[0]['email'], users[0]['password'])
    assert_comment_not_found(new_comment_content, True)
    sign_out(driver)

    driver.close()
