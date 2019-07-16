import React, { Component} from 'react'
import BlogListSummary from './BlogListSummary';
import {Link, NavLink} from 'react-router-dom'
import Select from 'react-select';
import ReactTable from 'react-table'
import moment from 'moment'

let options = [
  { value: 'date-dec', label: 'Newest first' },
  { value: 'date-inc', label: 'Oldest first' },
  { value: 'author-inc', label: 'Author name (alphabetical)' },
  { value: 'author-dec', label: 'Author name (reverse alphabetical)' },
  { value: 'title-inc', label: 'Title (alphabetical)' },
  { value: 'title-dec', label: 'Title (reverse alphabetical)' },
  { value: 'popularity-dec', label: 'Most Popular' },
  { value: 'popularity-inc', label: 'Least Popular' }
];

let prevState = {
  search : "",
  selectedOption : options[0],
  table : false,
}

export default class BlogList extends Component {
  /**
   * 
   * @param {*} attr attribute to compare with
   * return the comparison function pass to sort
   */
  
  constructor(props) {
    super(props)
    this.state = prevState
  }
  

  componentWillUnmount() {
    // Remember state for the next mount
    prevState = this.state;
  }

  orderBy(attr, asc=true) {
    return (a,b) => {
      if (a[attr] < b[attr])
        return asc ? -1 : 1;
      else if (a[attr] == b[attr])
        return 0;
      return asc ? 1 : -1;
    }
  }

  contains(str, key) {
    return str.toLowerCase().includes(key.toLowerCase())
  }

  optionOrderBy(value) {
    switch(value) {
      case "date-dec":
        return this.orderBy("createdAt", false)
      case "date-inc":
        return this.orderBy("createdAt", true)
      case "author-inc":
        return this.orderBy("author", true)
      case "author-dec":
        return this.orderBy("author", false)
      case "title-inc":
        return this.orderBy("title", true)
      case "title-dec":
        return this.orderBy("title", false)
      case "popularity-dec":
        return this.orderBy("popularity", false)
      case "popularity-inc":
        return this.orderBy("popularity", true)
    }
    alert("Error in Order")
    return this.orderBy("createdAt", false)
  }

  optionChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const { selectedOption, search, table} = this.state;
    let {blogs} = this.props;
    // console.log(Object.prototype.toString.call(blogs))
    // console.log(Object.prototype.toString.call([1,2,3]))

    if (blogs !== undefined) {
      blogs.sort(this.optionOrderBy(selectedOption.value))
      blogs = blogs.filter((elem) => this.contains(elem.title, search) || this.contains(elem.author, search))
      blogs = blogs.map(blog => ({...blog, createdAt : moment(blog.createdAt.toDate()).calendar()}))
    }

    const columns = [{
      Header : 'Title',
      accessor: 'title'
    },{
      Header : 'Author',
      accessor : 'author'
    }, {
      Header : 'Date',
      accessor : 'createdAt',
    }]

    return (
      
      <div>
          <form style={{marginTop:"3vh", marginBottom:"3vh"}}>
          {/* <i class = "fas fa-search" style={{float: 'left'}}/> */}

            <input
              type = "text"
              id = "search"
              value = {search}
              placeholder = "Search Blogs Here..."
              style = {{textAlign:"center"}}
              onChange = {event => this.setState({search: event.target.value})}
            ></input>
            
            <Select
              id = "order"
              value={selectedOption}
              onChange={this.optionChange}
              options={options}
              styles={{
                control: (base, state) => ({
                  ...base,
                }),
              }}
          />
          </form>

        <BlogListSummary blogs={blogs} table={table} />
          
        <button 
        className='btn-floating' 
        id = 'switch'
        onClick = {()=>{this.setState({table : !table})}}
        style={{
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed',
        }}>   {table ? "Card" : "Table"}  </button>


        {/* { blogs && blogs.map((blog,i) => {
            return (
              <div key={blog.id}>
                <BlogSummary blog = {blog}  />
              </div>
            )
          })
        } */}
        </div>
        
    )
  }
}