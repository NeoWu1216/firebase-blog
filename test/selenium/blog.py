from common import *


def create_new_blog(driver):
    """
    pre-condition: driver is authenticated
    post-condition: new blog is created with blog_id to be returned
    """
    # Create Blog
    # driver.find_element_by_id('blog-creation-link').click()
    get(driver, "http://localhost:3000/create")

    title_text = random_str(20)
    content_text = '\n'.join(random_str(66) for _ in range(4))

    send_keys_by_id(driver, "title", title_text)
    send_keys_by_id(driver, "content", content_text)
    click_by_id(driver, "submit")

    blog_id = driver.current_url.split('/')[-1]
    print('Blog Created: {}'.format(blog_id))
    return blog_id

def like_blog(driver):
    """
    pre-condition: driver is authenticated and at a blog page
    post-condition: current blog's like state is switched
    """
    click_by_id(driver, "like")
    print('Blog Liked')

def delete_blog(driver, blog_id):
    """
    pre-condition: driver is authenticated and at blog_list
    post-condition: blog deleted
    """
    # Check if title in the homepage and details (Note content may change format)
    highlight_by_id(driver, 'delete '+blog_id)
    click_by_id(driver,'delete '+blog_id)
    print('Successfully deleted the blog with id {}'.format(blog_id))

def go_to_author(driver):
    """
    pre-condition: already in the corresponding blog page
    post-condition: driver goes to the author's profile page
    """
    click_by_id(driver, 'author')