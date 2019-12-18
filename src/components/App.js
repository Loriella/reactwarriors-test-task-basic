import React from "react";
import GalleryItem from "./GalleryItem";
import RangeInput from "./RangeInput";

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      galleryItems: [],
      refreshButton: false,
      rangeFilter: 0
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

  onChangeAutoRefresh = () => {
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

  onChangeRangeFilter = value => {
    this.setState({
      rangeFilter: value
    })
  };

  render() {
    const {galleryItems, refreshButton, rangeFilter} = this.state;
    const filteredGalleryItems = galleryItems.filter(item => item.data.num_comments >= Number(rangeFilter));

    return (
      <div className="container">
        <h1>Top commented.</h1>
        <div className="filter-title">Current filter: {rangeFilter}</div>
        <button
          className="refresh-btn"
          type="button"
          onClick={this.onChangeAutoRefresh}
        >
          {refreshButton ? "Stop auto-refresh" : "Start auto-refresh"}
        </button>
        <RangeInput
          onChangeRangeFilter={this.onChangeRangeFilter}
        />
        {
          this.state.loading
            ? <div className="loader">Loading...</div>
            : <div className="row mt-4">
              { filteredGalleryItems.length === 0
                ? <div className="message">No results found matching your criteria</div>
                : filteredGalleryItems.map(item => {
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
