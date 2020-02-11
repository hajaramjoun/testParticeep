import React,{Component} from "react";

class Pagination extends Component{

  constructor(props)
  {
    super(props)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e)
  {
    var options = e.target.options;
    console.log(options)
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    this.props.onChange(values);
  }

  render()
  {
      return 
   
    
  }

}

export default Pagination;