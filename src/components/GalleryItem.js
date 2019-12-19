import React, {memo} from 'react'

export const GalleryItem = memo(({data}) => {

  return (
    <div
      className="card border-light"
      style={{width: "100%"}}
    >
      {data.thumbnail !== "self" && (
        <img
          className="card-img-top"
          src={data.thumbnail}
          alt=""
        />)
      }
      <div className="card-body">
        <h6 className="card-title">{data.title}</h6>
        <div className="card-text">Number of comments: {data.num_comments}</div>
        <a
          href={`https://www.reddit.com/${data.permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link
        </a>
      </div>
    </div>
  )
});
