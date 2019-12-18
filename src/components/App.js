import React from "react";
import GalleryItem from "./GalleryItem";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      galleryItems: [],
      refreshButton: false,
    }
  }

  componentDidMount() {
    this.getGalleryData();
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
          galleryItems: data.children.sort(function (a, b) {
              if (a.data.num_comments < b.data.num_comments) {
                return 1;
              }
              if (a.data.num_comments > b.data.num_comments) {
                return -1;
              }
              return 0;
            }),
          loading: false
        })
      })
  };

  autoRefreshHandle = () => {
    this.setState(state => ({
        refreshButton: !state.refreshButton
      }), () => {
        if (this.state.refreshButton) {
          this.timerId = setInterval(this.getGalleryData, 3000);
        } else {
          clearInterval(this.timerId);
        }
      }
    );
  };

  render() {
    const {galleryItems, refreshButton} = this.state;

    return (
      <div className="container">
        <h1>Top commented.</h1>
        <button
          className="refresh-btn"
          type="button"
          onClick={this.autoRefreshHandle}
        >
          {refreshButton ? "Stop auto-refresh" : "Start auto-refresh"}
        </button>
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
              }
            </div>
        }
      </div>
    );
  }
}
