import React, { Component } from 'react';
import '../../css/page-picker-form.css';

class PagePicker extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    return(
      <form className="page-picker" onSubmit={this.props.onSubmit}>
        <label>page:</label>
        <input
          id="page-id"
          type="text"
          value={ this.props.page }
          onChange={this.handleChange}
          placeholder="page #"/>
      </form>
    );
  }
}

export default PagePicker;
