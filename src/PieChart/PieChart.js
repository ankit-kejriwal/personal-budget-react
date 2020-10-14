import React, {Component} from 'react';
import * as d3 from 'd3';

export default class PieChart extends Component {

    componentDidUpdate() {
        this.buildChart();
    }
    componentDidMount(){
        this.buildChart();
    }

    buildChart = () => {
        const { dataPoint, labels } = this.props;
        this.svg = d3.select('#graph')
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', '0 0 300 350')
        .classed('svg-content', true)
        .append('g');
        this.svg.append('g')
        .attr('class', 'slices');
        this.svg.append('g')
            .attr('class', 'labels');
        this.svg.append('g')
            .attr('class', 'lines');
    
        // tslint:disable-next-line: one-variable-per-declaration
        const width = 350,
            height = 340,
            radius = Math.min(width, height) / 3;
    
        const pie = d3.layout.pie()
            .sort(null)
            .value((d) => {
                return d.value;
            });
    
        const arc = d3.svg.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);
    
        const outerArc = d3.svg.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);
    
        this.svg.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    
        const key = (d) => d.data.label;
    
        const color = d3.scale.ordinal()
            .domain(labels)
            .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);
    
        const iplabels = color.domain();
        let i = 0 ;
        const data = iplabels.map((label) => {
            return {
                label: label, value: dataPoint[i++]
            }
        });
    
        /* ------- PIE SLICES -------*/
        var slice = this.svg.select('.slices').selectAll('path.slice')
            .data(pie(data), key);
    
        slice.enter()
            .insert('path')
            .style('fill', function(d) { return color(d.data.label); })
            .attr('class', 'slice');
    
        slice
            .transition().duration(1000)
            .attrTween('d', function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    return arc(interpolate(t));
                };
            })
    
        slice.exit()
            .remove();
    
        /* ------- TEXT LABELS -------*/
    
        var text = this.svg.select('.labels').selectAll('text')
            .data(pie(data), key);
    
        text.enter()
            .append('text')
            .attr('dy', '.35em')
            .text(function(d) {
                return d.data.label;
            });
    
        function midAngle(d){
            return d.startAngle + (d.endAngle - d.startAngle)/2;
        }
    
        text.transition().duration(1000)
            .attrTween('transform', function(d) {
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    const d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return 'translate('+ pos +')';
                };
            })
            .styleTween('text-anchor', function(d){
                this._current = this._current || d;
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return function(t) {
                    var d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? 'start':'end';
                };
            });
    
        text.exit()
            .remove();
    
        /* ------- SLICE TO TEXT POLYLINES -------*/
    
        var polyline = this.svg.select('.lines').selectAll('polyline')
            .data(pie(data), key);
    
        polyline.enter()
            .append('polyline');
    
        polyline.transition().duration(1000)
            .attrTween('points', function(d){
                this._current = this._current || d;
                let interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);
                return (t) => {
                    var d2 = interpolate(t);
                    var pos = outerArc.centroid(d2);
                    pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2), outerArc.centroid(d2), pos];
                };
            });
    
        polyline.exit()
            .remove();
    }


    render() {
        return (
            <>
                <div id="graph" className="svg-container">
                    </div>
            </>
          );
    }
  
}

