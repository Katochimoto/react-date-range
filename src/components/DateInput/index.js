import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TimeInputPolyfill from 'react-time-input-polyfill';
import { format, parse, isValid, isEqual, getHours, getMinutes, getSeconds, set } from '../../date';

class DateInput extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props),
      time: this.formatTime(props),
    };
  }

  componentDidUpdate(prevProps) {
    const { value } = prevProps;

    if (!isEqual(value, this.props.value)) {
      this.setState({
        value: this.formatDate(this.props),
        time: this.formatTime(this.props),
      });
    }
  }

  formatDate({ value, dateDisplayFormat, dateOptions }) {
    if (value && isValid(value)) {
      return format(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }

  formatTime({ value, dateOptions }) {
    if (value && isValid(value)) {
      return format(value, 'HH:mm:ss', dateOptions);
    }
    return '00:00:00';
  }

  update(value, time) {
    const { invalid, changed } = this.state;

    if (invalid || !changed || !value) {
      return;
    }

    const { onChange, dateDisplayFormat, dateOptions, useTime } = this.props;
    let parsed = parse(value, dateDisplayFormat, new Date(), dateOptions);

    if (time && useTime) {
      const ref = set(new Date(), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      })

      let parsedTime = parse(time, 'HH:mm:ss', ref)
      if (!isValid(parsedTime)) {
        parsedTime = parse(time, 'HH:mm', ref)
      }

      if (isValid(parsedTime)) {
        parsed = set(parsed, {
          hours: getHours(parsedTime),
          minutes: getMinutes(parsedTime),
          seconds: getSeconds(parsedTime),
          milliseconds: 0,
        })
      }
    }

    if (isValid(parsed)) {
      this.setState({ changed: false }, () => onChange(parsed));
    } else {
      this.setState({ invalid: true });
    }
  }

  onKeyDown = e => {
    const { value, time } = this.state;
    if (e.key === 'Enter') {
      this.update(value, time);
    }
  };

  onChangeDate = e => {
    this.setState({ value: e.target.value, changed: true, invalid: false });
  };

  onChangeTime = e => {
    this.setState({ time: e.target.value, changed: true, invalid: false });
  };

  onBlur = () => {
    const { value, time } = this.state;
    this.update(value, time);
  };

  render() {
    const { className, readOnly, placeholder, disabled, useTime, onFocus } = this.props;
    const { value, time, invalid } = this.state;

    return (
      <span className={classnames('rdrDateInput', className, {
        rdrWarning: invalid,
      })}>
        <input
          readOnly={readOnly}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onKeyDown={this.onKeyDown}
          onChange={this.onChangeDate}
          onBlur={this.onBlur}
          onFocus={onFocus}
        />
        {useTime ? (
          <input
            step="1"
            type="time"
            readOnly={readOnly}
            disabled={disabled}
            value={time}
            onKeyDown={this.onKeyDown}
            onChange={this.onChangeTime}
            onBlur={this.onBlur}
            onFocus={onFocus}
          />
        ) : null}
      </span>
    );
  }
}

DateInput.propTypes = {
  value: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  useTime: PropTypes.bool,
  dateOptions: PropTypes.object,
  dateDisplayFormat: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  useTime: true,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default DateInput;
