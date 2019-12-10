import React from 'react'

class GalleryItem extends React.Component {
  render() {
    const {data} = this.props;

    return (
      <div
        className="card border-light"
        style={{width: "100%"}}
      >
        <img
          className="card-img-top"
          src={data.thumbnail}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <div className="card-text">Number of comments: {data.num_comments}</div>
          <a href={`https://www.reddit.com/${data.permalink}`}
          >
            Link
          </a>
        </div>
      </div>
    )
  }
}

export default GalleryItem;
