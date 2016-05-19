var React = require('react-native');
var {
  View,
  TextInput,
  PixelRatio
} = React;

var WidgetMixin = require('../mixins/WidgetMixin.js');


module.exports = React.createClass({
  mixins: [WidgetMixin],

  getDefaultProps() {
    return {
      type: 'TextAreaWidget',
    };
  },

  render() {
    return (
      <View style={this.getStyle('textAreaRow')}>
        <TextInput
          style={this.getStyle('textArea')}
          multiline={true}

          {...this.props}

          onFocus={() => this.props.onFocus(true)}
          onChangeText={this._onChange}
          value={this.state.value}
        />
      </View>
    );
  },

  defaultStyles: {
    textAreaRow: {
      backgroundColor: '#FFF',
      height: 120,
      width: 994,
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      borderWidth: 2, borderColor: '#666666', marginTop: 20, marginBottom: 20
    },
    textArea: {
      fontSize: 15,
      flex: 1,
    },
  },

});
