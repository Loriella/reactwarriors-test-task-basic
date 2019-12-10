import React from "react";
import GalleryItem from "./GalleryItem";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      galleryItems: [],
    }
  }

  getGalleryData = () => {
    const link = "https://www.reddit.com/r/reactjs.json?limit=100";

    fetch(link)
      .then(response => response.json())
      .then(({data}) => {
        this.setState({
          galleryItems: data.children
        })
      })
  };

  componentDidMount() {
    this.getGalleryData();
  }

  render() {
    const {galleryItems} = this.state;

    return (
      <div className="container">
        <h1>Top commented.</h1>
        <div className="row mt-4">
          {
            galleryItems.map(item => {
              return (
                <div
                  className="col-4"
                  key={item.data.id}
                >
                  <GalleryItem
                    data={item.data}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
