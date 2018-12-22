from common import *


def create_new_comment(driver, blog_id):
    """
    pre-condition: driver is authenticated
    post-condition: new comment is created
    """
    # Create Blog
    # driver.find_element_by_id('blog-creation-link').click()
    get(driver, "http://localhost:3000/blog/"+blog_id, 1)
    content_text = random_str(20)
    comment_section = get_elem_by_id(driver, "content")
    highlight(comment_section)

    # print('Entering the text box')
    comment_section.send_keys(content_text)
    click_by_id(driver, "submit")
    print('New comment created: '+content_text)
    return content_text