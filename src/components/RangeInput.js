import React from 'react';

class RangeInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0
    }
  }

  onChange = event => {
    const value = event.target.value;

    this.setState({
      value: value
    });
    this.props.onChangeRangeFilter(value)
  };

  render() {
    return (
      <form className="mt-3">
        <div className="form-group">
          <input
            type="range"
            className="form-control-range"
            id="formControlRange"
            min="0"
            max="500"
            value={this.props.rangeFilter}
            onChange={this.onChange}
          />
        </div>
      </form>
    )
  }
}

export default RangeInput;
