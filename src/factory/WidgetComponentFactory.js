import React from 'react';
import get from 'lodash/get';

import Number from '../widgets/Number/components/Number';
import History from '../widgets/History/components/History';
import Breakdown from '../widgets/Breakdown/components/Breakdown';
import Funnel from '../widgets/Funnel/components/Funnel';
import Text from '../widgets/Text/components/Text';
import Weather from '../widgets/Weather/components/Weather';
import PieChartWidget from '../widgets/PieChart/components/PieChartWidget';
import Instagram from '../widgets/Instagram/components/Instagram';
import constants from '../config/constants';

const widgetType = constants.widgetType;

class WidgetComponentFactory {
  static create(widget, props) {
    const key = widget.key;

    switch (widget.type) {
      case widgetType.number: {
        const numberProps = WidgetComponentFactory.getNumberProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.number, key)} key={key}>
            <Number {...numberProps} />
          </div>
        );
      }

      case widgetType.breakdown: {
        const breakdownProps = WidgetComponentFactory.getBreakdownProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.breakdown, key)} key={key}>
            <Breakdown {...breakdownProps} />
          </div>
        );
      }

      case widgetType.funnel: {
        const funnelProps = WidgetComponentFactory.getFunnelProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.funnel, key)} key={key}>
            <Funnel {...funnelProps} />
          </div>
        );
      }

      case widgetType.history: {
        const historyProps = WidgetComponentFactory.getHistoryProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.history, key)} key={key}>
            <History {...historyProps} />
          </div>
        );
      }

      case widgetType.text: {
        const textProps = WidgetComponentFactory.getTextProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.text, key)} key={key}>
            <Text {...textProps} />
          </div>
        );
      }

      case widgetType.weather: {
        const watherProps = WidgetComponentFactory.getWeatherProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.weather, key)} key={key}>
            <Weather {...watherProps} />
          </div>
        );
      }

      case widgetType.pieChart: {
        const pieChartProps = WidgetComponentFactory.getPieChartProps(widget, props);

        return (
          <div className={WidgetComponentFactory.getClassName(widgetType.pieChart, key)} key={key}>
            <PieChartWidget {...pieChartProps} />
          </div>
        );
      }

      case widgetType.instagram: {
        const instaProps = WidgetComponentFactory.getInstaProps(widget, props);

        return (
          <div className="col-xs-12 col-sm-6 col-md-3" key={key}>
            <Instagram {...instaProps} />
          </div>
        );
      }

      default:
        break;
    }

    return null;
  }

  static getClassName(type, key) {
    return `widget ${key} ${type}-widget`;
  }

  static getGenericProps(widget, props) {
    return {
      id: widget.id,
      onMove: props.onMove,
      onHover: props.onHover,
      heading: widget.heading,
      iconType: widget.iconType,
      data: get(props[widget.key], 'data', {}),
      response: props[widget.key],
      widgetName: widget.key,
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

  static getHistoryProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props), {
      description: widget.description,
      legends: widget.legends,
      dots: widget.dots,
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

  static getPieChartProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props));
  }

  static getInstaProps(widget, props) {
    return Object.assign({}, WidgetComponentFactory.getGenericProps(widget, props), {
      instagram: props[widget.key],
    });
  }
}

export default WidgetComponentFactory;
