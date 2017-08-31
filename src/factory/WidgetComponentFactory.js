import React from 'react';

import Number from '../widgets/Number/components/Number';
import BugsHistory from '../widgets/BugsHistory/components/BugsHistory';
import Breakdown from '../widgets/Breakdown/components/Breakdown';
import Funnel from '../widgets/Funnel/components/Funnel';
import Text from '../widgets/Text/components/Text';
import Weather from '../widgets/Weather/components/Weather';
import constants from '../config/constants';

const widgetType = constants.widgetType;

class WidgetComponentFactory {
  static create(widget, props) {
    const key = widget.key;

    switch (widget.type) {
      case widgetType.number: {
        const numberProps = WidgetComponentFactory.getNumberProps(widget, props);

        return (
          <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
            <Number {...numberProps} />
          </div>
        );
      }

      case widgetType.breakdown: {
        const breakdownProps = WidgetComponentFactory.getBreakdownProps(widget, props);

        return (
          <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
            <Breakdown {...breakdownProps} />
          </div>
        );
      }

      case widgetType.funnel: {
        const funnelProps = WidgetComponentFactory.getFunnelProps(widget, props);

        return (
          <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
            <Funnel {...funnelProps} />
          </div>
        );
      }

      case widgetType.bugsHistory: {
        const bugsHistoryProps = WidgetComponentFactory.getBugsHistoryProps(widget, props);

        return (
          <div className="col-xs-12" key={key}>
            <BugsHistory {...bugsHistoryProps} />
          </div>
        );
      }

      case widgetType.text: {
        const textProps = WidgetComponentFactory.getTextProps(widget, props);

        return (
          <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
            <Text {...textProps} />
          </div>
        );
      }

      case widgetType.weather: {
        const watherProps = WidgetComponentFactory.getWeatherProps(widget, props);

        return (
          <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
            <Weather {...watherProps} />
          </div>
        );
      }

      default:
        break;
    }

    return null;
  }

  static getGenericProps(widget, props) {
    return {
      id: widget.id,
      onMove: props.onMove,
      onHover: props.onHover,
      heading: widget.heading,
      iconType: widget.iconType,
      data: props[widget.key],
    };
  }

  static getNumberProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props), {
      threshold: widget.threshold,
      riseIsBad: widget.riseIsBad,
      formatter: widget.formatter,
    });
  }

  static getBreakdownProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props));
  }

  static getFunnelProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props));
  }

  static getBugsHistoryProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props), {
      history: props[widget.key],
      description: widget.description,
    });
  }

  static getTextProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props));
  }

  static getWeatherProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props), {
      weather: props[widget.key],
    });
  }
}

export default WidgetComponentFactory;
