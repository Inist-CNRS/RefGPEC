import Autosuggest from "react-autosuggest";
import React from "react";
import theme from "../index.css";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
const getSuggestionValue = suggestion => suggestion.skill_shortname;
const getSuggestions = value => {
  const inputValue = value.value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let arr = Object.values(skills);
  return inputLength === 0
    ? []
    : arr.filter(skill => {
        return skill.skill_shortname.toLowerCase().includes(inputValue);
      });
};
const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = suggestion.skill_shortname;
  const matches = match(suggestionText, query);
  const parts = parse(suggestionText, matches);
  return (
    <span>
      {parts.map((part, index) => {
        const className = part.highlight ? "highlight" : null;
        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
};
let skills = [];
let createReactClass = require("create-react-class");
let RefGpecSuggestSkills = createReactClass({
  displayName: "RefGpecSuggestSkills",

  getInitialState: function() {
    return {
      value: "",
      suggestions: []
    };
  },

  handleChange: function(event, newValue) {
    this.setState({
      value: newValue
    });
  },

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested: function(value) {
    this.setState({
      suggestions: getSuggestions(value)
    });
  },

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested: function() {
    this.setState({
      suggestions: []
    });
  },
  shouldRenderSuggestions: function(value) {
    return value.trim().length > 2;
  },

  handleBlur: function(event) {
    this.props.onSubmit(event);
  },
  onChange: function(event, { newValue }) {
    this.setState({
      value: newValue
    });
  },

  render: function() {
    const { value, suggestions } = this.state;
    skills = this.props.SkillData.skills;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Entrez une compétence",
      value,
      onBlur: this.handleBlur,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        style={theme}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
      />
    );
  }
});
export default RefGpecSuggestSkills;
