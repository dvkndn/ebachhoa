var CurrencyInput = React.createClass({
	getInitialState: function() {
		return {
			text: this.props.price
		}
	},
	handleBlur: function(e) {
		var moneyFormat = {
			symbol: "₫",
			precision: 0,
			format: "%v %s"
		};
		var input = e.target.value;
		var formattedInput = accounting.formatMoney(input, moneyFormat);
		e.target.value = formattedInput;
	},
	handleChange: function(e) {
		this.setState({text: e.target.value})
	},
	render: function() {
		return (
			<input
				className = "text-box text-box--line text-box--small text-box--full-width"
				ref = "upperValue"
				value = {this.state.text}
				type = "text"
				onBlur = {this.handleBlur}
				onChange = {this.handleChange}/>
		);
	}
});

var CurrencyRange = React.createClass({
	handleChange: function(e) {
		console.log('a');
	},
	render: function() {
		return (
			<div className = "multi-range__inputs">
				<div className = "multi-range__lower">
					<CurrencyInput
						price = "1,000,000 ₫"/>
				</div>
				<div className = "multi-range__upper">
					<CurrencyInput
						price="2,000,000 ₫"/>
				</div>
			</div>
		);
	}
});

React.render(<CurrencyRange/>, document.querySelector(".multi-range__inputs-wrapper"));