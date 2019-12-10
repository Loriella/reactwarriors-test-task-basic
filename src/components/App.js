import React from "react";
import GalleryItem from "./GalleryItem";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      galleryItems: [],
    }
  }

  getGalleryData = () => {
    const link = "https://www.reddit.com/r/reactjs.json?limit=100";

    this.setState({
      loading: true
    });

    fetch(link)
      .then(response => response.json())
      .then(({data}) => {
        this.setState({
          galleryItems: data.children,
          loading: false
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
        {
          this.state.loading
            ? <div className="loader">Loading...</div>
            : <div className="row mt-4">
              {galleryItems.map(item => {
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
              }}
            </div>
        }
      </div>
    );
  }
}
