import React, { Component } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentContent from './CommentContent'
import Select from 'react-select';

export class CommentList extends Component {
  options = [
    { value: 'date-dec', label: 'Newest first' },
    { value: 'date-inc', label: 'Oldest first' },
  ];

  state = {
    selectedOption : this.options[0]
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

  optionOrderBy(value) {
    switch(value) {
      case "date-inc":
        return this.orderBy("createdAt", true)
    }
    return this.orderBy('createdAt', false)
  }

  optionChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    let {blog, comments} = this.props;
    const {selectedOption} = this.state;

    if (comments !== undefined) {
      comments.sort(this.optionOrderBy(selectedOption.value))
    }

    return (
      <div style={{textAlign:"justify"}}>

       
      
      <Comment.Group>
        <Header as='h3' dividing> 
          Comments
        </Header>

        <Select
              value={selectedOption}
              onChange={this.optionChange}
              options={this.options}
              id = "order"
              styles={{
                control: (base, state) => ({
                  ...base,
                }),
              }}
          />

        <div style={{marginTop:"2em"}}>
        {
          comments && comments.filter((elem) => !blog || (elem.articleId==blog.id)).map((elem,i) => 
            <div key={elem.id}>
              {i != 0 && <hr style={{height: "1px"}}/>}
              <CommentContent elem={elem} global={!blog}/>
            </div>
          )
        }
        </div>

      </Comment.Group>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.firestore.ordered.comments,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection : 'comments'}
  ])
) (CommentList)
