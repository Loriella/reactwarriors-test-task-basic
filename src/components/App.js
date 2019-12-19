import React from "react";
import {GalleryItem} from "./GalleryItem";
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
          galleryItems: data.children,
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

  getItemsByComments = (items, rangeFilter) =>
    items
      .filter(item => item.data.num_comments >= Number(rangeFilter))
      .sort((a, b) => b.data.num_comments - a.data.num_comments);

  render() {
    const {galleryItems, refreshButton, rangeFilter} = this.state;
    const SortGalleryItems = this.getItemsByComments(galleryItems, rangeFilter);

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
          rangeFilter={rangeFilter}
          onChangeRangeFilter={this.onChangeRangeFilter}
        />
        {
          this.state.loading
            ? <div className="loader">Loading...</div>
            : <div className="row mt-4">
              { SortGalleryItems.length === 0
                ? <div className="message">No results found matching your criteria</div>
                : SortGalleryItems.map(item => {
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
